const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:(process.env.CHROME_PATH||path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell')),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720}); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
const r=await p.evaluate(()=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='anim-hmarl'));
  const i=[...DeckAnim.live.values()][0]; i._run=false; i.reset(); const N=120, steps=[]; let lag=0,n=0;
  for(let s=1;s<=N;s++){ for(let k=0;k<i.K;k++){ const a=i.userAt(k,s*i.SLOT), c=i.userAt(k,(s-1)*i.SLOT); steps.push(Math.hypot(a[0]-c[0],a[1]-c[1])); }
    const F=i.focalAt(s), bb=i.allocAt(Math.floor(s/i.T)); F.forEach((f,l)=>{const u=i.userAt(bb[l],s*i.SLOT); lag+=Math.hypot(f[0]-u[0],f[1]-u[1]); n++;}); }
  steps.sort((x,y)=>x-y); let changes=0; for(let w=1;w<12;w++){ if(i.allocAt(w).join()!==i.allocAt(w-1).join()) changes++; }
  const net=[...Array(i.K).keys()].map(k=>{const a=i.userAt(k,0),c=i.userAt(k,N*i.SLOT); return Math.round(Math.hypot(a[0]-c[0],a[1]-c[1]));});
  let worst=0; for(let w=1;w<12;w++){ const b0=i.allocAt(w-1), b1=i.allocAt(w); for(let l=0;l<4;l++){ if(b0[l]===b1[l]) continue;
      for(let d=0; d<=10; d++){ const s=w*i.T-1+d, f=i.focalAt(s)[l], u=i.userAt(b1[l], s*i.SLOT); if(Math.hypot(f[0]-u[0],f[1]-u[1])<=8){ worst=Math.max(worst,d); break; } if(d===10) worst=99; } } }
  return {DELTA:i.DELTA, slotsToReachAfterRealloc_max:worst, allocs:[...Array(12).keys()].map(w=>i.allocAt(w).map(v=>v+1).join('')), meanStep:+(steps.reduce((a,b)=>a+b,0)/steps.length).toFixed(1), min:+steps[0].toFixed(1), median:+steps[steps.length>>1].toFixed(1), max:+steps[steps.length-1].toFixed(1),
          meanLag:+(lag/n).toFixed(1), reallocWindows:changes+'/11', netDisplacement120:net};});
console.log(JSON.stringify(r),'errors',errs.length); await b.close();})();