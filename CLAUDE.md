# CLAUDE.md

## Tech Stack
- **Static site generator:** Jekyll (GitHub Pages)
- **CSS framework:** Bootstrap 5.3.3 (CDN)
- **Font:** Computer Modern (web font via dreampulse CDN)
- **No build tools** — plain HTML/CSS, no SCSS/JS bundler

## Theming
- **Light mode:** Catppuccin Latte
- **Dark mode:** Catppuccin Mocha
- All colors use CSS custom properties in `:root` and `[data-theme="dark"]`
- Dark mode toggle persists via `localStorage`, respects `prefers-color-scheme` as default
- Background uses animated canvas (two modes via `localStorage["bgMode"]`: 0 = Particles, 1 = Aurora waves (default)), gradient defined via CSS variables
- Favicon (`assets/favicon.svg`) uses hardcoded `#7c3aed` — does NOT respond to dark mode theme

## File Structure
- `_layouts/default.html` — master template (head, navbar, footer, scripts)
- `assets/css/style.css` — all custom styles (single file)
- `assets/favicon.svg` — SVG favicon with "UB" initials
- `_data/menu.yml` — navbar links
- `index.html` — home/about page with publications, preprints, worldline
- `projects.html` — research projects (uses MathJax)
- `notes.html` — placeholder
- `files/` — resume PDF
- `images/` — profile photo

## Conventions
- **Publications format:** `[arXiv ID] *Title* — Authors. Published in Journal.`
- **Preprints format:** `[arXiv ID] *Title* — Authors.`
- Navbar font sizes use `clamp()` for responsive scaling
- No jQuery — Bootstrap 5 bundle handles everything
- SPA-style navigation: JS swaps `<main>` content on local link clicks, keeping canvas background alive
