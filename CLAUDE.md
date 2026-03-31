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
- Background uses dot grid pattern + gradient, both defined via CSS variables

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
