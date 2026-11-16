const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell'),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720});
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='bk-beamfocus-videos'));});
await new Promise(r=>setTimeout(r,2500));
console.log(JSON.stringify(await p.evaluate(()=>[...Reveal.getCurrentSlide().querySelectorAll('video')].map(v=>({rs:v.readyState,t:v.currentTime.toFixed(2),paused:v.paused,w:v.videoWidth,err:v.error&&v.error.code})))));
await b.close();})();