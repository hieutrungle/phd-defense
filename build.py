#!/usr/bin/env python3
"""Assemble src/sections/*.html (sorted by name) into index.html and check timing/pacing.

Each timed slide is   <section data-id="ID" data-min="0.75"> ... <aside class="notes">...</aside></section>
Dividers / backup slides have no data-min (untimed). Windows are computed here in slide order, so authors only
set minutes. A timing line "[0.75 min | 1:00-1:45]" is injected at the top of every timed slide's notes.
Writes speaker_notes.md (timing table + notes). Exit code 1 if total is outside 40-45 min, a window is missing
notes, or any slide exceeds 140 words per minute.
"""
import re, sys, glob, html, os
ROOT=os.path.dirname(os.path.abspath(__file__))
WPM_MAX=140; TOTAL_MIN=(40.0,45.0)

def _plainmath(s):
    """LaTeX math in titles/notes -> readable plain text for speaker_notes.md (never a bare placeholder)."""
    s=re.sub(r'\\(?:mathrm|mathbf|text|operatorname)\{([^}]*)\}',r'\1',s)
    rep={r'\times':'×',r'\le':'≤',r'\ge':'≥',r'\approx':'≈',r'\pm':'±',r'\to':'→',r'\rightarrow':'→',r'\cdot':'·',r'\,':' ',r'\!':'',r'\;':' '}
    for k,v in rep.items(): s=s.replace(k,v)
    s=re.sub(r'\\([a-zA-Z]+)',r'\1',s)      # \alpha -> alpha
    s=s.replace('{','').replace('}','').replace('-','−') if re.fullmatch(r'\s*-?[\d.]+\s*',s) else s.replace('{','').replace('}','')
    return ' '+' '.join(s.split())+' '

def fmt(s): return f"{int(s//60)}:{int(round(s%60)):02d}"
def text_of(h):
    h=re.sub(r'<[^>]+>',' ',h); h=html.unescape(h); h=re.sub(r'\$([^$]*)\$',lambda m: _plainmath(m.group(1)),h); return ' '.join(h.split())
def notes_for_reading(notes):
    paragraphs = (text_of(part) for part in re.split(r'</p\s*>', notes))
    return '\n\n'.join(paragraph for paragraph in paragraphs if paragraph)

def main(check=True):
    parts=sorted(glob.glob(os.path.join(ROOT,'src','sections','*.html')))
    body='\n'.join(open(p,encoding='utf-8').read() for p in parts)
    secs=list(re.finditer(r'<section\b([^>]*)>',body))
    t=0.0; rows=[]; backup_notes=[]; out=[]; last=0; errors=[]
    # walk top-level <section ...> openings; inject timing into the notes that follow before the next <section
    for i,m in enumerate(secs):
        attrs=m.group(1); seg_end=secs[i+1].start() if i+1<len(secs) else len(body)
        seg=body[m.start():seg_end]
        mm=re.search(r'data-min="([\d.]+)"',attrs); sid=re.search(r'data-id="([^"]+)"',attrs)
        sid=sid.group(1) if sid else f'slide{i+1}'
        nm=re.search(r'<aside class="notes">(.*?)</aside>',seg,re.S)
        title=re.search(r'<h2 class="title">(.*?)</h2>',seg,re.S)
        label=text_of(title.group(1)) if title else sid
        if mm:
            mins=float(mm.group(1)); a=t; t+=mins*60
            tag=f'<p class="timing"><b>[{mins:g} min | {fmt(a)}&ndash;{fmt(t)}]</b></p>'
            if not nm: errors.append(f'{sid}: no speaker notes'); notes=''
            else:
                notes=nm.group(1); seg=seg.replace('<aside class="notes">','<aside class="notes">'+tag,1)
            words=len(text_of(notes).split()); wpm=words/mins if mins else 0
            if wpm>WPM_MAX: errors.append(f'{sid}: {wpm:.0f} wpm > {WPM_MAX}')
            rows.append((len(rows)+1,sid,label,mins,fmt(a),fmt(t),words,wpm,notes_for_reading(notes)))
        elif nm and re.search(r'class="[^"]*\bbackup\b[^"]*"',attrs):
            backup_notes.append((label, notes_for_reading(nm.group(1))))
        out.append(body[last:m.start()]); out.append(seg); last=seg_end
    out.append(body[last:])
    body2=''.join(out)
    head=open(os.path.join(ROOT,'src','head.html'),encoding='utf-8').read()
    tail=open(os.path.join(ROOT,'src','tail.html'),encoding='utf-8').read()
    anims=''.join(f'<script src="assets/js/anim/{os.path.basename(p)}"></script>\n' for p in sorted(glob.glob(os.path.join(ROOT,'assets','js','anim','*.js'))) if not os.path.basename(p).startswith('_'))
    open(os.path.join(ROOT,'index.html'),'w',encoding='utf-8').write(head+body2+tail.replace('<!--ANIMS-->',anims))
    total=t/60
    md=['# Speaker notes and timing','',f'Total: {total:.2f} min, {len(rows)} timed slides (window {TOTAL_MIN[0]:g}-{TOTAL_MIN[1]:g} min, pace <= {WPM_MAX} wpm).','',
        '| # | slide | min | window | words | wpm |','|---|---|---|---|---|---|']
    md+= [f'| {n} | {ti} | {mi:g} | {a}-{b} | {w} | {p:.0f} |' for n,_,ti,mi,a,b,w,p,_ in rows]
    md+=['']+[f'## {n}. {ti}  [{mi:g} min | {a}-{b}]\n\n{nt}\n' for n,_,ti,mi,a,b,w,p,nt in rows]
    if backup_notes:
        md+=['## Backup slides for questions','']
        md += [f'### {n}. {title}\n\n{notes}\n'
               for n, (title, notes) in enumerate(backup_notes, start=len(rows)+1)]
    open(os.path.join(ROOT,'speaker_notes.md'),'w',encoding='utf-8').write('\n'.join(md))
    if not (TOTAL_MIN[0]<=total<=TOTAL_MIN[1]): errors.append(f'total {total:.2f} min outside {TOTAL_MIN}')
    print(f'built index.html: {len(secs)} sections, {len(rows)} timed, total {total:.2f} min')
    for e in errors: print('ERROR', e)
    return 1 if (errors and check) else 0
if __name__=='__main__':
    sys.exit(main(check='--no-check' not in sys.argv))
