const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
for(const [W,Hh] of [[1280,720],[1366,768],[1920,1080]]){
const p=await b.newPage(); await p.setViewport({width:W,height:Hh});
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true'); await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='mappo'));
  const s=Reveal.getCurrentSlide(), sc=Reveal.getScale();
  const slack=[...s.querySelectorAll('.term')].map(t=>{const cs=getComputedStyle(t), r=t.getBoundingClientRect(), right=r.right-parseFloat(cs.paddingRight)*sc;
     const k=t.querySelector('.te .katex')||t.querySelector('.te'); return Math.round((right-k.getBoundingClientRect().right)/sc);});
  const body=s.querySelector('.body').getBoundingClientRect(), obj=s.querySelector('.obj').getBoundingClientRect(), foot=document.querySelector('.deck-footer').getBoundingClientRect();
  const tw=s.querySelector('.terms').getBoundingClientRect().width/sc; const sum=[...s.querySelectorAll('.term')].reduce((a,e)=>a+e.getBoundingClientRect().width/sc,0); const lr=[...s.querySelectorAll('.term')].map(e=>{const r=e.getBoundingClientRect(),k=e.querySelector('.te .katex').getBoundingClientRect(); return [Math.round((k.left-r.left)/sc),Math.round((r.right-k.right)/sc)];}); return {lr, spare:Math.round(tw-sum),slack, objBottomToFooter:Math.round((foot.top-obj.bottom)/sc), objH:Math.round(obj.height/sc)};});
console.log(W+'x'+Hh, JSON.stringify(r)); if(W===1280) await p.screenshot({path:'/tmp/mappo2.png'}); await p.close(); }
await b.close();})();