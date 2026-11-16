#!/usr/bin/env python3
"""Static backup PDF of every slide (fragments shown, animations frozen at t = 6 s).

    python tools/make_pdf.py [out.pdf]      # default: defense_slides_html_backup.pdf (not committed)
Needs: npm install, the headless Chrome in .browsers/ (see README), and Pillow (pip install pillow).
"""
import os, sys, glob, subprocess, tempfile
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(R, 'defense_slides_html_backup.pdf')
with tempfile.TemporaryDirectory() as t:
    subprocess.run(['node', os.path.join(R, 'tools', 'shoot.js'), t, '--scale', '1.5'], check=True)
    files = sorted(glob.glob(os.path.join(t, '*.png')))
    pages = [Image.open(f).convert('RGB') for f in files]
    pages[0].save(out, save_all=True, append_images=pages[1:], resolution=144, quality=88)
print(f'{len(pages)} pages -> {out}')
