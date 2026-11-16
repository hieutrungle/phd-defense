/* A4 (anim-hmarl): hierarchical MARL, two timescales.
   Conference room, AP outside the inner room, two corner arrays, each split into 2 contiguous segments (L = 4).
   Users walk on crossing paths. Within each slot the users move first, then the segment agents react. Every T slots the high-level allocator re-decides which user each segment serves
   (segment colors change, brief highlight); every slot each segment agent nudges its focal point toward its
   assigned user by at most delta_max per axis. A scrolling timeline shows slow (allocation) vs fast (focusing) ticks.
   The allocation rule used for drawing is a simple position-based stand-in (Illustrative), not the learned policy.
   opts: {users: 2..4} (default 3). */
DeckAnim.register('hmarl', {
  mount(canvas, ctx, opts){
    this.opts = opts || {};
    this.K = Math.max(2, Math.min(4, this.opts.users || 3));
    this.SLOT = 0.3; this.T = 10; this.duration = 36; // users: small random steps each slot; focal steps (DELTA, set in reset) reach any target within 3 slots, after the users move
    this.reset();
  },
  reset(){
    const g = this.g = { ox0: 60, ox1: 660, oy0: 44, oy1: 458, ap: [360, 76], blk: [250, 470, 126],
      ix0: 150, ix1: 570, iy0: 196, iy1: 446, wTop: 290 }; // inner side walls only from y = wTop to iy1
    // arrays: center, normal angle; 8 drawn tiles, segments of 4 contiguous tiles
    const arrays = [{ c: [94, 118], n: 0.49 }, { c: [626, 118], n: Math.PI - 0.49 }];
    this.segs = []; this.tiles = [];
    arrays.forEach((A, a) => { const tx = -Math.sin(A.n), ty = Math.cos(A.n);
      for (let j = 0; j < 8; j++){ const off = (j - 3.5) * 13; const seg = a * 2 + (j < 4 ? 0 : 1);
        this.tiles.push({ x: A.c[0] + tx * off, y: A.c[1] + ty * off, base: A.n, seg }); }
      for (let h = 0; h < 2; h++){ const off = (h ? 2 : -2) * 13; this.segs.push({ r: [A.c[0] + tx * off, A.c[1] + ty * off], base: A.n, arr: a }); } });
    this.tlen = 13;
    // user paths (crossing)
    this.paths = [
      { a: [190, 226], b: [530, 410], P: 12, ph: 0 },
      { a: [530, 236], b: [196, 414], P: 12, ph: 0.14 },
      { a: [520, 318], b: [200, 318], P: 9, ph: 0.25 },
      { a: [372, 420], b: [372, 222], P: 10, ph: 0.6 } ].slice(0, this.K);
    this.alloc = []; this.F = []; this.n = 0; this.U = null;
    // focal step limit: the longest per-axis distance a focal point may need to cover, reached in at most 3 slots
    { const [x0, x1, y0, y1] = this.bounds(); this.DELTA = Math.ceil(Math.max(x1 - x0, y1 - y0) / 3); }
  },
  step(n){ this.n = n; if (this.ctx) this.frame(this._t || 0); },
  // users: seeded random walk, one small random step per slot (2-8 px, mean ~5), heading drifts slowly,
  // reflected at the inner-room walls; positions between slots are interpolated (users move in the first half of a slot)
  bounds(){ const g = this.g; return [g.ix0 + 28, g.ix1 - 28, g.iy0 + 30, g.iy1 - 18]; },
  walkTo(n){ const [x0, x1, y0, y1] = this.bounds();
    if (!this.U){ const r = this.wrng = AL.rng(this.SEED || 207) /* seed: reallocations spread over the loop; two short wall blockages, each removed by the next allocation */;
      this.U = this.paths.map(p => [[AL.lerp(p.a[0], p.b[0], 0.5 - 0.5 * Math.cos(2 * Math.PI * p.ph)), AL.lerp(p.a[1], p.b[1], 0.5 - 0.5 * Math.cos(2 * Math.PI * p.ph))]]);
      this.hd = this.paths.map(() => r() * 2 * Math.PI); }
    const r = this.wrng;
    while (this.U[0].length <= n){ this.U.forEach((tr, k) => { const [x, y] = tr[tr.length - 1];
        this.hd[k] += (r() - 0.5) * 0.9; const L = 2 + 6 * r() * r();
        let nx = x + L * Math.cos(this.hd[k]), ny = y + L * Math.sin(this.hd[k]);
        if (nx < x0 || nx > x1){ this.hd[k] = Math.PI - this.hd[k]; nx = Math.max(x0, Math.min(x1, nx)); }
        if (ny < y0 || ny > y1){ this.hd[k] = -this.hd[k]; ny = Math.max(y0, Math.min(y1, ny)); }
        tr.push([nx, ny]); }); } },
  userAt(k, time){ const q = Math.max(0, time / this.SLOT), s0 = Math.floor(q), f = q - s0; this.walkTo(s0 + 1);
    const a = this.U[k][s0], b = this.U[k][s0 + 1]; return [AL.lerp(a[0], b[0], f), AL.lerp(a[1], b[1], f)]; },
  walls(){ const g = this.g; return [[g.ix0, g.wTop, g.ix0, g.iy1], [g.ix1, g.wTop, g.ix1, g.iy1], [g.ix0, g.iy1, g.ix1, g.iy1]]; },
  hitWall(p, q){ // first intersection of segment p->q with an inner wall, or null
    let best = null, bt = 2;
    for (const [x1, y1, x2, y2] of this.walls()){ const dx = q[0] - p[0], dy = q[1] - p[1], ex = x2 - x1, ey = y2 - y1, den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-9) continue; const t = ((x1 - p[0]) * ey - (y1 - p[1]) * ex) / den, s = ((x1 - p[0]) * dy - (y1 - p[1]) * dx) / den;
      if (t > 1e-6 && t < 1 - 1e-6 && s >= 0 && s <= 1 && t < bt){ bt = t; best = [p[0] + t * dx, p[1] + t * dy]; } }
    return best; },
  blocked(k, l, time){ return !!this.hitWall(this.segs[l].r, this.userAt(k, time)); },
  compat(k, l, time){ const u = this.userAt(k, time), r = this.segs[l].r, ap = this.g.ap;
    if (this.hitWall(r, u)) return 0.001; // a wall blocks the segment -> user path: (almost) never allocate it
    const d = Math.hypot(u[0] - r[0], u[1] - r[1]);
    const [ix, iy] = AL.norm(r[0] - ap[0], r[1] - ap[1]), [ox, oy] = AL.norm(u[0] - r[0], u[1] - r[1]);
    const bend = Math.acos(Math.max(-1, Math.min(1, ix * ox + iy * oy)));
    // servo feasibility at the segment centre: bisector normal must stay within +/-30 deg of the array normal
    const phi = AL.bisector(r[0], r[1], ap[0], ap[1], u[0], u[1]), dev = Math.abs(Math.atan2(Math.sin(phi - this.segs[l].base), Math.cos(phi - this.segs[l].base)));
    const feas = dev <= Math.PI / 6 - 0.08 ? 1 : 0.03;
    return feas * Math.exp(-d / 420) * Math.cos(bend / 2); },
  allocAt(w){ // allocation for window w (decided at slot w*T)
    while (this.alloc.length <= w){ const i = this.alloc.length, time = i * this.T * this.SLOT, K = this.K, L = 4;
      const C = []; for (let k = 0; k < K; k++){ C.push([0, 1, 2, 3].map(l => this.compat(k, l, time))); }
      let best = null, bs = -1e9;
      for (let code = 0; code < Math.pow(K, L); code++){ const b = []; let c = code; for (let l = 0; l < L; l++){ b.push(c % K); c = Math.floor(c / K); }
        const got = new Array(K).fill(0); b.forEach((k, l) => got[k] += C[k][l]);
        if (got.some(v => v === 0)) continue;
        const sc = got.reduce((s, v) => s + Math.log(1 + 8 * v), 0); if (sc > bs + 1e-9){ bs = sc; best = b; } }
      this.alloc.push(best); }
    return this.alloc[w]; },
  focalAt(s){ // focal points after s slots
    if (!this.F.length){ const b = this.allocAt(0); this.F.push(b.map((k, l) => { const u = this.userAt(k, 0), r = this.segs[l].r; return [AL.lerp(r[0], u[0], 0.8), AL.lerp(r[1], u[1], 0.8)]; })); }
    while (this.F.length <= s){ const i = this.F.length - 1, prev = this.F[i], b = this.allocAt(Math.floor((i + 1) / this.T)), D = this.DELTA, time = (i + 1) * this.SLOT;
      this.F.push(prev.map((f, l) => { const u = this.userAt(b[l], time); return [f[0] + Math.max(-D, Math.min(D, u[0] - f[0])), f[1] + Math.max(-D, Math.min(D, u[1] - f[1]))]; })); }
    return this.F[s]; },
  frame(t){
    t = Math.max(0, t || 0); // deck loop can deliver a tiny negative t on the first frame
    const { ctx, W, H } = this, C = AL.C, g = this.g, T = this.T;
    AL.clear(ctx, W, H);
    const s = Math.floor(t / this.SLOT), ph = (t - s * this.SLOT) / this.SLOT;
    const w = Math.floor(s / T), b = this.allocAt(w), bPrev = w > 0 ? this.allocAt(w - 1) : b;
    const sinceAlloc = t - w * T * this.SLOT; // seconds since last allocation
    const flash = w > 0 && sinceAlloc < 1.0;
    // order within a slot: users move first (first half), then each agent steps its focal point toward the observed new position (second half)
    const fa = this.focalAt(s), fb = this.focalAt(s + 1), e = AL.ease(Math.max(0, Math.min(1, (ph - 0.5) / 0.4)));
    const foc = fa.map((f, l) => [AL.lerp(f[0], fb[l][0], e), AL.lerp(f[1], fb[l][1], e)]);
    const tu = (s + AL.ease(Math.min(1, ph / 0.5))) * this.SLOT; // user time advances only in the first half of the slot
    const users = this.paths.map((_, k) => this.userAt(k, tu));
    const segColor = l => C.users[b[l]];

    // ---------- floor plan ----------
    AL.text(ctx, 'Top view: conference room, two corner arrays', g.ox0, 30, { size: 19, weight: 600, color: C.maroon });
    ctx.fillStyle = '#FBFAF8'; ctx.fillRect(g.ox0, g.oy0, g.ox1 - g.ox0, g.oy1 - g.oy0);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(g.ix0, g.iy0, g.ix1 - g.ix0, g.iy1 - g.iy0);
    ctx.strokeStyle = C.wall; ctx.lineWidth = 5; ctx.strokeRect(g.ox0, g.oy0, g.ox1 - g.ox0, g.oy1 - g.oy0);
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.ix0, g.wTop); ctx.lineTo(g.ix0, g.iy1); ctx.lineTo(g.ix1, g.iy1); ctx.lineTo(g.ix1, g.wTop); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(g.blk[0], g.blk[2]); ctx.lineTo(g.blk[1], g.blk[2]); ctx.stroke();
    AL.text(ctx, 'AP outside the room: no direct path', g.ap[0], g.blk[2] + 22, { size: 15, color: C.gray, align: 'center' });

    // ---------- rays, beams, tiles ----------
    const ap = g.ap, lim = Math.PI / 6;
    ctx.save(); ctx.strokeStyle = 'rgba(227,169,60,0.5)'; ctx.lineWidth = 1.1;
    this.tiles.forEach(q => { ctx.beginPath(); ctx.moveTo(ap[0], ap[1]); ctx.lineTo(q.x, q.y); ctx.stroke(); }); ctx.restore();
    this.tiles.forEach(q => { const f = foc[q.seg];
      let phi = AL.bisector(q.x, q.y, ap[0], ap[1], f[0], f[1]); let d = Math.atan2(Math.sin(phi - q.base), Math.cos(phi - q.base));
      q.clip = Math.abs(d) > lim; d = Math.max(-lim, Math.min(lim, d)); phi = q.base + d;
      const [ix, iy] = AL.norm(q.x - ap[0], q.y - ap[1]), nx = Math.cos(phi), ny = Math.sin(phi), dt = ix * nx + iy * ny, rx = ix - 2 * dt * nx, ry = iy - 2 * dt * ny;
      const Ln = Math.hypot(f[0] - q.x, f[1] - q.y);
      q.phi = phi; q.end = [q.x + rx * Ln, q.y + ry * Ln]; q.hit = this.hitWall([q.x, q.y], q.end); });
    [0, 1, 2, 3].forEach(l => { const ts = this.tiles.filter(q => q.seg === l); if (ts.some(q => q.clip || q.hit)) return;
      ctx.save(); ctx.globalAlpha = 0.13; ctx.fillStyle = segColor(l); ctx.beginPath(); ctx.moveTo(ts[0].x, ts[0].y); ctx.lineTo(ts[0].end[0], ts[0].end[1]); ctx.lineTo(ts[3].end[0], ts[3].end[1]); ctx.lineTo(ts[3].x, ts[3].y); ctx.closePath(); ctx.fill(); ctx.restore(); });
    this.tiles.forEach(q => { ctx.save(); ctx.strokeStyle = segColor(q.seg); ctx.globalAlpha = q.clip ? 0.35 : 0.7; ctx.lineWidth = 1.5; if (q.clip) ctx.setLineDash([4, 5]);
      const k = q.clip ? 0.6 : 1; let e = [q.x + (q.end[0] - q.x) * k, q.y + (q.end[1] - q.y) * k]; if (q.hit) e = q.hit; // rays stop at a wall
      ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.restore(); });
    // blocked segments: red x where the beam meets the wall (fixed at the next allocation)
    [0, 1, 2, 3].forEach(l => { const h = this.tiles.filter(q => q.seg === l && q.hit); if (h.length < 2) return;
      const x = h.reduce((a, q) => a + q.hit[0], 0) / h.length, y = h.reduce((a, q) => a + q.hit[1], 0) / h.length;
      ctx.save(); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 7, y - 7); ctx.lineTo(x + 7, y + 7); ctx.moveTo(x + 7, y - 7); ctx.lineTo(x - 7, y + 7); ctx.stroke(); ctx.restore();
      AL.text(ctx, 'blocked', x + (x < this.W / 2 ? 12 : -12), y - 8, { size: 14, weight: 600, color: '#C0392B', align: x < 360 ? 'left' : 'right' }); });
    // reallocation halo
    if (flash){ const a = 1 - sinceAlloc / 1.0;
      [0, 1, 2, 3].forEach(l => { if (bPrev[l] === b[l]) return; const r = this.segs[l].r;
        ctx.save(); ctx.globalAlpha = 0.85 * a; ctx.strokeStyle = C.maroon; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(r[0], r[1], 26 + 10 * (1 - a), 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); }); }
    this.tiles.forEach(q => AL.tile(ctx, q.x, q.y, this.tlen, q.phi, { color: segColor(q.seg), width: 6 }));
    // segment labels
    // segment labels outside the outer walls (array A: left of the room; array B: right), so they never cover the rays
    [[0, 'seg 1', -1], [1, 'seg 2', -1], [2, 'seg 3', 1], [3, 'seg 4', 1]].forEach(([l, txt, sd]) => { const r = this.segs[l].r;
      const x = sd < 0 ? g.ox0 - 10 : g.ox1 + 10;
      ctx.save(); ctx.strokeStyle = segColor(l); ctx.globalAlpha = 0.6; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(x + (sd < 0 ? 3 : -3), r[1]); ctx.lineTo(r[0] + (sd < 0 ? -9 : 9), r[1]); ctx.stroke(); ctx.restore();
      AL.text(ctx, txt, x, r[1] + 5, { size: 15, weight: 600, color: segColor(l), align: sd < 0 ? 'right' : 'left' }); });
    AL.text(ctx, 'array A', 70, 186, { size: 15, color: C.gray }); AL.text(ctx, 'array B', 650, 186, { size: 15, color: C.gray, align: 'right' });

    // ---------- AP, focal points, users ----------
    AL.ap(ctx, ap[0], ap[1], 22); AL.text(ctx, 'AP', ap[0] + 22, ap[1] + 6, { size: 16, weight: 600, color: C.maroon });
    foc.forEach((f, l) => { ctx.save(); ctx.strokeStyle = segColor(l); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(f[0], f[1], 6, 0, 2 * Math.PI);
      ctx.moveTo(f[0] - 10, f[1]); ctx.lineTo(f[0] + 10, f[1]); ctx.moveTo(f[0], f[1] - 10); ctx.lineTo(f[0], f[1] + 10); ctx.stroke(); ctx.restore(); });
    users.forEach((u, k) => { AL.person(ctx, u[0], u[1] + 14, 32, C.users[k]); AL.text(ctx, 'user ' + (k + 1), u[0] + 14, u[1] - 14, { size: 15, weight: 600, color: C.users[k] }); });

    // ---------- right panel ----------
    const px = 712, pw = W - px - 14;
    AL.roundRect(ctx, px, 14, pw, 150, 8, { fill: flash ? '#F4ECEC' : '#FFFFFF', stroke: C.maroon, width: flash ? 3 : 1.5 });
    AL.text(ctx, 'High level: allocator (slow)', px + 14, 40, { size: 18, weight: 600, color: C.maroon });
    AL.text(ctx, 'every T slots: which user each segment serves', px + 14, 64, { size: 16 });
    const cw = Math.min(88, (pw - 28 - 18) / 4);
    for (let l = 0; l < 4; l++){ const x = px + 14 + l * (cw + 6);
      AL.roundRect(ctx, x, 78, cw, 46, 6, { fill: segColor(l), stroke: (flash && bPrev[l] !== b[l]) ? C.maroon : null, width: 3 });
      AL.text(ctx, 'seg ' + (l + 1), x + cw / 2, 96, { size: 15, color: '#FFFFFF', align: 'center', weight: 600 });
      AL.text(ctx, '→ user ' + (b[l] + 1), x + cw / 2, 116, { size: 15, color: '#FFFFFF', align: 'center' }); }
    const wasBlk = flash ? [0, 1, 2, 3].filter(l => bPrev[l] !== b[l] && this.blocked(bPrev[l], l, (w * T - 1) * this.SLOT)) : [];
    AL.text(ctx, flash ? 'reallocated at slot ' + (w * T) + (wasBlk.length ? ': seg ' + wasBlk.map(l => l + 1).join(', ') + ' was blocked' : '') : 'assignment held for the window', px + 14, 150, { size: 16, color: flash ? C.maroon : C.gray, weight: flash ? 600 : 400 });

    AL.roundRect(ctx, px, 178, pw, 86, 8, { fill: '#FFFFFF', stroke: C.good, width: 1.5 });
    AL.text(ctx, 'Low level: segment agents (fast)', px + 14, 204, { size: 18, weight: 600, color: C.good });
    AL.text(ctx, 'every slot: each focal point moves ≤ δmax', px + 14, 228, { size: 16 });
    AL.text(ctx, 'toward its assigned user\u2019s position', px + 14, 250, { size: 16 });

    // timeline
    const tx0 = px + 58, tx1 = px + pw - 10, ty = 330, span = 30, now = tx0 + (tx1 - tx0) * 0.55, sp = (tx1 - tx0) / span;
    AL.text(ctx, 'High', px + 4, ty - 26, { size: 15, weight: 600, color: C.maroon }); AL.text(ctx, 'Low', px + 4, ty + 22, { size: 15, weight: 600, color: C.good });
    ctx.save(); ctx.beginPath(); ctx.rect(tx0 - 4, ty - 60, tx1 - tx0 + 8, 120); ctx.clip();
    ctx.strokeStyle = C.maroon; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx0, ty - 30); ctx.lineTo(tx1, ty - 30); ctx.stroke();
    ctx.strokeStyle = C.good; ctx.beginPath(); ctx.moveTo(tx0, ty + 18); ctx.lineTo(tx1, ty + 18); ctx.stroke();
    const tf = t / this.SLOT; // fractional slot
    for (let k = Math.floor(tf - span); k <= Math.ceil(tf + span); k++){ if (k < 0) continue; const x = now + (k - tf) * sp; if (x < tx0 - 2 || x > tx1 + 2) continue;
      ctx.strokeStyle = C.good; ctx.lineWidth = k <= s ? 2 : 1; ctx.globalAlpha = k <= s ? 1 : 0.4; ctx.beginPath(); ctx.moveTo(x, ty + 11); ctx.lineTo(x, ty + 25); ctx.stroke();
      if (k % T === 0){ ctx.strokeStyle = C.maroon; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x, ty - 42); ctx.lineTo(x, ty - 18); ctx.stroke();
        ctx.globalAlpha = k <= s ? 1 : 0.5; AL.text(ctx, 'b' + (k / T), x + 4, ty - 44, { size: 15, color: C.maroon, weight: 600 }); }
      ctx.globalAlpha = 1; }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(now, ty - 56); ctx.lineTo(now, ty + 34); ctx.stroke(); ctx.restore();
    AL.text(ctx, 'now', now, ty + 52, { size: 15, color: C.text, align: 'center' });
    AL.text(ctx, 'slot t = ' + s, px + 4, 410, { size: 17, weight: 600 });
    AL.text(ctx, 'T = ' + T + ' slots per allocation', px + 4, 434, { size: 16, color: C.gray });
    AL.text(ctx, 'next allocation in ' + (T - (s % T)) + (T - (s % T) === 1 ? ' slot' : ' slots'), px + 4, 456, { size: 16, color: C.gray });
  }
});
