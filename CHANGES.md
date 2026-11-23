# Defense deck: Beamer → HTML (reveal.js), changes from the professor's feedback

Old Beamer deck: 52 timed slides, 45:00. New HTML deck: **70 timed slides, 44:15** (target 40–45 min), plus 7 part dividers, a backup divider and 17 backup slides (95 sections in total). All speaker notes are at most 140 wpm.

## Feedback items and what was done
| Request | Done |
|---|---|
| Split old slides 17 + 18 (L and T results) | Four slides: `L-gain`, `L-rssi`, `T-gain`, `T-rssi`, each with one figure |
| Split old slide 25 (robustness) | Three slides: `rob-users`, `rob-size`, `rob-noise` |
| Split old slide 36 (operating regime) | `aperture` (2.2× tiles → ~1.3 dB) and `localization` |
| Split old slide 43 (baselines and convergence) | `methods-protocol` and `convergence` |
| Split old slide 45 (one fewer AP) | `fewer-ap-office` and `fewer-ap-hrbb` |
| 40–45 min talk | 44.0 min: Intro and motivation 8.75, foundations 7.25, learning 15.75, placement and close 12.25 min |
| Enough time on foundations | 7.25 min for hardware, bisector rule, focal points, testbed and the geometric results (old deck: 7 slides) |
| Two FORMULA3 / VINES intro slides | `formula3` (sponsored research + NSF–Research Council of Finland VINES award, five universities, Oct 2026–Sep 2029, NSF 2549087/2549088) and `formula3-map` (how each research question feeds thrusts T1–T4) |
| Animations, in a different format (like the VINES site) | Six deterministic HTML5-canvas animations, each labelled "Illustrative" with no invented numbers: CSI bottleneck (`anim-csi`), bisector rule (`anim-bisector`), focal-point abstraction (`anim-focal`), flat MARL with fixed columns (`anim-marl`), two-timescale hierarchy (`anim-hmarl`), PSO swarm then gradient refinement (`anim-pso`). Recorded simulation videos play in the main talk on `marl-result` (flat MARL, L-shaped hallway) and `energy-maps` (HMARL, 4 users); the 28 GHz beam-focusing videos and the 2-user HMARL video are on backup slides. |
| New lab logo | Texas Wireless 2026 logo in every footer and on the title slide; the old logo has been removed |

## Other changes
- Conventions kept from the Beamer deck: no chapter numbers, no hyperparameter values on main slides, centered takeaways, Answered/Opens transition boxes, and the qualifiers (seed mean, margins 2.1/0.7 dB, "illustrative").
- Two-column alignment: a deck-wide rule stretches a text column (or a box) to match the height of the column beside it, so both columns start and end at the same height.
- QA: 93/93 slides render with 0 console errors and 0 overflow, the key numbers were checked against the dissertation, no external URLs are used (works offline), and the backup videos play.

## Revision 5 (advisor Dr. Ekin and co-chair Dr. Tao)
| Slide | Change |
|---|---|
| 6 | Now only "Sponsored research": DOE Early Career Research Program (DE-SC0023957) and NSF (Grant No. 2549088), with logos; 0.25 min |
| 66–67 | FORMULA3 moved to the conclusion, right before Publications, so the talk closes on it: new "What comes next: the FORMULA3 project" (0.75 min) followed by "How this dissertation feeds into FORMULA3"; five-questions note now opens "To sum up" |
| 1 (title) | Committee as labelled rows: Chair: Prof. Sabit Ekin · Co-chair: Prof. Jian Tao · Committee board: Prof. Erchin Serpedin / Prof. Arya Menon; "Texas A&M University" on its own line under the department |
| Main talk shortened (71 → 63 slides) | Removed "Three gaps this work addresses" (old 13; covered by the goal and research-questions slide). Moved to backup, unchanged: Research and technical innovation (old 5), L- and T-shaped hallway RSSI at nine locations (old 21, 23), Flexible across user counts with 2 users (old 46), Operating regime: aperture and localization (old 47, 48), Where the gain goes: the lower tail (old 59). No slides merged. Notes 44.75 → 40.75 min; backups 17 → 24 |
| 13 (Hardware: LFR arrays) | Removed the 4th bullet "Learning and placement studies: 7 × 9 = 63 hexagonal tiles; servo range ±30°" and the matching sentence in the speaker note |
| 21 (Focal-point abstraction; was 15) | Moved from Foundations to the start of part 4 (Multi-Agent RL Control), right before MA-MDP, where segments and several users are introduced. Note opening now "Learned control and placement build on one abstraction." Testbed slide: tile angles set "from the target positions" (was "from the focal points"); Foundations divider question now "What hardware, and what does geometry alone achieve?" Slides 15–20 move up by one |
| 15 (Ray-traced testbed) | Removed the 4th bullet "28 GHz (geometry), 60 GHz (learned control), 5.18 GHz (placement): … not compared across parts" and the takeaway "All results are ray-traced simulation results; no hardware deployment is reported", plus the matching second paragraph of the speaker note |
| 20 (Limits of the geometric rule) | Removed the "2. Phase" box; "One static user" is now box 2 and the two boxes share the width. Speaker note: "two limits", phase paragraph removed, "Second, it serves one user…" |
| 24 (Training with MAPPO under CTDE) | Right box: new first bullet "MAPPO: multi-agent proximal policy optimization"; CTDE bullet now "CTDE (centralized training with decentralized execution) mitigates non-stationarity: …". Note names MAPPO in full; two short phrases trimmed so the note stays within 140 wpm |
| 30 (Robustness: user-position noise) | Figure replaced: the training-reward curves under noise are now the deployment evaluation (RSSI over the 300-step trace for no noise and 0.1/0.3/0.5/1.0 m; dissertation Figure pos_noise_eval), which shows the numbers on the slide (−68.14 vs. −67.60 dBm at 0.3 m; −72.16/−72.22 at 0.5/1.0 m). Caption and note updated |
| Speaker notes (all math) | The notes file showed every LaTeX expression as a bare "x". All 23 expressions in the notes are now spoken text with values: e.g. "from 126 angles for 63 tiles to 9 coordinates for three segments", "K to the power L … 27 in this three-user hallway / 256 with four users and four segments", "every T slots, ten in the experiments", and "minus 72.46 dBm" for every number. build.py now converts any remaining math to readable text instead of "x" (e.g. titles "every T slots", "T=10"). MA-MDP, flat-MARL-limit and fixed-to-learned notes trimmed slightly to stay within 140 wpm; slide timings unchanged |
| 37 (Setup: conference room and six controllers) | Speaker note rewritten: wireless setup mostly as in the flat study (60 GHz, 5 dBm AP, 63-tile arrays, ±30° servos); what changes is a larger conference room with the AP outside and two corner arrays of two segments each; each of the six controllers named in one line (HMARL-C, HMARL-NC, Compat-only, Static-MARL, Centralized, Random). Slide time 0.5 → 1.0 min (talk 40.75 → 41.25 min); slide content unchanged |
| 67 (new: FORMULA3 device) | New slide after "What comes next: the FORMULA3 project": photos of the mechanical reflector array prototype that FORMULA3 will use (front: 19 hexagonal tiles on servos with the controller box; back: wiring and rolling stand), a short description and a takeaway linking the simulated arrays to real-room tests. Back photo cropped to the device so no bystanders appear; images re-encoded without metadata. 0.5 min: talk now 71 timed slides, 44.75 min; later slides shift by one (publications 69, other publications 70, thank you 71) |
| All slides (navigation, advisor request) | Light left/right edge arrows (prev/next, including animation steps) and a contents tab (☰›) that opens a left contents bar: parts and slides with the current slide highlighted, a search box (number or words; ↑/↓, Enter, Esc), click to jump. Arrows and tab fade out after 2.5 s without mouse movement; the bar closes on mouse-leave, after a jump, or with Esc. Hidden in the backup PDF and screenshots; slides and timing unchanged |
| All slides (screen scaling) | Edge arrows, contents tab and bar, the footer (name, title, slide number, logos) and the G slide-search box now scale with the slide, so they keep the same size relative to the slide on any screen (checked at 1280×720, 1440×900, 1920×1080, 2560×1440, 3840×2160). Unchanged at 1280×720, so the backup PDF is unaffected |
| All slides (full-screen button, advisor request) | Round ⛶ button in the bottom-right corner, right of the footer logo: enters/exits full screen (same as F; the arrows and contents bar stay available in full screen), icon and tooltip switch, scales with the screen, fades with the other controls; hidden where the browser has no full-screen API, in screenshots and in the PDF |
| All slides (slide overview button; footer) | New round ▦ button left of ⛶ in the bottom-right corner: opens/closes the slide overview (thumbnails of every slide, click one to jump; same as Esc/O), solid maroon while the overview is open. The footer "Go to slide" ▦ button is removed and the slide number is no longer clickable (the contents bar replaces them; G still opens the search box). Footer logo and slide number moved 34 units left to free the corner; the footer rule is unchanged |
| Slide overview (scrubber) | In the overview, a horizontal slider below the thumbnails scrolls through all 95 slides (one step per slide) with the current slide number and title above it; part ticks 1–7 and B jump to each section; mouse wheel and trackpad swipe also scroll. Scales with the screen; only shown in the overview, so slides and PDF are unchanged |
| Section openings (Foundations, Multi-Agent RL Control, Hierarchical Multi-Agent RL, Joint AP and Reflector Placement) | Small "Based on" block with the associated papers in IEEE style above the WHY/WHAT/HOW/WHERE/WHICH strip: VTC2024-Fall; Signal Whisperers (TMLCN) + Bypassing the CSI bottleneck (ICC 2027); Learning to Reflect (TMLCN, under review) + Learning to Focus (GLOBECOM 2026); Can a passive reflector replace an AP? (OJ-COMS). No new slides; timing unchanged |
| 2 (outline) | Outline items in title case (e.g., "Motivation and Objectives", "Learning-Based Control with Multi-Agent RL"); backup divider now "Backup Slides" |
| 3 (about me) | Committee honorifics changed to "Prof. Sabit Ekin" and "Prof. Jian Tao" (list and speaker notes) |
| 6 (sponsored research) | NSF box now "Grant Nos. 2549088 and 2535873" (2535873 was missing); DOE line now "Office of Science, Office of Advanced Scientific Computing Research (ASCR)", matching the official acknowledgment; speaker note updated |
| 70 (thank you) | Funding line spells out the agencies: "U.S. Department of Energy (DOE), Office of Science, ASCR Early Career Research Program (DE-SC0023957); U.S. National Science Foundation (NSF), Grants 2549088 and 2535873" (2535873 added) |
| 70 (thank you), all notes | Every "Dr." changed to "Prof." for the four committee members (slide 70 list, slide 1 and slide 70 speaker notes) |
| 70 (thank you) | Collaborator line now "Dr. Mostafa Ibrahim and Oguz Bedir" (the only "Dr." in the deck) |
| 66 (FORMULA3) | Award line now "U.S. National Science Foundation (NSF) Award Nos. 2549087, 2549088" |
| 3, 70 | "Advisor (Chair)" replaced by Chair / Co-Chair throughout (About me, its note, Thank you), matching the title slide and the dissertation title page |
| 8 (was 9) | Black rule removed from the top of the frequency-vs-coverage chart (cropped copy `freq_coverage_noline.png`) |
| 10 (CSI bottleneck) + old 11 (Electronic RIS vs. metallic reflector arrays) | Combined: the old slide 11 moved to backup unchanged except its takeaway, which is now on slide 10 ("The burden shifts from channel estimation to localization (run time) and the site model (planning)."). Slide 10 speaker note = its own two paragraphs followed by the two paragraphs of the old slide 11 note, unchanged; slide 10 now 1.5 min (0.75 + 0.75), so the total stays 42.00 min. The backup copy has a one-line note. Main talk 63 → 62 slides; footer numbers after 10 shift down by one in the main talk |
| Repository | Removed a `node_modules` symlink that an earlier commit (6697dc5) had added by mistake; `.gitignore` now ignores `node_modules` whether it is a folder or a link |
| 42 (Can a passive reflector replace an access point?) | Second bullet now just "Same tile array and focal-point steering" (band-independence and 5.18 GHz Wi-Fi text removed). Last bullet replaced by two short ones: "New question: where to place the hardware, APs and reflector" and "New objective: lower-tail priority coverage" (PRS definition, configured-once and solved-once text removed). Speaker note: "In this study the carrier is 5.18 gigahertz" removed; now "The tile settings stay fixed after installation." |
| 44 (Design vector: AP poses, wall position, focal points) | Right-column bullets reworded in plain language: "Each AP: position on the ceiling (3.8 m) and pointing direction"; "Reflector position: can move along a preselected wall" (replaces the centroid (u, v) in [0,1]^2 on the mounting region); "Reflector control: 2 focal points (6 coordinates instead of 126 tile angles)"; "Constraints: inside the floorplan, APs at least 5 m apart, tile angles within ±30°". Figure, bisector box, design-vector formula and speaker note unchanged |

Footer numbers 7–65 moved down by one (the second FORMULA3 slide left the introduction).

## Revision 2 (your review of the HTML deck; slide numbers are footer numbers)
| Slide | Fix |
|---|---|
| 6 FORMULA3 | `vines-formula3.github.io` is now a clickable link (opens in a new tab) |
| 15 Hardware | Both images sit in equal boxes, centered, with one-line captions |
| 21, 23 L/T RSSI | Right-hand text is compact and vertically centered (no large gaps) |
| 26 Flat MARL animation | Users move first (steps 1, 5, 9, …); agents then observe the new positions and step the focal points toward them (≤ δmax per step); the focal points start on their users. The "reflector" label now sits in the corner wedge behind the array, along its edge, clear of the right panel |
| 27 MAPPO | Each loss term's math fits on one line; the gray explanation sits directly below it |
| 28 Setup | Table and figure are vertically centered on each other |
| 31, 32, 45, 46 | Right panels keep their text compact and centered (no spreading) |
| 63 Publications | Status text ("submitted", "under review") is no longer highlighted; **H. Le** is bold, maroon and underlined in every entry |
| 64 Other publications | Back in the main talk after slide 63 (0.5 min, own notes); name highlighted in all 8 entries; the backup copy was removed |
| All animations | Play/pause button and timeline slider (step/slot labels for the MARL animations); hidden while playing, shown on hover or when paused; keys K, [ and ] |
| Column rule | A text column spreads to match its neighbor only when the gaps stay small (≤ 26 px per item); otherwise it stays compact and centered. Boxes still stretch to full height |

## Revision 3 (backup review, slide picker; slide numbers refer to your earlier numbering)
| Item | Decision |
|---|---|
| Old 65, beam-focusing videos | **Moved into the geometric results** as "Beam-focusing follows the UE" (after the T-shaped RSSI slide, 0.5 min), with a short panel; the core visualization of the foundation |
| Old 70, HMARL two-user trace | **Moved into the HMARL results** as "Deployment with moving users (2 users)", right after the 4-user deployment (0.5 min): same ordering, +1.14 dB vs. Compat-only, +2.59 dB vs. Centralized |
| Old 82, Office RSSI CDFs | **Brought back** as "Where the gain goes: the lower tail" after the 3-AP table (0.5 min). It is the only distribution-level evidence for a claim the main talk makes twice (gain concentrated at the weakest locations; minimum +9.5 dB). Numbers checked against the dissertation (≤2% vs. ~3% below −65 dBm; minimum ~−74.5 → ~−65 dBm; median ~1 dB lower) |
| HMARL per-user vs. aggregate power | Kept in backup (genuine insight, per-user −2.5 dB but aggregate higher at 4 users; no main claim depends on it). Next candidate if time allows (+0.5 min) |
| Placement stats table, PSO vs. GA ablation, AP-count scaling, HRBB all-region P5, four-method maps | Kept in backup: their key numbers are already on main slides (3-AP table, convergence, one-fewer-AP slides, coverage maps) |
| Tile grouping / reward normalization | Kept in backup: the grouping result (−67.60 dBm both) is already stated on "Why flat MARL is not enough" |
| Reward sensitivity, focal-space count, slot meaning, model approximations, P.2040, 3D bisector, parameter tables | Kept in backup: reference material for questions, not reinforcement of a main claim |
| Other publications | 0.5 → 0.25 min (shorter note), to absorb the added slides |
| Slide picker | **G** (or click the footer number / ▦ button) opens a searchable box of all slides by footer number and title, grouped by part; type a number or words, ↑/↓, Enter jumps, Esc closes |

## Revision 4
| Slide | Change |
|---|---|
| 8 (mmWave) | Split into two slides, one figure each: 8 "Growing demand points to mmWave bandwidth" (spectrum chart) and 9 "More bandwidth at mmWave, but less coverage" (frequency vs. coverage chart), 0.5 min each, each with its own image credit; later footer numbers shift by one |
| 29 (MAPPO) | Diagram and panel moved up; larger objective box: total objective, then three sub-columns (Clipped surrogate, Value loss, Entropy), each with title, full equation (L^CLIP from the dissertation: E_t[min(ρ Adv, clip(ρ,1−ε,1+ε) Adv)]) and a short supporting line; columns sized to their equations with 148 px spare width (checked at 1280×720, 1366×768, 1920×1080); note explains the clipped surrogate; sub-column titles and equations centered, supporting lines left-aligned, spare width shared evenly (≈23 px clearance per equation) |
| 39 (hierarchy animation) | Users: seeded random walk, small random steps (0.9–7.7 px per slot, mean 3.4 px), users move first in each slot. Focal points: step limit δmax = 122 px per axis (the longest per-axis distance in the user area, 364 px, divided by 3), so any target is reached within 3 slots (measured: ≤2 slots after every reallocation). Inner side walls y = 290–446 (shortened from the original 196–446, slightly longer than the previous 330–446). The stand-in allocator never assigns a wall-blocked segment→user path; rays that hit a wall stop with a red ✕ "blocked"; seed 207: 6 reallocations, two short blockages (slot 39; slots 58–59, seg 3 → user 2), each removed by the next allocation, labelled "seg 3 was blocked". `seg 1`–`seg 4` labels outside the outer walls |
| 46 ↔ 47 | Swapped so the 4-user slides (44 deployment, 45 energy maps, 46 reallocation interval, retitled with "(4 users)") come first, then the 2-user slides (47 flexible across user counts, 48 aperture, 49 localization) |
| 45 ↔ 46 | Swapped: "Where the energy goes (4 users)" now follows the 4-user deployment directly; the 2-user slide comes after it, retitled "Flexible across user counts: the same ranking with 2 users" with the line "Same hierarchical architecture and training, configured for 2 users (16 possible assignments instead of 256)"; note reworded (the 2- and 4-user configurations are trained separately, so the claim is about the approach, not one transferred policy) |
| 40 (HMA-MDP) | Vertical spacing matched to slide 41 (content 199–547 px: 125 px below the title rule, 121 px above the footer); the two boxes are top-aligned with equal height and equal title-bar height (the column rule had vertically centered the shorter box; it now stretches a box column instead) |

## Slide plan (timed slides)
| id | title | min | window | old Beamer footer # |
|---|---|---|---|---|
| title | Title | 0.5 | 0:00–0:30 | 1 |
| outline | Outline | 0.25 | 0:30–0:45 | 2 |
| aboutme | About me | 0.5 | 0:45–1:15 | 3 |
| experience | Professional experience (Uber MLE 2027) | 0.5 | 1:15–1:45 | 4 |
| threads | Research and technical innovation | 0.5 | 1:45–2:15 | 5 |
| sponsors | Sponsored research | 0.25 | 2:15–2:30 | 6 (split) |
| mmwave | Growing demand points to mmWave bandwidth | 0.5 | 2:30–3:00 | 7 (split) |
| mmwave-coverage | More bandwidth at mmWave, but less coverage | 0.5 | 3:00–3:30 | 7 (split) |
| applications | Target applications | 0.5 | 3:30–4:00 | 8 |
| blocked | Indoor mmWave links are blocked by structure | 0.5 | 4:00–4:30 | 9 |
| anim-csi | NEW ANIMATION A1: the CSI bottleneck (pilot overhead vs elements x users) vs position-based control | 0.75 | 4:30–5:15 | new |
| ris-vs-mra | Electronic RIS vs metallic reflector arrays | 0.75 | 5:15–6:00 | 10 |
| gaps | Three gaps this work addresses | 0.5 | 6:00–6:30 | 11 |
| goal-map | Dissertation goal and research questions (overview map, questions) | 1.0 | 6:30–7:30 | 12 |
| hardware | Hardware: metallic LFR arrays | 0.75 | 7:30–8:15 | 13 |
| anim-bisector | NEW ANIMATION A2a: bisector rule - tiles rotate as the user (focal point) moves; reflected rays converge | 1.0 | 8:15–9:15 | 14 |
| anim-focal | NEW ANIMATION A2b: focal-point abstraction - many tile angles collapse to 3 coordinates per segment | 0.75 | 9:15–10:00 | 14 |
| testbed | Ray-traced testbed | 0.5 | 10:00–10:30 | 15 |
| geo-setup | Geometric beam-focusing in NLOS hallways at 28 GHz (setup) | 0.5 | 10:30–11:00 | 16 |
| L-gain | SPLIT 17/18 -> L-shaped: path-gain maps + numbers | 0.75 | 11:00–11:45 | 17 |
| L-rssi | SPLIT 17/18 -> L-shaped: RSSI at UE locations | 0.5 | 11:45–12:15 | 18 |
| T-gain | SPLIT 17/18 -> T-shaped: path-gain maps + numbers | 0.75 | 12:15–13:00 | 17 |
| T-rssi | SPLIT 17/18 -> T-shaped: RSSI at UE locations | 0.5 | 13:00–13:30 | 18 |
| geo-videos | Beam-focusing follows the UE: L- and T-shaped hallways | 0.5 | 13:30–14:00 | backup (beam-focusing videos) |
| geo-limits | Limits of the geometric rule (transition WHAT -> HOW) | 0.75 | 14:00–14:45 | 19 |
| mamdp | MA-MDP | 1.25 | 14:45–16:00 | 20 |
| anim-marl | NEW ANIMATION A3: segment agents with fixed column assignment track moving users | 0.75 | 16:00–16:45 | new |
| mappo | Training with MAPPO under CTDE | 0.75 | 16:45–17:30 | 21 |
| marl-setup | Setup: 60 GHz L-shaped hallway | 0.5 | 17:30–18:00 | 22 |
| marl-training | Multi-agent decomposition trains faster and higher | 0.5 | 18:00–18:30 | 23 |
| marl-result | Multi-agent focusing: +20.7 dB (RSSI-map average) | 1.25 | 18:30–19:45 | 24 |
| rob-users | SPLIT 25 -> robustness: user count | 0.5 | 19:45–20:15 | 25 |
| rob-size | SPLIT 25 -> robustness: array size | 0.5 | 20:15–20:45 | 25 |
| rob-noise | SPLIT 25 -> robustness: position noise | 0.5 | 20:45–21:15 | 25 |
| flat-limit | Why flat MARL is not enough (transition HOW -> HOW) | 0.75 | 21:15–22:00 | 26 |
| fixed-to-learned | From fixed assignment to learned allocation | 0.5 | 22:00–22:30 | 27 |
| hierarchy | Two-timescale hierarchy | 0.75 | 22:30–23:15 | 28 |
| anim-hmarl | NEW ANIMATION A4: allocator reassigns segments every T slots; focal points track every slot; users cross | 0.75 | 23:15–24:00 | new |
| hmamdp | HMA-MDP | 0.75 | 24:00–24:45 | 29 |
| hmarl-train-method | Training under CTDE with geometric warm start | 0.5 | 24:45–25:15 | 30 |
| hmarl-setup | Setup: conference room, six controllers | 0.5 | 25:15–25:45 | 31 |
| hmarl-training | Training curves | 0.5 | 25:45–26:15 | 32 |
| hmarl-deploy | Deployment with moving users (4 users) | 1.25 | 26:15–27:30 | 33 |
| energy-maps | Where the energy goes (4 users) + video | 0.5 | 27:30–28:00 | 34 |
| realloc-T | How often to reallocate? T = 10 (4 users) | 0.5 | 28:00–28:30 | 35 |
| hmarl-deploy-2ue | Flexible across user counts: the same ranking with 2 users | 0.5 | 28:30–29:00 | backup (HMARL 2-user trace) |
| aperture | SPLIT 36 -> aperture | 0.5 | 29:00–29:30 | 36 |
| localization | SPLIT 36 -> localization | 0.5 | 29:30–30:00 | 36 |
| alloc-buys | What allocation buys (transition HOW -> WHERE) | 0.5 | 30:00–30:30 | 37 |
| replace-ap | Can a passive reflector replace an AP? | 0.75 | 30:30–31:15 | 38 |
| floorplans | Two floorplans with priority maps | 0.5 | 31:15–31:45 | 39 |
| design-vector | Design vector | 0.75 | 31:45–32:30 | 40 |
| objective | Objective | 0.5 | 32:30–33:00 | 41 |
| two-phase | Two-phase method: PSO then gradient refinement | 0.75 | 33:00–33:45 | 42 |
| anim-pso | NEW ANIMATION A5: PSO particles converge, then gradient refinement; coverage map updates | 0.75 | 33:45–34:30 | new |
| methods-protocol | SPLIT 43 -> compared methods and evaluation protocol | 0.5 | 34:30–35:00 | 43 |
| convergence | SPLIT 43 -> results: two figures + interpretations | 0.75 | 35:00–35:45 | 43 |
| p5-3aps | At three APs, P5 +4.8 dB | 1.25 | 35:45–37:00 | 44 |
| place-cdf | Where the gain goes: the lower tail (Office, 3 APs) | 0.5 | 37:00–37:30 | backup (Office CDFs) |
| fewer-ap-office | SPLIT 45 -> one fewer AP: Office | 0.5 | 37:30–38:00 | 45 |
| fewer-ap-hrbb | SPLIT 45 -> one fewer AP: HRBB | 0.5 | 38:00–38:30 | 45 |
| coverage-limits | Coverage maps and limitations (transition WHERE -> WHICH) | 0.75 | 38:30–39:15 | 46 |
| complete-picture | The complete picture (overview map, results) | 0.75 | 39:15–40:00 | 47 |
| limits-next | Limitations and next steps | 0.5 | 40:00–40:30 | 48 |
| five-questions | Five questions, answered | 1.25 | 40:30–41:45 | 49 |
| formula3 | What comes next: the FORMULA3 project | 0.75 | 41:45–42:30 | 6 (split; moved to conclusions) |
| formula3-map | NEW: How this dissertation feeds FORMULA3 | 0.75 | 42:30–43:15 | new |
| publications | Publications from this dissertation (+ other pubs line) | 0.5 | 43:15–43:45 | 50 |
| other-pubs | Other publications during the Ph.D. | 0.25 | 43:45–44:00 | 51 |
| thanks | Thank you / Questions | 0.25 | 44:00–44:15 | 52 |
