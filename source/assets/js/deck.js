/* Deck runtime: Reveal init, KaTeX, footer + numbering, section dividers, animation manager. */
(function(){
  const PARTS=[['WHY','Motivation'],['WHAT','Foundations'],['HOW','Learned control'],['WHERE','Placement'],['WHICH','Conclusions']];

  // ---- section dividers: <section class="divider" data-num="3" data-title="Foundations" data-part="WHAT" data-question="...">
  function buildDividers(){
    document.querySelectorAll('section.divider').forEach(s=>{
      const part=s.dataset.part||'';
      let map='';
      if(part){ map='<div class="partmap">'+PARTS.map(([k,l])=>`<div class="p${k===part?' on':''}"><b>${k}</b><span>${l}</span></div>`).join('')+'</div>'; }
      const q=s.dataset.question?`<div class="dq">${s.dataset.question}</div>`:'';
      const keep=s.innerHTML; // notes etc.
      s.innerHTML=`<img class="dlogo" src="assets/img/logos/texas-wireless-2026-white.png" alt="">`+
        `<div class="dnum">${s.dataset.num?s.dataset.num+'. ':''}${s.dataset.title||''}</div>${q}${map}`+keep;
    });
  }
  // ---- footer
  function buildFooter(){
    const f=document.createElement('div'); f.className='deck-footer';
    f.innerHTML='<div class="rule"></div><img class="tamu" src="assets/img/logos/tamu-atm-box.png" alt="">'+
      '<div class="mid">H. T. Le &nbsp;|&nbsp; Spatial Intelligence for Smart Radio Environments</div><div class="num"></div>'+
      '<img class="lab" src="assets/img/logos/texas-wireless-2026.png" alt="">';
    const g=document.createElement('button'); g.type='button'; g.className='gotobtn'; g.title='Go to slide (G)'; g.textContent='▦';
    f.appendChild(g); g.addEventListener('click',e=>{e.stopPropagation(); openPicker();});
    f.querySelector('.num').title='Go to slide (G)'; f.querySelector('.num').addEventListener('click',e=>{e.stopPropagation(); openPicker();});
    document.querySelector('.reveal').appendChild(f); return f;
  }
  function numberOf(slide){ // count non-divider slides up to and including this one
    const all=[...document.querySelectorAll('.reveal .slides > section')]; let n=0;
    for(const s of all){ if(!s.classList.contains('divider')) n++; if(s===slide) break; } return n;
  }


  // ---- two-column alignment
  // A shorter box column stretches to the full column height (box edges line up).
  // A shorter text column spreads its items only when the extra gap per item stays small (<= 26 px);
  // otherwise it stays compact and is vertically centered (no large white space between lines).
  const MEDIA='img,video,canvas,svg,figure,table';
  function isMedia(col){ return !!col.querySelector(MEDIA) && col.textContent.replace(/\s+/g,'').length<160; }
  function alignCols(slide){
    if(slide.dataset.aligned) return;
    const imgs=[...slide.querySelectorAll('img')].filter(i=>!i.complete);
    if(imgs.length){ Promise.all(imgs.map(i=>new Promise(r=>{i.onload=i.onerror=r;}))).then(()=>alignCols(slide)); return; }
    slide.dataset.aligned='1';
    slide.querySelectorAll('.cols').forEach(c=>{
      if(c.closest('.anim')||c.classList.contains('noalign')) return;
      const cs=[...c.children]; if(cs.length!==2) return;
      const sc=Reveal.getScale()||1;
      const ext=x=>{ const k=[...x.children].filter(e=>!e.matches('aside.notes,style')); if(!k.length) return x.getBoundingClientRect().height;
        const r=k.map(e=>e.getBoundingClientRect()); return Math.max(...r.map(q=>q.bottom))-Math.min(...r.map(q=>q.top)); };
      const h=cs.map(ext); const extra=Math.abs(h[0]-h[1])/sc; if(extra<12) return;
      const lo=h[0]<h[1]?0:1, short=cs[lo];
      if(isMedia(short)) return;
      if(short.matches('.block,.alertblock,.goodblock')){ c.style.alignItems='stretch'; return; } // a box column: equal height, top-aligned
      const kids=[...short.children].filter(k=>!k.matches('aside.notes,style'));
      if(kids.length===1 && kids[0].matches('.block,.alertblock,.goodblock')){
        c.style.alignItems='stretch'; const bx=kids[0]; short.style.display='flex'; short.style.flexDirection='column'; bx.style.flex='1'; bx.style.margin='0'; return; }
      const list=(kids.length===1 && kids[0].matches('ul,ol')) ? kids[0] : null;
      const nItems=list ? list.children.length : kids.length;
      if(nItems>1 && extra/(nItems-1)<=26){
        c.style.alignItems='stretch'; short.style.display='flex'; short.style.flexDirection='column'; short.style.justifyContent='space-between';
        if(list){ list.style.flex='1'; list.style.display='flex'; list.style.flexDirection='column'; list.style.justifyContent='space-between'; list.style.margin='0 0 0 1.1em'; }
      } else if(!short.classList.contains('lr-panel')) { short.style.alignSelf='center'; }
    });
  }


  // ---- slide picker (Q&A): G or click the footer number / grid button; type a number or words; Enter to jump
  let pickItems=[], pickSel=0, pickBox=null;
  function cleanTitle(s){ return s.replace(/\\(mathrm|mathbf|text|operatorname)\{([^}]*)\}/g,'$2').replace(/\\([a-zA-Z]+)/g,(m,w)=>({times:'×',pm:'±',to:'→',rightarrow:'→',approx:'≈',le:'≤',ge:'≥',alpha:'α',delta:'δ',sigma:'σ',psi:'ψ',xi:'ξ',pi:'π',Delta:'Δ'}[w]||w))
      .replace(/[\$\{\}]/g,'').replace(/\s+/g,' ').trim(); }
  function collectSlides(){
    const all=[...document.querySelectorAll('.reveal .slides > section')]; let n=0, part='', inBackup=false; pickItems=[];
    all.forEach((s,i)=>{ const div=s.classList.contains('divider');
      if(div){ part=cleanTitle(s.dataset.title||s.textContent||''); if((s.dataset.id||'')==='div-backup'||/backup/i.test(part)) inBackup=true; pickItems.push({i,div:true,num:'',title:part,part}); return; }
      n++; const h=s.querySelector('h2.title'); let t=h?cleanTitle(h.textContent):(s.classList.contains('titleslide')?'Title':'');
      if(s.classList.contains('backup')) inBackup=true;
      pickItems.push({i,div:false,num:String(n),title:(s.classList.contains('backup')?'Backup: ':'')+t,part:inBackup?'Backup':part}); });
  }
  function buildPicker(){
    pickBox=document.createElement('div'); pickBox.className='goto'; pickBox.hidden=true;
    pickBox.innerHTML='<div class="gpanel"><input type="text" spellcheck="false" placeholder="Go to slide: type a number or words"><div class="glist"></div>'+
      '<div class="ghint">↑ ↓ select &nbsp;·&nbsp; Enter go &nbsp;·&nbsp; Esc close</div></div>';
    document.body.appendChild(pickBox);
    const inp=pickBox.querySelector('input');
    inp.addEventListener('input',()=>{pickSel=0; renderPicker();});
    inp.addEventListener('keydown',e=>{ const vis=[...pickBox.querySelectorAll('.gitem')];
      if(e.key==='ArrowDown'){pickSel=Math.min(vis.length-1,pickSel+1); renderSel(); e.preventDefault();}
      else if(e.key==='ArrowUp'){pickSel=Math.max(0,pickSel-1); renderSel(); e.preventDefault();}
      else if(e.key==='Enter'){ if(vis[pickSel]) jumpTo(+vis[pickSel].dataset.i); e.preventDefault(); }
      else if(e.key==='Escape'){ closePicker(); e.preventDefault(); }
      e.stopPropagation(); });
    pickBox.addEventListener('mousedown',e=>{ if(e.target===pickBox) closePicker(); });
  }
  function renderPicker(){
    const q=pickBox.querySelector('input').value.trim().toLowerCase(), list=pickBox.querySelector('.glist'); let html='', lastPart=null;
    const words=q.split(/\s+/).filter(Boolean), isNum=/^\d+$/.test(q);
    let items=pickItems.filter(it=>!it.div && (!q || (isNum ? it.num.startsWith(q) : words.every(w=>(it.title+' '+it.part+' '+it.num).toLowerCase().includes(w)))));
    if(isNum) items.sort((a,b)=>(b.num===q)-(a.num===q));
    const cur=Reveal.getIndices().h;
    items.forEach(it=>{ if(!isNum && it.part!==lastPart){ html+='<div class="gpart">'+it.part+'</div>'; lastPart=it.part; }
      html+='<div class="gitem'+(it.i===cur?' gcur':'')+'" data-i="'+it.i+'"><span class="gnum">'+it.num+'</span><span class="gtitle">'+it.title.replace(/</g,'&lt;')+'</span></div>'; });
    list.innerHTML=html||'<div class="gnone">No matching slide</div>';
    list.querySelectorAll('.gitem').forEach((el,k)=>{ el.onmouseenter=()=>{pickSel=k; renderSel(false);}; el.onclick=()=>jumpTo(+el.dataset.i); });
    if(!q){ const all=[...list.querySelectorAll('.gitem')]; const k=all.findIndex(el=>+el.dataset.i===cur); pickSel=Math.max(0,k); }
    renderSel();
  }
  function renderSel(scroll=true){ const vis=[...pickBox.querySelectorAll('.gitem')]; vis.forEach((el,k)=>el.classList.toggle('gsel',k===pickSel));
    if(scroll&&vis[pickSel]) vis[pickSel].scrollIntoView({block:'nearest'}); }
  function openPicker(){ if(!pickBox) buildPicker(); collectSlides(); pickBox.hidden=false; Reveal.configure({keyboard:false});
    const inp=pickBox.querySelector('input'); inp.value=''; renderPicker(); setTimeout(()=>inp.focus(),0); }
  function closePicker(){ if(!pickBox||pickBox.hidden) return; pickBox.hidden=true; Reveal.configure({keyboard:{71:openPicker}}); }
  function jumpTo(i){ closePicker(); Reveal.slide(i,0); }
  window.DeckPicker={open:openPicker,close:closePicker};

  // ---- animation manager
  // An animation file registers:
  //   DeckAnim.register('name', {mount(canvas, ctx, opts){...}, frame(t, dt){...}, step(n){...}, reset(){...}})
  // Inside the methods, this.ctx, this.W, this.H (CSS pixels) are available; draw in CSS pixels.
  // A slide uses: <div class="anim" style="height:430px"><canvas data-anim="name" data-opts='{"k":1}'></canvas><div class="illus">Illustrative</div></div>
  // Fragments with data-anim-step="n" call step(n) when shown (and step(n-1) when hidden).
  const registry=window.DeckAnim.registry; const live=new Map();
  function sizeCanvas(c){
    const w=Math.round(c.parentElement.clientWidth), h=Math.round(c.parentElement.clientHeight); const dpr=2;
    c.width=w*dpr; c.height=h*dpr; const ctx=c.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); return {ctx,w,h}; }
  // duration of the slider timeline (s) and its snapping step
  function durOf(i){ return i.duration || i.period || i.LOOP || 30; }
  function stepLenOf(i){ return i.STEP || i.SLOT || 0; }
  function labelOf(i,t){ if(i.STEP) return 'step '+Math.floor(t/i.STEP+1e-6); if(i.SLOT) return 'slot '+Math.floor(t/i.SLOT+1e-6); return t.toFixed(1)+' s'; }
  function doReset(inst){ const n=inst.n; inst.reset&&inst.reset(); if(n!==undefined) inst.n=n; }
  function runLoop(inst){
    cancelAnimationFrame(inst._raf); inst._run=true; let last=performance.now();
    const loop=(now)=>{ if(!inst._run) return; const dt=Math.max(0,Math.min(0.05,(now-last)/1000)); last=now; inst._t+=dt;
      const D=durOf(inst); if(inst._t>=D){ inst._t=0; doReset(inst); }
      inst.frame && inst.frame(inst._t,dt); syncCtl(inst); inst._raf=requestAnimationFrame(loop); };
    inst._raf=requestAnimationFrame(loop); syncCtl(inst);
  }
  function pauseAnim(inst){ inst._run=false; cancelAnimationFrame(inst._raf); syncCtl(inst); }
  function seekAnim(inst,t){ pauseAnim(inst); doReset(inst); inst._t=Math.max(0,t); inst.frame&&inst.frame(inst._t,1); syncCtl(inst); }
  function syncCtl(inst){ const k=inst._ctl; if(!k) return; k.btn.textContent=inst._run?'❚❚':'▶'; k.box.classList.toggle('paused',!inst._run); k.btn.title=inst._run?'Pause (K)':'Play (K)';
    k.rng.value=inst._t; k.lab.textContent=labelOf(inst,inst._t); }
  function buildCtl(c,inst){
    const host=c.parentElement; let k=host.querySelector(':scope > .animctl');
    if(!k){ k=document.createElement('div'); k.className='animctl';
      k.innerHTML='<button type="button"></button><input type="range" min="0" step="0.05"><span class="lab"></span>'; host.appendChild(k);
      ['mousedown','click','keydown','pointerdown','touchstart'].forEach(ev=>k.addEventListener(ev,e=>e.stopPropagation())); }
    const btn=k.querySelector('button'), rng=k.querySelector('input'), lab=k.querySelector('.lab');
    rng.max=durOf(inst); const sl=stepLenOf(inst); rng.step=sl||0.05;
    btn.onclick=()=>{ inst._run?pauseAnim(inst):runLoop(inst); btn.blur(); };
    rng.oninput=()=>seekAnim(inst,+rng.value);
    rng.onchange=()=>rng.blur();
    inst._ctl={btn,rng,lab,box:k}; syncCtl(inst);
  }
  function startAnims(slide){
    stopAll();
    slide.querySelectorAll('canvas[data-anim]').forEach(c=>{
      const def=registry[c.dataset.anim]; if(!def){console.warn('missing anim',c.dataset.anim);return;}
      const inst=Object.create(def); const {ctx,w,h}=sizeCanvas(c);
      inst.W=w; inst.H=h; inst.ctx=ctx; inst.canvas=c;
      inst.mount && inst.mount(c,ctx,JSON.parse(c.dataset.opts||'{}'));
      const shown=slide.querySelectorAll('.fragment.visible[data-anim-step]');
      if(shown.length && inst.step) inst.step(Math.max(...[...shown].map(e=>+e.dataset.animStep)));
      inst._t=0; live.set(c,inst); buildCtl(c,inst); runLoop(inst);
    });
  }
  function stopAll(){ live.forEach(i=>{i._run=false; cancelAnimationFrame(i._raf);}); live.clear(); }
  window.DeckAnim.live=live;
  // deterministic seek used by the screenshot/PDF tools: reset, then advance t seconds at 60 fps
  window.DeckAnim.seek=function(t){ live.forEach(i=>seekAnim(i,t)); };

  document.addEventListener('DOMContentLoaded',()=>{
    buildDividers();
    const footer=buildFooter();
    Reveal.initialize({width:1280,height:720,margin:0,minScale:0.2,maxScale:3,center:false,hash:true,
      controls:false,progress:true,transition:'fade',transitionSpeed:'fast',backgroundTransition:'none',
      slideNumber:false,pdfSeparateFragments:false,pdfMaxPagesPerSlide:1,showNotes:false,plugins:[RevealNotes],keyboard:{71:()=>openPicker()}
    }).then(()=>{
      collectSlides(); const _items=pickItems.slice(); collectSlides=(()=>{ pickItems=_items; });
      if(window.renderMathInElement) renderMathInElement(document.querySelector('.reveal .slides'),
        {delimiters:[{left:'$$',right:'$$',display:true},{left:'\\[',right:'\\]',display:true},{left:'$',right:'$',display:false},{left:'\\(',right:'\\)',display:false}],throwOnError:false});
      const update=()=>{ const s=Reveal.getCurrentSlide(); const hide=s.classList.contains('divider')||s.classList.contains('titleslide');
        footer.classList.toggle('hidden',hide); footer.querySelector('.num').textContent=numberOf(s); alignCols(s); startAnims(s); };
      update(); Reveal.on('slidechanged',update);
      Reveal.on('fragmentshown',e=>{ const n=e.fragment.dataset.animStep; if(n!==undefined) live.forEach(i=>{ i.step&&i.step(+n); if(!i._run) i.frame&&i.frame(i._t,1); }); });
      Reveal.on('fragmenthidden',e=>{ const n=e.fragment.dataset.animStep; if(n!==undefined) live.forEach(i=>{ i.step&&i.step(+n-1); if(!i._run) i.frame&&i.frame(i._t,1); }); });
      // keyboard: K play/pause, [ and ] one step (or 0.5 s) back/forward on the current slide's animation
      const nudge=(sgn)=>live.forEach(i=>{ const sl=stepLenOf(i)||0.5; const t=Math.min(durOf(i),Math.max(0,(Math.floor(i._t/sl+1e-6)+sgn)*sl)); seekAnim(i,t); });
      Reveal.addKeyBinding({keyCode:75,key:'K',description:'Play / pause animation'},()=>live.forEach(i=>i._run?pauseAnim(i):runLoop(i)));
      Reveal.addKeyBinding({keyCode:219,key:'[',description:'Animation: step back'},()=>nudge(-1));
      Reveal.addKeyBinding({keyCode:221,key:']',description:'Animation: step forward'},()=>nudge(1));
      window.__deckReady=true;
    });
  });
})();
