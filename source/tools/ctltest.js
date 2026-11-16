const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell'),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720}); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
const go=id=>p.evaluate(id=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id===id));},id);
const st=()=>p.evaluate(()=>{const i=[...DeckAnim.live.values()][0]; const k=Reveal.getCurrentSlide().querySelector('.animctl'); return {run:i._run,t:+i._t.toFixed(2),n:i.n,lab:k.querySelector('.lab').textContent,rng:k.querySelector('input').value,max:k.querySelector('input').max,paused:k.classList.contains('paused')};});
for(const id of ['anim-csi','anim-bisector','anim-focal','anim-marl','anim-hmarl','anim-pso']){
  await go(id); await new Promise(r=>setTimeout(r,600)); const a=await st();
  await p.keyboard.press('k'); await new Promise(r=>setTimeout(r,300)); const b1=await st();
  await p.keyboard.press(']'); const c=await st(); await p.keyboard.press(']'); const c2=await st();
  await p.evaluate(()=>{const r=Reveal.getCurrentSlide().querySelector('.animctl input'); r.value=r.max/2; r.dispatchEvent(new Event('input'));}); const d=await st();
  await p.keyboard.press('k'); await new Promise(r=>setTimeout(r,400)); const e=await st();
  console.log(id,'start',JSON.stringify(a),'| K',b1.run,b1.paused,'| ]',c.lab,'->',c2.lab,'| slider',d.lab,'max',d.max,'| K again run',e.run,'t',e.t);
}
// fragment step preserved after seek on anim-marl
await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='anim-marl'),0,-1);}); await new Promise(r=>setTimeout(r,300)); console.log('before frag n=',(await st()).n); await p.keyboard.press('ArrowRight'); await new Promise(r=>setTimeout(r,300));
await p.evaluate(()=>{const r=Reveal.getCurrentSlide().querySelector('.animctl input'); r.value=3; r.dispatchEvent(new Event('input'));});
console.log('marl after fragment+seek n=',(await st()).n, 'slide still', await p.evaluate(()=>Reveal.getCurrentSlide().dataset.id));
console.log('errors',errs.length, errs.slice(0,3).join(' | ')); await b.close();})();