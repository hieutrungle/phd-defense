/* A5 (placement): PSO particles = full layouts (3 APs + reflector position on the east wall + focal target)
   search a schematic floorplan, converge, then gradient refinement takes small deterministic steps from the
   global best. Heat map = toy coverage of the current global best; inset = its objective (no numbers).
   Illustrative only: toy propagation (distance loss + wall loss + a reflector lobe), not simulation output.
   The whole optimization is precomputed once (deterministic, AL.rng) and frame(t) only interpolates it. */
(function(){
  // ---------------- schematic floorplan (unit square, y down = south) ----------------
  const WALLS=[ // interior walls [x1,y1,x2,y2]; gaps are doors
    [0,.42,.12,.42],[.20,.42,.45,.42],[.53,.42,.78,.42],[.86,.42,1,.42],   // north side of corridor
    [.33,0,.33,.42],[.66,0,.66,.42],                                         // north rooms
    [0,.58,.20,.58],[.28,.58,.62,.58],[.70,.58,1,.58],                       // south side of corridor
    [.48,.58,.48,1]];                                                        // south rooms
  const PRI=[[.66,0,1,.42],[0,.58,.48,1]];            // priority rooms (NE, SW)
  const LO=[.04,.04,.04,.04,.04,.04,.07,.05,.05], HI=[.96,.96,.96,.96,.96,.96,.93,.95,.95];
  const D=9, NAP=3, TAU=1.0, WL=12, GREF=14, VMIN=-50, VMAX=-10;
  const orient=(ax,ay,bx,by,cx,cy)=>(bx-ax)*(cy-ay)-(by-ay)*(cx-ax);
  // soft count of wall crossings (sigmoid in the side-of-wall test and in the distance to a door edge),
  // so the toy objective is smooth enough for gradient steps
  const sig=z=>1/(1+Math.exp(-z)), EPS=.008;
  const WL_=WALLS.map(w=>{ const L=Math.hypot(w[2]-w[0],w[3]-w[1]); return [w[0],w[1],(w[2]-w[0])/L,(w[3]-w[1])/L,L]; });
  function nWalls(ax,ay,bx,by){ let n=0;
    for(const [px,py,ux,uy,L] of WL_){
      const sa=(ax-px)*uy-(ay-py)*ux, sb=(bx-px)*uy-(by-py)*ux;
      if(sa*sb>0 && Math.min(Math.abs(sa),Math.abs(sb))>10*EPS) continue;
      const den=sa-sb; if(Math.abs(den)<1e-9) continue;
      const tt=sa/den, ix=ax+tt*(bx-ax), iy=ay+tt*(by-ay), s=(ix-px)*ux+(iy-py)*uy;
      if(tt<-.3||tt>1.3) continue;
      const cross=sig(sa/EPS)*sig(-sb/EPS)+sig(-sa/EPS)*sig(sb/EPS);
      n+=cross*sig(Math.min(s,L-s)/EPS); }
    return n; }
  const PL=d=>-20*Math.log10(1+30*d);
  const inPri=(x,y)=>PRI.some(r=>x>=r[0]&&x<=r[2]&&y>=r[1]&&y<=r[3]);
  function grid(n){ const c=[]; for(let j=0;j<n;j++) for(let i=0;i<n;i++) c.push([(i+.5)/n,(j+.5)/n]); return c; }
  const COARSE=grid(18), FINE=grid(46);
  const WCO=COARSE.map(c=>inPri(c[0],c[1])?3:1);
  // toy strongest-server field: direct path + reflector path per AP (incoherent sum), max over APs
  function field(x,cells){
    const rx=1, ry=x[6], rix=.988, tx=x[7], ty=x[8];
    let tdx=tx-rx, tdy=ty-ry; const tn=Math.hypot(tdx,tdy)||1; tdx/=tn; tdy/=tn;
    const pr=[]; for(let n=0;n<NAP;n++){ const ax=x[2*n], ay=x[2*n+1]; pr.push(PL(Math.hypot(ax-rx,ay-ry))-WL*nWalls(ax,ay,rix,ry)); }
    const out=new Float64Array(cells.length);
    for(let k=0;k<cells.length;k++){ const cx=cells[k][0], cy=cells[k][1];
      const dx=cx-rx, dy=cy-ry, dr=Math.hypot(dx,dy)||1e-6, cs=(dx*tdx+dy*tdy)/dr;
      const beam=cs>0?10*Math.pow(cs,8)-10:-10+20*cs; const refl=GREF+PL(dr)-WL*nWalls(rix,ry,cx,cy)+beam;
      const ps=[]; let mx=-1e9;
      for(let n=0;n<NAP;n++){ const ax=x[2*n], ay=x[2*n+1];
        const pd=PL(Math.hypot(ax-cx,ay-cy))-WL*nWalls(ax,ay,cx,cy), p2=pr[n]+refl;
        const p=10*Math.log10(Math.pow(10,pd/10)+Math.pow(10,p2/10)); ps.push(p); if(p>mx) mx=p; }
      let se=0; for(const p of ps) se+=Math.exp((p-mx)/TAU);   // smooth strongest-server (soft max over APs)
      out[k]=mx+TAU*Math.log(se); }
    return out; }
  // soft worst case over priority-weighted locations + small coverage term (same structure as the slide)
  function objective(x){ const P=field(x,COARSE), T=.12, fl=-50, ce=-16, g=-30; let s=0, ws=0, cov=0;
    for(let k=0;k<P.length;k++){ const sc=(P[k]-fl)/(ce-fl), pen=1-Math.min(Math.max(sc,0),1); s+=WCO[k]*Math.exp(pen/T); ws+=WCO[k];
      cov+=1/(1+Math.exp(-(P[k]-g)/2)); }
    return T*(Math.log(s)-Math.log(ws)) - 0.2*cov/P.length; }
  const clampX=x=>x.map((v,i)=>Math.min(HI[i],Math.max(LO[i],v)));
  // ---------------- precompute PSO + gradient refinement (cached across slide visits) ----------------
  let CACHE=null;
  function precompute(){
    if(CACHE) return CACHE;
    const r=AL.rng(20261115), M=10, K=14, G=14;
    let X=[], V=[];
    for(let p=0;p<M;p++){ X.push(LO.map((l,i)=>l+(HI[i]-l)*r())); V.push(LO.map(()=>(r()-.5)*.08)); }
    let F=X.map(objective), PB=X.map(x=>x.slice()), PF=F.slice();
    let gi=PF.indexOf(Math.min(...PF)), GB=PB[gi].slice(), GF=PF[gi];
    const hist={X:[X.map(x=>x.slice())], PB:[PB.map(x=>x.slice())], GB:[GB.slice()], GF:[GF]};
    for(let k=0;k<K;k++){ const a=k/(K-1), w=.9-.5*a, cp=2.0-1.5*a, cg=.5+1.5*a;
      for(let p=0;p<M;p++){ for(let i=0;i<D;i++){
          V[p][i]=w*V[p][i]+cp*r()*(PB[p][i]-X[p][i])+cg*r()*(GB[i]-X[p][i]); V[p][i]=Math.max(-.12,Math.min(.12,V[p][i])); }
        X[p]=clampX(X[p].map((v,i)=>v+V[p][i])); const f=objective(X[p]);
        if(f<PF[p]){ PF[p]=f; PB[p]=X[p].slice(); } }
      gi=PF.indexOf(Math.min(...PF)); if(PF[gi]<GF){ GF=PF[gi]; GB=PB[gi].slice(); }
      hist.X.push(X.map(x=>x.slice())); hist.PB.push(PB.map(x=>x.slice())); hist.GB.push(GB.slice()); hist.GF.push(GF); }
    // gradient refinement: normalized central-difference gradient, small fixed step with backtracking
    const Y=[GB.slice()], YF=[GF]; let y=GB.slice(), fy=GF;
    for(let j=0;j<G;j++){ const h=.004, g=[]; for(let i=0;i<D;i++){ const a=y.slice(), b=y.slice(); a[i]+=h; b[i]-=h; g.push((objective(a)-objective(b))/(2*h)); }
      for(let i=0;i<D;i++){ if((y[i]<=LO[i]+1e-9&&g[i]>0)||(y[i]>=HI[i]-1e-9&&g[i]<0)) g[i]=0; }  // projected gradient at the bounds
      const gn=Math.hypot(...g)||1; let step=.03, moved=false;
      for(let tries=0;tries<5&&!moved;tries++){ const z=clampX(y.map((v,i)=>v-step*g[i]/gn)), fz=objective(z); if(fz<fy){ y=z; fy=fz; moved=true; } else step/=2; }
      Y.push(y.slice()); YF.push(fy); }
    // coverage maps of every distinct displayed best layout
    const maps=new Map(); const keyOf=x=>x.map(v=>v.toFixed(5)).join(',');
    const VIR=[[68,1,84],[59,82,139],[33,145,140],[94,201,98],[253,231,37]];
    function rgb(v){ v=Math.max(0,Math.min(1,v)); const q=v*(VIR.length-1), i=Math.min(VIR.length-2,Math.floor(q)), f=q-i; return VIR[i].map((c,k)=>Math.round(c+(VIR[i+1][k]-c)*f)); }
    function mapOf(x){ const key=keyOf(x); if(maps.has(key)) return maps.get(key);
      const n=Math.round(Math.sqrt(FINE.length)), P=field(x,FINE), cv=document.createElement('canvas'); cv.width=n; cv.height=n;
      const c2=cv.getContext('2d'), im=c2.createImageData(n,n);
      for(let k=0;k<P.length;k++){ const c=rgb((P[k]-VMIN)/(VMAX-VMIN)); im.data[4*k]=c[0]; im.data[4*k+1]=c[1]; im.data[4*k+2]=c[2]; im.data[4*k+3]=255; }
      c2.putImageData(im,0,0); maps.set(key,cv); return cv; }
    hist.GB.forEach(mapOf); Y.forEach(mapOf);
    const curve=hist.GF.concat(YF.slice(1));
    CACHE={M,K,G,hist,Y,YF,curve,mapOf}; return CACHE; }

  const PCOL=['#2F6DB5','#2E7D32','#B5651D','#8E3FA1','#C23B4E','#2A8C8C','#7A6A00','#D16BA5','#5B5BD6','#8C564B'];
  const T0=.6, DTI=.45, HOLD1=.7, DTG=.3, HOLD2=2.0;
  DeckAnim.register('pso',{
    mount(canvas,ctx,opts){ this.P=precompute(); const P=this.P;
      this.tPSO=T0+P.K*DTI; this.tSW=this.tPSO+HOLD1; this.tGD=this.tSW+P.G*DTG; this.LOOP=this.tGD+HOLD2; },
    reset(){}, step(n){},
    frame(t){
      const {ctx,W,H,P}=this; AL.clear(ctx,W,H); const C=AL.C, tt=t%this.LOOP;
      const S=Math.min(H-40,W*0.39), FX=20, FY=20, X=u=>FX+u*S, Yp=v=>FY+v*S;
      // ---- timeline state
      let phase=1, k=0, f=0, j=0, fade=1, prog;
      if(tt<T0){ k=0; f=0; prog=0; }
      else if(tt<this.tPSO){ const s=(tt-T0)/DTI; k=Math.floor(s); f=AL.ease(s-k); prog=s; }
      else if(tt<this.tSW){ k=P.K; f=0; prog=P.K; fade=1-AL.ease((tt-this.tPSO)/HOLD1); }
      else { phase=2; fade=0; const s=Math.min(P.G,(tt-this.tSW)/DTG); j=Math.floor(s); f=AL.ease(s-j); if(j>=P.G){j=P.G; f=0;} prog=P.K+s; }
      const lerpV=(a,b,w)=>a.map((v,i)=>v+(b[i]-v)*w);
      let best, mapA, mapB, mw;
      if(phase===1){ const kb=Math.min(k+1,P.K); best=P.hist.GB[k]; mapA=P.mapOf(P.hist.GB[k]); mapB=P.mapOf(P.hist.GB[kb]); mw=(k<P.K)?f:0; if(k<P.K&&f>.5) best=P.hist.GB[kb]; }
      else { const jb=Math.min(j+1,P.G); best=lerpV(P.Y[j],P.Y[jb],f); mapA=P.mapOf(P.Y[j]); mapB=P.mapOf(P.Y[jb]); mw=f; }
      // ---- heat map of the global best (cross-fade between successive bests)
      ctx.save(); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';
      ctx.drawImage(mapA,X(0),Yp(0),S,S); if(mapB!==mapA&&mw>0){ ctx.globalAlpha=mw; ctx.drawImage(mapB,X(0),Yp(0),S,S); } ctx.restore();
      // ---- priority regions: white hatch + dashed outline
      for(const r of PRI){ const x0=X(r[0]),y0=Yp(r[1]),w=X(r[2])-x0,h=Yp(r[3])-y0;
        ctx.save(); ctx.beginPath(); ctx.rect(x0,y0,w,h); ctx.clip(); ctx.strokeStyle='rgba(255,255,255,0.33)'; ctx.lineWidth=1.5;
        for(let d=-h;d<w;d+=11){ ctx.beginPath(); ctx.moveTo(x0+d,y0+h); ctx.lineTo(x0+d+h,y0); ctx.stroke(); }
        ctx.restore(); ctx.save(); ctx.setLineDash([7,5]); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.strokeRect(x0+3,y0+3,w-6,h-6); ctx.restore();
        AL.roundRect(ctx,x0+9,y0+9,72,22,4,{fill:'rgba(255,255,255,0.9)'}); AL.text(ctx,'priority',x0+45,y0+25,{size:15,weight:600,color:C.maroon,align:'center'}); }
      // ---- walls
      ctx.save(); ctx.strokeStyle='#333'; ctx.lineCap='square'; ctx.lineWidth=4;
      for(const w of WALLS){ ctx.beginPath(); ctx.moveTo(X(w[0]),Yp(w[1])); ctx.lineTo(X(w[2]),Yp(w[3])); ctx.stroke(); }
      ctx.lineWidth=5; ctx.strokeRect(X(0),Yp(0),S,S); ctx.restore();
      // mounting wall highlight (east wall)
      ctx.save(); ctx.strokeStyle=C.gold; ctx.globalAlpha=.55; ctx.lineWidth=2; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(X(1)+8,Yp(LO[6])); ctx.lineTo(X(1)+8,Yp(HI[6])); ctx.stroke(); ctx.restore();
      // ---- particles (phase 1; fade out at the switch)
      if(fade>0.01){ const kb=Math.min(k+1,P.K), XA=P.hist.X[k], XB=P.hist.X[kb], PBk=P.hist.PB[f>.5?kb:k];
        for(let p=0;p<P.M;p++){ const col=PCOL[p%PCOL.length], cur=lerpV(XA[p],XB[p],f);
          ctx.save(); ctx.globalAlpha=fade;
          // personal best: hollow rings
          for(let n=0;n<NAP;n++){ const bx=X(PBk[p][2*n]), by=Yp(PBk[p][2*n+1]);
            ctx.beginPath(); ctx.arc(bx,by,7,0,2*Math.PI); ctx.strokeStyle='#fff'; ctx.lineWidth=3.5; ctx.stroke(); ctx.strokeStyle=col; ctx.lineWidth=1.8; ctx.stroke(); }
          // one particle = one layout: faint triangle linking its APs
          ctx.globalAlpha=fade*.45; ctx.strokeStyle=col; ctx.lineWidth=1.5; ctx.beginPath();
          for(let n=0;n<=NAP;n++){ const m=n%NAP; const px=X(cur[2*m]), py=Yp(cur[2*m+1]); n?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke();
          ctx.globalAlpha=fade;
          for(let n=0;n<NAP;n++){ const px=X(cur[2*n]), py=Yp(cur[2*n+1]);
            if(k<P.K){ const sx=X(XA[p][2*n]), sy=Yp(XA[p][2*n+1]); ctx.strokeStyle=col; ctx.globalAlpha=fade*.7; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(px,py); ctx.stroke(); ctx.globalAlpha=fade; }
            AL.dot(ctx,px,py,4.6,col,'#fff'); }
          // its reflector position: tick beside the east wall
          const ry=Yp(cur[6]); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(X(1)+12,ry); ctx.lineTo(X(1)+24,ry); ctx.stroke();
          ctx.restore(); } }
      // ---- gradient-refinement trail of the best layout (phase 2)
      if(phase===2){ ctx.save();
        for(let n=0;n<NAP;n++){ ctx.strokeStyle='#fff'; ctx.lineWidth=2.2; ctx.beginPath();
          for(let q=0;q<=j;q++){ const px=X(P.Y[q][2*n]), py=Yp(P.Y[q][2*n+1]); q?ctx.lineTo(px,py):ctx.moveTo(px,py); }
          ctx.lineTo(X(best[2*n]),Yp(best[2*n+1])); ctx.stroke();
          for(let q=0;q<=j;q++) AL.dot(ctx,X(P.Y[q][2*n]),Yp(P.Y[q][2*n+1]),2.6,'#fff'); }
        ctx.restore(); }
      // ---- global best layout: reflector lobe, focal target, AP icons
      const rx=X(1), ry=Yp(best[6]), tx=X(best[7]), ty=Yp(best[8]);
      { let dx=tx-rx, dy=ty-ry; const dn=Math.hypot(dx,dy)||1; dx/=dn; dy/=dn; const px=-dy, py=dx, sp=dn*.16;
        ctx.save(); ctx.fillStyle='rgba(227,169,60,0.16)'; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(tx+px*sp,ty+py*sp); ctx.lineTo(tx-px*sp,ty-py*sp); ctx.closePath(); ctx.fill();
        ctx.strokeStyle=C.gold; ctx.lineWidth=2; ctx.setLineDash([6,4]); ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(tx,ty); ctx.stroke(); ctx.restore();
        ctx.save(); ctx.strokeStyle='#fff'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(tx-9,ty); ctx.lineTo(tx+9,ty); ctx.moveTo(tx,ty-9); ctx.lineTo(tx,ty+9); ctx.stroke();
        ctx.strokeStyle=C.accent; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
      ctx.save(); ctx.lineCap='butt'; ctx.strokeStyle='#222'; ctx.lineWidth=11; ctx.beginPath(); ctx.moveTo(rx-2,ry-S*.065); ctx.lineTo(rx-2,ry+S*.065); ctx.stroke();
      ctx.strokeStyle=C.gold; ctx.lineWidth=7; ctx.stroke(); ctx.restore();
      for(let n=0;n<NAP;n++){ const ax=X(best[2*n]), ay=Yp(best[2*n+1]); AL.dot(ctx,ax,ay,14,'rgba(255,255,255,0.92)',C.maroon); AL.ap(ctx,ax,ay+4,15,C.maroon); }

      // ================= middle column: phase boxes, update rule, legend =================
      const mx=FX+S+44, mw2=Math.min(300,W*0.27);
      const box=(y,num,title,sub,on)=>{ AL.roundRect(ctx,mx,y,mw2,62,7,{fill:on?C.maroon:'#fff',stroke:on?C.maroon:C.rule,width:1.5});
        AL.text(ctx,num+'  '+title,mx+12,y+26,{size:18,weight:700,color:on?'#fff':C.gray}); AL.text(ctx,sub,mx+12,y+49,{size:15,color:on?'#f1dede':C.gray}); };
      box(FY,'1','PSO search','particles = full layouts',phase===1);
      box(FY+72,'2','Gradient refinement','small steps from the global best',phase===2);
      const ry2=FY+168;
      if(phase===1){ AL.text(ctx,'v \u2190 \u03c9 v + c\u2081 r\u2081 (personal best \u2212 x)',mx,ry2,{size:16,color:C.text});
        AL.text(ctx,'      + c\u2082 r\u2082 (global best \u2212 x),  x \u2190 x + v',mx,ry2+22,{size:16,color:C.text}); }
      else { AL.text(ctx,'x \u2190 x \u2212 \u03b7 \u2207L(x)',mx,ry2,{size:16,color:C.text});
        AL.text(ctx,'gradient through the ray tracer',mx,ry2+22,{size:16,color:C.gray}); }
      // legend
      let ly=FY+232; const LH=29;
      const leg=(draw,label)=>{ draw(mx+12,ly-5); AL.text(ctx,label,mx+34,ly,{size:15,color:C.text}); ly+=LH; };
      leg((x,y)=>{ AL.dot(ctx,x-5,y,4.6,PCOL[0],'#fff'); AL.dot(ctx,x+6,y,4.6,PCOL[2],'#fff'); },'particle APs (one color = one layout)');
      leg((x,y)=>{ ctx.save(); ctx.beginPath(); ctx.arc(x,y,7,0,2*Math.PI); ctx.strokeStyle=PCOL[0]; ctx.lineWidth=1.8; ctx.stroke(); ctx.restore(); },'personal best');
      leg((x,y)=>{ AL.ap(ctx,x,y+4,15,C.maroon); },'global best APs');
      leg((x,y)=>{ ctx.save(); ctx.strokeStyle='#222'; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(x,y-10); ctx.lineTo(x,y+10); ctx.stroke(); ctx.strokeStyle=C.gold; ctx.lineWidth=6; ctx.stroke(); ctx.restore(); },'reflector on the east wall');
      leg((x,y)=>{ ctx.save(); ctx.strokeStyle=C.accent; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x-8,y); ctx.lineTo(x+8,y); ctx.moveTo(x,y-8); ctx.lineTo(x,y+8); ctx.stroke(); ctx.restore(); },'focal target of the reflector');
      leg((x,y)=>{ ctx.save(); ctx.setLineDash([5,4]); ctx.strokeStyle=C.maroon; ctx.lineWidth=2; ctx.strokeRect(x-9,y-8,18,16); ctx.restore(); },'priority room (weighted)');

      // ================= right column: inset objective curve + colour bar =================
      const ix=mx+mw2+34, iw=W-ix-24, iy=FY, ih=Math.min(230,H*0.48);
      AL.roundRect(ctx,ix,iy,iw,ih,7,{fill:'#fff',stroke:C.rule,width:1.5});
      AL.text(ctx,'Objective of the global best',ix+12,iy+24,{size:16,weight:600,color:C.text});
      AL.text(ctx,'lower is better',ix+12,iy+44,{size:15,color:C.gray});
      const px0=ix+30, px1=ix+iw-16, py0=iy+60, py1=iy+ih-30, cyT=py0+26, cyB=py1-8, N=P.curve.length-1;
      // log scale so the refinement phase stays visible (no tick values: schematic)
      const LC=P.curve.map(v=>Math.log(v)), cmin=Math.min(...LC), cmax=Math.max(...LC), cx=i=>px0+(px1-px0)*i/N, cy=v=>cyT+(cyB-cyT)*(cmax-Math.log(v))/(cmax-cmin||1);
      ctx.save(); ctx.strokeStyle=C.text; ctx.lineWidth=1.3; ctx.beginPath(); ctx.moveTo(px0,py0-4); ctx.lineTo(px0,py1); ctx.lineTo(px1,py1); ctx.stroke(); ctx.restore();
      AL.text(ctx,'iteration',(px0+px1)/2,py1+20,{size:15,color:C.gray,align:'center'});
      const xb=cx(P.K); ctx.save(); ctx.strokeStyle=C.gray; ctx.setLineDash([3,4]); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(xb,py0-4); ctx.lineTo(xb,py1); ctx.stroke(); ctx.restore();
      AL.text(ctx,'PSO',(px0+xb)/2,py0+2,{size:15,color:C.gray,align:'center'}); AL.text(ctx,'refine',(xb+px1)/2,py0+2,{size:15,color:C.gray,align:'center'});
      const upto=Math.min(N,prog); ctx.save(); ctx.strokeStyle=C.maroon; ctx.lineWidth=2.6; ctx.lineJoin='round'; ctx.beginPath();
      for(let i=0;i<=Math.floor(upto);i++){ const X1=cx(i), Y1=cy(P.curve[i]); i?ctx.lineTo(X1,Y1):ctx.moveTo(X1,Y1); }
      const i0=Math.floor(upto), fr=upto-i0; let ex=cx(i0), ey=cy(P.curve[i0]);
      if(i0<N&&fr>0){ ex=cx(i0+fr); ey=cy(P.curve[i0]+(P.curve[i0+1]-P.curve[i0])*fr); ctx.lineTo(ex,ey); } ctx.stroke(); ctx.restore();
      AL.dot(ctx,ex,ey,4.5,C.maroon,'#fff');
      // colour bar
      const by=iy+ih+34; AL.text(ctx,'Coverage of the global best',ix,by,{size:16,weight:600,color:C.text});
      const g=ctx.createLinearGradient(ix,0,ix+iw,0); for(let q=0;q<=10;q++) g.addColorStop(q/10,AL.cmap(q/10));
      ctx.save(); ctx.fillStyle=g; ctx.fillRect(ix,by+10,iw,16); ctx.restore();
      AL.text(ctx,'weak',ix,by+46,{size:15,color:C.gray}); AL.text(ctx,'strong',ix+iw,by+46,{size:15,color:C.gray,align:'right'});
      AL.text(ctx,'Toy model: distance and wall loss;',ix,by+82,{size:15,color:C.gray});
      AL.text(ctx,'the reflector re-radiates toward',ix,by+102,{size:15,color:C.gray});
      AL.text(ctx,'its focal target.',ix,by+122,{size:15,color:C.gray});
    }
  });
})();
