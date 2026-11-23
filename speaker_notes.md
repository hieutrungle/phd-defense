# Speaker notes and timing

Total: 41.25 min, 63 timed slides (window 40-45 min, pace <= 140 wpm).

| # | slide | min | window | words | wpm |
|---|---|---|---|---|---|
| 1 | title | 0.5 | 0:00-0:30 | 48 | 96 |
| 2 | Outline | 0.25 | 0:30-0:45 | 30 | 120 |
| 3 | About me | 0.5 | 0:45-1:15 | 64 | 128 |
| 4 | Professional experience | 0.5 | 1:15-1:45 | 67 | 134 |
| 5 | Sponsored research | 0.25 | 1:45-2:00 | 27 | 108 |
| 6 | Growing demand points to mmWave bandwidth | 0.5 | 2:00-2:30 | 38 | 76 |
| 7 | More bandwidth at mmWave, but less coverage | 0.5 | 2:30-3:00 | 43 | 86 |
| 8 | Target applications: dense, shielded indoor environments | 0.5 | 3:00-3:30 | 56 | 112 |
| 9 | Indoor mmWave links are blocked by structure | 0.5 | 3:30-4:00 | 64 | 128 |
| 10 | The CSI bottleneck: pilots grow with elements × users | 0.75 | 4:00-4:45 | 97 | 129 |
| 11 | Electronic RIS vs. metallic reflector arrays | 0.75 | 4:45-5:30 | 87 | 116 |
| 12 | Dissertation goal and research questions | 1 | 5:30-6:30 | 101 | 101 |
| 13 | Hardware: metallic linear Fresnel reflector (LFR) arrays | 0.75 | 6:30-7:15 | 72 | 96 |
| 14 | Bisector rule: each tile normal splits AP and user directions | 1 | 7:15-8:15 | 135 | 135 |
| 15 | Ray-traced testbed: Blender scenes + NVIDIA Sionna RT | 0.5 | 8:15-8:45 | 24 | 48 |
| 16 | Geometric beam-focusing in NLOS hallways at 28 GHz | 0.5 | 8:45-9:15 | 57 | 114 |
| 17 | L-shaped hallway: beam-focusing +53.0 dB path gain at the UE | 0.75 | 9:15-10:00 | 83 | 111 |
| 18 | T-shaped hallway: beam-focusing +87.5 dB path gain at the UE | 0.75 | 10:00-10:45 | 69 | 92 |
| 19 | Beam-focusing follows the UE: L- and T-shaped hallways | 0.5 | 10:45-11:15 | 66 | 132 |
| 20 | Limits of the geometric rule motivate learned control | 0.75 | 11:15-12:00 | 67 | 89 |
| 21 | Focal-point abstraction: a segment is steered by 3 coordinates | 0.75 | 12:00-12:45 | 96 | 128 |
| 22 | MA-MDP: each agent moves the focal point of one segment | 1.25 | 12:45-14:00 | 172 | 138 |
| 23 | Flat MARL in motion: fixed columns, moving focal points | 0.75 | 14:00-14:45 | 94 | 125 |
| 24 | Training with MAPPO under CTDE | 0.75 | 14:45-15:30 | 99 | 132 |
| 25 | Setup: 60 GHz L-shaped hallway with three users | 0.5 | 15:30-16:00 | 58 | 116 |
| 26 | Multi-agent decomposition trains faster and higher | 0.5 | 16:00-16:30 | 57 | 114 |
| 27 | Multi-agent focusing: +20.7 dB over a static flat reflector | 1.25 | 16:30-17:45 | 155 | 124 |
| 28 | Robustness: user count | 0.5 | 17:45-18:15 | 61 | 122 |
| 29 | Robustness: array size | 0.5 | 18:15-18:45 | 45 | 90 |
| 30 | Robustness: user-position noise | 0.5 | 18:45-19:15 | 59 | 118 |
| 31 | Why flat MARL is not enough: a fixed tile-to-user assignment | 0.75 | 19:15-20:00 | 102 | 136 |
| 32 | From fixed assignment to learned allocation | 0.5 | 20:00-20:30 | 61 | 122 |
| 33 | Two-timescale hierarchy: slow allocation, fast focusing | 0.75 | 20:30-21:15 | 105 | 140 |
| 34 | The hierarchy in motion: reassign every T slots, refocus every slot | 0.75 | 21:15-22:00 | 86 | 115 |
| 35 | HMA-MDP: one objective, a reward for each timescale | 0.75 | 22:00-22:45 | 103 | 137 |
| 36 | Training under CTDE, with a geometric warm start | 0.5 | 22:45-23:15 | 59 | 118 |
| 37 | Setup: ray-traced conference room and six controllers | 1 | 23:15-24:15 | 140 | 140 |
| 38 | Training: the warm-started allocator converges highest | 0.5 | 24:15-24:45 | 66 | 132 |
| 39 | Deployment with moving users (4 users) | 1.25 | 24:45-26:00 | 158 | 126 |
| 40 | Where the energy goes (4 users) | 0.5 | 26:00-26:30 | 63 | 126 |
| 41 | How often to reallocate? An interior optimum at T=10 slots (4 users) | 0.5 | 26:30-27:00 | 64 | 128 |
| 42 | What allocation buys, and what it cannot fix | 0.5 | 27:00-27:30 | 62 | 124 |
| 43 | Can a passive reflector replace an access point? | 0.75 | 27:30-28:15 | 102 | 136 |
| 44 | Two floorplans with operator-defined priority maps | 0.5 | 28:15-28:45 | 64 | 128 |
| 45 | Design vector: AP poses, wall position, focal points | 0.75 | 28:45-29:30 | 104 | 139 |
| 46 | Objective: soft worst case plus floor-wide coverage | 0.5 | 29:30-30:00 | 60 | 120 |
| 47 | Two-phase method: PSO search, then gradient refinement | 0.75 | 30:00-30:45 | 101 | 135 |
| 48 | Intuition: a swarm of layouts, then gradient refinement | 0.75 | 30:45-31:30 | 90 | 120 |
| 49 | Compared methods and evaluation protocol | 0.5 | 31:30-32:00 | 60 | 120 |
| 50 | Convergence of a representative run | 0.75 | 32:00-32:45 | 74 | 99 |
| 51 | At three APs, the reflector raises priority P5 by 4.8 dB | 1.25 | 32:45-34:00 | 151 | 121 |
| 52 | Office: with the reflector, one fewer AP meets the target (seed mean) | 0.5 | 34:00-34:30 | 65 | 130 |
| 53 | HRBB: the same one-AP shift, with a smaller margin | 0.5 | 34:30-35:00 | 60 | 120 |
| 54 | Coverage maps and limitations | 0.75 | 35:00-35:45 | 92 | 123 |
| 55 | The complete picture | 0.75 | 35:45-36:30 | 95 | 127 |
| 56 | Limitations and next steps | 0.5 | 36:30-37:00 | 51 | 102 |
| 57 | Five questions, answered | 1.25 | 37:00-38:15 | 158 | 126 |
| 58 | What comes next: the FORMULA3 project | 0.75 | 38:15-39:00 | 71 | 95 |
| 59 | The device FORMULA3 will use: a mechanical reflector array | 0.5 | 39:00-39:30 | 52 | 104 |
| 60 | How this dissertation feeds into FORMULA3 | 0.75 | 39:30-40:15 | 89 | 119 |
| 61 | Publications from this dissertation | 0.5 | 40:15-40:45 | 67 | 134 |
| 62 | Other publications during the Ph.D. | 0.25 | 40:45-41:00 | 27 | 108 |
| 63 | Thank you | 0.25 | 41:00-41:15 | 24 | 96 |

## 1. title  [0.5 min | 0:00-0:30]

Good morning. Thank you to my committee chair, Prof. Ekin, my co-chair, Prof. Tao, and the committee members for being here. This talk is about how mechanically reconfigurable metallic reflectors can be controlled and placed from spatial information, meaning positions and a site model, without pilot-based channel estimation.

## 2. Outline  [0.25 min | 0:30-0:45]

Seven parts. After the introduction, they answer five questions: why this approach, what geometry gives, how to steer the array, where to install it, and which method fits which problem.

## 3. About me  [0.5 min | 0:45-1:15]

I am a Ph.D. candidate in Electrical Engineering at Texas A&M, with Prof. Sabit Ekin as committee chair and Prof. Jian Tao as co-chair. My research is on smart radio environments: I control and place mechanically reconfigurable metallic reflectors from spatial information, positions and a site model, rather than pilot-based channel estimation. It sits where machine learning, reinforcement learning, wireless communication and optimization meet.

## 4. Professional experience  [0.5 min | 1:15-1:45]

My professional experience, most recent first. After graduation I will return to Uber as a Machine Learning Engineer, starting in 2027. Since 2021 I have been a research assistant at Texas A&M, where this work was done. This summer I interned at Uber on Rider Pricing and Incentives; in fall 2025 at Qualcomm in San Diego; and in 2024 I worked at the High Performance Computing Center.

## 5. Sponsored research  [0.25 min | 1:45-2:00]

This work was supported in part by the Department of Energy Early Career Research Program, award DE-SC0023957, and by the National Science Foundation, grants 2549088 and 2535873.

## 6. Growing demand points to mmWave bandwidth  [0.5 min | 2:00-2:30]

Each wireless generation carries more demanding applications: augmented reality, autonomous systems, large-scale IoT. Engineers have two levers: more bandwidth, or better signal quality. The large contiguous channels are at millimeter-wave frequencies, where propagation is mostly line of sight.

## 7. More bandwidth at mmWave, but less coverage  [0.5 min | 2:30-3:00]

This chart shows the trade-off: higher frequency, more bandwidth, smaller coverage. The price is higher path loss, weak penetration and frequent blockage. Usually the environment is a fixed channel to compensate for; this dissertation asks what happens if part of it becomes controllable.

## 8. Target applications: dense, shielded indoor environments  [0.5 min | 3:00-3:30]

Three settings motivate this work: data centers, where metal racks block signals; nuclear facilities, where telemetry must work behind shielding; and industrial plants, with robots in cluttered geometry. In all three, structure blocks the direct path, so coverage depends on reaching non-line-of-sight users. The scenes later in the talk are generic indoor geometries with this blockage.

## 9. Indoor mmWave links are blocked by structure  [0.5 min | 3:30-4:00]

The core challenge in one picture: in an L-shaped corridor the corner blocks the direct path, and the user around the corner sits in a dead zone. The usual answer is more access points, more power, or more processing, each adding cost. The first remedy returns in placement. The alternative: a controllable surface at the corner creates a reflected path into the dead zone.

## 10. The CSI bottleneck: pilots grow with elements × users  [0.75 min | 4:00-4:45]

Why avoid channel estimation? On the left is an electronic RIS with N elements serving K users. To configure it, the controller needs the cascaded channel through every element to every user, so pilot time grows with N times K. Watch the bar: the channel stays coherent only for a fixed window. As the surface grows, pilots fill more of it and little time is left for data. On the right, a mechanical reflector array is steered from user positions. Its control input stays small, independent of the number of tiles. This is schematic, not a measurement.

## 11. Electronic RIS vs. metallic reflector arrays  [0.75 min | 4:45-5:30]

The standard controllable surface, the electronic RIS, faces three barriers: unit cells designed for one band; the cascaded channel through every element, which we just saw; and bias power to hold its state. Our alternative is a metallic array of servo-rotated tiles, large compared with the wavelength, so they act as mirrors across bands. At run time the controller uses only user positions; received power serves as the training reward. The tiles draw no power once positioned. The trade-off is slower reconfiguration, which suits quasi-static indoor scenes.

## 12. Dissertation goal and research questions  [1 min | 5:30-6:30]

The thesis, at the top: spatial information, meaning AP and tile positions, user-position estimates and a site model, is enough to configure, control and place these reflectors without pilot-based channel estimation. That is what spatial intelligence means here; the cost moves to localization and site-model accuracy. The numbers give the talk order: what geometry achieves, how to operate the array, then where to install it, because the controllers take the mounting sites as given. The map itself is in system order. The two stages share the focal-point interface. They were studied separately, and coupling them, the dashed arrow, is future work.

## 13. Hardware: metallic linear Fresnel reflector (LFR) arrays  [0.75 min | 6:30-7:15]

The hardware throughout is a metallic linear Fresnel reflector array: a grid of metallic tiles, each rotated in elevation and azimuth. It redirects the wave by ordinary specular reflection, so it needs no RF circuitry. In the top view, each tile is angled so its reflection from the access point lands on the user. The geometric study uses ten by seven square tiles, a 1.4 by 2.0 meter device, with unconstrained rotation.

## 14. Bisector rule: each tile normal splits AP and user directions  [1 min | 7:15-8:15]

How is each tile oriented? This is a top view: the access point on the left, a row of tiles on the wall, and a user walking along the hallway. Call the tile center A, the access point B and the user C. By the law of reflection the tile normal must bisect the unit vectors toward the access point and toward the user. As the user moves, every tile turns, and all reflected rays still converge on the user. First click: the dashed normals, with equal angles on each side. Only positions enter this rule; there is no channel estimate. Second click: real servos have a limited range. When the user walks back toward the access point side, some tiles would need more than 30 degrees. They clip, turn red, and their rays miss.

## 15. Ray-traced testbed: Blender scenes + NVIDIA Sionna RT  [0.5 min | 8:15-8:45]

One automated pipeline: Blender builds the scene and sets the tile angles from the target positions; Sionna RT traces it with ITU-R P.2040 materials.

## 16. Geometric beam-focusing in NLOS hallways at 28 GHz  [0.5 min | 8:45-9:15]

Is the geometric rule alone worth pursuing? A 28 GHz downlink to one user in two concrete hallways, with the ten-by-seven array, known positions and unconstrained rotation. Three cases: no reflector; a simple reflector, every tile at 45 degrees; and beam-focusing with the bisector rule. The T-shaped hallway uses two arrays. Nine non-line-of-sight locations, the green spheres.

## 17. L-shaped hallway: beam-focusing +53.0 dB path gain at the UE  [0.75 min | 9:15-10:00]

The L-shaped hallway first. These are path-gain maps 1.5 meters above the floor: no reflector, simple reflector, beam-focusing. The corner blocks the direct path, and the gain at the user is minus 125.61 dB. The simple reflector adds about 26 dB. Beam-focusing reaches minus 72.57 dB: 53.0 dB above no reflector and 27.0 dB above the simple reflector. The bright band on the right is the tile paths converging at the user, the same picture as the animation, now in the ray tracer.

## 18. T-shaped hallway: beam-focusing +87.5 dB path gain at the UE  [0.75 min | 10:00-10:45]

The T-shaped hallway needs two reflections in sequence, so there are two arrays and the bisector rule is applied twice. Without reflectors the gain at the user is minus 156.35 dB. Simple reflectors reach minus 109.20. Beam-focusing with both arrays reaches minus 68.88 dB, an 87.5 dB improvement over no reflector and 40.3 dB above the simple reflectors. The focused band turns twice and lands in the side branch.

## 19. Beam-focusing follows the UE: L- and T-shaped hallways  [0.5 min | 10:45-11:15]

Here is the geometric rule in motion. At every user position along the hallway, the bisector rule recomputes all tile orientations, and the ray-traced path-gain map shows the focused band following the user: around one corner in the L-shaped hallway, and through two reflections into the side branch in the T-shaped hallway. Each frame is still a static solution for one user at a known position.

## 20. Limits of the geometric rule motivate learned control  [0.75 min | 11:15-12:00]

The study also exposes two limits. First, servo limits: the rule assumes unconstrained rotation, as the red tiles in the animation showed. Second, it serves one user at a known position. The next part keeps the bisector rule but learns the focal points, within servo limits, trained on received power, for several moving users. Its baselines are static reflectors and learned variants, not a position-tracking geometric rule.

## 21. Focal-point abstraction: a segment is steered by 3 coordinates  [0.75 min | 12:00-12:45]

Learned control and placement build on one abstraction. Instead of the user position, all tiles of a segment aim at a shared virtual focal point. Here the array has three segments, each with its own focal point. When a focal point moves, all tiles of its segment re-orient together through the bisector rule; the front view shows their tilt. Click: a segment of n tiles is controlled by three coordinates instead of 2n angles. For 63 tiles and three segments that is 126 angles versus nine coordinates. Learned control learns these focal points; placement optimizes them.

## 22. MA-MDP: each agent moves the focal point of one segment  [1.25 min | 12:45-14:00]

Multi-user control becomes a cooperative multi-agent MDP. The array is split into L disjoint segments, three here, and each agent controls one segment's focal point. The global state holds the user positions, the fixed segment centers, and the current focal points. Each agent observes only its own segment: the position of its assigned user, its center, and its focal point. The assigned user is fixed in advance; this matters later. The action is a bounded focal-point displacement, so the tiles move smoothly. All agents share one reward, the mean received power of the users. Power is used only in training, so at run time the agents need positions only. Focal points and tile angles are clipped to their limits, so every action is feasible. This is how learning answers the geometric limits: it acts within servo limits, optimizes received power, and serves several users. The abstraction cuts the control dimension from two angles per tile, 126 angles for 63 tiles, to three coordinates per segment, 9 for three segments: fourteen times fewer.

## 23. Flat MARL in motion: fixed columns, moving focal points  [0.75 min | 14:00-14:45]

Here is the controller in motion. The access point has no direct path to the users; the corner array reflects into the hallway. Each color is one agent. Its columns are fixed: user one always owns columns one, four and seven. When the users move, each agent shifts its focal point toward its user in bounded steps, the dashed box, and the tiles re-orient so the reflected beams follow. Click: the assignment never changes. Here that costs little, because each user's columns span the whole aperture; on arrays on different walls it would matter.

## 24. Training with MAPPO under CTDE  [0.75 min | 14:45-15:30]

The agents are trained with MAPPO, multi-agent proximal policy optimization, under centralized training with decentralized execution, which addresses non-stationarity. In training, the centralized critic sees the global state and reward and supplies advantages. At deployment the critic is discarded; each actor maps its local observation to a focal-point move, with no communication. The objective has three terms. The clipped surrogate takes the smaller of the ratio-weighted advantage and its clipped version, so one batch cannot move a policy far. The value loss fits the critic to the observed return, and the entropy bonus keeps the agents exploring focal points.

## 25. Setup: 60 GHz L-shaped hallway with three users  [0.5 min | 15:30-16:00]

The scene is an L-shaped hallway at 60 GHz. A four-antenna access point transmits 5 dBm, and the 63-tile array sits at the corner. Three users are in the shadowed region, the yellow rectangle, and a 1.8 m wooden obstacle blocks the remaining direct paths. Each episode starts from random tile angles within plus or minus 30 degrees.

## 26. Multi-agent decomposition trains faster and higher  [0.5 min | 16:00-16:30]

Three controllers: multi-agent focusing, a single agent choosing all focal points, and a multi-agent version that shares one azimuth per column, a cheaper array. The multi-agent controller converges to about 42, the other two near 27. A plausible reason: each agent faces a smaller problem. The column-based one trains stably, so the method fits a lower-cost array.

## 27. Multi-agent focusing: +20.7 dB over a static flat reflector  [1.25 min | 16:30-17:45]

These are RSSI maps of the hallway during evaluation, with the RSSI-map average of each configuration underneath. The users are the magenta dots. With no reflector the average is minus 108.2 dBm. A static flat reflector raises it by 18.1 dB to minus 90.1 dBm. Compare the flat panel, where power spreads along the corridor, with the narrow beams the learned controllers form toward each user. Single-agent focusing reaches minus 74.22, the column-based controller minus 72.71, and multi-agent beam-focusing minus 69.4 dBm. That is 38.8 dB above no reflector, 20.7 dB above the static flat reflector, and 4.8 dB above the single-agent controller. The baselines are static reflectors and learned variants; a position-tracking geometric rule was not run here. The video shows the multi-agent controller with moving users. Users move every four simulation steps, with a three-step adaptation window, an assumed allowance for mechanical latency. After a move, the controller typically recovers within one step.

## 28. Robustness: user count  [0.5 min | 17:45-18:15]

Three robustness checks, one per slide. Here and on the next slide the metric is the temporal-average RSSI at the users over the 300-step trace. The three-user policy runs unchanged with two, three and four users: minus 67.33, minus 67.60 and minus 68.33 dBm, a 1 dB drop from two to four users, since fewer users means more tiles per user.

## 29. Robustness: array size  [0.5 min | 18:15-18:45]

Second check: arrays from 45 to 99 tiles, again without retraining. RSSI rises monotonically with size, from minus 68.43 to minus 66.80 dBm, with diminishing returns. Because the agents act on focal points rather than individual tiles, the same policy runs on every array size.

## 30. Robustness: user-position noise  [0.5 min | 18:45-19:15]

Third check: Gaussian noise on the user positions, in both training and evaluation. The plot shows the deployed controller over the 300-step trace at each noise level. Up to 0.3 m, RSSI stays within 0.54 dB of the noise-free case; at 0.5 and 1.0 m it is about 4.6 dB lower. UWB or mmWave radar can provide sub-meter accuracy.

## 31. Why flat MARL is not enough: a fixed tile-to-user assignment  [0.75 min | 19:15-20:00]

To summarize: decentralized agents steer focal points from user positions, well above static reflectors. One structural choice was fixed in advance: which tiles serve which user. Columns 1, 4 and 7 always serve user 1. In this hallway that costs nothing measurable: two groupings give the same minus 67.60 dBm, because each user's tiles span the whole aperture. It matters when segments differ in geometry, such as arrays on different walls. Choosing it is a discrete problem: K users and L segments give K to the power L options, 27 in this three-user hallway. Next: which segment serves which user, and when.

## 32. From fixed assignment to learned allocation  [0.5 min | 20:00-20:30]

Now two corner arrays serve the room, so the partition matters. There are two decisions: which user each segment serves, discrete and coupled; and where each segment focuses, continuous and servo-limited. The assignment space grows as K to the power L: with four users and four segments, 256 options. So the assignment becomes a learned decision on its own, slower timescale.

## 33. Two-timescale hierarchy: slow allocation, fast focusing  [0.75 min | 20:30-21:15]

The hierarchy has two levels. At the top, a centralized allocator reads the global state: all user positions, segment centroids and current focal points. Every T slots, ten in the experiments, it emits an assignment vector, one user index per segment, which is broadcast and held for the window. Below, one agent per segment moves its focal point every slot. It sees only nine numbers: its assigned user's position, its own centroid and its focal point. Segments do not communicate. At run time both levels see positions only; power is only the training reward. The timeline is drawn with T of four; experiments use ten.

## 34. The hierarchy in motion: reassign every T slots, refocus every slot  [0.75 min | 21:15-22:00]

Here are both timescales together. Two corner arrays, each split into two segments; three users walk paths that cross. Watch the timeline on the right. Every slot, each segment nudges its focal point a bounded step toward its user, the fast level. Every T slots, ten in the experiments, the allocator decides again which user each segment serves; a segment that changes color swings its beam to its new user. Between those decisions the assignment is held, so segments are not thrown around while users cross.

## 35. HMA-MDP: one objective, a reward for each timescale  [0.75 min | 22:00-22:45]

Both levels serve one discounted objective, each with a reward suited to its decision. The allocator's reward is a log utility averaged over all users. Unlike flat MARL's mean, one strong user cannot mask an unserved one, and a decibel gained by a weak user is worth more. Because its decision is held for T slots, it is trained on macro-steps: the discounted return inside each window. Each segment is rewarded with its assigned user's shifted power plus a progress term, potential-based shaping. One change from flat MARL: a move that would push any tile past its limit is rejected rather than clipped.

## 36. Training under CTDE, with a geometric warm start  [0.5 min | 22:45-23:15]

Segments train with MAPPO, as in flat MARL; the allocator uses PPO on the macro timescale with its own critic and a factorized head. Exploring 256 assignments is slow, so early on a geometric prior, from positions only, is added to the logits, then switched off. Prior strength gives three variants: none, warm start, and infinite, a pure heuristic.

## 37. Setup: ray-traced conference room and six controllers  [1 min | 23:15-24:15]

The wireless setup is mostly the same as in the flat study: 60 GHz, a 5 dBm access point, 63-tile arrays, and servo limits of plus or minus 30 degrees. Two things change. The scene is a larger conference room with the access point outside, so every user is non-line-of-sight. And there are two corner arrays, each split into two segments. Two or four users move 30 cm every slot for 300 slots. Six controllers are compared. HMARL-C is ours: a learned allocator with a geometric warm start. HMARL-NC drops the warm start. Compat-only uses that geometric rule alone: each segment takes its best-aligned user. Static-MARL is the flat controller retrained here with a fixed assignment. Centralized is one agent steering all focal points, a bound since its reward and learner differ. Random redraws the assignment every slot, a floor.

## 38. Training: the warm-started allocator converges highest  [0.5 min | 24:15-24:45]

Follow the blue curve. That's the allocator we trained with an early hint about the room geometry. We switch the hint off at episode one thousand, and blue keeps its lead. With four users, it finishes around 46 reward points. The purple curve, trained without the hint, finishes around 33. With two users, the gap is about five points. What happens when the users start moving?

## 39. Deployment with moving users (4 users)  [1.25 min | 24:45-26:00]

Now the four users are walking. Higher on this plot means a stronger signal. Follow the red line first. Each reflector segment can still aim, but it has to keep serving the same person. Imagine that person walks behind a wall. The segment keeps aiming at them even as their signal fades. The blue line is our learned allocator. It can hand that user over to a different segment. Look at the four-user column in the table. That flexibility gives us nearly six decibels more signal on average than the fixed assignment. The blue line also has shallower dips as people move. Even the strongest alternative, the rule based on geometry, trails by nearly two decibels. Two neighboring segments can both pick the same person under that rule, leaving someone else without a segment. If asked about the red line, its legend says minus 72.26 dBm. The table reports minus 72.46 dBm, the value used for the comparison.

## 40. Where the energy goes (4 users)  [0.5 min | 26:00-26:30]

Look at the pink dots. Those are the four users, shown at the same instant in all three maps. In the left map, the bright streaks pass right through them. Without the warm start, the beams spread out in the middle map. With one central controller, they're harder to pick out. In the video, watch how the beams turn as the users walk.

## 41. How often to reallocate? An interior optimum at T=10 slots (4 users)  [0.5 min | 26:30-27:00]

How long should a segment stay with the same user? If we let it switch every slot, a new user can look like the old one suddenly jumped. Wait a hundred slots, and the allocator gets just one decision per training episode. The blue curve did best here, with a decision every ten slots. The two longest intervals were still improving when training ended.

## 42. What allocation buys, and what it cannot fix  [0.5 min | 27:00-27:30]

In this room, letting the segments switch users gave us nearly six decibels over a fixed assignment. We did that with the reflectors already on the walls. What if we add tiles in the same spot? More than doubling the tile count gave us a median gain of just 1.3 decibels. Where, then, should we install the reflectors and the access point?

## 43. Can a passive reflector replace an access point?  [0.75 min | 27:30-28:15]

So far the AP and the reflector were installed in advance, so the gain was bounded by where they were mounted. This part asks where they should go. It is the same tile array and focal-point steering. Mechanical steering does not depend on the band, so we study indoor Wi-Fi at 5.18 gigahertz, where walls set the AP count; each extra AP costs cabling, power, a license and channel budget. Positions become design variables, and the reflector, a passive reflective surface, is configured once at installation. Two questions: (a) better priority coverage at a fixed AP count, and (b) one fewer AP?

## 44. Two floorplans with operator-defined priority maps  [0.5 min | 28:15-28:45]

Two university floorplans. Office, 30 by 30 meters, has its highest-priority rooms on the perimeter behind walls. HRBB, a 40 by 40 meter lab floor, has a central priority block. The operator supplies the priority map: rooms that must be served weigh more than corridors. Weights only shape the objective; reported RSSI is unweighted. The target: priority-region fifth percentile at least minus 65 dBm.

## 45. Design vector: AP poses, wall position, focal points  [0.75 min | 28:45-29:30]

Everything we can choose goes into one continuous design vector, Theta. Each AP sits on the ceiling. We optimize its horizontal position and an orientation vector normalized to a downward boresight, which avoids the singularities of Euler angles. The reflector, 63 hexagonal tiles over 2 by 2 meters, slides along one preselected wall through two normalized coordinates. Its tiles are steered by a virtual source and a virtual target: each tile normal bisects the directions to them, so placing them at the AP and a user recovers the bisector rule. Six focal coordinates replace 126 tile angles, so Theta has 5N plus 8 coordinates.

## 46. Objective: soft worst case plus floor-wide coverage  [0.5 min | 29:30-30:00]

Each location is served by its strongest AP, and its power maps to a penalty that grows as power drops. An average hides holes and a hard minimum is not smooth, so the main term is a priority-weighted soft worst case; a larger weight acts like a lower RSSI. A small sigmoid term discourages sacrificing the rest of the floor.

## 47. Two-phase method: PSO search, then gradient refinement  [0.75 min | 30:00-30:45]

The objective is differentiable for a fixed set of paths, but a small move of an AP or the reflector can create or remove paths at a visibility boundary, and walls split the design space into separated good regions. So we use two phases. First, particle swarm optimization; each particle is a complete layout scored by a full radio map. PSO moves whole configurations, whereas GA crossover could split an AP from the reflector it works with. Then the best particle is refined with Adam steps through the differentiable ray tracer. One run costs about 180 seconds of serial GPU work.

## 48. Intuition: a swarm of layouts, then gradient refinement  [0.75 min | 30:45-31:30]

Here is the intuition, as a schematic. Each color is one particle, a full layout of three APs and the reflector. Every iteration, a particle keeps part of its velocity and is pulled toward its own best layout, the hollow rings, and toward the swarm's best, the large AP icons. The heat map is the coverage of that best layout, and the inset curve its objective. Once the swarm settles, the label switches to gradient refinement: small deterministic steps move the best layout locally to lift the weakest priority rooms.

## 49. Compared methods and evaluation protocol  [0.5 min | 31:30-32:00]

Five baselines each remove or replace one component. GA+GD swaps the global search. PSO-only skips refinement. Random+GD removes global search. Weighted k-means ignores walls. Random sampling is the floor. Each configuration runs with five seeds, one to seven APs, both floorplans, with and without the reflector. I report mean, P5 and minimum RSSI, with Welch tests and 95 percent intervals.

## 50. Convergence of a representative run  [0.75 min | 32:00-32:45]

One representative run: Office, three APs, with the reflector. Left, the objective. GA+GD is ahead early but levels off around iteration 20, and PSO+GD overtakes it by iteration 36. Random+GD improves but plateaus higher, so the starting point matters. Right, the priority-region P5. After the phase boundary at iteration 35, gradient refinement lifts PSO+GD from about minus 61 to minus 57 dBm, while PSO-only stays flat. Both phases contribute; the seed averages come next.

## 51. At three APs, the reflector raises priority P5 by 4.8 dB  [1.25 min | 32:45-34:00]

Question (a). With three APs in Office, adding one jointly optimized reflector raises priority-region P5 from minus 62.1 to minus 57.3 dBm, a 4.8 dB gain with a confidence interval of 3.1 to 6.5. The minimum gains 9.5 dB, more than P5 or the mean, so the reflector mostly redirects energy into shadowed locations. Floor-wide mean, P5 and minimum improve too, so priority coverage does not come at the expense of the floor. The bar chart compares methods that all have the same reflector. PSO+GD and GA+GD gain 4.8 and 4.1 dB; the other methods gain between 1 and 2.8 dB. Installing the reflector alone does not deliver the benefit. Gradient refinement adds 4.1 dB with the reflector but only 1.6 dB, not significant, without it. One possible explanation: with a shared learning rate, refinement can move the reflector much farther than the APs. PSO+GD and GA+GD are not significantly different.

## 52. Office: with the reflector, one fewer AP meets the target (seed mean)  [0.5 min | 34:00-34:30]

Question (b): does the gain mean fewer APs? These panels sweep one to seven APs in Office against the minus 65 dBm line. PSO+GD needs three APs without the reflector and two with it: minus 62.9 versus minus 65.4 dBm at two APs, a 2.1 dB margin. PSO-only needs three either way, so refinement is necessary. Per seed: 4 of 5 versus 1 of 5.

## 53. HRBB: the same one-AP shift, with a smaller margin  [0.5 min | 34:30-35:00]

The second floorplan shows the same shift. In HRBB, one AP plus the reflector reaches minus 64.3 dBm, a 0.7 dB margin, where two APs are needed without it; 3 of 5 seeds meet the target versus none. With five seeds the Fisher tests are not significant, so this is a seed-mean result with small margins, not a deployment guarantee.

## 54. Coverage maps and limitations  [0.75 min | 35:00-35:45]

The maps show where the gain comes from. PSO+GD places APs in a west room and at two corridor junctions and reaches shadowed rooms through corridors and doorways; the reflector serves the north rooms. Weighted k-means follows Euclidean distance and leaves the southeast dark. The limits: strongest-server received power only, so the AP saving is a coverage statement, not a cost statement; five seeds, two floorplans, one preselected wall, known geometry. Within those limits, joint planning removed one AP in both layouts, as a seed mean with small margins. That answers where.

## 55. The complete picture  [0.75 min | 35:45-36:30]

Back to the map from the start, now with the answers filled in. Each part has its own band and scene, so these gains are not compared across parts. What: geometry alone raises path gain by 53.0 and 87.5 dB for one static user. How: multi-agent learning adds 20.7 dB over a static flat reflector, and learning the assignment lifts four users from minus 72.46 to minus 66.62 dBm over a fixed split. Where: with three APs, placement raises priority P5 by 4.8 dB, and one fewer AP meets the target, as a seed mean.

## 56. Limitations and next steps  [0.5 min | 36:30-37:00]

The limits apply to every part: ray-traced simulation only, received power rather than rate, few scenarios. Phase is not controlled, and learned control was not compared with a position-tracking geometric rule. Next: hardware-in-the-loop tests, training under mobility, rate-aware objectives, and running a placed layout with the learned controller, the dashed arrow.

## 57. Five questions, answered  [1.25 min | 37:00-38:15]

To sum up, what the five answers say together. Why: spatial information is enough. Every part decides from user positions at run time or a site model at planning, never from pilot-based channel estimation; the price is decimeter-level localization and an accurate site model. What: the focal point is the interface shared by the geometric rule, both learned controllers and the placement optimizer. How: learned decentralized policies work within servo limits for several moving users, and when segments differ in geometry, learning the assignment beats a fixed split and the geometric heuristic. Where: installation is a decision of its own; a jointly placed reflector met the priority-coverage target with one fewer access point. Which: geometry for a static user or a warm start, learned policies at run time, direct optimization once per building. Together these cover installing and operating the reflectors through one interface, in simulation; closing the loop between the two stages and hardware validation come next.

## 58. What comes next: the FORMULA3 project  [0.75 min | 38:15-39:00]

This work does not stop here. It continues in FORMULA3, a joint project of the NSF and the Research Council of Finland in the VINES program: about 1.54 million dollars across five universities in the United States and Finland, from October 2026 to September 2029. Its programmable wireless environments combine RIS with metallic reflector arrays, the hexagonal tile panels on the right. That element builds directly on this dissertation's reflector-array work.

## 59. The device FORMULA3 will use: a mechanical reflector array  [0.5 min | 39:00-39:30]

This is the physical device. It is a metallic reflector array with nineteen hexagonal tiles; servos behind the panel turn each tile, and the controller box on the stand drives them. The arrays in this dissertation were simulated. FORMULA3 will use this device to take focal-point control and placement into real rooms.

## 60. How this dissertation feeds into FORMULA3  [0.75 min | 39:30-40:15]

Here is how this dissertation feeds into the project's four thrusts. The ray-traced reflector pipeline is a starting point for channel characterization and dataset generation. The CSI-free learned control and the hierarchical allocation are early instances of the second thrust: reconfiguring surfaces and reassigning users. The robustness and localization findings inform the third thrust, where sensing supplies the positions. And the hardware model with joint placement feeds validation and the planning of programmable environments. These are the foundations it builds on; the project's own results are still to come.

## 61. Publications from this dissertation  [0.5 min | 40:15-40:45]

The VTC Fall 2024 paper covers geometric focusing, and the TMLCN article covers flat MARL; the flat-MARL conference paper is under review at ICC 2027. For hierarchical MARL, the journal version is under review at TMLCN and the conference version will be presented at GLOBECOM in December. The placement paper is under review at the Open Journal of the Communications Society. Other publications are in the backup.

## 62. Other publications during the Ph.D.  [0.25 min | 40:45-41:00]

Beyond the dissertation, I contributed to eight other papers, mainly with the High Performance Computing group: scientific data compression, AI accelerators, and digital twins for first responders.

## 63. Thank you  [0.25 min | 41:00-41:15]

Thank you to Prof. Ekin and Prof. Tao, the committee, my collaborators, and DOE and NSF for funding. I am happy to take questions.
