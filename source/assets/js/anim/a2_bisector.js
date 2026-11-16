/* A2a - bisector rule (Intro/foundations track).
   Top view: AP, a row of tiles on a wall, a user walking along the hallway. Each tile normal bisects the
   directions to the AP and to the user, so the reflected rays converge on the user.
   Step 1: dashed normals for every tile and equal angles at one highlighted tile.
   Step 2: servo limits (+/-30 deg about the wall normal): out-of-range tiles clip, turn red, rays miss. */
DeckAnim.register('bisector', {
  mount(canvas, ctx, opts){
    this.n = 0; this.period = 14; this.nt = (opts && opts.tiles) || 9; this.lim = 30 * Math.PI / 180;
  },
  reset(){},
  step(n){ this.n = n; },
  frame(t, dt){
    const { ctx, W, H } = this, C = AL.C, RED = '#C0392B';
    AL.clear(ctx, W, H);
    // design frame 725 x 520, scaled to fit
    const s = Math.min(W / 725, H / 520), ox = (W - 725 * s) / 2, oy = (H - 520 * s) / 2;
    ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s);
    const wallY = 74, ap = [92, 330];
    // user path: from the far side (right) toward the AP side (left) and back
    const ph = (t % this.period) / this.period, sx = 0.5 - 0.5 * Math.cos(2 * Math.PI * ph);
    const user = [AL.lerp(690, 200, sx), 452];
    // floor + walls
    ctx.fillStyle = C.floor; ctx.fillRect(20, wallY, 690, 430);
    ctx.fillStyle = '#CFCAC3'; ctx.fillRect(20, wallY - 14, 690, 14);
    AL.text(ctx, 'wall', 30, wallY - 20, { size: 15, color: C.gray });
    AL.text(ctx, 'Top view', 30, 30, { size: 16, color: C.gray });
    const tiles = [];
    for (let i = 0; i < this.nt; i++) tiles.push([300 + i * (320 / (this.nt - 1)), wallY + 18]);
    const showN = this.n >= 1, servo = this.n >= 2, hi = Math.floor(this.nt / 2);
    let firstClip = null;
    const st = tiles.map(([tx, ty]) => {
      const phi = AL.bisector(tx, ty, ap[0], ap[1], user[0], user[1]);
      let dev = phi - Math.PI / 2; dev = Math.atan2(Math.sin(dev), Math.cos(dev));
      const clipped = servo && Math.abs(dev) > this.lim;
      const devc = clipped ? Math.sign(dev) * this.lim : dev;
      return { tx, ty, phi, dev, clipped, phic: Math.PI / 2 + devc };
    });
    // servo range fans
    if (servo) st.forEach(o => {
      ctx.save(); ctx.fillStyle = o.clipped ? 'rgba(192,57,43,0.12)' : 'rgba(80,0,0,0.07)'; ctx.beginPath(); ctx.moveTo(o.tx, o.ty);
      ctx.arc(o.tx, o.ty, 44, Math.PI / 2 - this.lim, Math.PI / 2 + this.lim); ctx.closePath(); ctx.fill(); ctx.restore();
    });
    // rays
    st.forEach(o => {
      ctx.save(); ctx.lineWidth = 1.6; ctx.strokeStyle = C.ray;
      ctx.beginPath(); ctx.moveTo(ap[0], ap[1]); ctx.lineTo(o.tx, o.ty); ctx.stroke();
      if (!o.clipped) { ctx.beginPath(); ctx.moveTo(o.tx, o.ty); ctx.lineTo(user[0], user[1] - 24); ctx.stroke(); }
      else {
        const d = AL.norm(o.tx - ap[0], o.ty - ap[1]), nx = Math.cos(o.phic), ny = Math.sin(o.phic), dn = d[0] * nx + d[1] * ny;
        const rx = d[0] - 2 * dn * nx, ry = d[1] - 2 * dn * ny;
        ctx.strokeStyle = RED; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(o.tx, o.ty); ctx.lineTo(o.tx + rx * 300, o.ty + ry * 300); ctx.stroke();
        if (firstClip === null) firstClip = o;
      }
      ctx.restore();
    });
    // normals
    if (showN) st.forEach((o, i) => {
      const ang = o.clipped ? o.phic : o.phi, L = i === hi ? 120 : 62;
      ctx.save(); ctx.strokeStyle = i === hi ? C.maroon : C.gray; ctx.lineWidth = i === hi ? 1.8 : 1.2; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(o.tx, o.ty); ctx.lineTo(o.tx + Math.cos(ang) * L, o.ty + Math.sin(ang) * L); ctx.stroke(); ctx.restore();
    });
    // equal angles at the highlighted tile
    if (showN && !st[hi].clipped) {
      const o = st[hi], aIn = Math.atan2(ap[1] - o.ty, ap[0] - o.tx), aOut = Math.atan2(user[1] - 24 - o.ty, user[0] - o.tx);
      [[aIn, C.maroon], [aOut, C.maroon]].forEach(([a, col], k) => {
        const a0 = Math.min(a, o.phi), a1 = Math.max(a, o.phi), R = 56 + k * 10;
        ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(o.tx, o.ty, R, a0, a1); ctx.stroke(); ctx.restore();
        const am = (a0 + a1) / 2; AL.text(ctx, '\u03B8', o.tx + Math.cos(am) * (R + 15), o.ty + Math.sin(am) * (R + 15) + 6, { size: 20, color: col, weight: 600, align: 'center', italic: true });
      });
      AL.text(ctx, 'normal', o.tx + Math.cos(o.phi) * 128, o.ty + Math.sin(o.phi) * 128 + 16, { size: 15, color: C.maroon, align: 'center' });
    }
    // tiles
    st.forEach((o, i) => {
      const col = o.clipped ? RED : (showN && i === hi ? C.maroon : C.gold);
      AL.tile(ctx, o.tx, o.ty, 30, o.clipped ? o.phic : o.phi, { color: col, width: 6 });
    });
    if (servo && firstClip) AL.text(ctx, 'servo range \u00B130\u00B0: red tiles clip', 700, wallY - 22, { size: 16, color: RED, weight: 600, align: 'right' });
    // AP and user
    AL.ap(ctx, ap[0], ap[1], 24, C.maroon); AL.text(ctx, 'AP (B)', ap[0], ap[1] + 32, { size: 16, align: 'center', weight: 600 });
    AL.person(ctx, user[0], user[1], 48, C.users[0]); AL.text(ctx, 'user (C)', user[0], user[1] + 22, { size: 16, align: 'center', weight: 600, color: C.users[0] });
    AL.text(ctx, 'tile (A)', tiles[0][0] - 24, tiles[0][1] + 6, { size: 15, align: 'right', color: C.gray });
    // legend
    const lx = 30, ly = 498;
    ctx.save(); ctx.strokeStyle = C.ray; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(lx, ly - 5); ctx.lineTo(lx + 26, ly - 5); ctx.stroke(); ctx.restore();
    AL.text(ctx, 'ray AP \u2192 tile \u2192 user', lx + 32, ly, { size: 15, color: C.text });
    if (showN) { ctx.save(); ctx.strokeStyle = C.gray; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(lx + 210, ly - 5); ctx.lineTo(lx + 236, ly - 5); ctx.stroke(); ctx.restore();
      AL.text(ctx, 'tile normal', lx + 242, ly, { size: 15 }); }
    if (servo) { ctx.save(); ctx.strokeStyle = RED; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(lx + 340, ly - 5); ctx.lineTo(lx + 366, ly - 5); ctx.stroke(); ctx.restore();
      AL.text(ctx, 'clipped tile: ray misses', lx + 372, ly, { size: 15, color: RED }); }
    ctx.restore();
  }
});
