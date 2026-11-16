/* A3 (anim-marl): flat MARL in the L-shaped hallway.
   Three segment agents, each owning a FIXED set of interleaved columns (user 1 -> columns 1, 4, 7, ...),
   move their segment's focal point toward their user in bounded steps (||a||_inf <= delta_max).
   Tiles re-orient by the bisector rule (clipped to +/-30 deg), reflected rays follow the focal points.
   Order of events: the users move first (at steps 1, 5, 9, ...); each agent observes its user's new position and
   then steps its focal point toward it, at most delta_max per axis per step. The column assignment never changes.
   step(1): highlight that user 1's fixed columns span the whole aperture (why the grouping costs nothing here)
   and that the assignment would matter for arrays on different walls (next part).
   Illustrative schematic: no simulation output, no numbers. */
DeckAnim.register('marl', {
  mount(canvas, ctx, opts){
    this.opts = opts || {};
    this.STEP = 0.75;          // seconds per control step
    this.MOVE_EVERY = 4;       // users relocate every 4 steps
    this.DELTA = 30;           // delta_max in px (per axis, per step)
    this.duration = 18;        // timeline length for the slider: 24 control steps
    this.reset();
  },
  reset(){
    const W = this.W, H = this.H;
    this.sx = Math.min(1, W / 1166); // horizontal scale if canvas narrower
    // scene geometry (CSS px, designed for ~1166 x 470)
    this.g = { hx0: 40, hx1: 700, hy0: 300, hy1: 420,   // horizontal corridor (users)
               vx0: 580, vx1: 700, vy0: 26,              // vertical corridor (AP)
               ap: [640, 74] };
    // reflector: 9 columns along the diagonal cut of the outer corner (700,420)
    const a0 = [606, 420], a1 = [700, 326];
    this.tiles = [];
    for (let c = 0; c < 9; c++){ const f = (c + 0.5) / 9; this.tiles.push({ c, x: AL.lerp(a0[0], a1[0], f), y: AL.lerp(a0[1], a1[1], f) }); }
    this.base = Math.atan2(-1, -1); // array normal points up-left into the junction
    this.tlen = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]) / 9 * 0.86;
    // user waypoints (deterministic)
    const r = AL.rng(20261115);
    const lanes = [335, 362, 392];
    const xs = [[110, 250], [260, 400], [400, 530]];
    this.way = [0, 1, 2].map(k => {
      const w = []; let x = AL.lerp(xs[k][0], xs[k][1], r()), y = lanes[k];
      for (let i = 0; i < 400; i++){ w.push([x, y]);
        x = Math.max(80, Math.min(540, x + (r() - 0.5) * 190)); y = Math.max(322, Math.min(402, lanes[k] + (r() - 0.5) * 40)); }
      return w; });
    // focal-point states per step (computed lazily)
    this.F = [[0, 1, 2].map(k => [this.way[k][0][0], this.way[k][0][1]])]; // start converged on the users
    this.n = 0;
  },
  step(n){ this.n = n; if (this.ctx) this.frame(this._t || 0); },
  moveIdx(s){ return s <= 0 ? 0 : Math.floor((s - 1) / this.MOVE_EVERY) + 1; }, // users move at steps 1, 5, 9, ...
  isMove(s){ return s > 0 && (s - 1) % this.MOVE_EVERY === 0; },
  userAt(k, s){ return this.way[k][Math.min(this.way[k].length - 1, this.moveIdx(s))]; },
  focalAt(s){
    while (this.F.length <= s + 1){
      const i = this.F.length - 1, prev = this.F[i], D = this.DELTA;
      this.F.push(prev.map((f, k) => { const u = this.userAt(k, i);
        return [f[0] + Math.max(-D, Math.min(D, u[0] - f[0])), f[1] + Math.max(-D, Math.min(D, u[1] - f[1]))]; }));
    }
    return this.F[s];
  },
  frame(t){
    t = Math.max(0, t || 0); // deck loop can deliver a tiny negative t on the first frame
    const { ctx, W, H } = this, C = AL.C, g = this.g;
    AL.clear(ctx, W, H);
    ctx.save(); ctx.scale(this.sx, 1);
    const s = Math.floor(t / this.STEP), ph = (t - s * this.STEP) / this.STEP;
    const mv = this.isMove(s);
    // users move first (glide during the first half of a move step) ...
    const users = [0, 1, 2].map(k => {
      const cur = this.userAt(k, s);
      if (mv){ const prev = this.userAt(k, s - 1); const q = AL.ease(Math.min(1, ph / 0.45)); return [AL.lerp(prev[0], cur[0], q), AL.lerp(prev[1], cur[1], q)]; }
      return cur; });
    // ... then each agent steps its focal point toward the observed user position
    const e = mv ? AL.ease(Math.max(0, Math.min(1, (ph - 0.5) / 0.45))) : AL.ease(Math.min(1, ph / 0.45));
    const f0 = this.focalAt(s), f1 = this.focalAt(s + 1);
    const foc = [0, 1, 2].map(k => [AL.lerp(f0[k][0], f1[k][0], e), AL.lerp(f0[k][1], f1[k][1], e)]);

    // ---------- building mass + floor ----------
    ctx.fillStyle = '#EFECE8'; ctx.fillRect(20, 14, 696, 420);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.moveTo(g.hx0, g.hy0); ctx.lineTo(g.vx0, g.hy0); ctx.lineTo(g.vx0, g.vy0); ctx.lineTo(g.vx1, g.vy0);
    ctx.lineTo(g.vx1, 326); ctx.lineTo(606, g.hy1); ctx.lineTo(g.hx0, g.hy1); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.wall; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(g.hx0, g.hy0); ctx.lineTo(g.vx0, g.hy0); ctx.lineTo(g.vx0, g.vy0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(g.vx1, g.vy0); ctx.lineTo(g.vx1, 326); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(606, g.hy1); ctx.lineTo(g.hx0, g.hy1); ctx.stroke();
    ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.rule;
    ctx.beginPath(); ctx.moveTo(g.hx0, g.hy0 + 2); ctx.lineTo(g.hx0, g.hy1 - 2); ctx.moveTo(g.vx0 + 2, g.vy0); ctx.lineTo(g.vx1 - 2, g.vy0); ctx.stroke(); ctx.setLineDash([]);
    AL.text(ctx, 'Top view: L-shaped hallway', 40, 46, { size: 19, weight: 600, color: C.maroon });
    AL.text(ctx, 'open end', 44, 292, { size: 15, color: C.gray });

    // ---------- direct path blocked (user 1) ----------
    const ap = g.ap, u0 = users[0];
    const tx = (g.vx0 - ap[0]) / (u0[0] - ap[0]), by = ap[1] + tx * (u0[1] - ap[1]);
    if (by < g.hy0){ ctx.strokeStyle = C.gray; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(ap[0], ap[1]); ctx.lineTo(g.vx0, by); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 3; const X = g.vx0, Y = by; ctx.beginPath(); ctx.moveTo(X - 7, Y - 7); ctx.lineTo(X + 7, Y + 7); ctx.moveTo(X + 7, Y - 7); ctx.lineTo(X - 7, Y + 7); ctx.stroke();
      AL.text(ctx, 'direct path blocked', X - 14, Y - 4, { size: 15, color: C.accent, align: 'right' }); }

    // ---------- rays and tiles ----------
    const lim = Math.PI / 6;
    const tileState = this.tiles.map(T => {
      const k = T.c % 3, f = foc[k];
      let phi = AL.bisector(T.x, T.y, ap[0], ap[1], f[0], f[1]);
      let d = Math.atan2(Math.sin(phi - this.base), Math.cos(phi - this.base));
      const clipped = Math.abs(d) > lim; d = Math.max(-lim, Math.min(lim, d)); phi = this.base + d;
      // reflected direction about the (possibly clipped) normal
      const [ix, iy] = AL.norm(T.x - ap[0], T.y - ap[1]); const nx = Math.cos(phi), ny = Math.sin(phi);
      const dot = ix * nx + iy * ny; const rx = ix - 2 * dot * nx, ry = iy - 2 * dot * ny;
      const L = Math.hypot(f[0] - T.x, f[1] - T.y);
      return { T, k, phi, end: [T.x + rx * L, T.y + ry * L], clipped }; });
    // beam wedges
    [0, 1, 2].forEach(k => { const ts = tileState.filter(q => q.k === k); const f = foc[k];
      ctx.save(); ctx.globalAlpha = 0.10; ctx.fillStyle = C.users[k]; ctx.beginPath(); ctx.moveTo(ts[0].T.x, ts[0].T.y); ctx.lineTo(f[0], f[1]); ctx.lineTo(ts[ts.length - 1].T.x, ts[ts.length - 1].T.y); ctx.closePath(); ctx.fill(); ctx.restore(); });
    ctx.save(); ctx.strokeStyle = 'rgba(227,169,60,0.55)'; ctx.lineWidth = 1.2;
    tileState.forEach(q => { ctx.beginPath(); ctx.moveTo(ap[0], ap[1]); ctx.lineTo(q.T.x, q.T.y); ctx.stroke(); }); ctx.restore();
    tileState.forEach(q => { ctx.save(); ctx.strokeStyle = C.users[q.k]; ctx.globalAlpha = 0.75; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(q.T.x, q.T.y); ctx.lineTo(q.end[0], q.end[1]); ctx.stroke(); ctx.restore(); });
    const hl = this.n >= 1;
    tileState.forEach(q => { const big = hl && q.k === 0; AL.tile(ctx, q.T.x, q.T.y, this.tlen * (big ? 1.25 : 1), q.phi, { color: C.users[q.k], width: big ? 8 : 6 }); });
    if (hl){ // bracket along the whole aperture
      ctx.save(); ctx.strokeStyle = C.maroon; ctx.lineWidth = 2; const o = 16, p0 = this.tiles[0], p8 = this.tiles[8];
      ctx.beginPath(); ctx.moveTo(p0.x + o * 0.7, p0.y + o * 0.7); ctx.lineTo(p8.x + o * 0.7, p8.y + o * 0.7); ctx.stroke(); ctx.restore();
      AL.text(ctx, 'columns 1, 4, 7 span the aperture', 600, 452, { size: 15, color: C.maroon, align: 'right', weight: 600 }); }
    // label inside the corner wedge behind the array, written along the array edge
    ctx.save(); ctx.translate(653 + 21, 373 + 21); ctx.rotate(-Math.PI / 4);
    AL.text(ctx, 'reflector', 0, 5, { size: 14, color: C.gray, align: 'center', weight: 600 }); ctx.restore();

    // ---------- AP, focal points, users ----------
    AL.ap(ctx, ap[0], ap[1], 22); AL.text(ctx, 'AP', ap[0] + 22, ap[1] + 6, { size: 16, weight: 600, color: C.maroon });
    [0, 1, 2].forEach(k => { const f = foc[k], D = this.DELTA;
      ctx.save(); ctx.strokeStyle = C.users[k]; ctx.globalAlpha = 0.55; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.2; ctx.strokeRect(f[0] - D, f[1] - D, 2 * D, 2 * D); ctx.restore();
      ctx.save(); ctx.strokeStyle = C.users[k]; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(f[0], f[1], 7, 0, 2 * Math.PI); ctx.moveTo(f[0] - 11, f[1]); ctx.lineTo(f[0] + 11, f[1]); ctx.moveTo(f[0], f[1] - 11); ctx.lineTo(f[0], f[1] + 11); ctx.stroke(); ctx.restore(); });
    users.forEach((u, k) => { AL.person(ctx, u[0], u[1] + 14, 34, C.users[k]); AL.text(ctx, 'user ' + (k + 1), u[0], u[1] - 24, { size: 15, weight: 600, color: C.users[k], align: 'center' }); });

    // ---------- legend in the building mass ----------
    let ly = 84; const lx = 44;
    ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(lx + 8, ly - 5, 6, 0, 2 * Math.PI); ctx.moveTo(lx - 2, ly - 5); ctx.lineTo(lx + 18, ly - 5); ctx.moveTo(lx + 8, ly - 15); ctx.lineTo(lx + 8, ly + 5); ctx.stroke(); ctx.restore();
    AL.text(ctx, 'focal point of a segment (one agent each)', lx + 28, ly, { size: 16 });
    ly += 28; ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = C.text; ctx.lineWidth = 1.2; ctx.strokeRect(lx, ly - 15, 18, 18); ctx.restore();
    AL.text(ctx, 'reachable in one step: ‖a‖∞ ≤ δmax', lx + 28, ly, { size: 16 });
    ly += 28; ctx.save(); ctx.strokeStyle = C.ray; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly - 5); ctx.lineTo(lx + 18, ly - 5); ctx.stroke(); ctx.restore();
    AL.text(ctx, 'AP → tile;  colored: tile → focal point', lx + 28, ly, { size: 16 });
    if (hl){
      AL.roundRect(ctx, 40, 160, 520, 96, 8, { fill: '#FFFFFF', stroke: C.maroon, width: 1.5 });
      AL.text(ctx, 'Fixed in advance: columns 1, 4, 7 always serve user 1.', 54, 186, { size: 16, weight: 600, color: C.maroon });
      AL.text(ctx, 'Here each user\u2019s columns span the whole aperture.', 54, 212, { size: 16 });
      AL.text(ctx, 'With arrays on different walls, who-serves-whom matters.', 54, 238, { size: 16, color: C.accent });
    }

    // ---------- right panel: array front view with fixed assignment ----------
    const px = 748, cw = 34, ch = 27;
    AL.text(ctx, 'Array front view: 7 × 9 tiles', px, 46, { size: 19, weight: 600, color: C.maroon });
    for (let c = 0; c < 9; c++){ for (let rr = 0; rr < 7; rr++){
        const pulse = (s % this.MOVE_EVERY === 0) ? 0 : 0;
        ctx.save(); ctx.globalAlpha = (hl && c % 3 !== 0) ? 0.35 : 0.9 + pulse; AL.roundRect(ctx, px + c * cw, 62 + rr * ch, cw - 5, ch - 5, 3, { fill: C.users[c % 3] }); ctx.restore(); }
      AL.text(ctx, String(c + 1), px + c * cw + (cw - 5) / 2, 62 + 7 * ch + 14, { size: 15, color: C.gray, align: 'center' }); }
    if (hl){ ctx.save(); ctx.strokeStyle = C.maroon; ctx.lineWidth = 2.5; [0, 3, 6].forEach(c => ctx.strokeRect(px + c * cw - 3, 59, cw + 1, 7 * ch + 1)); ctx.restore(); }
    // lock + statement
    const ly2 = 300; ctx.save(); ctx.strokeStyle = C.maroon; ctx.fillStyle = C.maroon; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.arc(px + 9, ly2 - 14, 6, Math.PI, 0); ctx.stroke(); ctx.fillRect(px + 1, ly2 - 14, 16, 13); ctx.restore();
    AL.text(ctx, 'Column assignment fixed: never changes', px + 26, ly2, { size: 17, weight: 600, color: C.maroon });
    ['agent 1 → user 1: columns 1, 4, 7', 'agent 2 → user 2: columns 2, 5, 8', 'agent 3 → user 3: columns 3, 6, 9'].forEach((txt, k) => {
      AL.roundRect(ctx, px, 318 + k * 26, 16, 16, 3, { fill: C.users[k] }); AL.text(ctx, txt, px + 26, 332 + k * 26, { size: 16 }); });
    AL.text(ctx, 'step ' + s + '  ·  users move at steps 1, 5, 9, …', px, 422, { size: 16, color: C.gray });
    const conv = foc.every((f, k) => Math.hypot(f[0] - users[k][0], f[1] - users[k][1]) < 2);
    const msg = mv ? (ph < 0.5 ? 'users move' : 'agents observe new positions, step focal points') : (conv ? 'focal points on their users' : 'focal points step toward users (≤ δmax)');
    AL.text(ctx, msg, px, 446, { size: 16, color: mv ? C.accent : C.gray });
  }
});
