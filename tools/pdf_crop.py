#!/usr/bin/env python3
"""Crop a region of the old Beamer deck PDF to a high-resolution PNG (for complex TikZ diagrams).
usage: python tools/pdf_crop.py PAGE x0 y0 x1 y1 OUT.png [--zoom 4] [--pdf path]
PAGE is the 1-based PDF page of ../dissertation_defense_slides/slides.pdf (see OLD_PAGES.md for the footer->page map);
coordinates are PDF points (page is 453.5 x 255.1 pt). Use --info PAGE to list text lines with their boxes."""
import sys, fitz
args=sys.argv[1:]; pdf='../dissertation_defense_slides/slides.pdf'
if '--pdf' in args: i=args.index('--pdf'); pdf=args[i+1]; del args[i:i+2]
zoom=4.0
if '--zoom' in args: i=args.index('--zoom'); zoom=float(args[i+1]); del args[i:i+2]
doc=fitz.open(pdf)
if args[0]=='--info':
    pg=doc[int(args[1])-1]
    for b in pg.get_text('dict')['blocks']:
        for l in b.get('lines',[]): x0,y0,x1,y1=l['bbox']; print(f'{x0:6.1f} {y0:6.1f} {x1:6.1f} {y1:6.1f}  '+''.join(s['text'] for s in l['spans'])[:70])
    for im in pg.get_image_info(): print('IMAGE', [round(v,1) for v in im['bbox']])
    sys.exit()
page,x0,y0,x1,y1,out=int(args[0]),*map(float,args[1:5]),args[5]
pix=doc[page-1].get_pixmap(matrix=fitz.Matrix(zoom,zoom),clip=fitz.Rect(x0,y0,x1,y1),alpha=False); pix.save(out); print(out,pix.width,pix.height)
