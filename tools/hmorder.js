const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720}); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
const r=await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='anim-hmarl'));
  const i=[...DeckAnim.live.values()][0]; i._run=false; const SL=i.SLOT; const AL=window.AL;
  // replicate frame's positions for slot 25 at phases
  const s=25, out=[];
  for(const ph of [0,0.25,0.5,0.75,0.99]){ const tu=(s+AL.ease(Math.min(1,ph/0.5)))*SL; const u=i.userAt(0,tu);
    const fa=i.focalAt(s), fb=i.focalAt(s+1), e=AL.ease(Math.max(0,Math.min(1,(ph-0.5)/0.4))); out.push({ph, user0:u.map(v=>+v.toFixed(1)), focal0:[+(fa[0][0]+(fb[0][0]-fa[0][0])*e).toFixed(1), +(fa[0][1]+(fb[0][1]-fa[0][1])*e).toFixed(1)]}); }
  return out;});
r.forEach(x=>console.log(JSON.stringify(x))); console.log('errors',errs.length); await b.close();})();