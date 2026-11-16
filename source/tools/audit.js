// Audit: two-column top/bottom alignment and minimum visible font size on every slide.
const puppeteer=require('puppeteer-core'); const path=require('path');
(async()=>{
  const browser=await puppeteer.launch({executablePath:path.resolve(__dirname,'..','.browsers','chrome-headless-shell-linux64','chrome-headless-shell'),headless:'shell',pipe:true,
    args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files','--disable-gpu']});
  const page=await browser.newPage(); await page.setViewport({width:1280,height:720});
  await page.goto('file://'+path.resolve(__dirname,'..','index.html')); await page.waitForFunction('window.__deckReady===true');
  await page.evaluate(()=>Reveal.configure({transition:'none'}));
  const n=await page.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length); const out=[];
  for(let i=0;i<n;i++){
    await page.evaluate(i=>{Reveal.slide(i); Reveal.getCurrentSlide().querySelectorAll('.fragment').forEach(x=>x.classList.add('visible'));},i);
    await new Promise(r=>setTimeout(r,150));
    const r=await page.evaluate(()=>{ const s=Reveal.getCurrentSlide(); const id=s.dataset.id||''; const res={id,cols:[],small:[]};
      const sc=Reveal.getScale();
      const ext=el=>{ let t=1e9,b=-1e9; el.querySelectorAll('*').forEach(e=>{ if(e.children.length&&!['IMG','CANVAS','VIDEO','svg','TABLE'].includes(e.tagName)&&!e.classList.contains('block')&&!e.classList.contains('alertblock')&&!e.classList.contains('goodblock')) return;
          const q=e.getBoundingClientRect(); if(q.height<2||q.width<2) return; t=Math.min(t,q.top); b=Math.max(b,q.bottom); });
        // include blocks as whole boxes
        el.querySelectorAll('.block,.alertblock,.goodblock,img,canvas,video,table').forEach(e=>{const q=e.getBoundingClientRect(); t=Math.min(t,q.top); b=Math.max(b,q.bottom);});
        return [t/sc,b/sc]; };
      s.querySelectorAll(':scope .cols').forEach(c=>{ const cs=[...c.children]; if(cs.length!==2) return; if(c.closest('.anim')) return;
        const a=ext(cs[0]), b=ext(cs[1]); res.cols.push([Math.round(a[0]-b[0]),Math.round(a[1]-b[1])]); });
      const walker=document.createTreeWalker(s,NodeFilter.SHOW_TEXT); let nd;
      while(nd=walker.nextNode()){ if(!nd.textContent.trim()) continue; const el=nd.parentElement; if(el.closest('aside.notes,.katex-mathml')) continue;
        const fs=parseFloat(getComputedStyle(el).fontSize); const q=el.getBoundingClientRect(); if(q.width<1) continue;
        if(fs<14.5) res.small.push(fs.toFixed(1)+'px:'+nd.textContent.trim().slice(0,30)); }
      return res; });
    out.push([i+1,r]);
  }
  for(const [i,r] of out){ const bad=r.cols.filter(([dt,db])=>Math.abs(dt)>10||Math.abs(db)>10); if(bad.length||r.small.length) console.log(i,r.id,'cols(top,bottom diff):',JSON.stringify(bad),'small:',r.small.slice(0,3).join(' | ')); }
  await browser.close();
})();
