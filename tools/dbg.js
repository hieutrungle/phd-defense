
const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const browser=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const page=await browser.newPage(); await page.setViewport({width:1280,height:720});
await page.goto('file://'+path.resolve(__dirname,'..','index.html')); await page.waitForFunction('window.__deckReady===true');
for(const id of ['aboutme','replace-ap']){
 const r=await page.evaluate(id=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; const i=ss.findIndex(s=>s.dataset.id===id); Reveal.slide(i);
   const s=Reveal.getCurrentSlide(); const c=s.querySelector('.cols'); return {aligned:s.dataset.aligned||'', ai:getComputedStyle(c).alignItems, h:[...c.children].map(x=>Math.round(x.getBoundingClientRect().height)+':'+x.className+':'+x.children.length+':'+[...x.children].map(k=>k.tagName+'.'+k.className).join(',')), imgs:[...s.querySelectorAll('img')].map(i=>i.complete)};},id);
 await new Promise(r=>setTimeout(r,500));
 console.log(id, JSON.stringify(r));}
await browser.close();})();