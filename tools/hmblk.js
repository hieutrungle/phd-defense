const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720});
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
const r=await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='anim-hmarl'));
  const i=[...DeckAnim.live.values()][0]; i._run=false; i.reset(); const out=[];
  for(let s=0;s<120;s++){ const w=Math.floor(s/i.T), bb=i.allocAt(w); const bl=bb.map((k,l)=>i.blocked(k,l,s*i.SLOT)?('seg'+(l+1)+'->user'+(k+1)):null).filter(Boolean);
    if(bl.length) out.push({slot:s, window:w, alloc:bb.map(v=>v+1).join(''), blocked:bl.join(';'), nextAlloc:i.allocAt(w+1).map(v=>v+1).join('')}); }
  return out;});
r.forEach(x=>console.log(JSON.stringify(x))); await b.close();})();