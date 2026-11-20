const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');

(async () => {
  const label = process.argv[2] || 'after';
  fs.mkdirSync('_checks', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const width of [390, 768, 1440]) {
      for (const route of ['/', '/publications/', '/notes.html']) {
        const page = await browser.newPage({ viewport: { width, height: 960 } });
        const resources = [];
        const pending = [];
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('**/gc.zgo.at/**', route => route.abort());
        page.on('response', response => {
          pending.push(response.body().then(body => resources.push({ url: response.url(), bytes: body.length, status: response.status() })).catch(() => {}));
        });
        await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all([...document.images].map(image => image.decode()));
        });
        await Promise.all(pending);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          language: document.documentElement.lang,
          authorWeight: document.querySelector('.paper li strong') ? getComputedStyle(document.querySelector('.paper li strong')).fontWeight : null,
          paper: document.querySelector('.paper').getBoundingClientRect().toJSON(),
          font: getComputedStyle(document.body).fontFamily,
          imagesLoaded: [...document.images].every(image => image.naturalWidth > 0),
        }));
        assert.equal(state.overflow, false, `${width} ${route}: horizontal overflow`);
        assert.equal(state.imagesLoaded, true);
        assert.deepEqual(errors, []);
        assert(resources.every(resource => resource.status < 400), 'Failed resource');
        if (label !== 'before') {
          assert.equal(state.language, 'en');
          assert(state.font.startsWith('"Palatino Linotype"'), 'Unexpected body font');
          if (state.authorWeight) assert(Number(state.authorWeight) >= 600);
          assert(resources.every(resource => resource.url.startsWith('http://127.0.0.1:4173/')), 'Unexpected external visual asset');
          if (width < 768) {
            const toggle = page.getByRole('button', { name: 'Toggle navigation' });
            await toggle.focus();
            assert.notEqual(await toggle.evaluate(element => getComputedStyle(element).outlineStyle), 'none');
            await page.keyboard.press('Enter');
            assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
            await page.getByRole('link', { name: 'Publications', exact: true }).waitFor({ state: 'visible' });
            await page.keyboard.press('Escape');
            assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
          }
        }
        const name = route === '/' ? 'home' : route.replaceAll('/', '').replace('.html', '');
        await page.screenshot({ path: `_checks/${label}-${width}-${name}.png`, fullPage: true });
        results.push({ width, route, ...state, resources, bytes: resources.reduce((sum, item) => sum + item.bytes, 0) });
        await page.close();
      }
    }
    if (label !== 'before') {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4173/');
      await page.getByRole('link', { name: 'Publications', exact: true }).waitFor({ state: 'visible' });
      assert.equal(await page.getByRole('button', { name: 'Toggle navigation' }).count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await context.close();
    }
    fs.writeFileSync(`_checks/${label}.json`, JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results.map(({ width, route, bytes, resources }) => ({ width, route, bytes, requests: resources.length })), null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
