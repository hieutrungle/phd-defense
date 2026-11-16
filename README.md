# Ph.D. defense: Spatial Intelligence for Smart Radio Environments

Hieu T. Le, Texas A&M University, December 2026.

Open the presentation: **https://hieutrungle.github.io/phd-defense/**

- Arrow keys or Space: next / previous slide
- **G**: go to any slide (type a number or words)
- **F**: full screen, **Esc**: slide overview
- Animations: hover to show play/pause and a step slider; **K** play/pause, **[** / **]** step

Best viewed in Chrome or Edge. The site is fully static (reveal.js); no data is collected.

## What is in this repository

| Path | Contents |
|---|---|
| [`speaker_notes.md`](speaker_notes.md) | Timing table and full speaker notes for every slide (repository only; not on the website) |
| [`docs/`](docs/) | The website itself (speaker notes removed); GitHub Pages serves this folder |
| [`source/`](source/) | Editable sources: slide sections (`src/sections/*.html`), `build.py`, styles and animations (`assets/css`, `assets/js`), QA and publishing scripts (`tools/`), change log (`CHANGES.md`) |

## Rebuilding

```bash
cp -r source work && cp -r docs/assets/img work/assets/ && cp -r docs/media docs/vendor work/
cd work && python build.py          # writes index.html and speaker_notes.md (checks the 40-45 min window and <= 140 wpm)
```

Open `work/index.html` in Chrome; press **S** for the speaker view with notes and timer.
