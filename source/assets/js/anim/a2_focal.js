/* A2b - focal-point abstraction (Intro/foundations track).
   Left: top view; the array (9 columns) is split into L = 3 segments; each segment has a moving virtual
   focal point f_l, and all its tiles re-orient together by the bisector rule (angles clipped to +/-30 deg).
   Right: front view of the 7 x 9 hexagonal array; needles show each tile's tilt (azimuth, elevation).
   Bottom right: control variables. Step 0: 2 Nr Nc = 126 tile angles. Step 1: collapse to 3L = 9 focal
   coordinates (factor 14, as stated in the dissertation for 63 tiles and L = 3). */
DeckAnim.register('focal', {
  mount(canvas, ctx, opts){
    this.duration = 30; this.n = 0; this.Nr = 7; this.Nc = 9; this.L = 3; this.lim = 30 * Math.PI / 180;
    this.cols = [AL.C.users[0], AL.C.users[1], AL.C.users[2]];
  },
  reset(){},
  step(n){ this.n = n; },
  focal(l, t){ // smooth Lissajous paths in the room (design coords) + height z
    const cx = [215, 360, 505][l], w = [0.41, 0.33, 0.37][l], p = [0.0, 2.1, 4.0][l];
    return [cx + 80 * Math.sin(w * t + p), 300 + 85 * Math.sin(1.37 * w * t + p * 0.7), 70 * Math.sin(0.8 * w * t + 1.3 * p)];
  },
  frame(t, dt){
    const { ctx, W, H } = this, C = AL.C;
    AL.clear(ctx, W, H);
    const s = Math.min(W / 1166, H / 430), ox = (W - 1166 * s) / 2, oy = (H - 430 * s) / 2;
    ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s);
    const Nr = this.Nr, Nc = this.Nc, L = this.L, lim = this.lim;
    const wallY = 64, ap = [70, 330, 0];
    const colX = j => 200 + j * 38, rowZ = i => (i - (Nr - 1) / 2) * 26;
    const segOf = j => Math.floor(j / (Nc / L));
    const F = [0, 1, 2].map(l => this.focal(l, t));
    // tile normals (3D, design units): wall plane y = wallY+14, room toward +y; z up
    const ang = [];
    for (let i = 0; i < Nr; i++) { ang.push([]); for (let j = 0; j < Nc; j++) {
      const T = [colX(j), wallY + 14, rowZ(i)], f = F[segOf(j)];
      const a = [ap[0] - T[0], ap[1] - T[1], ap[2] - T[2]], b = [f[0] - T[0], f[1] - T[1], f[2] - T[2]];
      const na = Math.hypot(...a), nb = Math.hypot(...b), n = [a[0] / na + b[0] / nb, a[1] / na + b[1] / nb, a[2] / na + b[2] / nb];
      let az = Math.atan2(n[0], n[1]), el = Math.atan2(n[2], n[1]);
      az = Math.max(-lim, Math.min(lim, az)); el = Math.max(-lim, Math.min(lim, el));
      ang[i].push([az, el]);
    } }
    // ---------- left: top view ----------
    ctx.fillStyle = C.floor; ctx.fillRect(24, wallY, 620, 350);
    ctx.fillStyle = '#CFCAC3'; ctx.fillRect(24, wallY - 12, 620, 12);
    AL.text(ctx, 'Top view', 30, 30, { size: 16, color: C.gray });
    const mid = Math.floor(Nr / 2);
    // rays AP -> tile -> focal point
    for (let j = 0; j < Nc; j++) {
      const l = segOf(j), f = F[l], tx = colX(j), ty = wallY + 14;
      ctx.save(); ctx.globalAlpha = 0.55; ctx.strokeStyle = this.cols[l]; ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(ap[0], ap[1]); ctx.lineTo(tx, ty); ctx.lineTo(f[0], f[1]); ctx.stroke(); ctx.restore();
    }
    for (let j = 0; j < Nc; j++) {
      const l = segOf(j), [az] = ang[mid][j];
      AL.tile(ctx, colX(j), wallY + 14, 30, Math.PI / 2 - az, { color: this.cols[l], width: 6 });
    }
    for (let l = 0; l < L; l++) AL.text(ctx, 'segment ' + (l + 1), colX(l * 3 + 1), wallY + 46, { size: 15, align: 'center', color: this.cols[l], weight: 600 });
    // focal points: draggable-looking handles
    for (let l = 0; l < L; l++) {
      const [fx, fy, fz] = F[l], c = this.cols[l], r = 13 + fz / 14;
      ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(fx, fy, r, 0, 2 * Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx - r - 7, fy); ctx.lineTo(fx + r + 7, fy); ctx.moveTo(fx, fy - r - 7); ctx.lineTo(fx, fy + r + 7); ctx.stroke(); ctx.restore();
      AL.dot(ctx, fx, fy, 4, c);
      AL.text(ctx, 'f' + String.fromCharCode(8321 + l), fx + r + 9, fy - r - 2, { size: 18, color: c, weight: 700, italic: true });
    }
    AL.ap(ctx, ap[0], ap[1], 22, C.maroon); AL.text(ctx, 'AP', ap[0], ap[1] + 30, { size: 16, align: 'center', weight: 600 });
    AL.text(ctx, 'ring size = height z of the focal point', 34, 404, { size: 15, color: C.gray });
    // ---------- right: front view ----------
    const fx0 = 690, fy0 = 64, r = 17, hw = Math.sqrt(3) * r;
    AL.text(ctx, 'Front view: every tile turns with its segment', fx0 - 6, 30, { size: 16, color: C.gray });
    for (let i = 0; i < Nr; i++) for (let j = 0; j < Nc; j++) {
      const cx = fx0 + 20 + j * (hw + 4) + (i % 2 ? (hw + 4) / 2 : 0), cy = fy0 + 18 + i * (1.5 * r + 3);
      const l = segOf(j), [az, el] = ang[Nr - 1 - i][j], mag = Math.min(1, Math.hypot(az, el) / lim);
      ctx.save(); ctx.beginPath();
      for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.closePath(); ctx.globalAlpha = 0.28 + 0.4 * mag; ctx.fillStyle = this.cols[l]; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
      // needle: tilt direction (azimuth -> x, elevation -> up)
      const k = (r - 3) / lim; ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + az * k, cy - el * k); ctx.stroke(); ctx.restore();
      AL.dot(ctx, cx, cy, 2, C.text);
    }
    // ---------- right bottom: control variables ----------
    const by = 292;
    AL.text(ctx, 'Control variables', fx0 - 6, by - 10, { size: 16, color: C.gray, weight: 600 });
    const total = 2 * Nr * Nc, cw = 9, gap = 2, perRow = 21;
    const showCollapse = this.n >= 1;
    const cyc = t % 9, fly = showCollapse ? AL.ease((cyc - 1.5) / 2.2) * (1 - AL.ease((cyc - 7.6) / 1.0)) : 0;
    const tgt = l => [fx0 + 300 + l * 46 + 13, by + 22];
    if (showCollapse) for (let q = 0; q < total; q++) { const l = segOf(Math.floor(q / 2) % Nc); ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = this.cols[l];
      ctx.fillRect(fx0 + (q % perRow) * (cw + gap), by + 4 + Math.floor(q / perRow) * (cw + gap), cw, cw); ctx.restore(); }
    for (let q = 0; q < total; q++) {
      const tile = Math.floor(q / 2), j = tile % Nc, l = segOf(j);
      const sx = fx0 + (q % perRow) * (cw + gap), sy = by + 4 + Math.floor(q / perRow) * (cw + gap);
      const [tx2, ty2] = tgt(l), ex = tx2 + 1.5, ey = ty2 + 7;
      const x = AL.lerp(sx, ex, fly), y = AL.lerp(sy, ey, fly);
      ctx.save(); ctx.globalAlpha = showCollapse ? (1 - 0.85 * fly) : 1; ctx.fillStyle = this.cols[l]; ctx.fillRect(x, y, cw, cw); ctx.restore();
    }
    AL.text(ctx, '126 tile angles (2 per tile)', fx0, by + 96, { size: 16, weight: 600 });
    if (showCollapse) {
      AL.arrow(ctx, fx0 + 244, by + 34, fx0 + 296, by + 34, { color: C.maroon, width: 2.5 });
      for (let l = 0; l < L; l++) for (let c = 0; c < 3; c++) {
        const x = fx0 + 300 + l * 46 + c * 13, y = by + 22;
        ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * fly; AL.roundRect(ctx, x, y, 11, 24, 3, { fill: this.cols[l] }); ctx.restore();
      }
      ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * fly;
      ['x', 'y', 'z'].forEach((c, k) => AL.text(ctx, c, fx0 + 305 + k * 13, by + 64, { size: 15, color: C.gray, align: 'center', italic: true }));
      AL.text(ctx, '3L = 9 focal coordinates', 1146, by + 96, { size: 16, weight: 600, color: C.maroon, align: 'right' });
      AL.text(ctx, '14\u00D7 fewer', fx0 + 270, by + 14, { size: 16, weight: 700, color: C.maroon, align: 'center' });
      ctx.restore();
    }
    ctx.restore();
  }
});
