/* A1 - the CSI bottleneck (Intro track).
   Left: electronic RIS with N elements serving K users; pilot time grows with N x K and fills the
   channel coherence window. Right: mechanical reflector array steered from the K user positions; its
   control input does not grow with N. Step 1 reveals the right panel. Schematic only: no numbers. */
DeckAnim.register('csi', {
  mount(canvas, ctx, opts){ this.n = 0; this.sa = 0; this.K = 3; this.period = 13; },
  reset(){ this.sa = this.n >= 1 ? 1 : 0; },
  step(n){ this.n = n; },
  // grid side g (N = g*g) as a function of time: hold small, grow, hold large, shrink back
  side(t){
    const p = t % this.period;
    let u;
    if (p < 1.2) u = 0; else if (p < 8.2) u = AL.ease((p - 1.2) / 7); else if (p < 11.6) u = 1; else u = 1 - AL.ease((p - 11.6) / 1.4);
    return { g: Math.round(AL.lerp(3, 11, u)), u };
  },
  frame(t, dt){
    const { ctx, W, H } = this, C = AL.C;
    AL.clear(ctx, W, H);
    const target = this.n >= 1 ? 1 : 0;
    this.sa += Math.sign(target - this.sa) * Math.min(Math.abs(target - this.sa), dt * 2.5);
    const { g, u } = this.side(t);
    const half = W / 2, K = this.K;
    // divider
    ctx.save(); ctx.strokeStyle = C.rule; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(half, 16); ctx.lineTo(half, H - 16); ctx.stroke(); ctx.restore();
    this.panelRIS(0, half, g, u, t, K);
    ctx.save(); ctx.globalAlpha = 0.12 + 0.88 * this.sa; this.panelMRA(half, half, g, t, K); ctx.restore();
  },
  usersAt(x0, w, K){
    const ys = [], H = this.H;
    for (let k = 0; k < K; k++) ys.push([x0 + w - 70, 110 + k * 78]);
    return ys;
  },
  panelRIS(x0, w, g, u, t, K){
    const { ctx, H } = this, C = AL.C;
    AL.text(ctx, 'Electronic RIS: estimate every channel', x0 + 24, 34, { size: 20, weight: 700, color: C.accent });
    // AP
    const apx = x0 + 60, apy = 150;
    AL.ap(ctx, apx, apy, 22, C.maroon); AL.text(ctx, 'AP', apx, apy + 30, { size: 16, align: 'center' });
    // RIS grid (fixed footprint, element count grows)
    const S = 176, gx = x0 + w / 2 - S / 2 - 20, gy = 66, cs = S / g;
    const us = this.usersAt(x0, w, K);
    // pilot paths: every user to every element (thin lines), plus AP to panel
    ctx.save(); ctx.lineWidth = 0.8;
    for (let k = 0; k < K; k++) {
      ctx.strokeStyle = C.users[k]; ctx.globalAlpha = Math.min(0.5, 6 / (g * g));
      for (let i = 0; i < g; i++) for (let j = 0; j < g; j++) {
        ctx.beginPath(); ctx.moveTo(us[k][0], us[k][1] - 22); ctx.lineTo(gx + (j + 0.5) * cs, gy + (i + 0.5) * cs); ctx.stroke();
      }
    }
    ctx.globalAlpha = 0.5; ctx.strokeStyle = C.maroon; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(apx + 14, apy - 6); ctx.lineTo(gx, gy + S / 2); ctx.stroke();
    ctx.restore();
    // elements: per-element phase states (deterministic pattern)
    for (let i = 0; i < g; i++) for (let j = 0; j < g; j++) {
      const v = 0.5 + 0.5 * Math.sin(1.7 * i + 2.3 * j + 0.9 * t);
      ctx.fillStyle = v > 0.5 ? '#C9A27E' : '#E9D8C6';
      ctx.fillRect(gx + j * cs + 1, gy + i * cs + 1, cs - 2, cs - 2);
    }
    ctx.save(); ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.strokeRect(gx, gy, S, S); ctx.restore();
    AL.text(ctx, 'N elements', gx + S / 2, gy + S + 24, { size: 17, align: 'center', weight: 600, color: C.accent });
    if (u > 0 && u < 1) AL.text(ctx, '\u2191 N grows', gx + S / 2 + 62, gy + S + 24, { size: 15, color: C.gray, italic: true });
    // users
    for (let k = 0; k < K; k++) AL.person(ctx, us[k][0], us[k][1], 40, C.users[k]);
    AL.text(ctx, 'K users', us[0][0], us[K - 1][1] + 24, { size: 17, align: 'center', weight: 600 });
    // coherence window bar
    const bx = x0 + 34, bw = w - 68, by = H - 92, bh = 38;
    const frac = Math.min(0.94, 0.028 * g * g * K / 9 * 1.05);
    AL.text(ctx, 'Channel coherence window (fixed)', bx, by - 12, { size: 16, color: C.gray });
    AL.roundRect(ctx, bx, by, bw, bh, 6, { fill: '#EAF3EA', stroke: C.rule });
    AL.roundRect(ctx, bx, by, Math.max(10, bw * frac), bh, 6, { fill: C.accent });
    const pw = bw * frac;
    if (pw > 150) AL.text(ctx, 'pilots \u221D N \u00D7 K', bx + pw / 2, by + 25, { size: 17, color: '#fff', weight: 600, align: 'center' });
    else AL.text(ctx, 'pilots \u221D N \u00D7 K', bx + pw + 8, by + 25, { size: 17, color: C.accent, weight: 600 });
    const dw = bw - pw;
    if (dw > 70) AL.text(ctx, 'data', bx + pw + dw / 2 + (pw > 150 ? 0 : 60), by + 25, { size: 17, color: C.good, weight: 600, align: 'center' });
    else AL.text(ctx, 'little time left for data', bx + bw, by + bh + 22, { size: 16, color: C.good, weight: 600, align: 'right' });
  },
  panelMRA(x0, w, g, t, K){
    const { ctx, H } = this, C = AL.C;
    AL.text(ctx, 'Mechanical reflector array: positions only', x0 + 24, 34, { size: 20, weight: 700, color: C.good });
    const apx = x0 + 60, apy = 150;
    AL.ap(ctx, apx, apy, 22, C.maroon); AL.text(ctx, 'AP', apx, apy + 30, { size: 16, align: 'center' });
    const S = 176, gx = x0 + w / 2 - S / 2 - 20, gy = 66, cs = S / g;
    const us = this.usersAt(x0, w, K);
    // reflected beams to users (one per user)
    ctx.save(); ctx.strokeStyle = C.ray; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(apx + 14, apy - 6); ctx.lineTo(gx, gy + S / 2); ctx.stroke();
    for (let k = 0; k < K; k++) { ctx.beginPath(); ctx.moveTo(gx + S, gy + S * (0.25 + 0.25 * k)); ctx.lineTo(us[k][0] - 12, us[k][1] - 22); ctx.stroke(); }
    ctx.restore();
    // tiles: metal squares whose shading changes as they turn
    for (let i = 0; i < g; i++) for (let j = 0; j < g; j++) {
      const a = Math.sin(0.6 * t + 0.35 * i - 0.25 * j);
      const L = Math.round(200 + 40 * a);
      ctx.fillStyle = `rgb(${L},${L - 8},${L - 40})`;
      ctx.fillRect(gx + j * cs + 1.5, gy + i * cs + 1.5, cs - 3, cs - 3);
    }
    ctx.save(); ctx.strokeStyle = C.gray; ctx.lineWidth = 2; ctx.strokeRect(gx, gy, S, S); ctx.restore();
    AL.text(ctx, 'N tiles', gx + S / 2, gy + S + 24, { size: 17, align: 'center', weight: 600, color: C.text });
    // users with position pins
    for (let k = 0; k < K; k++) {
      AL.person(ctx, us[k][0], us[k][1], 40, C.users[k]);
      const px = us[k][0] + 26, py = us[k][1] - 40;
      ctx.save(); ctx.fillStyle = C.users[k]; ctx.beginPath(); ctx.arc(px, py, 7, Math.PI, 0); ctx.lineTo(px, py + 12); ctx.closePath(); ctx.fill(); ctx.restore();
      AL.dot(ctx, px, py, 2.5, '#fff');
    }
    AL.text(ctx, 'K users', us[0][0], us[K - 1][1] + 24, { size: 17, align: 'center', weight: 600 });
    // controller input bar: K position chips, constant
    const bx = x0 + 34, bw = w - 68, by = H - 92, bh = 38;
    AL.text(ctx, 'Controller input', bx, by - 12, { size: 16, color: C.gray });
    AL.roundRect(ctx, bx, by, bw, bh, 6, { fill: '#fff', stroke: C.rule });
    for (let k = 0; k < K; k++) {
      AL.roundRect(ctx, bx + 6 + k * 70, by + 5, 62, bh - 10, 5, { fill: C.users[k] });
      AL.text(ctx, 'p' + (k + 1), bx + 37 + k * 70, by + 25, { size: 17, color: '#fff', weight: 600, align: 'center' });
    }
    AL.text(ctx, 'independent of N', bx + 6 + K * 70 + 12, by + 25, { size: 17, color: C.good, weight: 600 });
  }
});
