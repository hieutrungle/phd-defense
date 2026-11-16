const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720});
await p.goto('file:///tmp/pkg/defense_deck_html/index.html'); await p.waitForFunction('window.__deckReady===true');
for(const id of ['geo-videos','marl-result','hmarl-deploy-2ue','energy-maps']){
await p.evaluate(id=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id===id));},id);
await new Promise(r=>setTimeout(r,2500));
console.log(id,JSON.stringify(await p.evaluate(()=>[...Reveal.getCurrentSlide().querySelectorAll('video')].map(v=>({rs:v.readyState,t:v.currentTime.toFixed(1),paused:v.paused,err:v.error&&v.error.code})))));}
await b.close();})();