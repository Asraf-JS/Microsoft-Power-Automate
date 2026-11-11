# Microsoft Power Automate for End Users

Participant resources for Asraf's two-day course, published at https://asraf-js.github.io/Microsoft-Power-Automate/ with a PDF book.

## Shared rules

This course follows the training book kit (Asraf-JS/training-book-kit). Read these before you change anything:

- `COURSE-CONVENTIONS.md`: writing style, repository layout, chapter skeleton, callouts and screenshot names.
- `skills/write-lab-chapter/SKILL.md`: how a lab should read, and the student read-through to run before a pull request for a new or rewritten chapter.
- `BRAND.md`: logo, colours, fonts and design style for the site, the trainer deck and anything visual.
- `skills/interactive-training-animations/SKILL.md`: when a step deserves a **Watch this step** animation.

The rules in this file win over the kit where they differ.

## This course

- Chapters 01 to 10 are cloud flows over two days. 11 and 12 are bonus desktop flow labs (Power Automate for desktop). 13 is extra practice.
- The scenario is a training coordinator. Sample data is `02-prepare-workspace/TrainingRegister.xlsx` (table `tblTraining`) and fictional `example.com` addresses, which can't receive mail.
- `_layouts/default.html` carries the kit's `site/` snippets (lightbox, page nav, side window, expect box, callouts, step animation). Update a snippet in the kit first, then paste the new version here unchanged.
- The light-mode teal (`#027684`) and purple (`#6556CF`) are a little darker than the brand values on purpose, so callout and Download labels pass contrast checks.
- Screenshots: clean captures in `_design/shots/raw/`, red boxes in `_design/shots/annotations.json`, drawn with the kit's `bin/annotate-shots.mjs` from `book/`. Codex capture prompts are in `_design/screenshot-prompt.md`.
- Animations: WebP frames and a `manifest.json` per step in `assets/animations/<id>/`.
- Rebuild the book from `book/` with the kit's `bin/build-book.mjs` whenever chapter text or screenshots change, and commit the PDF with the change.
- Chapter 7's folder is still `07-capstone` and its flow is still `PA - Weekly training capstone`, though the chapter is now called Refine the Weekly Reminders. Keep both, because links and screenshots use them.
