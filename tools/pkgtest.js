const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720}); const bad=[];
p.on('requestfailed',r=>bad.push('FAIL '+r.url())); p.on('pageerror',e=>bad.push('ERR '+e)); p.on('console',m=>{if(m.type()==='error')bad.push('CON '+m.text());});
p.on('request',r=>{ if(!r.url().startsWith('file:')&&!r.url().startsWith('data:')) bad.push('NET '+r.url()); });
await p.goto('file:///tmp/pkg/defense_deck_html/index.html'); await p.waitForFunction('window.__deckReady===true');
const n=await p.evaluate(()=>Reveal.getTotalSlides());
for(let i=0;i<n;i++){ await p.evaluate(i=>Reveal.slide(i),i); await new Promise(r=>setTimeout(r,120)); }
const imgs=await p.evaluate(()=>[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
console.log('slides',n,'issues',bad.length,'broken imgs',imgs.length); bad.slice(0,10).forEach(x=>console.log(x)); imgs.slice(0,5).forEach(x=>console.log(x)); await b.close();})();