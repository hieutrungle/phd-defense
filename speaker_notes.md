# Speaker notes and timing

Total: 42.00 min, 63 timed slides (window 40-45 min, pace <= 140 wpm).

| # | slide | min | window | words | wpm |
|---|---|---|---|---|---|
| 1 | title | 1.25 | 0:00-1:15 | 151 | 121 |
| 2 | Outline | 0.25 | 1:15-1:30 | 28 | 112 |
| 3 | About me | 0.5 | 1:30-2:00 | 61 | 122 |
| 4 | Professional experience | 0.5 | 2:00-2:30 | 51 | 102 |
| 5 | Sponsored research | 0.25 | 2:30-2:45 | 29 | 116 |
| 6 | Growing demand points to mmWave bandwidth | 0.5 | 2:45-3:15 | 47 | 94 |
| 7 | More bandwidth at mmWave, but less coverage | 0.5 | 3:15-3:45 | 50 | 100 |
| 8 | Target applications: dense, shielded indoor environments | 0.5 | 3:45-4:15 | 65 | 130 |
| 9 | Indoor mmWave links are blocked by structure | 0.5 | 4:15-4:45 | 64 | 128 |
| 10 | The CSI bottleneck: pilots grow with elements × users | 0.75 | 4:45-5:30 | 91 | 121 |
| 11 | Electronic RIS vs. metallic reflector arrays | 0.75 | 5:30-6:15 | 89 | 119 |
| 12 | Dissertation goal and research questions | 1 | 6:15-7:15 | 104 | 104 |
| 13 | Hardware: metallic linear Fresnel reflector (LFR) arrays | 0.75 | 7:15-8:00 | 83 | 111 |
| 14 | Bisector rule: each tile normal splits AP and user directions | 1 | 8:00-9:00 | 110 | 110 |
| 15 | Ray-traced testbed: Blender scenes + NVIDIA Sionna RT | 0.5 | 9:00-9:30 | 59 | 118 |
| 16 | Geometric beam-focusing in NLOS hallways at 28 GHz | 0.5 | 9:30-10:00 | 60 | 120 |
| 17 | L-shaped hallway: beam-focusing +53.0 dB path gain at the UE | 0.75 | 10:00-10:45 | 83 | 111 |
| 18 | T-shaped hallway: beam-focusing +87.5 dB path gain at the UE | 0.75 | 10:45-11:30 | 82 | 109 |
| 19 | Beam-focusing follows the UE: L- and T-shaped hallways | 0.5 | 11:30-12:00 | 54 | 108 |
| 20 | Limits of the geometric rule motivate learned control | 0.75 | 12:00-12:45 | 93 | 124 |
| 21 | Focal-point abstraction: a segment is steered by 3 coordinates | 0.75 | 12:45-13:30 | 88 | 117 |
| 22 | MA-MDP: each agent moves the focal point of one segment | 1.25 | 13:30-14:45 | 142 | 114 |
| 23 | Flat MARL in motion: fixed columns, moving focal points | 0.75 | 14:45-15:30 | 85 | 113 |
| 24 | Training with MAPPO under CTDE | 0.75 | 15:30-16:15 | 92 | 123 |
| 25 | Setup: 60 GHz L-shaped hallway with three users | 0.5 | 16:15-16:45 | 52 | 104 |
| 26 | Multi-agent decomposition trains faster and higher | 0.5 | 16:45-17:15 | 64 | 128 |
| 27 | Multi-agent focusing: +20.7 dB over a static flat reflector | 1.25 | 17:15-18:30 | 139 | 111 |
| 28 | Robustness: user count | 0.5 | 18:30-19:00 | 56 | 112 |
| 29 | Robustness: array size | 0.5 | 19:00-19:30 | 52 | 104 |
| 30 | Robustness: user-position noise | 0.5 | 19:30-20:00 | 63 | 126 |
| 31 | Why flat MARL is not enough: a fixed tile-to-user assignment | 0.75 | 20:00-20:45 | 89 | 119 |
| 32 | From fixed assignment to learned allocation | 0.5 | 20:45-21:15 | 58 | 116 |
| 33 | Two-timescale hierarchy: slow allocation, fast focusing | 0.75 | 21:15-22:00 | 86 | 115 |
| 34 | The hierarchy in motion: reassign every T slots, refocus every slot | 0.75 | 22:00-22:45 | 87 | 116 |
| 35 | HMA-MDP: one objective, a reward for each timescale | 0.75 | 22:45-23:30 | 98 | 131 |
| 36 | Training under CTDE, with a geometric warm start | 0.5 | 23:30-24:00 | 65 | 130 |
| 37 | Setup: ray-traced conference room and six controllers | 1 | 24:00-25:00 | 115 | 115 |
| 38 | Training: the warm-started allocator converges highest | 0.5 | 25:00-25:30 | 67 | 134 |
| 39 | Deployment with moving users (4 users) | 1.25 | 25:30-26:45 | 139 | 111 |
| 40 | Where the energy goes (4 users) | 0.5 | 26:45-27:15 | 58 | 116 |
| 41 | How often to reallocate? An interior optimum at T=10 slots (4 users) | 0.5 | 27:15-27:45 | 62 | 124 |
| 42 | What allocation buys, and what it cannot fix | 0.5 | 27:45-28:15 | 62 | 124 |
| 43 | Can a passive reflector replace an access point? | 0.75 | 28:15-29:00 | 84 | 112 |
| 44 | Two floorplans with operator-defined priority maps | 0.5 | 29:00-29:30 | 63 | 126 |
| 45 | Design vector: AP poses, wall position, focal points | 0.75 | 29:30-30:15 | 96 | 128 |
| 46 | Objective: soft worst case plus floor-wide coverage | 0.5 | 30:15-30:45 | 63 | 126 |
| 47 | Two-phase method: PSO search, then gradient refinement | 0.75 | 30:45-31:30 | 93 | 124 |
| 48 | Intuition: a swarm of layouts, then gradient refinement | 0.75 | 31:30-32:15 | 92 | 123 |
| 49 | Compared methods and evaluation protocol | 0.5 | 32:15-32:45 | 66 | 132 |
| 50 | Convergence of a representative run | 0.75 | 32:45-33:30 | 88 | 117 |
| 51 | At three APs, the reflector raises priority P5 by 4.8 dB | 1.25 | 33:30-34:45 | 136 | 109 |
| 52 | Office: with the reflector, one fewer AP meets the target (seed mean) | 0.5 | 34:45-35:15 | 58 | 116 |
| 53 | HRBB: the same one-AP shift, with a smaller margin | 0.5 | 35:15-35:45 | 60 | 120 |
| 54 | Coverage maps and limitations | 0.75 | 35:45-36:30 | 93 | 124 |
| 55 | The complete picture | 0.75 | 36:30-37:15 | 96 | 128 |
| 56 | Limitations and next steps | 0.5 | 37:15-37:45 | 62 | 124 |
| 57 | Five questions, answered | 1.25 | 37:45-39:00 | 144 | 115 |
| 58 | What comes next: the FORMULA3 project | 0.75 | 39:00-39:45 | 87 | 116 |
| 59 | The device FORMULA3 will use: a mechanical reflector array | 0.5 | 39:45-40:15 | 58 | 116 |
| 60 | How this dissertation feeds into FORMULA3 | 0.75 | 40:15-41:00 | 87 | 116 |
| 61 | Publications from this dissertation | 0.5 | 41:00-41:30 | 50 | 100 |
| 62 | Other publications during the Ph.D. | 0.25 | 41:30-41:45 | 26 | 104 |
| 63 | Thank you | 0.25 | 41:45-42:00 | 32 | 128 |

## 1. title  [1.25 min | 0:00-1:15]

Good morning, everyone. My name is Hieu T. Le, and I'm a Ph.D. candidate in electrical engineering at Texas A&M University. Thank you for joining me for my dissertation defense.

I'd like to begin by thanking my committee. Professor Sabit Ekin, thank you for chairing my committee and for guiding my research throughout my Ph.D. Professor Jian Tao, thank you for your advice and support as my co-chair. Professor Erchin Serpedin and Professor Arya Menon, thank you both for serving on my committee and for the time you've taken to review my dissertation.

My dissertation is titled Spatial Intelligence for Smart Radio Environments . It starts with a familiar problem. A user walks around a corner, and a wall blocks the direct signal. If we know where the user is, how can we steer a metallic reflector to reach them? And where should we install that reflector in the first place?

## 2. Outline  [0.25 min | 1:15-1:30]

I'll start with the physics of one reflection. Then I'll add several users, let them move, and finally step back to ask where we should install the hardware.

## 3. About me  [0.5 min | 1:30-2:00]

My research focuses on smart radio environments. I study how we can use a room's geometry and the users' positions to steer radio waves with metallic reflectors. Ray tracing lets me model the paths through the room. I use reinforcement learning to steer an installed reflector as users move, and optimization to choose where the access points and reflectors should go.

## 4. Professional experience  [0.5 min | 2:00-2:30]

I've worked on this research at Texas A&M since 2021. Along the way, I worked at the High Performance Computing Center, interned at Qualcomm in San Diego, and joined Uber's Rider Pricing and Incentives team for a summer. After graduation, I'll return to Uber as a machine learning engineer in 2027.

## 5. Sponsored research  [0.25 min | 2:30-2:45]

I'd like to acknowledge the Department of Energy's Early Career Research Program and the National Science Foundation. Both supported this research, and their award numbers are on the slide.

## 6. Growing demand points to mmWave bandwidth  [0.5 min | 2:45-3:15]

Consider an augmented reality headset. Sending more data over its wireless link requires more bandwidth, better signal quality, or both. Millimeter-wave bands are attractive because they offer wide, contiguous channels. The challenge comes when the person wearing that headset walks out of the transmitter's line of sight.

## 7. More bandwidth at mmWave, but less coverage  [0.5 min | 3:15-3:45]

On this chart, the high-frequency bands offer the widest channels and the shortest coverage. At millimeter-wave frequencies, a wall can attenuate the direct signal enough to erase the benefit of that extra bandwidth. That led me to ask whether we could change the path the signal takes through the building.

## 8. Target applications: dense, shielded indoor environments  [0.5 min | 3:45-4:15]

Data centers need high-speed links between racks. In nuclear facilities, sensors send readings from behind thick shielding. In industrial plants, robots need to stay connected as they move between machines.

In all three settings, a wall or a piece of equipment can block the direct path, even over a short distance. To reach those non-line-of-sight users, we need another path. A reflector can provide one.

## 9. Indoor mmWave links are blocked by structure  [0.5 min | 4:15-4:45]

The green square marks the user. The dashed line shows why the signal is weak there. The wall blocks the direct path from the access point.

We could install a second access point around the corner to cover that hallway. Or we could use our reflector at the bend. The green arrows show how it redirects the signal toward the user to improve coverage.

## 10. The CSI bottleneck: pilots grow with elements × users  [0.75 min | 4:45-5:30]

Watch the orange part of the bar on the left. It represents time spent sending pilots to estimate channel state information, or CSI. In this example, the controller estimates a channel through each surface element to each user. As the grid gets finer, that number grows as elements times users. The channel is stable for only a limited time, so the green part available for data shrinks.

On the right, adding tiles still leaves us with the same three user positions. That's the information our controller uses to steer the surface.

## 11. Electronic RIS vs. metallic reflector arrays  [0.75 min | 5:30-6:15]

An electronic reconfigurable intelligent surface, or RIS, steers a wave by changing the phase response of its elements. The array on the right steers it by physically turning metal tiles. Each tile is large compared with the wavelength, so we can calculate its orientation using the law of reflection.

This changes the engineering trade-off. The tiles need power to move and can hold their position afterward. Mechanical motion takes time, so slowly changing indoor links are a natural starting point. Steering also depends on knowing where the users are.

## 12. Dissertation goal and research questions  [1 min | 6:15-7:15]

There are two different engineering decisions in this diagram. On the left, before installation, we have a building model. We need to choose where the access points and the reflector go. On the right, the hardware is already on the wall and a user moves. We need to decide where to aim next.

Both decisions use a focal point, a location in space toward which we steer the reflected signal. I'll first show how geometry turns that point into tile angles. Then I'll cover control and placement. I evaluate these stages separately in simulation. The dashed link is the experiment that would connect them.

## 13. Hardware: metallic linear Fresnel reflector (LFR) arrays  [0.75 min | 7:15-8:00]

Think of each metal tile as a small, steerable mirror for radio waves. It rotates about two axes. The top view on the left shows why neighboring tiles need slightly different angles. They see the access point and the receiver from slightly different positions.

For the first study, we modeled a linear Fresnel reflector array with seventy square tiles. Each tile is twenty centimeters on a side. Here we let them rotate freely so we can measure what the geometry alone can achieve.

## 14. Bisector rule: each tile normal splits AP and user directions  [1 min | 8:00-9:00]

Pick one tile along the wall. From its center, draw one line toward the access point and another toward the user. The dashed line halfway between them is the tile normal, the direction perpendicular to its face. With that orientation, the incoming and outgoing angles are equal. That's the bisector rule.

As the user moves, each tile computes its own normal, and the reflected rays meet at the user's new position. Now watch for a red tile. Its required angle has passed the thirty-degree servo limit. The tile stops turning, and you can see its ray miss the user. That is a physical constraint the controller will have to respect.

## 15. Ray-traced testbed: Blender scenes + NVIDIA Sionna RT  [0.5 min | 9:00-9:30]

We test that construction in a ray tracer. Blender defines the walls, users, access point, and tile orientations. We use the ITU material model to specify how permittivity and conductivity vary with frequency. NVIDIA Sionna RT then traces paths through the scene. That gives us path gain here and, later, the received power we use to train the controllers.

## 16. Geometric beam-focusing in NLOS hallways at 28 GHz  [0.5 min | 9:30-10:00]

Our first experiment is a 28 gigahertz downlink to one user. The green markers are the nine receiver locations we test in each hallway. We compare three configurations at the same locations. We leave the corner empty, install tiles all set to 45 degrees, or aim each tile using the bisector rule. The T-shaped hallway needs two reflectors in sequence.

## 17. L-shaped hallway: beam-focusing +53.0 dB path gain at the UE  [0.75 min | 10:00-10:45]

Find the green receiver marker near the bottom of each map. Its position is identical in all three. With the corner empty, very little power reaches that point. Setting every tile to 45 degrees sends some energy down the hall. In the rightmost map, aiming the tiles individually brings the bright band through the receiver.

At that location, focusing improves path gain by 53 decibels over the empty corner. Even against the simple reflector in the middle, the gain is about 27 decibels.

## 18. T-shaped hallway: beam-focusing +87.5 dB path gain at the UE  [0.75 min | 10:45-11:30]

In the T-shaped hallway, the receiver sits in the side branch. Follow the bright band in the rightmost map. The first array directs energy toward the second, and the second turns it into the branch. We apply the same reflection rule twice.

The starting link here is especially weak, about minus 156 decibels of path gain. Focusing brings it to about minus 69. That gives the 87.5 decibel improvement in the title. Against two simple reflectors, the improvement is about 40 decibels.

## 19. Beam-focusing follows the UE: L- and T-shaped hallways  [0.5 min | 11:30-12:00]

Follow the green receiver in either video. At each new position we recalculate the tile angles, and the bright band moves with it. On the left, one reflection reaches around the corner. On the right, it takes two. Each frame is a separate static solution with a known user position and unrestricted tile rotation.

## 20. Limits of the geometric rule motivate learned control  [0.75 min | 12:00-12:45]

Geometry answers a specific question. If I know where one receiver is and the tiles can turn far enough, I know how to direct a path toward it. A real panel has limits, as we saw when the tiles turned red. And if three users share the panel, aiming everything at one of them leaves the other two out of the decision.

I'll keep the bisector rule for setting tile angles. The decision I want to learn is where each part of the array should aim to improve received power across the users.

## 21. Focal-point abstraction: a segment is steered by 3 coordinates  [0.75 min | 12:45-13:30]

Follow the blue crosshair in the top view. It's a virtual focal point, a target we are free to move in three dimensions. Its height is shown by the size of the ring. In the front view, watch the blue tiles turn as that point moves. Each tile computes its own angle, but all the blue tiles aim at the same target.

That's the control interface. With three segments, we choose just nine focal coordinates. The bisector rule converts those into the 126 angles of the 63 tiles.

## 22. MA-MDP: each agent moves the focal point of one segment  [1.25 min | 13:30-14:45]

Consider one control step from the point of view of the blue segment. Its agent observes three positions. The first tells it where its assigned user is. The other two tell it where its segment sits and where it is aiming now. Its action is a displacement of the focal point in three dimensions. We bound each component of that displacement, keep the focal point within its allowed region, and clip the resulting tile angles to the servo limits.

We formulate this as a cooperative multi-agent Markov decision process. During training, all agents get the same reward, the mean received signal strength across the users. A move that helps one user can therefore affect the reward for the whole team. At deployment each agent chooses its move from local positions. The user assigned to that segment stays fixed for this first controller.

## 23. Flat MARL in motion: fixed columns, moving focal points  [0.75 min | 14:45-15:30]

Watch user one and the blue crosshair in the hallway. When the user moves, the dashed box shows how far the agent can move its focal point in one step. The reflected beam follows as the tiles turn.

Now look at the front of the array on the right. Columns one, four, and seven stay blue throughout. Their angles change, but they always serve user one. This animation illustrates the distinction between learning where a segment should aim and deciding which user it should serve.

## 24. Training with MAPPO under CTDE  [0.75 min | 15:30-16:15]

We train the agents with multi-agent proximal policy optimization, or MAPPO. The diagram shows centralized training with decentralized execution. During training, a shared critic sees every user's position, every segment center, and every focal point. It helps estimate whether a move produced a better return than expected while the other agents were also learning.

In the objective below, clipping limits the incentive for a large policy update. The value loss trains the critic, and the entropy bonus encourages exploration. At deployment, each segment runs its own actor using only its local observation.

## 25. Setup: 60 GHz L-shaped hallway with three users  [0.5 min | 16:15-16:45]

Here is the 60 gigahertz hallway we use to evaluate the controller. The access point transmits at five dBm. The 63-tile reflector sits at the corner, and the three users share the shadowed region beyond the wooden obstacle. We start each training episode with random tile angles inside the thirty-degree servo range.

## 26. Multi-agent decomposition trains faster and higher  [0.5 min | 16:45-17:15]

All three curves show training reward. The blue curve rises fastest and settles near 42. This controller gives each user an agent and lets each tile take the angle its focal point requires. One agent steering all focal points finishes near 27. So does the simpler array that shares one azimuth per column. The next question is what that difference buys in received power.

## 27. Multi-agent focusing: +20.7 dB over a static flat reflector  [1.25 min | 17:15-18:30]

The pink dots mark the users. Compare the second map, the static flat reflector, with the fifth, multi-agent focusing. The flat panel sends energy down the hallway. With learned focusing, you can see narrower bands passing through the users.

The values beneath the maps give the average RSSI, the received signal strength indicator, in dBm. The flat reflector gives minus 90.1 dBm, and multi-agent focusing gives minus 69.4 dBm. That's a 20.7 decibel improvement. Giving one agent control of all the focal points is a closer comparison. The multi-agent controller gains about 4.8 decibels there.

In the video, users change position every four simulation steps. That leaves three steps for adjustment, and the controller typically recovers within one. These comparisons cover static reflectors and learned controllers. A geometric controller that continuously tracks the users would be a separate benchmark.

## 28. Robustness: user count  [0.5 min | 18:30-19:00]

Now we measure RSSI at the users and average it over 300 steps. We trained the policy with three users, then ran it with two, three, and four users using the same weights. Going from two users to four costs about one decibel on average. Each user now shares the same reflector aperture with more people.

## 29. Robustness: array size  [0.5 min | 19:00-19:30]

This time we keep the users and change the size of the reflector. Going from 45 tiles to 99 raises average RSSI by about 1.6 decibels, with smaller gains as we add more tiles. We can reuse the same policy across these sizes because its action is still a three-dimensional focal-point move.

## 30. Robustness: user-position noise  [0.5 min | 19:30-20:00]

How accurate do the user positions need to be? Here we add Gaussian error to the positions and train at the same noise level we use for evaluation. The dashed lines show average RSSI. At a standard deviation of thirty centimeters, we're within about half a decibel of the noise-free case. At fifty centimeters and one meter, the loss is about 4.6 decibels.

## 31. Why flat MARL is not enough: a fixed tile-to-user assignment  [0.75 min | 20:00-20:45]

In this hallway, the blue columns span the width of the array. The green and orange columns do too. We tried a second grouping and got the same average RSSI, minus 67.6 dBm. So these two ways of dividing this particular panel made little difference.

Now imagine putting one panel on each of two different walls. From one wall a segment might have a clear path to a user, while from the other it faces a sharp turn. In that room, who gets which segment becomes a meaningful decision.

## 32. From fixed assignment to learned allocation  [0.5 min | 20:45-21:15]

With two arrays in different corners, there are two coupled decisions. Choosing a user for a segment is discrete. Moving its focal point is continuous and limited by the servos. Four segments can each choose any of four users, giving 256 joint assignments. Several segments can choose the same person and leave someone else relying on residual multipath.

## 33. Two-timescale hierarchy: slow allocation, fast focusing  [0.75 min | 21:15-22:00]

Read the timeline as two clocks. The upper clock belongs to the allocator. It sees the user positions, segment centers, and current focal points, then assigns one user to each segment. That assignment holds until the next upper tick. The diagram uses four slots to make the timing visible. The experiments use ten.

The lower clock ticks every slot. Each segment updates its aim using its assigned user's position, its own center, and its current focal point. Between allocation decisions, it can track that user independently.

## 34. The hierarchy in motion: reassign every T slots, refocus every slot  [0.75 min | 22:00-22:45]

Pick one of the three users. Its color tells you which segments are serving it, and the crosshair shows where a segment is aiming. As the user moves, the segment can adjust that aim every slot.

Watch the upper row of the timeline. At each mark, ten slots apart, the allocator can change the assignment. When a segment changes color, its beam turns toward a different user. This animation uses a position-based rule to illustrate the timing. The next slide shows how we train the two levels.

## 35. HMA-MDP: one objective, a reward for each timescale  [0.75 min | 22:45-23:30]

On the left, the allocator scores an assignment across all users. We average a log utility over the users. Because that utility has diminishing returns, improving a weak signal can earn more reward than adding the same decibel to an already strong signal. We accumulate the discounted reward over the slots for which the assignment holds.

On the right, each segment gets feedback every slot. It earns credit for its user's received power and for improvement since the last slot. If the proposed move would take even one tile beyond its servo limit, the segment holds its position.

## 36. Training under CTDE, with a geometric warm start  [0.5 min | 23:30-24:00]

The segment agents still train with MAPPO. The allocator uses PPO and scores the candidate users for each segment. Early in training, we add a geometric compatibility prior to those scores, the logits. Shorter distances and smaller bend angles get more weight. We then set the prior's weight to zero. That gives us a way to guide early exploration while keeping the reward objective fixed.

## 37. Setup: ray-traced conference room and six controllers  [1 min | 24:00-25:00]

The access point is outside this conference room. The wall blocks the direct path, and the two corner reflectors give us four steerable segments. We keep the 60 gigahertz carrier and the thirty-degree servo limit. Users stay still within each training episode. At evaluation, two or four users move thirty centimeters every slot for 300 slots.

The first three rows isolate the role of geometry. We compare a learned allocator with the geometric warm start, the same allocator trained without it, and the geometric rule on its own. The remaining rows give us fixed assignments, a single controller steering all focal points, and random assignments. The centralized controller also uses a different reward and learner.

## 38. Training: the warm-started allocator converges highest  [0.5 min | 25:00-25:30]

The blue curve shows training with a geometric prior. We add a term to each assignment score that favors shorter distances and smaller bend angles. At episode one thousand, we set the prior's weight to zero.

The advantage persists. With four users, blue finishes at 46 reward points. The purple curve, trained without the prior, finishes near 33. With two users, the gap is about five points.

## 39. Deployment with moving users (4 users)  [1.25 min | 25:30-26:45]

Now the four users are moving. The vertical axis is received signal strength, so higher is better. Follow the red curve first. Each segment can still steer, but it keeps the same user even when the path to that user deteriorates. The learned allocator, in blue, can reassign the segment as the geometry changes.

The four-user column gives the averages over the run. The fixed assignment gives about minus 72.5 dBm. The learned assignment gives about minus 66.6. That's nearly six decibels, and the blue trace also fluctuates less.

The closest competitor is the geometry-only rule. It can change assignments too, but neighboring segments can independently select the same user. The learned allocator finishes about 1.9 decibels ahead of that rule. The maps on the next slide show where the reflected energy goes in one of those time slots.

## 40. Where the energy goes (4 users)  [0.5 min | 26:45-27:15]

The pink dots are the four users at the same instant, slot 294. On the left, the bright bands from the warm-started controller pass through the users. In the middle, training without the prior gives a wider spread. On the right, the centralized controller shows less focusing. The video lets you follow those beams as the users move.

## 41. How often to reallocate? An interior optimum at T=10 slots (4 users)  [0.5 min | 27:15-27:45]

How often should we reconsider the assignment? If it can change every slot, the local agent can mistake a new user for a sudden jump in position. At the other extreme, a hundred-slot interval gives the allocator just one decision per episode. Ten slots, the blue curve, gave the highest reward here. The two longest intervals were still improving when training ended.

## 42. What allocation buys, and what it cannot fix  [0.5 min | 27:45-28:15]

In this room, learning who serves whom improved four-user mean RSSI by nearly six decibels over a fixed assignment. Adding hardware at the same site gave a smaller return in a separate two-user test. Going from 45 tiles to 99 raised the median by about 1.3 decibels. That suggests a different design question. What if we can choose the mounting site itself?

## 43. Can a passive reflector replace an access point?  [0.75 min | 28:15-29:00]

Suppose we're planning Wi-Fi for a building before any hardware goes in. We can choose the access point locations, where to mount one reflector, and how to orient its tiles. In this study the carrier is 5.18 gigahertz, and the tile settings stay fixed after installation.

I'll ask two questions. With the same number of access points, can the reflector improve coverage in the rooms that need it most? And if it does, can we meet the coverage target with one fewer access point?

## 44. Two floorplans with operator-defined priority maps  [0.5 min | 29:00-29:30]

In the Office floor plan, the high-priority rooms sit along the perimeter. In the HRBB lab, they form a central block. The colored maps tell the optimizer which rooms to emphasize. We evaluate the actual signal strength there. Our target is a fifth percentile, or P5, of minus 65 dBm. That means roughly 95 percent of priority locations reach that level or higher.

## 45. Design vector: AP poses, wall position, focal points  [0.75 min | 29:30-30:15]

A candidate layout specifies where each ceiling access point sits and which way it points. It also specifies where the reflector sits on a preselected wall. We can move the panel along that wall and change its aim.

The two blue points in the diagram determine that aim. For each tile, we use one point as a virtual source and the other as a virtual target. The tile normal bisects those two directions. Six coordinates specify the orientation of all 63 tiles, so the optimizer can search over the entire panel without choosing 126 angles individually.

## 46. Objective: soft worst case plus floor-wide coverage  [0.5 min | 30:15-30:45]

Imagine a layout with strong coverage in the corridor and a weak signal in a priority room. A floor average can hide that room. We take the strongest access point at each location, convert weak power into a penalty, and use a weighted, smooth approximation to the worst penalty. A smaller, floor-wide term rewards layouts that bring more locations above the service threshold.

## 47. Two-phase method: PSO search, then gradient refinement  [0.75 min | 30:45-31:30]

Moving an access point a short distance along a corridor can open a path through a doorway. On one side of that doorway, a local gradient has little information about the layout on the other side. That's why we start with a global search.

We use particle swarm optimization, or PSO. Each particle represents a complete layout, and a ray-traced power map gives it a score. Then we take the best layout and refine it with Adam, using gradients through the ray tracer. A run takes about three minutes of serial GPU work.

## 48. Intuition: a swarm of layouts, then gradient refinement  [0.75 min | 31:30-32:15]

Follow one color on the floor plan. Its three access point markers belong to one candidate layout, together with a reflector position and a focal target. The hollow rings mark that particle's best positions so far. The large access point symbols show the swarm's best layout, and the heat map belongs to that layout.

When the second phase lights up, only the best layout is being refined. Watch the small movements on the map and the objective on the right. This animation uses a simplified propagation model to show the search process.

## 49. Compared methods and evaluation protocol  [0.5 min | 32:15-32:45]

We test both floor plans with one to seven access points, with and without the reflector, using five random seeds per configuration. The comparisons isolate different choices. A genetic algorithm replaces the swarm. Swarm search alone removes refinement. Weighted k-means places access points by distance and priority, ignoring walls. We also compare random layouts with and without refinement. Each method runs at its own computational cost.

## 50. Convergence of a representative run  [0.75 min | 32:45-33:30]

This is one run in the Office with three access points and a reflector. On the left, a lower objective is better. The genetic algorithm leads early, then levels off. The swarm catches it around iteration 36.

On the right, higher is better because the vertical axis is the fifth percentile of received power. At the dotted line, the swarm search ends. Refining its best layout lifts P5 from about minus 61 to minus 57 dBm. The flat swarm-only trace shows where the same search would have stopped.

## 51. At three APs, the reflector raises priority P5 by 4.8 dB  [1.25 min | 33:30-34:45]

Start with the priority rooms in the top half of the table. We keep three access points and average over five runs. With the access points alone, the fifth percentile is minus 62.1 dBm. When we optimize the reflector and access points together, it rises to minus 57.3. The gain is 4.8 decibels, with a 95 percent confidence interval from 3.1 to 6.5.

The weakest priority location gains even more, about 9.5 decibels. The floor-wide statistics below also improve. So the benefit reaches the locations we set out to help.

The bars on the right ask a different question. How much does the same reflector help under different planning methods? The two methods combining global search and gradient refinement show the largest gains. With five runs, the data don't establish a difference between those two methods.

## 52. Office: with the reflector, one fewer AP meets the target (seed mean)  [0.5 min | 34:45-35:15]

The dashed line is our coverage target. In the Office, follow the swarm-plus-refinement curve across the two panels. Without the reflector it takes three access points to cross that line. With the reflector, two are enough on average. At two access points, four of five runs met the target with the reflector. One of five met it without.

## 53. HRBB: the same one-AP shift, with a smaller margin  [0.5 min | 35:15-35:45]

In the lab, one access point plus the reflector reaches minus 64.3 dBm on average. That's just 0.7 decibels above the target. Without the reflector, the mean crosses the line at two access points. At one access point, three of five runs succeeded with the reflector and none without. With five runs, that difference in success counts is statistically inconclusive.

## 54. Coverage maps and limitations  [0.75 min | 35:45-36:30]

The red dots show where the access points ended up. In the left map, two sit near corridor junctions, where paths can reach several rooms through doorways. The right map uses weighted k-means. A nearby access point can still be on the wrong side of a wall, as the darker southeast rooms illustrate.

These are strongest-server power maps. They tell us about coverage. To translate one fewer access point into a deployment decision, we'd also need interference, traffic demand, and installed cost. We tested two floor plans with one candidate wall on each.

## 55. The complete picture  [0.75 min | 36:30-37:15]

Read this map in the order an engineer would use it. Before installation, the site model helps choose access point and reflector locations. In the Office, that choice raised the fifth percentile in priority rooms by 4.8 decibels with three access points. Once the hardware is installed, the decision changes. As users move, the controller chooses who each segment serves and where it aims.

The common interface is the focal point. The planning and control results come from separate experiments at different frequencies. The dashed arrow is how we would connect them in a single deployment.

## 56. Limitations and next steps  [0.5 min | 37:15-37:45]

All the results I've shown come from ray tracing. We evaluated path gain or received power, and the tiles steer directions without controlling phase. Two comparisons would be particularly informative next. One is to run geometric tracking and learned control on the same moving users. The other is to operate a jointly planned layout on real hardware and measure rate under interference.

## 57. Five questions, answered  [1.25 min | 37:45-39:00]

I'll return to the user around the corner. If we know where that user is, the bisector rule tells us how to orient a tile. A focal point lets us use that same construction even when the best place to aim is a decision we need to learn.

With several users, we can learn a local steering policy for each segment. When the segments see the room from different angles, it also pays to learn their assignments. Before installation, when the building is known and the mounting sites are still open, we can optimize the layout directly.

Across these studies, the reflector decisions use positions at run time or a site model at planning time. The price of avoiding per-element channel estimation is that localization and model accuracy now matter. The next test is to bring placement and control together in a physical room.

## 58. What comes next: the FORMULA3 project  [0.75 min | 39:00-39:45]

One opportunity to run that test is FORMULA3. It's a collaboration across five universities in the United States and Finland, supported by the National Science Foundation and the Research Council of Finland. The project combines electronic reconfigurable surfaces with mechanically steerable metal reflectors.

The hexagonal panel on the right is where this dissertation connects to that effort. We already have a way to convert a desired focal point into tile orientations. A physical panel lets us test how well that geometry predicts the signal in a room.

## 59. The device FORMULA3 will use: a mechanical reflector array  [0.5 min | 39:45-40:15]

In the front photo you can see the nineteen hexagonal metal tiles. In the back photo you can see the wiring for the servos that turn them. The controller is mounted on the stand, so the array can be moved around a room. This is the prototype that FORMULA3 will use to test ideas evaluated here in simulation.

## 60. How this dissertation feeds into FORMULA3  [0.75 min | 40:15-41:00]

The four rows show what the project can build on. The ray-tracing pipeline can generate channel data for scenes with metallic reflectors. The learned controllers can use that data to study when to redirect a beam or reassign a user. The localization experiments tell us what accuracy to aim for when sensing supplies the user positions.

The final row brings those pieces into a room. With a movable panel, we can test a planned mounting location and measure what happens when the controller actually turns the tiles.

## 61. Publications from this dissertation  [0.5 min | 41:00-41:30]

The geometric focusing study appeared at the 2024 Vehicular Technology Conference. Our multi-agent control study appeared in IEEE Transactions on Machine Learning in Communications and Networking. The hierarchical work also has a conference paper accepted at GLOBECOM. The slide lists the related submissions under review, including the joint placement study.

## 62. Other publications during the Ph.D.  [0.25 min | 41:30-41:45]

During my Ph.D., I also contributed to eight papers beyond the reflector work. They include scientific data compression, machine-learning accelerators, and digital twins for first responders.

## 63. Thank you  [0.25 min | 41:45-42:00]

Thank you to my committee, especially Professors Ekin and Tao, and to my collaborators, Mostafa Ibrahim and Oguz Bedir. Thank you all for your time. I'd be happy to take your questions.

## Backup slides for questions

### 64. Research and technical innovation

Four decisions connect the studies. Geometry tells us how to turn a tile. A local policy chooses where a segment aims. A higher-level policy decides which user that segment serves. The placement optimizer chooses where the access points and reflector go before operation begins. Focal points give all four methods a way to specify the reflection they want.

### 65. L-shaped hallway: RSSI at nine UE locations

The horizontal axis indexes nine receiver locations around the corner. The purple curve is geometric focusing, and the blue curve is the free-space reference for the same ten-watt transmitter. Focusing gives the strongest received signal at all nine locations. A plausible explanation is the size of the reflecting aperture. The tiles intercept energy over a 1.4 by 2 meter surface and redirect it toward one receiver.

### 66. T-shaped hallway: RSSI at nine UE locations

At all nine positions in the T-shaped hallway, focusing gives the strongest signal among the reflector configurations. At positions two and five, the free-space reference is still higher. The bisector rule aligns the directions of the reflected paths. Their lengths can differ, so their phases can differ at the receiver. That's a possible explanation for the dips. A phase-resolved comparison would be needed to test it.

### 67. ITU-R P.2040 material model

We use ITU Recommendation P.2040 to assign electrical properties to the scene materials. The two equations give relative permittivity and conductivity as functions of carrier frequency. For example, the concrete permittivity here is constant, while its conductivity increases with frequency. The first hallway uses concrete for its walls, ceiling, and floor. The 60 gigahertz study also models plasterboard, ceiling board, and a wooden obstacle.

### 68. bisector rule in 3D: tile elevation and azimuth

Start at point A, the center of a tile. Form a unit vector toward the access point and another toward the receiver. Their sum points along the required surface normal. Its direction gives the two angles the tile needs. With focal-point control, we use the virtual target in place of the receiver when we form the second vector.

### 69. MAPPO hyperparameters (flat MARL)

The actor and critic each have two hidden layers with 256 neurons per layer. We collect a thousand on-policy transitions at a time and update in minibatches of 200. PPO uses a clipping parameter of 0.2, and Adam uses a constant learning rate of two times ten to the minus four. Each training run lasts three thousand episodes.

### 70. Tile grouping and reward normalization

The left plot compares two ways of grouping the same 63 tiles. Interleaved columns and a staggered pattern both give minus 67.6 dBm on average. On the right we change how strongly distance weights the reward during training. The average RSSI varies by only 0.38 decibels across the three exponents. These are sensitivity checks for the three-user hallway.

### 71. Flexible across user counts: the same ranking with 2 users

For two users we trained the same hierarchical architecture with the appropriate number of assignments. Four segments now have sixteen possible assignments, and most serve both users. The warm-started allocator leads again, by 1.14 decibels over the geometric rule and 2.59 over the centralized controller. In the video, you can see the four segments redirect their beams as the two users move.

### 72. Operating regime: aperture (2 users)

At the midpoint of these cumulative distributions, going from 45 tiles to 99 buys about 1.3 decibels. The 63-tile array already captures about two thirds of that gain. One constraint here is that a move must be feasible for every tile in the segment. Adding tiles increases the aperture, but it can also give the segment more servo limits to satisfy.

### 73. Operating regime: localization (2 users)

These curves show the two-user controller trained and tested at matching levels of position error. Around ten centimeters of error, performance stays close to the noise-free case. By thirty to fifty centimeters, we lose several decibels. The flat hallway controller tolerated larger errors in its own setting. The different scenes and controllers make a single universal accuracy threshold hard to justify.

### 74. HMARL per-user vs. aggregate received power

Read the left plot at the halfway mark. When we go from two users to four, the median signal for an individual user falls by about 2.5 decibels. The right plot sums received power across the users, and that total rises slightly. Serving more people can therefore raise the aggregate while reducing what a typical user receives. The available steering range is one plausible contributor.

### 75. HMARL reward sensitivity and the role of P_off

We varied the distance weighting in the training reward. Increasing the exponent gives distant users more weight, yet the median deployment RSSI spans just 0.81 decibels across these runs. The power offset plays a different role. With the 80 decibel offset we used, improving a link at minus 75 dBm carries about 2.7 times the marginal reward of improving one at minus 65. The offset was held fixed in these experiments.

### 76. HMARL focal points and allocation space

Two arrays with 63 tiles each would require 252 individual angle commands. Four focal points specify the same four segments with twelve continuous coordinates. That's a 21-fold reduction in the number of control variables. The discrete problem is still there. With four users there are 256 joint assignments, but the network only needs to output four user scores for each of the four segments. These counts describe the policy interface. Measuring a training speedup would require a tile-level baseline.

### 77. HMARL system parameters and hyperparameters

Each training episode lasts a hundred slots. The high-level allocator makes ten decisions in that time, and each segment can move its focal point every slot. We allow thirty centimeters per coordinate per slot and a thirty-degree servo range. During evaluation the users move thirty centimeters per slot as well. The allocator uses attention, while the segment actors and their shared critic use two hidden layers of 256 neurons.

### 78. HMARL: what one slot means physically

A slot is one control update. The simulation specifies a displacement of thirty centimeters per slot and leaves the physical duration open. If position estimates arrive once a second, that's a slow walk of 0.3 meters per second. If updates take only tens of milliseconds, the same displacement represents much faster motion. To assign a physical speed to the experiment, we'd need to measure both localization latency and how long the loaded servos take to turn.

### 79. Placement: propagation and ray-tracing parameters

The placement study uses 5.18 gigahertz, a wavelength of about 5.8 centimeters. The tile pitch is four to five wavelengths, and we model each tile as a specular facet. We trace one million rays per transmitter and evaluate received power on a one-meter grid at a height of 1.5 meters. The material table gives the electrical properties used for the tiles, walls, floor, and ceiling.

### 80. Placement: objective and optimizer parameters

The swarm evaluates fifty layouts over 35 iterations. We then refine the best layout for thirty steps, giving 1,780 radio-map evaluations per run. Early in the search, particles favor their own best layouts. Later they put more weight on the swarm's best. The genetic algorithm uses the same population and generation counts. The random baselines use different budgets, so the comparison reflects each method at the operating cost shown here.

### 81. Placement: Office coverage statistics, 3 APs

This table gives the mean and standard deviation across five runs. With three access points and the reflector, the proposed method reaches a priority P5 of minus 57.3 dBm, or 7.7 decibels above the target. The minimum varies more from run to run because one grid cell determines it. Bold type identifies the largest mean in a column. The statistical comparisons are a separate analysis.

### 82. Where the gain goes: the lower tail (Office, 3 APs)

These distributions come from one Office run. Follow the dashed line at minus 65 dBm. With the reflector, at most two percent of priority locations fall below that line, compared with about three percent without it. The minimum gains roughly nine decibels while the median falls by about one. In this run the main benefit was to the weakest locations.

### 83. Placement: PSO vs. GA and gradient refinement

We can isolate the effect of local refinement by starting with swarm search in both cases. Adding gradient steps improves priority P5 by 4.1 decibels with the reflector. Without it, the estimated gain is 1.6 decibels and the confidence interval includes zero. Comparing the two refined methods asks a different question. The swarm leads the genetic algorithm by 1.6 decibels, with a p-value of 0.10 across five runs. These data give limited evidence for choosing between the two global searches.

### 84. Placement: scaling with AP count in Office

In the Office, the proposed method crosses the target at two access points with a reflector and three without. Genetic search followed by refinement also reaches it with two, although its margin is only 0.2 decibels. Swarm search alone needs three in both cases. Farther to the right, both layouts meet the target. There the reflector's benefit shows up as additional signal margin.

### 85. Placement: HRBB, P5 versus AP count

The lab floor has one large priority block near the center. With one access point, the reflector adds about three decibels to priority P5. By four access points, that advantage is below one decibel. An access point placed inside the central room can already serve much of the priority area directly. If we score the entire floor, the mean crosses the target with two access points and a reflector, or three access points alone.

### 86. Placement: coverage maps of four methods

The red dots are access points. Compare the two corridor junctions used by swarm search on the left with the weaker southeast rooms under weighted k-means in the third map. A distance-based method can place an access point near a room while leaving a wall between them. All four layouts have a reflector on the north wall, but they choose different positions along it.

### 87. Placement: model approximations, implementation

For the placement maps, we sum the powers of the traced paths incoherently. That approximates power averaged over small-scale fading. A narrowband receiver at one exact point can measure a higher or lower value because path phases matter there. We also model each tile as a planar reflecting facet and omit diffraction at its edges. Measurements or a full-wave model would let us quantify those approximations. Computationally, we reuse each loaded scene across many radio-map evaluations.
