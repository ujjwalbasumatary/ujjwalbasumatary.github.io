# CLAUDE.md

## Tech Stack
- **Static site generator:** Jekyll (GitHub Pages)
- **CSS framework:** Bootstrap 5.3.3 (CDN)
- **Font:** Computer Modern (web font via dreampulse CDN)
- **No build tools** — plain HTML/CSS, no SCSS/JS bundler

## Theming
- Minimal light theme with a quiet dotted background.
- Colors use CSS custom properties in `:root`.
- No dark mode, animated canvas, gradient background, or SPA-style navigation.
- Favicon (`assets/favicon.svg`) uses hardcoded `#7c3aed`.

## File Structure
- `_layouts/default.html` — master template (head, navbar, footer, scripts)
- `assets/css/style.css` — all custom styles (single file)
- `assets/favicon.svg` — SVG favicon with "UB" initials
- `_data/menu.yml` — navbar links
- `index.html` — home/about page with publications, preprints, worldline
- `notes.html` — placeholder
- `_archive/projects.html` — archived research projects page, not published by Jekyll
- `files/` — resume PDF
- `images/` — profile photo

## Conventions
- **Publications format:** `[arXiv ID] *Title* — Authors. Published in Journal.`
- **Preprints format:** `[arXiv ID] *Title* — Authors.`
- No jQuery — Bootstrap 5 bundle handles everything
