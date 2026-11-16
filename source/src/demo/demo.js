DeckAnim.register('demo',{
  mount(){ this.n=0; }, reset(){ this.n=0; }, step(n){ this.n=n; },
  frame(t){ const {ctx,W,H}=this; AL.clear(ctx,W,H); const ax=120, ay=H-60;
    AL.ap(ctx,ax,ay,22); const fx=W/2+200*Math.sin(t), fy=120;
    for(let k=0;k<9;k++){ const tx=W/2-160+k*40, ty=H/2; const phi=AL.bisector(tx,ty,ax,ay,fx,fy);
      if(this.n>=1){ ctx.strokeStyle=AL.C.ray; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(tx,ty); ctx.lineTo(fx,fy); ctx.stroke(); }
      AL.tile(ctx,tx,ty,32,phi,{normal:true}); }
    AL.person(ctx,fx,fy+30,40,AL.C.users[0]); AL.text(ctx,'t = '+t.toFixed(1)+' s',16,28,{size:16,color:AL.C.gray}); }
});