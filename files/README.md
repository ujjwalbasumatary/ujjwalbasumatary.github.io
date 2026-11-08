# CV and resume

- `main.tex` is the one-page resume; `cv.tex` is the full CV.
- Both use `resume-style.sty` for typography, margins, links, headings, lists,
  the contact header, and the coursework table. Keep that file alongside the
  sources when copying them to another LaTeX project.
- The one-page resume loads `resume-theme.sty` for bold burgundy headings and links,
  near-black text, dark gray dates and affiliations, stronger warm gray
  rules, and compact section spacing. Keep both
  `resume-theme.sty` and `resume-style.sty` alongside `main.tex`; the theme uses
  `microtype`. The resume includes the current employment and publication details.
- The full CV also loads `cv-style.sty`, which matches the resume's higher-contrast
  burgundy palette and bold section headings, with page footers and roomier section spacing. The CV uses the
  original centered name and contact header from `resume-style.sty`.
  Keep both style files alongside `cv.tex`. It additionally uses `microtype` and
  `fancyhdr`.

Build from this directory with pdfLaTeX, running each command twice to update
the PDF bookmarks:

```sh
pdflatex -interaction=nonstopmode -halt-on-error -jobname=resume main.tex
pdflatex -interaction=nonstopmode -halt-on-error cv.tex
```

The website links to `resume.pdf`, built from `main.tex`. The full CV remains
in the repository as `cv.tex` and `cv.pdf`, but is not linked from the homepage.
The CV keeps links to all
listed arXiv papers, the QFT lecture notes, the `qftonqc` repository, and the
GitHub profile. The shared header also links the email address and website.
Other references are plain text.
The one-page resume preserves the contact, arXiv, and teaching-code links.
The root-level `main.pdf` is a legacy copy of the resume.
