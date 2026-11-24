# Speaker notes and timing

Total: 41.50 min, 61 timed slides (window 40-45 min, pace <= 140 wpm).

| # | slide | min | window | words | wpm |
|---|---|---|---|---|---|
| 1 | Spatial Intelligence for Smart Radio Environments | 1.25 | 0:00-1:15 | 149 | 119 |
| 2 | Outline | 0.25 | 1:15-1:30 | 33 | 132 |
| 3 | About me | 0.5 | 1:30-2:00 | 62 | 124 |
| 4 | Professional experience | 0.5 | 2:00-2:30 | 58 | 116 |
| 5 | Sponsored research | 0.25 | 2:30-2:45 | 31 | 124 |
| 6 | Growing demand points to mmWave bandwidth | 0.5 | 2:45-3:15 | 54 | 108 |
| 7 | More bandwidth at mmWave, but less coverage | 0.5 | 3:15-3:45 | 62 | 124 |
| 8 | Target applications: dense, shielded indoor environments | 0.5 | 3:45-4:15 | 64 | 128 |
| 9 | Indoor mmWave links are blocked by structure | 0.5 | 4:15-4:45 | 66 | 132 |
| 10 | The CSI bottleneck: pilots grow with elements × users | 1.5 | 4:45-6:15 | 183 | 122 |
| 11 | Dissertation goal and research questions | 1 | 6:15-7:15 | 118 | 118 |
| 12 | Hardware: metallic linear Fresnel reflector (LFR) arrays | 0.75 | 7:15-8:00 | 95 | 127 |
| 13 | Bisector rule: each tile normal splits AP and user directions | 1 | 8:00-9:00 | 134 | 134 |
| 14 | Ray-traced testbed: Blender scenes + NVIDIA Sionna RT | 0.5 | 9:00-9:30 | 56 | 112 |
| 15 | Geometric beam-focusing in NLOS hallways at 28 GHz | 0.5 | 9:30-10:00 | 57 | 114 |
| 16 | L-shaped hallway: beam-focusing +53.0 dB path gain at the UE | 0.75 | 10:00-10:45 | 80 | 107 |
| 17 | T-shaped hallway: beam-focusing +87.5 dB path gain at the UE | 0.75 | 10:45-11:30 | 85 | 113 |
| 18 | Beam-focusing follows the UE: L- and T-shaped hallways | 0.5 | 11:30-12:00 | 58 | 116 |
| 19 | Limits of the geometric rule motivate learned control | 0.75 | 12:00-12:45 | 92 | 123 |
| 20 | Focal-point abstraction: a segment is steered by 3 coordinates | 0.75 | 12:45-13:30 | 81 | 108 |
| 21 | MA-MDP: each agent moves the focal point of one segment | 1.25 | 13:30-14:45 | 143 | 114 |
| 22 | Flat MARL in motion: fixed columns, moving focal points | 0.75 | 14:45-15:30 | 84 | 112 |
| 23 | Training with MAPPO under CTDE | 0.75 | 15:30-16:15 | 97 | 129 |
| 24 | Setup: 60 GHz L-shaped hallway with three users | 0.5 | 16:15-16:45 | 57 | 114 |
| 25 | Multi-agent decomposition trains faster and higher | 0.5 | 16:45-17:15 | 57 | 114 |
| 26 | Multi-agent focusing: +20.7 dB over a static flat reflector | 1.25 | 17:15-18:30 | 138 | 110 |
| 27 | Robustness: user count | 0.5 | 18:30-19:00 | 61 | 122 |
| 28 | Robustness: array size | 0.5 | 19:00-19:30 | 59 | 118 |
| 29 | Robustness: user-position noise | 0.5 | 19:30-20:00 | 61 | 122 |
| 30 | Why flat MARL is not enough: a fixed tile-to-user assignment | 0.75 | 20:00-20:45 | 88 | 117 |
| 31 | From fixed assignment to learned allocation | 0.5 | 20:45-21:15 | 58 | 116 |
| 32 | Two-timescale hierarchy: slow allocation, fast focusing | 0.75 | 21:15-22:00 | 84 | 112 |
| 33 | The hierarchy in motion: reassign every T slots, refocus every slot | 0.75 | 22:00-22:45 | 86 | 115 |
| 34 | HMA-MDP: one objective, a reward for each timescale | 0.75 | 22:45-23:30 | 95 | 127 |
| 35 | Training under CTDE, with a geometric warm start | 0.5 | 23:30-24:00 | 64 | 128 |
| 36 | Setup: ray-traced conference room and six controllers | 1 | 24:00-25:00 | 108 | 108 |
| 37 | Training: the warm-started allocator converges highest | 0.5 | 25:00-25:30 | 59 | 118 |
| 38 | Deployment with moving users (4 users) | 1.25 | 25:30-26:45 | 142 | 114 |
| 39 | Where the energy goes (4 users) | 0.5 | 26:45-27:15 | 62 | 124 |
| 40 | How often to reallocate? An interior optimum at T=10 slots (4 users) | 0.5 | 27:15-27:45 | 58 | 116 |
| 41 | What allocation buys, and what it cannot fix | 0.5 | 27:45-28:15 | 64 | 128 |
| 42 | Can a passive reflector replace an access point? | 0.75 | 28:15-29:00 | 97 | 129 |
| 43 | Two floorplans with operator-defined priority maps | 0.5 | 29:00-29:30 | 62 | 124 |
| 44 | Design vector: AP poses, wall position, focal points | 0.75 | 29:30-30:15 | 93 | 124 |
| 45 | Objective: soft worst case plus floor-wide coverage | 0.5 | 30:15-30:45 | 62 | 124 |
| 46 | Two-phase method: PSO search, then gradient refinement | 0.75 | 30:45-31:30 | 85 | 113 |
| 47 | Intuition: a swarm of layouts, then gradient refinement | 0.75 | 31:30-32:15 | 89 | 119 |
| 48 | Compared methods and evaluation protocol | 0.5 | 32:15-32:45 | 62 | 124 |
| 49 | Convergence of a representative run | 0.75 | 32:45-33:30 | 94 | 125 |
| 50 | At three APs, the reflector raises priority P5 by 4.8 dB | 1.25 | 33:30-34:45 | 135 | 108 |
| 51 | Office: with the reflector, one fewer AP meets the target (seed mean) | 0.5 | 34:45-35:15 | 58 | 116 |
| 52 | HRBB: the same one-AP shift, with a smaller margin | 0.5 | 35:15-35:45 | 60 | 120 |
| 53 | Coverage maps: PSO+GD vs. weighted k-means | 0.75 | 35:45-36:30 | 89 | 119 |
| 54 | The complete picture | 0.75 | 36:30-37:15 | 98 | 131 |
| 55 | Five questions, answered | 1.25 | 37:15-38:30 | 166 | 133 |
| 56 | What comes next: the FORMULA3 project | 0.75 | 38:30-39:15 | 95 | 127 |
| 57 | The device FORMULA3 will use: a mechanical reflector array | 0.5 | 39:15-39:45 | 62 | 124 |
| 58 | How this dissertation feeds into FORMULA3 | 0.75 | 39:45-40:30 | 91 | 121 |
| 59 | Publications from this dissertation | 0.5 | 40:30-41:00 | 55 | 110 |
| 60 | Other publications during the Ph.D. | 0.25 | 41:00-41:15 | 31 | 124 |
| 61 | Thank you | 0.25 | 41:15-41:30 | 33 | 132 |

## 1. Spatial Intelligence for Smart Radio Environments  [1.25 min | 0:00-1:15]

Good morning, everyone. I'm Hieu T. Le, a Ph.D. candidate in electrical engineering at Texas A&M. Thank you for joining me. I'd like to thank my chair, Professor Sabit Ekin, and my co-chair, Professor Jian Tao, for guiding this work. I'm also grateful to Professors Erchin Serpedin and Arya Menon for serving on my committee.

My dissertation is called Spatial Intelligence for Smart Radio Environments . Imagine walking down a hallway. You turn a corner, and a wall comes between you and the wireless access point. Could a panel of metal tiles at the corner redirect the signal to you? If you kept walking, how would the tiles know where to aim?

Those are questions about operating the panel. There's also a decision we get to make before anyone walks into the building. Where should we put the panel in the first place? Those two decisions organize the talk.

## 2. Outline  [0.25 min | 1:15-1:30]

I'll start with my background and the coverage problem, then move from aiming one tile to learning how to share an array among users. I'll close with placement, the findings, and our publications.

## 3. About me  [0.5 min | 1:30-2:00]

My research at Texas A&M brings together wireless communication, machine learning, and optimization. The wireless question is what path a signal can take through a room. Reinforcement learning lets me ask how to adjust that path as people move. Optimization lets me ask where to install the equipment in the first place. Alongside my Ph.D. research, I also spent time in industry.

## 4. Professional experience  [0.5 min | 2:00-2:30]

I've been a research assistant at Texas A&M since 2021. Along the way, I worked at the High Performance Research Center (HPRC-TAMU), interned at Qualcomm, and then spent a summer on Uber's Rider Pricing and Incentives team. I'll return to Uber as a machine learning engineer in 2027. Two sponsors helped make the work at Texas A&M possible.

## 5. Sponsored research  [0.25 min | 2:30-2:45]

I'm grateful to the Department of Energy's Early Career Research Program and to the National Science Foundation for supporting this research. Let me turn to the wireless problem that motivated it.

## 6. Growing demand points to mmWave bandwidth  [0.5 min | 2:45-3:15]

Think about the data an augmented reality headset needs as its wearer moves through a building. To carry more data, we can improve signal quality or give the link more bandwidth. The spectrum chart shows why millimeter-wave bands are attractive. They offer wide, contiguous channels. The question is how far that advantage reaches indoors.

## 7. More bandwidth at mmWave, but less coverage  [0.5 min | 3:15-3:45]

The chart puts bandwidth and coverage side by side. At millimeter-wave frequencies we have wide channels, but the signal weakens rapidly with distance and penetrates walls poorly. A room can be close to an access point and still have very little usable signal. That matters in facilities where the equipment or shielding keeps people and devices out of sight of the transmitter.

## 8. Target applications: dense, shielded indoor environments  [0.5 min | 3:45-4:15]

In a data center, the metal racks that hold the servers also block links between aisles. In a nuclear facility, shielding stands between sensors and receivers. In a factory, a robot can lose sight of its access point just by moving behind a machine. All three need a way to reach a user around an obstruction. A hallway corner gives us a simple example.

## 9. Indoor mmWave links are blocked by structure  [0.5 min | 4:15-4:45]

Start at the access point and follow the dashed line. The wall blocks it before it can reach the user. Adding another access point around the corner would mean another powered installation. Now follow the green arrows. A reflector at the bend gives the existing transmitter a path into the dead zone. Once we can steer that reflection, the next question is what information steering requires.

## 10. The CSI bottleneck: pilots grow with elements × users  [1.5 min | 4:45-6:15]

Watch the grid on the left get finer while the three users stay in place. On the left is an electronic reconfigurable intelligent surface, or RIS. Its controller estimates a channel through each element to each user. We call that information CSI, or channel state information. Each estimate takes pilot signals. Double the number of elements at the same user count and the number of element-to-user channels doubles.

The bar shows why that matters. A channel estimate is useful for only as long as the channel stays roughly the same. As more of that interval goes to pilots, the green portion available to carry data shrinks.

Now look at the three position markers on the right. For a mechanical reflector, we know where the tiles are. If we also know where the users are, geometry gives us directions in which to turn those tiles. Adding tiles leaves us with the same three user positions to track. That places a different demand on the system. During operation we need accurate locations, and before installation we need a model of the building we can trust.

## 11. Dissertation goal and research questions  [1 min | 6:15-7:15]

That's the idea at the top of the diagram. Can positions and a site model give us enough information to steer a reflector and choose where it belongs?

The two large boxes separate decisions made at different times. On the left, a planner chooses a mounting site once per building. On the right, a controller repeatedly decides where to aim and which user each part of the panel should serve. Both describe the desired reflection with focal points.

I'll come back to this diagram at the end to say which method fits each decision. First, we need the foundation at the bottom. What can the metal tiles do if we give them just one receiver to aim at?

## 12. Hardware: metallic linear Fresnel reflector (LFR) arrays  [0.75 min | 7:15-8:00]

Each tile is a little metal mirror for radio waves. A motor can turn it in elevation and azimuth. Look at the top view. Two tiles at opposite ends of the panel see the transmitter and receiver from slightly different directions, so each needs its own angle.

That's the idea behind a linear Fresnel reflector. The drawing on the right shows a hexagonal design. For the first hallway study we used seventy square tiles, each twenty centimeters on a side, with unrestricted rotation. Given that freedom, how do we choose the angle of one tile?

## 13. Bisector rule: each tile normal splits AP and user directions  [1 min | 8:00-9:00]

Start at the center of a tile, point A. Draw one arrow back toward the access point and another toward the user. Give each arrow unit length and add them. The sum points halfway between the two directions. That's where the tile normal, the line perpendicular to its face, should point. As the dashed normals appear, notice that each tile turns by a different amount. The incoming and outgoing angles match at each tile, so the rays meet at the user.

Watch what happens when the servo limit appears. A tile that would have to turn beyond thirty degrees stops at its limit and turns red. Its reflected ray misses the user. We can see the direction change here. To find out how much signal actually reaches the user, we need a propagation model.

## 14. Ray-traced testbed: Blender scenes + NVIDIA Sionna RT  [0.5 min | 9:00-9:30]

We build the walls, access point, users, and tiles in Blender. The geometric solver sets the tile angles. We then pass the scene, including frequency-dependent material properties, to NVIDIA Sionna RT. It follows reflections, diffraction, and scattering to compute path gain or received power. We'll reuse that pipeline throughout the talk, starting with two concrete hallways.

## 15. Geometric beam-focusing in NLOS hallways at 28 GHz  [0.5 min | 9:30-10:00]

Here the downlink runs at 28 gigahertz. We test one receiver at a time at nine marked locations in each hallway. At each location we compare an empty corner, tiles all set to 45 degrees, and tiles aimed individually. The L needs one reflecting array. The T needs two in sequence. Let's follow the simpler path first.

## 16. L-shaped hallway: beam-focusing +53.0 dB path gain at the UE  [0.75 min | 10:00-10:45]

Compare the same receiver location across the three L-shaped maps. With the corner empty, very little signal reaches the receiver. In the middle, setting all the tiles to 45 degrees sends energy down the hall. In the third map, the focused band passes through the receiver.

At that point, individual aiming improves path gain by 53 decibels over the empty corner and by about 27 over the simple reflector. Can the same rule guide a signal through a second reflection?

## 17. T-shaped hallway: beam-focusing +87.5 dB path gain at the UE  [0.75 min | 10:45-11:30]

In the T-shaped hallway, follow the focused path into the side branch. The first array aims at the second array, which redirects the signal toward the receiver. The geometry is the same at each reflection.

The empty-corner reference here is especially weak, about minus 156 dB of path gain. Focusing brings that to about minus 69, a gain of 87.5 dB at this location. Even against two simple reflectors, it gains about 40 dB. So far we've looked at one receiver position at a time.

## 18. Beam-focusing follows the UE: L- and T-shaped hallways  [0.5 min | 11:30-12:00]

Now follow the green user marker in either video. As it moves, the focused band moves with it, around one corner on the left and into the side branch on the right. We recompute a static solution at every known position. That detail matters when we ask what it would take for a real panel to keep up.

## 19. Limits of the geometric rule motivate learned control  [0.75 min | 12:00-12:45]

The hallway results depend on two freedoms. We gave every tile the angle it needed, and we let every tile serve the same user. A servo can run out of travel, as the red tiles showed. And once several people share the hallway, pointing the whole array at one person leaves the others out of the decision.

I'll keep the reflection rule. What changes in the next study is who chooses the target. I'll let a controller choose where each group of tiles should aim, using received power to learn what works.

## 20. Focal-point abstraction: a segment is steered by 3 coordinates  [0.75 min | 12:45-13:30]

Follow one colored crosshair. It marks a virtual focal point. We can move it sideways, forward, or up, and it can sit away from the user. In the front view, the tiles of the matching color each turn to aim at that point, up to their servo limits.

This lets us describe the whole 63-tile panel with three focal points. That's nine coordinates in place of 126 separate angle commands. We can now give each segment a manageable decision to learn.

## 21. MA-MDP: each agent moves the focal point of one segment  [1.25 min | 13:30-14:45]

Imagine you're the agent for one segment. You know where your segment is, where it's currently aiming, and where your assigned user is. Every step you choose how far to move the focal point in each of three directions. We bound that move, keep the focal point in its allowed region, and clip the tile angles at thirty degrees.

We describe this as a cooperative multi-agent Markov decision process. Your move changes the power that reaches several users, so during training every agent gets the same score, the mean received power across users. That gives each agent a reason to learn moves that work alongside its neighbors. During operation, the agent needs only its three local positions.

One decision has already been made for you. Your segment keeps the same user for the entire run. Watch for that distinction in the moving example.

## 22. Flat MARL in motion: fixed columns, moving focal points  [0.75 min | 14:45-15:30]

Start on the right with columns one, four, and seven. They're assigned to user one. Now follow that user on the hallway view. When the user moves, the dashed box shows how far the agent can shift its focal point in one step. The other two agents do the same for their users.

Look back at the columns. Their aim has changed, but their colors are the same. So what do these agents have to learn together if each controls only its own columns?

## 23. Training with MAPPO under CTDE  [0.75 min | 15:30-16:15]

The diagram shows centralized training with decentralized execution. While the actors learn, a shared critic sees the whole scene. That matters because the effect of one agent's move depends on what its neighbors do. Each actor uses the critic's feedback to update its policy. We train them with multi-agent proximal policy optimization, or MAPPO.

The three terms below limit the incentive for large policy updates, train the critic to predict returns, and encourage the actors to explore. Once trained, each actor runs on local positions without contacting the other actors. Here's the hallway where we test them.

## 24. Setup: 60 GHz L-shaped hallway with three users  [0.5 min | 16:15-16:45]

This time the link runs at 60 gigahertz. In the floor plan, the access point illuminates a 63-tile reflector at the bend. Three users occupy the shadowed region beyond the wooden obstacle. We randomize the initial tile angles within the thirty-degree servo range. In this same scene, we can compare three ways to control the same array.

## 25. Multi-agent decomposition trains faster and higher  [0.5 min | 16:45-17:15]

The blue curve climbs fastest. With one agent per user and individually steerable tiles, it settles near 42 in normalized reward over 3,000 episodes. Giving one agent all the focal points finishes near 27. Sharing one azimuth per column also finishes near 27. Those are training scores. What does the difference look like in received signal strength?

## 26. Multi-agent focusing: +20.7 dB over a static flat reflector  [1.25 min | 17:15-18:30]

Look at the second map, with the flat reflector, and the fifth, with multi-agent focusing. The flat reflector sends power into the hallway. The learned controller can also shape where that power goes. The numbers underneath are map averages. Received signal strength, or RSSI, rises from minus 90.1 to minus 69.4 dBm. That's the 20.7 dB gain in the title.

The fourth and fifth maps both use multiple agents. Allowing each tile its own angle gives the stronger result. A single agent choosing all focal points, in the third map, also finishes about 4.8 dB below multi-agent focusing. These comparisons are with static reflectors and other learned controllers.

In the video the users move every four simulation steps, and focusing typically recovers within one. Now let's measure the signal at the users themselves as we change the conditions.

## 27. Robustness: user count  [0.5 min | 18:30-19:00]

Here each trace follows power at the users over 300 steps. We trained with three users, then reused the policy with two, three, and four. Doubling the number of users from two to four costs about one decibel on average as more users share the same panel. We can also change the other side of that ratio, the number of tiles.

## 28. Robustness: array size  [0.5 min | 19:00-19:30]

With three users, increasing the array from 45 to 99 tiles raises average RSSI by about 1.6 dB. Each increase helps a little less. We can run the same policy on all four sizes because its output is still a focal-point move. Its input, though, depends on where we think the user is. How accurate must that estimate be?

## 29. Robustness: user-position noise  [0.5 min | 19:30-20:00]

This test adds Gaussian error to the user positions. We train and evaluate at matching noise levels. Up through thirty centimeters of standard deviation, the time-average signal stays within about half a decibel of the noise-free case. At half a meter and one meter the loss is about 4.6 dB. Even with accurate positions, one choice remains fixed in this controller.

## 30. Why flat MARL is not enough: a fixed tile-to-user assignment  [0.75 min | 20:00-20:45]

In the drawing, each user's columns span the width of the panel. We also tried a staggered grouping, and both delivered the same mean RSSI, minus 67.6 dBm. In this hallway the choice between those two assignments made no measurable difference.

Now imagine dividing the segments between two corners of a room. The same user might be easy to reach from one corner and beyond the steering range of the other. Moving a focal point cannot switch which corner serves that person. That calls for another decision, allocation.

## 31. From fixed assignment to learned allocation  [0.5 min | 20:45-21:15]

With four segments and four users, each segment can choose any user. That gives 256 assignments. Some leave a user with only the signal that reaches them indirectly. Once we pick an assignment, the servos still have to move each focal point into position. The assignment and the aim are coupled, but they can change at different speeds.

## 32. Two-timescale hierarchy: slow allocation, fast focusing  [0.75 min | 21:15-22:00]

Read the two rows of the timeline together. On the upper row, an allocator sees the whole scene and assigns a user to each segment. That assignment holds for a window of T slots. Within the window, each segment follows its assigned user, moving its focal point once per slot from local observations.

The drawing uses four slots so you can see both clocks. In the experiments the usual interval is ten. Watch one segment through an entire window to see what stays fixed.

## 33. The hierarchy in motion: reassign every T slots, refocus every slot  [0.75 min | 22:00-22:45]

Pick a segment in either corner. Its color tells you who it serves, and the crosshair shows where it's aiming. Between the upper ticks, the crosshair follows the moving user. At an upper tick the segment can change color and begin serving someone else.

A simple position rule drives this illustration so you can see the timing. For the learned controller we have to answer a harder question. How do we score an assignment that lasts ten slots and a focusing move that lasts just one?

## 34. HMA-MDP: one objective, a reward for each timescale  [0.75 min | 22:45-23:30]

The allocator on the left has to care about everyone. Its score gives more credit for raising a weak user's signal than for the same increase on an already strong link. We add up those rewards, with discounting, across the allocation window.

On the right, each segment gets quicker feedback. It earns credit for its assigned user's received power and for improving that power since the last slot. If a proposed move would push even one tile past its servo limit, the segment stays put. Geometry can also help the allocator learn where to start.

## 35. Training under CTDE, with a geometric warm start  [0.5 min | 23:30-24:00]

We train the segments with MAPPO. For the allocator, PPO treats each assignment window as one step. At first, we give the allocator a hint. Its scores favor segments close to a user with a gentle reflection angle. Then we turn the hint off and continue learning from received power. To see what the hint contributes, we compare three versions in the same room.

## 36. Setup: ray-traced conference room and six controllers  [1 min | 24:00-25:00]

The access point sits outside the conference room. Each corner array has 63 tiles split into two segments. Users stay still within a training episode. For evaluation, two or four users move thirty centimeters per slot for 300 slots.

The first three rows give us the most informative comparison. HMARL-C learns with the geometric hint at the start. HMARL-NC learns without it. Compat-only uses the geometric rule every time it assigns a segment. We also retrain the fixed-assignment controller in this room, compare a centralized controller, and include random assignments during training. With those comparisons in mind, look first at what happens after we switch the hint off.

## 37. Training: the warm-started allocator converges highest  [0.5 min | 25:00-25:30]

We switch off the prior at episode one thousand. By the final 200 episodes, the warm-started allocator still leads. With four users its training score is 46, compared with about 40 for geometry alone and 33 for learning without the hint. The warm-start advantage is smaller with two users. Let's see whether that ranking carries over when people move.

## 38. Deployment with moving users (4 users)  [1.25 min | 25:30-26:45]

Follow the red trace for the fixed assignment. Its average in the four-user column is minus 72.46 dBm. Those segments can steer, but a user stays tied to the same segment even as the geometry changes. The blue trace is the warm-started allocator. It can reassign a segment when the path to a user changes. Its mean rises to minus 66.62 dBm, a gain of 5.84 dB across the 300 slots and five seeds.

The closest comparison is Compat-only. It too can change assignments every ten slots. The learned allocator gains another 1.88 dB over that geometric rule. The time trace also shows smaller swings for the warm-started policy. So the benefit here is both a higher average signal and steadier service as users move.

Those numbers summarize an entire run. To see where the energy goes, let's pause at one slot.

## 39. Where the energy goes (4 users)  [0.5 min | 26:45-27:15]

At slot 294 the four users occupy the same positions in all three maps. The warm-started controller sends narrow bands through them. Without the warm start the energy spreads more widely, and the centralized controller shows little focusing. Those values average over users at that instant. The video shows the beams tracking them over time. How often should we reconsider their assignments?

## 40. How often to reallocate? An interior optimum at T=10 slots (4 users)  [0.5 min | 27:15-27:45]

If we reassign every slot, the local agent can experience a new user as a sudden jump in position. Wait a hundred slots and the allocator gets only one decision per episode. Of the intervals we tested, ten slots gave the highest training reward for four users. The two longest intervals were still improving at the training cutoff.

## 41. What allocation buys, and what it cannot fix  [0.5 min | 27:45-28:15]

With ten slots between assignments, learning who serves whom gained nearly six decibels over a fixed split for four users. In a separate two-user test, more than doubling the tile count at the same site gained only about 1.3 dB at the median. So far we've asked how to use a panel where it stands. What if we could choose where to install it?

## 42. Can a passive reflector replace an access point?  [0.75 min | 28:15-29:00]

Consider a building before the access points go in. Each additional access point needs power, cabling, and a place in the channel plan. Could a passive panel cover a difficult room by redirecting power from an access point we already plan to install? Here we set the panel's aim once, at installation.

I'll test that in two stages. At a fixed access-point count, does adding one jointly placed reflector help the weakest priority locations while maintaining coverage elsewhere? Then, if coverage improves, is the margin large enough to remove an access point and still meet the target?

## 43. Two floorplans with operator-defined priority maps  [0.5 min | 29:00-29:30]

For planning, we move to 5.18 gigahertz and two floor plans. In the Office, priority rooms line the perimeter. In HRBB, they form a central block. The weights tell the optimizer where service matters most. We judge the result in dBm. A fifth percentile, or P5, of minus 65 dBm means roughly 95 percent of priority locations reach that level or better.

## 44. Design vector: AP poses, wall position, focal points  [0.75 min | 29:30-30:15]

What can the planner move to meet that target? Each access point gets a ceiling position and a pointing direction. The reflector can move along a preselected wall. The two focal points in the drawing determine its tile angles. From a tile, draw one arrow to the virtual source and one to the virtual target. The tile normal bisects those directions just as in the hallway.

Six coordinates therefore set 126 tile angles. We also enforce access-point separation and the thirty-degree servo limits. Now we need a way to rank those feasible layouts.

## 45. Objective: soft worst case plus floor-wide coverage  [0.5 min | 30:15-30:45]

Imagine moving an access point from a strong corridor toward a weak priority room. To score that move, we take the strongest access point at each grid cell. The first term puts more weight on weak locations and on priority rooms. The second rewards bringing more of the whole floor above threshold. We then search for layouts that reduce this combined loss.

## 46. Two-phase method: PSO search, then gradient refinement  [0.75 min | 30:45-31:30]

Particle swarm optimization, or PSO, first compares complete layouts in different parts of the floor plan. We take the best layout it finds and refine it with Adam, following gradients through the ray tracer.

Why start with a swarm? A small change in antenna direction might help a room. Moving the access point to a different doorway could help much more, but a local gradient may never lead us there. The animation shows how the swarm finds a layout and hands it over for refinement.

## 47. Intuition: a swarm of layouts, then gradient refinement  [0.75 min | 31:30-32:15]

Follow the three markers of one color. Together with a reflector position and focal target, they're one candidate layout. In the swarm phase several layouts move at once. Each particle draws on its own best layout and the best the swarm has found. The heat map belongs to that best layout.

At the phase change, the other candidates drop away. Small adjustments refine the remaining layout. This illustration uses a simplified floor plan and propagation model. For the actual comparison, every method is evaluated on the two building models.

## 48. Compared methods and evaluation protocol  [0.5 min | 32:15-32:45]

We test one to seven access points per building, with and without a reflector, across five seeds. Swarm search alone isolates refinement. A genetic algorithm tests the choice of global search. Weighted k-means and random layouts give us simpler comparisons. We record mean, fifth percentile, and minimum signal strength in priority rooms and across the floor. First, let's follow one Office run.

## 49. Convergence of a representative run  [0.75 min | 32:45-33:30]

The two plots follow the same run with three access points and a reflector. On the left, lower loss is better. The genetic search leads early, then levels off. The swarm plus refinement overtakes it around iteration 36.

On the right, higher is better because we're looking at signal strength. At the dotted line, swarm search ends. Refining its best layout raises priority P5 from about minus 61 to minus 57 dBm. That isolates refinement in one run. To isolate the reflector itself, let's compare layouts with and without it across all five seeds.

## 50. At three APs, the reflector raises priority P5 by 4.8 dB  [1.25 min | 33:30-34:45]

Start with the priority P5 row. We use the same planning method and keep three access points in both columns. Adding the jointly optimized reflector raises P5 from minus 62.1 to minus 57.3 dBm. That's a 4.8 dB gain across five seeds, with a 95 percent confidence interval of 3.1 to 6.5 dB. The weakest priority location gains even more, 9.5 dB. The whole-floor statistics below improve as well.

The bars on the right show why placement matters. With weighted k-means the same reflector adds only 1.3 dB to priority P5. Both global searches followed by refinement realize larger gains, and the five runs leave their relative ranking uncertain.

That answers the fixed-count question. Both three-access-point layouts already clear minus 65 dBm. The practical question is what happens if we take one access point away.

## 51. Office: with the reflector, one fewer AP meets the target (seed mean)  [0.5 min | 34:45-35:15]

Follow the swarm-plus-refinement curve in each Office plot. Without the reflector the mean crosses minus 65 dBm at three access points. With the reflector it crosses at two, with 2.1 dB to spare. At two access points, four of five runs passed with the reflector and one passed without. Does that shift carry over to the lab floor?

## 52. HRBB: the same one-AP shift, with a smaller margin  [0.5 min | 35:15-35:45]

In HRBB the seed mean crosses the same target with one access point and a reflector, or two access points alone. The margin is only 0.7 dB. At one access point, three of five runs passed with the reflector and none without. The success counts are statistically inconclusive. To see why the layout matters, let's return to the Office maps.

## 53. Coverage maps: PSO+GD vs. weighted k-means  [0.75 min | 35:45-36:30]

Both Office maps have three access points and a reflector on the north wall. Follow the red markers on the left. Swarm search with refinement places two access points near corridor junctions, where doorways offer paths into several rooms. On the right, weighted k-means can put an access point close to a priority room with a wall still in the way. Look at the darker southeast rooms.

That explains why the building model matters at installation. We can now put placement back alongside the decision about how to steer.

## 54. The complete picture  [0.75 min | 36:30-37:15]

Read this diagram as an engineer making two decisions. Before installation, on the left, use the building model to search for access-point and reflector locations, then refine the best layout. After installation, on the right, the decision depends on who is moving through the room. A segment can learn where to aim, and an allocator can learn when to hand a user to another segment.

Underneath both is the same geometric operation. Given a focal point, turn the tiles toward it. The dashed arrow points to future work. We could use operating experience to revisit the original plan.

## 55. Five questions, answered  [1.25 min | 37:15-38:30]

Think back to the person walking around a corner. Why use spatial information? A position estimate lets the controller respond without sounding a separate channel for every tile. That makes localization accuracy important, just as planning depends on the quality of the building model.

What connects the studies is the focal point, the place we ask the tiles to aim. For one stationary user, geometry gives us the angles directly. How do we serve several moving users? We learn where each segment should aim, then learn which user it should serve when different corners offer different paths.

Where we put the hardware matters just as much. In both simulated buildings the jointly planned reflector met the priority target with one fewer access point on average across seeds. I'd use geometry to aim at a known target or give a learner a head start. I'd use learning for repeated steering and direct optimization for installation. The next step is to test those ideas on a physical panel.

## 56. What comes next: the FORMULA3 project  [0.75 min | 38:30-39:15]

FORMULA3 gives us a setting for that next step. It's a collaboration among five universities in the United States and Finland, supported by the National Science Foundation and the Research Council of Finland. The project asks how AI can manage wireless resources in the FR3 frequency range, when parts of the environment can be reconfigured.

The connection to this dissertation is the panel on the right. The project combines electronic surfaces with mechanical reflector arrays. We can bring our tile model and focal-point controller to that effort. Here's the physical device the project will use.

## 57. The device FORMULA3 will use: a mechanical reflector array  [0.5 min | 39:15-39:45]

In the front photo you can see nineteen hexagonal metal tiles. In the back photo you can see the servos and wiring that turn them. The controller and panel share a rolling stand, so we can try different positions in a room. That makes both sides of the dissertation testable on the same device. Here's how the work maps onto the project.

## 58. How this dissertation feeds into FORMULA3  [0.75 min | 39:45-40:30]

Read each row from work we've completed on the left to a project task on the right. The ray tracer can generate channel data for rooms with metallic reflectors. The controllers give the resource-management team a starting point for steering beams and reassigning users. The position-noise results tell the sensing team how accurately it may need to locate people.

Finally, we can take a layout chosen in simulation, move the prototype there, and measure the result. Those measurements are future work. The papers that follow document the studies I've presented today.

## 59. Publications from this dissertation  [0.5 min | 40:30-41:00]

The first paper, at VTC in 2024, established the geometric foundation. The journal article Signal Whisperers and the subsequent multi-agent papers develop the control work. The hierarchy also led to a paper accepted at GLOBECOM 2026. The joint-placement paper is under review. Alongside these six dissertation papers, I contributed to several collaborations in other areas.

## 60. Other publications during the Ph.D.  [0.25 min | 41:00-41:15]

These eight papers grew out of work on scientific data compression, machine-learning accelerators, battery materials, and public-safety applications. I'd like to close by thanking the people who made this work possible.

## 61. Thank you  [0.25 min | 41:15-41:30]

Thank you to Professors Ekin, Tao, Serpedin, and Menon, to my collaborators Mostafa Ibrahim and Oguz Bedir, and to our DOE and NSF sponsors. Thank you all for listening. I welcome your questions.

## Backup slides for questions

### 62. Limitations and next steps

The results establish what the methods can do in the simulated scenes. We measured path gain and received power. An interference-aware rate measurement would answer a different question about service. The scenes, mounting walls, and user counts also limit how broadly we can generalize.

A direct next comparison would give geometric tracking and learned control the same moving users and servo limits. A hardware test could then close the dashed loop in the overview by running the controller on a panel at a site chosen by the placement optimizer.

### 63. Research and technical innovation

There are four contributions on this slide. The geometric rule turns a known target into tile angles. Flat multi-agent control learns where each group of tiles should aim. The hierarchy adds the choice of which user gets each group. Joint placement makes the earlier decision of where the hardware belongs in the building. The common feature is a focal point that a controller or a planner can move.

### 64. Electronic RIS vs. metallic reflector arrays

An electronic reconfigurable surface steers by adjusting the phase response of its elements. In the channel-estimation scheme shown here, sounding those elements for every user takes pilot time. Our array steers by turning metal tiles. With tiles large relative to the wavelength, the same reflection geometry works across bands and the controller can use user positions.

The trade-off shows up in the last two rows. The array expends energy moving its tiles and can hold their orientation afterward. The servos take time to turn, which makes slowly changing indoor links a better fit.

### 65. L-shaped hallway: RSSI at nine UE locations

Each point on the horizontal axis is a different receiver location in the L-shaped hallway. Geometric focusing gives the strongest received signal at all nine, even relative to the free-space reference at the same transmit power. A plausible reason is that the 1.4-by-2-meter panel intercepts power over a large area and directs it toward one receiver. The free-space curve gives us a reference at each of those nine points.

### 66. T-shaped hallway: RSSI at nine UE locations

In the T-shaped hallway, focusing gives the highest received power of the reflector configurations at all nine locations. Positions two and five are the interesting exceptions when we compare with free space. Both fall below that reference. The bisector sets the direction of each reflected path. Different path lengths can still produce different phases at the receiver. That's a possible explanation for the dips, which would need a phase-resolved test.

### 67. ITU-R P.2040 material model

The ray tracer needs to know how a wall or tile interacts with a wave at the frequency we're using. We take relative permittivity and conductivity from the ITU-R P.2040 model. Read across the concrete row. Its permittivity stays at 5.24, while its conductivity increases with frequency. That same procedure gives us material properties for the concrete hallway at 28 gigahertz and for materials such as the wooden obstacle in the 60 gigahertz scene.

### 68. bisector rule in 3D: tile elevation and azimuth

At A, the tile center, draw unit vectors toward B, the access point, and C, the receiver. Their sum gives the direction of the surface normal. From that normal, the first angle sets elevation and the second sets azimuth. For a segment with a virtual focal point, we simply use that point in place of C. In the flat controller we then clip the requested angles to the servo range.

### 69. MAPPO hyperparameters (flat MARL)

For flat MAPPO, the actor and critic each have two hidden layers of 256 neurons. We collect a thousand transitions with the current policy and update it in batches of 200. PPO uses a clipping parameter of 0.2, and Adam uses a constant learning rate of 0.0002. The table also gives the discount, advantage-estimation, and entropy settings used for these runs.

### 70. Tile grouping and reward normalization

The left plot asks whether it matters which tiles belong to each user in the three-user hallway. The interleaved columns and staggered pattern both average minus 67.60 dBm. The right plot changes the distance exponent in the training reward. Across exponents two through four, the average spans only 0.38 dB. In this geometry, neither change makes much difference to received power.

### 71. Flexible across user counts: the same ranking with 2 users

With two users, four segments have sixteen possible assignments. Most already give both users at least one segment, so there's less to gain by choosing among them. The warm-started allocator still leads the geometric rule by 1.14 dB and the centralized controller by 2.59 dB over 300 slots. The dips for the fixed split show the cost of keeping a user tied to a segment when that path weakens.

### 72. Operating regime: aperture (2 users)

Read each curve halfway up the vertical axis to compare medians. Increasing each array from 45 to 99 tiles gains about 1.3 dB for two users. At 63 tiles we already have about two thirds of that gain. A larger aperture intercepts more energy, but every tile in a segment must be able to reach the proposed angle. One tile at its limit can hold the segment in place.

### 73. Operating regime: localization (2 users)

In the two-user conference room, ten centimeters of position error gives a received-power distribution close to the noise-free case. By thirty to fifty centimeters, the loss is several decibels. The flat hallway study stayed closer to its reference through thirty centimeters. The room and the controller both changed, so the practical requirement is decimeter-scale localization, with the tolerance checked at the intended site.

### 74. HMARL per-user vs. aggregate received power

Going from two users to four shifts the median per-user signal down about 2.5 dB on the left. Yet total received power on the right rises slightly. Both can happen because a tile can contribute power to several receivers even when it aims at one of them. Competition for steering range is one explanation for the per-user loss. These experiments measure the change without isolating its cause.

### 75. HMARL reward sensitivity and the role of P_off

Larger distance exponents give a distant user more weight during training. Across the five exponents shown, median received strength spans only 0.81 dB. The power offset affects fairness in a different way. With the chosen 80 dB offset, an improvement at minus 75 dBm has about 2.7 times the marginal weight of one at minus 65 dBm. That ratio follows from the reward formula. The experiment varied the exponent and kept the offset fixed.

### 76. HMARL focal points and allocation space

Two 63-tile arrays have 252 angle commands. Four three-dimensional focal points let the controller choose twelve numbers instead. That factor of 21 counts continuous control variables. Measuring a speedup in training would require a separate tile-level benchmark.

Allocation still has 256 possibilities for four segments and four users. The allocator represents them compactly by outputting four user scores for each segment and combining the segment choices into an assignment.

### 77. HMARL system parameters and hyperparameters

The conference-room experiment uses two 63-tile arrays, each split into two segments, at 60 gigahertz. During each hundred-slot training episode the allocator gets ten decisions. The local agents can move a focal point by thirty centimeters per coordinate each slot, subject to the thirty-degree servo limit. The allocator uses attention, and each segment actor and the shared critic have two hidden layers of 256 neurons. Evaluation follows moving users for 300 slots.

### 78. HMARL: what one slot means physically

A slot means one control update. Users move thirty centimeters in that interval and each focal coordinate can move by up to thirty centimeters. We haven't assigned a measured duration to an update. If localization updates once per second, that displacement amounts to a slow walk. At tens of milliseconds per update it would represent much faster motion. Turning this test into a physical speed claim requires measuring both localization latency and servo rotation time.

### 79. Placement: propagation and ray-tracing parameters

Placement uses a 5.18 gigahertz carrier and 20 dBm per access point. At that frequency the tile pitch is about four to five wavelengths. We trace a million rays per transmitter, to a maximum depth of ten interactions, and evaluate the map on a one-meter grid at receiver height, 1.5 meters. The wall thickness and material properties in the tables are part of what makes two equally distant rooms receive different powers.

### 80. Placement: objective and optimizer parameters

The weak-location term has weight one and the floor-wide coverage term has weight 0.2. For each run, the swarm evaluates fifty layouts over 35 iterations, then Adam refines the best for thirty steps. That's 1,780 radio-map evaluations. The refined genetic search has the same count. The random baselines use 650 evaluations and weighted k-means has a different budget. Those costs matter when interpreting the method rankings.

### 81. Placement: Office coverage statistics, 3 APs

Read the priority P5 column in the Office table. With three access points, swarm search plus refinement gives minus 62.1 dBm without the reflector and minus 57.3 with it. Across five seeds the standard deviations are 1.0 and 1.3 dB, respectively. The minimum varies more because it depends on a single grid cell. Bold type marks the highest mean in each column. The genetic search, for example, has the best priority minimum with the reflector.

### 82. Where the gain goes: the lower tail (Office, 3 APs)

These curves are for one Office seed. Read the fraction below the dashed minus 65 dBm line in the priority panels. For swarm search plus refinement, at most two percent of locations fall below target with the reflector, compared with about three percent without it. The minimum rises by roughly nine decibels even though the median falls by about one. In this layout we can see exactly which part of the distribution benefited.

### 83. Placement: PSO vs. GA and gradient refinement

There are two comparisons here. Keep the swarm search fixed and add refinement. With the reflector, priority P5 improves by 4.1 dB, with a 95 percent confidence interval from 2.0 to 6.2. Without the reflector, the estimated gain is 1.6 dB and the interval includes zero.

Now keep refinement and change the global search. The swarm finishes 1.6 dB ahead of the genetic algorithm at priority P5, with a p-value of 0.10. The evidence for refinement with the reflector is stronger than the evidence for a particular global search.

### 84. Placement: scaling with AP count in Office

Use the right-hand panels to find the first access-point count where priority P5 clears minus 65 dBm. In the Office, both refined global searches cross at two access points with the reflector and three without. The genetic search clears the two-AP threshold by only 0.2 dB. Swarm search alone needs three in either case. At higher counts both designs can pass, and the reflector's benefit shows up as extra margin.

### 85. Placement: HRBB, P5 versus AP count

Which locations we score changes the answer in HRBB. For the central priority block, one access point plus a reflector clears the target on the seed mean, with only 0.7 dB to spare. Two access points are needed without it. Across the entire floor, P5 crosses at two access points with the reflector and three without. A transmitter inside the central room already reaches much of that priority area, so the reflector's priority gain shrinks as more access points are added.

### 86. Placement: coverage maps of four methods

All four Office layouts use three access points and one reflector on the north wall. In the first map, the swarm puts two transmitters near corridor junctions and the reflector toward the west. In the other maps the reflectors sit east of center. Look at the weak rooms as well as the red transmitter markers. The genetic layout leaves weaker coverage in the west, weighted k-means leaves shadows in the southeast, and the random layout leaves weaker rooms in the east.

### 87. Placement: model approximations, implementation

The placement maps add path powers incoherently. That approximates a spatial average over small-scale fading. At a particular receiver, the phases can reinforce or cancel. We also approximate each tile as a planar reflector and omit diffraction at its edges. A full-wave comparison or measurements would let us quantify both effects.

On the implementation side, loading a scene takes about a second and a map takes about a tenth of a second. Reusing each worker's scene matters when one optimization run needs 1,780 maps.
