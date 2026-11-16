// Screenshot slides of index.html with the system Chrome.
// usage: node tools/shoot.js OUTDIR [--ids id1,id2] [--all] [--times 0,2,5] [--fragments] [--scale 1]
//   --ids    data-id values (or 1-based slide indices) to capture; default all slides
//   --times  for slides that contain an animation canvas, capture one PNG per time (seconds, deterministic seek)
//   --fragments  also capture the slide with all fragments shown (default: all fragments shown)
const puppeteer=require('puppeteer-core'); const path=require('path'); const fs=require('fs');
(async()=>{
  const args=process.argv.slice(2); const out=args[0]||'shots'; fs.mkdirSync(out,{recursive:true});
  const get=(k,d)=>{const i=args.indexOf(k); return i>=0?args[i+1]:d;};
  const ids=get('--ids',null); const times=(get('--times','')||'').split(',').filter(x=>x!=='').map(Number);
  const scale=+get('--scale',1);
  const browser=await puppeteer.launch({executablePath:path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell'),headless:'shell',pipe:true,
    args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required','--disable-gpu']});
  const page=await browser.newPage(); await page.setViewport({width:1280,height:720,deviceScaleFactor:scale});
  const errs=[]; page.on('pageerror',e=>errs.push(String(e))); page.on('console',m=>{ if(m.type()==='error'||m.type()==='warning') errs.push(m.text()); });
  await page.goto('file://'+path.resolve(__dirname,'..','index.html'));
  await page.waitForFunction('window.__deckReady===true',{timeout:20000});
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>Reveal.configure({transition:'none',backgroundTransition:'none'}));
  if(!args.includes('--ctl')) await page.evaluate(()=>document.documentElement.classList.add('noctl'));
  const slides=await page.evaluate(()=>[...document.querySelectorAll('.reveal .slides > section')].map((s,i)=>({i,id:s.dataset.id||('slide'+(i+1)),anim:!!s.querySelector('canvas[data-anim]')})));
  let want=slides; if(ids){ const set=ids.split(','); want=slides.filter(s=>set.includes(s.id)||set.includes(String(s.i+1))); }
  for(const s of want){
    await page.evaluate(i=>{Reveal.slide(i); const f=Reveal.getCurrentSlide().querySelectorAll('.fragment'); f.forEach(x=>x.classList.add('visible'));
      const st=[...Reveal.getCurrentSlide().querySelectorAll('.fragment[data-anim-step]')].map(e=>+e.dataset.animStep);
      if(st.length) DeckAnim.live.forEach(a=>{ a.step&&a.step(Math.max(...st)); }); },s.i);
    await new Promise(r=>setTimeout(r,900));
    const base=path.join(out,String(s.i+1).padStart(2,'0')+'_'+s.id);
    if(s.anim && times.length){ for(const t of times){ await page.evaluate(t=>{ DeckAnim.seek(t); const st=[...Reveal.getCurrentSlide().querySelectorAll('.fragment[data-anim-step]')].map(e=>+e.dataset.animStep); if(st.length) DeckAnim.live.forEach(a=>{ a.step&&a.step(Math.max(...st)); a.frame&&a.frame(a._t,0); }); },t); await new Promise(r=>setTimeout(r,80));
        await page.screenshot({path:`${base}_t${t}.png`}); } }
    else await page.screenshot({path:base+'.png'});
  }
  // overflow report: elements whose box extends past the slide body or footer line
  const ov=await page.evaluate(()=>{ const res=[]; document.querySelectorAll('.reveal .slides > section').forEach((s,i)=>{
      const b=s.querySelector('.body'); if(!b) return; const sh=b.scrollHeight-b.clientHeight, sw=b.scrollWidth-b.clientWidth;
      if(sh>2||sw>2) res.push(`${i+1} ${s.dataset.id||''}: body overflow ${sh}px vertical, ${sw}px horizontal`); }); return res; });
  fs.writeFileSync(path.join(out,'_report.txt'),['ERRORS:',...errs,'OVERFLOW:',...ov].join('\n'));
  console.log(`captured ${want.length} slides -> ${out}; console errors ${errs.length}; overflow ${ov.length}`);
  ov.forEach(o=>console.log('  '+o)); errs.slice(0,10).forEach(e=>console.log('  ERR '+e));
  await browser.close();
})();
