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

  // ---- on-screen navigation: light edge arrows + left contents drawer (auto-hide after mouse idle)
  const CHEV=d=>`<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  let navDrawer=null, navTimer=0, idleTimer=0;
  function buildNav(){
    const prev=document.createElement('button'), next=document.createElement('button'), tab=document.createElement('button');
    prev.className='navarrow prev'; prev.title='Previous (←)'; prev.innerHTML=CHEV('M15 5 L8 12 L15 19');
    next.className='navarrow next'; next.title='Next (→)'; next.innerHTML=CHEV('M9 5 L16 12 L9 19');
    tab.className='navtab'; tab.title='Contents'; tab.innerHTML='<span class="bars"><i></i><i></i><i></i></span>'+CHEV('M9 5 L16 12 L9 19');
    prev.onclick=e=>{e.stopPropagation(); Reveal.prev();}; next.onclick=e=>{e.stopPropagation(); Reveal.next();};
    tab.onclick=e=>{e.stopPropagation(); toggleDrawer(true);};
    navDrawer=document.createElement('nav'); navDrawer.className='navdrawer';
    // group slides by part (dividers start parts; title/outline form the opening)
    const groups=[]; let g={title:'Opening',num:'',items:[]}; groups.push(g);
    pickItems.forEach(it=>{ if(it.div){ const d=document.querySelectorAll('.reveal .slides > section')[it.i];
        g={title:it.title,num:d.dataset.num||'',i:it.i,items:[]}; groups.push(g); } else g.items.push(it); });
    const timed=document.querySelectorAll('.reveal .slides > section[data-min]').length;
    navDrawer.innerHTML='<div class="ndh"><b>Contents</b><button class="ndx" title="Close">'+CHEV('M15 5 L8 12 L15 19')+'</button></div>'+
      '<div class="ndsr"><input type="text" spellcheck="false" placeholder="Search slides: number or words"></div><div class="ndnone" hidden>No matching slide</div>'+
      '<div class="ndl">'+groups.filter(g=>g.items.length).map((g,k)=>'<div class="ndp" data-k="'+k+'"><div class="ndpt">'+(g.num?'<span class="pn">'+g.num+'</span>':'<span class="pn o">•</span>')+
      '<span class="pt">'+g.title.replace(/</g,'&lt;')+'</span><span class="pc">'+g.items.length+'</span></div><div class="nds">'+
      g.items.map(it=>'<div class="ndi" data-i="'+it.i+'"><span class="n">'+it.num+'</span><span class="t">'+it.title.replace(/^Backup: /,'').replace(/</g,'&lt;')+'</span></div>').join('')+'</div></div>').join('')+'</div>'+
      '<div class="ndf">'+timed+' slides + '+pickItems.filter(it=>!it.div&&it.part==='Backup').length+' backup &nbsp;·&nbsp; ↑ ↓ Enter &nbsp;·&nbsp; Esc: close</div>';
    navDrawer.querySelectorAll('.ndi').forEach(el=>el.onclick=e=>{e.stopPropagation(); Reveal.slide(+el.dataset.i,0); toggleDrawer(false);});
    navDrawer.querySelectorAll('.ndpt').forEach(el=>el.onclick=e=>{e.stopPropagation(); el.parentNode.classList.toggle('open');});
    navDrawer.querySelector('.ndx').onclick=e=>{e.stopPropagation(); toggleDrawer(false);};
    navDrawer.querySelectorAll('.ndi').forEach(el=>{ const p=el.closest('.ndp'); el.dataset.s=(el.textContent+' '+p.querySelector('.pt').textContent).toLowerCase(); el.dataset.num=el.querySelector('.n').textContent; });
    const sInp=navDrawer.querySelector('.ndsr input');
    sInp.addEventListener('input',()=>filterNav(sInp.value));
    sInp.addEventListener('keydown',e=>{ const vis=[...navDrawer.querySelectorAll('.ndi:not(.hide)')]; let k=vis.findIndex(x=>x.classList.contains('sel'));
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){ k=e.key==='ArrowDown'?Math.min(vis.length-1,k+1):Math.max(0,k-1); vis.forEach((x,m)=>x.classList.toggle('sel',m===k)); if(vis[k]) vis[k].scrollIntoView({block:'nearest'}); e.preventDefault(); }
      else if(e.key==='Enter'){ const t=vis[Math.max(0,k)]; if(t) t.click(); e.preventDefault(); }
      else if(e.key==='Escape'){ if(sInp.value){ sInp.value=''; filterNav(''); } else toggleDrawer(false); e.preventDefault(); }
      e.stopPropagation(); });
    navDrawer.addEventListener('mouseleave',()=>{ clearTimeout(navTimer); if(document.activeElement===navDrawer.querySelector('.ndsr input')&&navDrawer.querySelector('.ndsr input').value) return; navTimer=setTimeout(()=>toggleDrawer(false),900); });
    navDrawer.addEventListener('mouseenter',()=>clearTimeout(navTimer));
    ['mousedown','click','wheel','touchstart'].forEach(ev=>navDrawer.addEventListener(ev,e=>e.stopPropagation(),{passive:true}));
    document.addEventListener('mousedown',e=>{ if(navDrawer.classList.contains('open')&&!navDrawer.contains(e.target)) toggleDrawer(false); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&navDrawer.classList.contains('open')&&e.target!==navDrawer.querySelector('.ndsr input')){ toggleDrawer(false); e.stopPropagation(); } },true);
    // full-screen toggle (same as the F key); hidden where the browser has no full-screen API (e.g. iPhone Safari)
    const fsb=document.createElement('button'); fsb.className='navfs';
    const ICON={on:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5', off:'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5'};
    const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
    const fsSync=()=>{ const on=!!fsEl(); fsb.innerHTML=CHEV(on?ICON.off:ICON.on); fsb.title=on?'Exit full screen (Esc)':'Full screen (F)'; fsb.setAttribute('aria-label',fsb.title); };
    fsb.onclick=e=>{ e.stopPropagation(); const d=document, el=d.documentElement;
      if(fsEl()) (d.exitFullscreen||d.webkitExitFullscreen).call(d); else { const r=(el.requestFullscreen||el.webkitRequestFullscreen).call(el); if(r&&r.catch) r.catch(()=>{}); } };
    ['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{ fsSync(); setTimeout(()=>window.DeckNav&&window.DeckNav.fit(),120); }));
    if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled)) fsb.hidden=true;
    fsSync();
    // slide-overview toggle (same as Esc / O): thumbnails of all slides, click one to jump
    const ovb=document.createElement('button'); ovb.className='navov';
    ovb.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3.5" y="4.5" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2.1"/><rect x="13.5" y="4.5" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2.1"/><rect x="3.5" y="13.5" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2.1"/><rect x="13.5" y="13.5" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2.1"/></svg>';
    const ovSync=()=>{ const on=Reveal.isOverview(); ovb.classList.toggle('on',on); ovb.title=on?'Close slide overview (Esc)':'Slide overview (O)'; ovb.setAttribute('aria-label',ovb.title); };
    ovb.onclick=e=>{ e.stopPropagation(); toggleDrawer(false); Reveal.toggleOverview(); };
    Reveal.on('overviewshown',ovSync); Reveal.on('overviewhidden',ovSync); ovSync();
    // overview scrubber: a horizontal slider (one step per slide, ticks at each part) + wheel/trackpad scrolling, shown only in the overview
    const all=[...document.querySelectorAll('.reveal .slides > section')], N=all.length;
    const ovbar=document.createElement('div'); ovbar.className='ovbar';
    const ticks=pickItems.filter(it=>it.div).map(it=>{ const d=all[it.i], lab=d.dataset.num||(/backup/i.test(it.title)?'B':''); return '<button class="ovtick" data-i="'+it.i+'" style="left:'+(100*it.i/(N-1)).toFixed(3)+'%" title="'+it.title.replace(/"/g,'&quot;')+'"><i></i><span>'+lab+'</span></button>'; }).join('');
    ovbar.innerHTML='<div class="ovlab"></div><div class="ovtrack"><input type="range" min="0" max="'+(N-1)+'" step="1" value="0" aria-label="Scroll slides">'+ticks+'</div><div class="ovhint">drag · click a part number · scroll or swipe · click a slide to open it</div>';
    const rng=ovbar.querySelector('input'), lab=ovbar.querySelector('.ovlab');
    const labelFor=h=>{ const it=pickItems.find(x=>x.i===h); if(!it) return ''; return it.div ? ('Part: '+it.title) : (it.num+' · '+it.title.replace(/^Backup: /,'Backup: ')); };
    const ovPaint=()=>{ const h=Reveal.getIndices().h; rng.value=h; rng.style.setProperty('--p',(100*h/(N-1)).toFixed(2)+'%'); lab.textContent=labelFor(h); };
    let raf=0; rng.addEventListener('input',()=>{ cancelAnimationFrame(raf); raf=requestAnimationFrame(()=>{ Reveal.slide(+rng.value); ovPaint(); }); });
    rng.addEventListener('change',()=>rng.blur()); rng.addEventListener('pointerup',()=>setTimeout(()=>rng.blur(),0));
    ovbar.querySelectorAll('.ovtick').forEach(b=>b.onclick=e=>{ e.stopPropagation(); Reveal.slide(+b.dataset.i); ovPaint(); b.blur(); });
    ['mousedown','click','touchstart'].forEach(ev=>ovbar.addEventListener(ev,e=>e.stopPropagation()));
    let wAcc=0, wLast=0;
    window.addEventListener('wheel',e=>{ if(!Reveal.isOverview()||navDrawer.classList.contains('open')) return; e.preventDefault();
      wAcc+=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY; const now=performance.now();
      if(Math.abs(wAcc)>=40 && now-wLast>45){ const h=Reveal.getIndices().h, d=wAcc>0?1:-1; wAcc=0; wLast=now; Reveal.slide(Math.min(N-1,Math.max(0,h+d))); ovPaint(); } },{passive:false});
    window.addEventListener('unhandledrejection',e=>{ if(e.reason&&e.reason.name==='AbortError') e.preventDefault(); });   // video play() cut short by fast scrolling: harmless
    Reveal.on('overviewshown',()=>{ ovPaint(); document.documentElement.classList.add('ovmode'); });
    Reveal.on('overviewhidden',()=>document.documentElement.classList.remove('ovmode'));
    Reveal.on('slidechanged',()=>{ if(Reveal.isOverview()) ovPaint(); });
    document.body.append(prev,next,tab,ovb,fsb,navDrawer,ovbar);
    const wake=()=>{ document.documentElement.classList.remove('navidle'); clearTimeout(idleTimer);
      idleTimer=setTimeout(()=>{ if(!navDrawer.classList.contains('open')) document.documentElement.classList.add('navidle'); },2500); };
    ['mousemove','mousedown','touchstart'].forEach(ev=>document.addEventListener(ev,wake,{passive:true})); wake();
    const fit=()=>{ const s=Math.min(4,Math.max(0.6,Reveal.getScale()||1)), sc=Reveal.getScale()||1, st=document.documentElement.style;
      const r={left:(window.innerWidth-1280*sc)/2, top:(window.innerHeight-720*sc)/2};   // slide box (also valid while the overview transforms .slides)
      st.setProperty('--ovtop',Math.round(r.top+566*s)+'px'); st.setProperty('--ovleft',Math.round(r.left+150*s)+'px');
      st.setProperty('--ns',s.toFixed(3)); st.setProperty('--ntop',Math.max(4,Math.round(r.top+108*s))+'px');
      st.setProperty('--fx',Math.round(r.left)+'px'); st.setProperty('--fy',Math.round(r.top+668*s)+'px'); };   // footer follows the slide box
    fit(); Reveal.on('resize',fit); window.addEventListener('resize',()=>setTimeout(fit,60));
    window.DeckNav={open:()=>toggleDrawer(true),close:()=>toggleDrawer(false),wake,fit};
  }
  function filterNav(q){ q=q.trim().toLowerCase(); const words=q.split(/\s+/).filter(Boolean), isNum=/^\d+$/.test(q);
    navDrawer.classList.toggle('searching',!!q);
    navDrawer.querySelectorAll('.ndi').forEach(el=>{ const ok=!q||(isNum?el.dataset.num.startsWith(q):words.every(w=>el.dataset.s.includes(w))); el.classList.toggle('hide',!ok); el.classList.remove('sel'); });
    navDrawer.querySelectorAll('.ndp').forEach(p=>{ const any=!!p.querySelector('.ndi:not(.hide)'); p.classList.toggle('hide',!!q&&!any); if(q) p.classList.toggle('open',any); });
    if(!q){ navDrawer.querySelectorAll('.ndp').forEach(p=>p.classList.toggle('open',p.classList.contains('curp'))); }
    else { const f=navDrawer.querySelector('.ndi:not(.hide)'); if(f){ f.classList.add('sel'); navDrawer.querySelector('.ndl').scrollTop=0; } }
    navDrawer.querySelector('.ndnone').hidden=!q||!!navDrawer.querySelector('.ndi:not(.hide)'); }
  function toggleDrawer(on){ if(!navDrawer) return; clearTimeout(navTimer); navDrawer.classList.toggle('open',on); document.documentElement.classList.toggle('navopen',on);
    if(on){ const si=navDrawer.querySelector('.ndsr input'); if(si.value){ si.value=''; filterNav(''); } syncNav(); const L=navDrawer.querySelector('.ndl'), c=navDrawer.querySelector('.ndi.cur'), p=navDrawer.querySelector('.ndp.curp');
      if(p){ L.scrollTop=p.offsetTop-L.offsetTop-4; if(c && c.offsetTop+c.offsetHeight-L.offsetTop > L.scrollTop+L.clientHeight) c.scrollIntoView({block:'center'}); } } }
  function syncNav(){ if(!navDrawer) return; const cur=Reveal.getIndices().h;
    navDrawer.querySelectorAll('.ndi').forEach(el=>el.classList.toggle('cur',+el.dataset.i===cur));
    navDrawer.querySelectorAll('.ndp').forEach(p=>{ const has=!!p.querySelector('.ndi.cur'); p.classList.toggle('curp',has); if(has) p.classList.add('open'); });
    const s=Reveal.getCurrentSlide(); const dark=s.classList.contains('divider');
    document.documentElement.classList.toggle('navdark',dark);
    document.querySelector('.navarrow.prev').disabled=Reveal.isFirstSlide()&&!Reveal.availableFragments().prev;
    document.querySelector('.navarrow.next').disabled=Reveal.isLastSlide()&&!Reveal.availableFragments().next; }


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
      buildNav(); update(); syncNav(); Reveal.on('slidechanged',()=>{update(); syncNav();}); Reveal.on('fragmentshown',syncNav); Reveal.on('fragmenthidden',syncNav);
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
