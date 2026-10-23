# CV and resume

- `main.tex` is the one-page resume; `cv.tex` is the full CV.
- Both use `resume-style.sty` for typography, margins, links, headings, lists,
  the contact header, and the coursework table. Keep that file alongside the
  sources when copying them to another LaTeX project.

Build from this directory with pdfLaTeX, running each command twice to update
the PDF bookmarks:

```sh
pdflatex -interaction=nonstopmode -halt-on-error -jobname=resume main.tex
pdflatex -interaction=nonstopmode -halt-on-error cv.tex
```

The website links to `cv.pdf`, built from `cv.tex`. The CV keeps links to all
listed arXiv papers, the QFT lecture notes, the `qftonqc` repository, and the
GitHub profile. The shared header also links the email address and website.
Other references are plain text.
The one-page resume remains available as `resume.pdf`; its links are unchanged.
The root-level `main.pdf` is a legacy copy of the resume.
