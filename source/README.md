# PhD defense deck (HTML) — Spatial Intelligence for Smart Radio Environments

Self-contained reveal.js deck. Works fully offline; no internet connection or installation needed.

## Online version
A public copy without speaker notes is at https://hieutrungle.github.io/phd-defense/ (unlisted from search engines). The repository https://github.com/hieutrungle/phd-defense also holds `speaker_notes.md` and the editable sources (`source/`); GitHub Pages serves only its `docs/` folder, so the notes are not on the website. After editing and running `python build.py`, publish updates with `GITHUB_TOKEN=... python tools/publish_public.py`.

## Presenting
1. Unzip anywhere and open `index.html` in **Google Chrome or Microsoft Edge** (double-click, or drag into the browser). Firefox works; Safari is untested.
2. Press **F** for full screen. Slides are designed at 1280×720 (16:9) and scale to the projector.
3. Press **S** to open the speaker view (current/next slide, notes with timing windows, timer). If the browser blocks the pop-up, allow pop-ups for the file and press S again. Drag the speaker window to the laptop screen and the main window to the projector.
4. Navigation: →/Space next (fragments and animation steps first), ← back, **B** or **.** black screen.
5. **Go to any slide (Q&A):** press **G**, or click the slide number or the small ▦ button in the footer. A box opens with every slide by footer number and title, grouped by part (backups at the end). Type a number (e.g. `47`) or words (e.g. `lower tail`), use ↑/↓, press **Enter** to jump; **Esc** closes. **Esc/O** outside the box still opens the thumbnail overview.

## Animations
- Six slides contain live canvas animations (CSI bottleneck, bisector rule, focal points, flat MARL, hierarchy, PSO). They start when the slide appears and restart when you return to it. Each is labelled "Illustrative": no numbers are invented; result numbers appear only on the result slides.
- Animated slides with steps advance with → like fragments.
- **Controls for questions:** hover the mouse over an animation to show its control bar (it hides while playing so it never covers the drawing; it stays visible while paused): ▶/❚❚ play-pause, a slider to scrub to any moment (flat MARL snaps to control steps, the hierarchy to slots), and the current step/slot. Keyboard on the main window: **K** play/pause, **[** / **]** one step back/forward (0.5 s on the purely visual animations). Scrubbing keeps the slide's highlighted step.
- Recorded simulation videos autoplay (muted, looping) on the beam-focusing slide (geometric, L/T hallways), the flat-MARL result slide, the 2-user HMARL deployment slide and the "Where the energy goes" slide.

## Timing
Main talk: 70 timed slides, 44.25 min in total (Intro 14.75, Learning 15.75, Placement 13.75 min); every note is at most 140 words per minute. Each speaker note begins with its timing window (for example `[0.5 min | 0:45–1:15]`). After the closing slide come 17 backup slides behind a "Backup" divider. The full table is in `speaker_notes.md`.

## Backup
`defense_slides_html_backup.pdf` (separate file) is a static PDF of all 95 slides (animation controls hidden): fragments shown, animations frozen at t = 6 s. The earlier Beamer PDF also remains available as a fallback.

## Editing (optional)
`source/` holds the section sources (`src/sections/*.html`), `build.py` (assembles `index.html`, checks the 40–45 min window and pace, writes `speaker_notes.md`), `structure.json` (slide order and minutes) and the screenshot QA tools (`tools/shoot.js`, needs `npm install` plus a Chrome binary). Rebuild from the package root with `python source/build.py` after copying `source/*` back next to `index.html`; see `source/AUTHORING.md`.
