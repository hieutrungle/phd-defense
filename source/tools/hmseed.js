const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell'),headless:'shell',pipe:true,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1280,height:720}); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForFunction('window.__deckReady===true');
const seeds=process.argv[2]?process.argv[2].split(',').map(Number):null;
const r=await p.evaluate((seeds)=>{const ss=[...document.querySelectorAll('.reveal .slides > section')]; Reveal.slide(ss.findIndex(s=>s.dataset.id==='anim-hmarl'));
  const i=[...DeckAnim.live.values()][0]; i._run=false; const res=[]; const list=seeds||[...Array(600).keys()].map(x=>x+1);
  for(const seed of list){ i.SEED=seed; i.reset(); const W=12, al=[...Array(W).keys()].map(w=>i.allocAt(w));
    const ch=[]; for(let w=1;w<W;w++) if(al[w].join()!==al[w-1].join()) ch.push(w);
    let maxgap=0, prev=0; for(const w of ch.concat([W])){ maxgap=Math.max(maxgap,w-prev); prev=w; }
    let md=1e9, blk=0, blkAtDecision=0, episodes=0, fixed=0, inEp=false;
    for(let s=0;s<120;s++){ const bb=al[Math.floor(s/i.T)], tm=s*i.SLOT; const isB=bb.some((k,l)=>i.blocked(k,l,tm)); if(isB) blk++; if(isB && s%i.T===0) blkAtDecision++;
      if(isB && !inEp){episodes++; inEp=true;} if(!isB && inEp){ inEp=false; if(s%i.T===0) fixed++; }
      for(let a=0;a<i.K;a++) for(let c=a+1;c<i.K;c++){ const u=i.userAt(a,tm), v=i.userAt(c,tm); md=Math.min(md,Math.hypot(u[0]-v[0],u[1]-v[1])); } }
    res.push({seed,n:ch.length,maxgap,md:Math.round(md),blk,episodes,fixedByRealloc:fixed,blkAtDecision,ch:ch.join(',')}); }
  return res;},seeds);
if(seeds){ r.forEach(x=>console.log(JSON.stringify(x))); }
else { const good=r.filter(x=>x.md>=45 && x.blkAtDecision===0 && x.n>=4 && x.maxgap<=4);
  const withEp=good.filter(x=>x.episodes>=1 && x.episodes===x.fixedByRealloc && x.blk<=12).sort((a,b)=>(a.maxgap-b.maxgap)||(b.n-a.n)||(a.blk-b.blk)).slice(0,6);
  const noEp=good.filter(x=>x.blk===0).sort((a,b)=>(a.maxgap-b.maxgap)||(b.n-a.n)).slice(0,4);
  console.log('with short blockage episodes fixed by reallocation:'); withEp.forEach(x=>console.log(JSON.stringify(x)));
  console.log('no blockage at all:'); noEp.forEach(x=>console.log(JSON.stringify(x))); }
console.log('errors',errs.length); await b.close();})();