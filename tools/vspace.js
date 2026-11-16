const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720});
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true'); await p.evaluate(()=>document.fonts.ready);
for(const id of (process.argv[2]||'hmamdp,hmarl-train-method').split(',')){
 const r=await p.evaluate(id=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id===id));
  const s=Reveal.getCurrentSlide(), sc=Reveal.getScale(), top0=s.getBoundingClientRect().top; const body=s.querySelector('.body');
  const rs=[...body.children].filter(e=>!e.matches('aside.notes,style')).map(e=>e.getBoundingClientRect());
  const rule=s.querySelector('h2.title').getBoundingClientRect().bottom, foot=document.querySelector('.deck-footer').getBoundingClientRect().top;
  const t=Math.min(...rs.map(q=>q.top)), bo=Math.max(...rs.map(q=>q.bottom));
  return {id, contentTop:Math.round((t-top0)/sc), contentBottom:Math.round((bo-top0)/sc), gapTop:Math.round((t-rule)/sc), gapBottom:Math.round((foot-bo)/sc), height:Math.round((bo-t)/sc)};},id);
 console.log(JSON.stringify(r)); }
await b.close();})();