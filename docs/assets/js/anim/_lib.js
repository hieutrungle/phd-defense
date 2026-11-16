/* Shared helpers for deck animations (window.AL). Draw in CSS pixels on the provided ctx. */
window.DeckAnim=window.DeckAnim||{registry:{},register(name,def){this.registry[name]=def;}};
(function(){
  const C={maroon:'#500000',maroonmid:'#732F2F',maroonlight:'#F4ECEC',accent:'#B5651D',accentlight:'#F8EFE6',
    text:'#2B2B2B',gray:'#6B6B6B',rule:'#D6D3CE',good:'#2E7D32',gold:'#E3A93C',blue:'#2F6DB5',teal:'#2A8C8C',
    wall:'#8C8C8C',floor:'#FBFAF8',ray:'rgba(227,169,60,0.85)',
    users:['#2F6DB5','#2E7D32','#B5651D','#8E3FA1','#C23B4E'] };
  function rng(seed){ let s=seed>>>0||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>17; s^=s<<5; s>>>=0; return (s>>>0)/4294967296; }; }
  const ease=t=>t<0?0:t>1?1:t*t*(3-2*t);
  const lerp=(a,b,t)=>a+(b-a)*t;
  function arrow(ctx,x0,y0,x1,y1,{color=C.text,width=2,head=9,dash=null}={}){
    ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=width; if(dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); ctx.setLineDash([]);
    const a=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x1,y1);
    ctx.lineTo(x1-head*Math.cos(a-0.4),y1-head*Math.sin(a-0.4)); ctx.lineTo(x1-head*Math.cos(a+0.4),y1-head*Math.sin(a+0.4)); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function text(ctx,str,x,y,{size=16,color=C.text,weight=400,align='left',base='alphabetic',italic=false}={}){
    ctx.save(); ctx.font=`${italic?'italic ':''}${weight} ${size}px "Fira Sans", sans-serif`; ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline=base; ctx.fillText(str,x,y); ctx.restore(); }
  function roundRect(ctx,x,y,w,h,r,{fill=null,stroke=null,width=1.5}={}){
    ctx.save(); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
    if(fill){ctx.fillStyle=fill; ctx.fill();} if(stroke){ctx.strokeStyle=stroke; ctx.lineWidth=width; ctx.stroke();} ctx.restore(); }
  function dot(ctx,x,y,r,fill,stroke){ ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,2*Math.PI); ctx.fillStyle=fill; ctx.fill(); if(stroke){ctx.strokeStyle=stroke; ctx.lineWidth=1.5; ctx.stroke();} ctx.restore(); }
  // person icon (user) at x,y (feet), height h
  function person(ctx,x,y,h,color){ ctx.save(); ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x,y-h*0.82,h*0.16,0,2*Math.PI); ctx.fill();
    roundRect(ctx,x-h*0.17,y-h*0.62,h*0.34,h*0.62,h*0.12,{fill:color}); ctx.restore(); }
  // access point icon
  function ap(ctx,x,y,s=14,color=C.maroon){ ctx.save(); roundRect(ctx,x-s*0.7,y-s*0.35,s*1.4,s*0.7,3,{fill:color});
    ctx.strokeStyle=color; ctx.lineWidth=2; for(let k=1;k<=2;k++){ ctx.beginPath(); ctx.arc(x,y-s*0.35,s*0.45*k,-Math.PI*0.8,-Math.PI*0.2); ctx.stroke(); } ctx.restore(); }
  // a reflective tile drawn as a short segment centred at (x,y) with normal angle phi (radians)
  function tile(ctx,x,y,len,phi,{color=C.gold,width=5,normal=false}={}){
    const tx=-Math.sin(phi), ty=Math.cos(phi);
    ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineCap='round'; ctx.beginPath();
    ctx.moveTo(x-tx*len/2,y-ty*len/2); ctx.lineTo(x+tx*len/2,y+ty*len/2); ctx.stroke();
    if(normal){ ctx.strokeStyle=C.gray; ctx.lineWidth=1; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(phi)*len*0.9,y+Math.sin(phi)*len*0.9); ctx.stroke(); }
    ctx.restore(); }
  // unit vector helpers
  const norm=(x,y)=>{const n=Math.hypot(x,y)||1; return [x/n,y/n];};
  // bisector normal angle for a tile at (tx,ty) reflecting from source s to target f
  function bisector(tx,ty,sx,sy,fx,fy){ const a=norm(sx-tx,sy-ty), b=norm(fx-tx,fy-ty); return Math.atan2(a[1]+b[1],a[0]+b[0]); }
  function clear(ctx,W,H,bg='#fff'){ ctx.save(); ctx.setTransform(ctx.getTransform()); ctx.fillStyle=bg; ctx.fillRect(0,0,W,H); ctx.restore(); }
  // heat colormap (viridis-like) for coverage maps, v in [0,1]
  const VIR=[[68,1,84],[59,82,139],[33,145,140],[94,201,98],[253,231,37]];
  function cmap(v){ v=Math.max(0,Math.min(1,v)); const p=v*(VIR.length-1), i=Math.min(VIR.length-2,Math.floor(p)), f=p-i;
    const c=VIR[i].map((a,k)=>Math.round(a+(VIR[i+1][k]-a)*f)); return `rgb(${c[0]},${c[1]},${c[2]})`; }
  window.AL={C,rng,ease,lerp,arrow,text,roundRect,dot,person,ap,tile,norm,bisector,clear,cmap};
})();
