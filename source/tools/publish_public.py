#!/usr/bin/env python3
"""Rebuild the public copy of the deck and push it to GitHub (hieutrungle/phd-defense).

Repository layout:
    docs/              the website (notes stripped), served by GitHub Pages from main:/docs
    speaker_notes.md   timing table + full speaker notes (in the repo only, NOT on the website)
    source/            editable sources: src/, build.py, tools/, assets/css, assets/js, CHANGES.md
    README.md          kept as is

Usage (from the deck folder, after `python build.py`):
    GITHUB_TOKEN=... python tools/publish_public.py
Live at https://hieutrungle.github.io/phd-defense/ about a minute after the push.
"""
import os, re, glob, shutil, subprocess
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(os.path.dirname(H), 'phd-defense-public')   # repo root
P = os.path.join(R, 'docs')                                   # website root (GitHub Pages source)
src = open(os.path.join(H, 'index.html')).read()
pub = re.sub(r'\s*<aside class="notes">.*?</aside>', '', src, flags=re.S)
if 'noindex' not in pub:
    pub = pub.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
assert 'class="notes"' not in pub
texts = src + ''.join(open(f, errors='ignore').read() for f in glob.glob(f'{H}/assets/**/*.css', recursive=True) + glob.glob(f'{H}/assets/**/*.js', recursive=True))
imgs = [os.path.relpath(f, H) for f in glob.glob(f'{H}/assets/img/**/*', recursive=True) if os.path.isfile(f)]
used = [f for f in imgs if os.path.basename(f) in texts]
vids = sorted(set(re.findall(r'src="(media/[^"]+)"', src)))
keep = {'.git', 'README.md'}
for e in os.listdir(R):
    if e not in keep:
        p = os.path.join(R, e); shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
os.makedirs(P)
# repo-only files (not served by Pages): speaker notes and editable sources
shutil.copy2(os.path.join(H, 'speaker_notes.md'), os.path.join(R, 'speaker_notes.md'))
S = os.path.join(R, 'source')
for d in ['src', 'tools', 'assets/css', 'assets/js']:
    shutil.copytree(os.path.join(H, d), os.path.join(S, d))
for f in ['build.py', 'package.json', 'package-lock.json', 'CHANGES.md', 'README.md']:
    shutil.copy2(os.path.join(H, f), os.path.join(S, f))
import hashlib
def _ver(m):
    f = os.path.join(H, m.group(2))
    if not os.path.isfile(f): return m.group(0)
    return f'{m.group(1)}="{m.group(2)}?v={hashlib.md5(open(f, "rb").read()).hexdigest()[:8]}"'
pub = re.sub(r'(href|src)="((?:assets|vendor)/[^"?]+\.(?:css|js))"', _ver, pub)   # cache-busting: browsers reload changed CSS/JS
open(os.path.join(P, 'index.html'), 'w').write(pub)
for d in ['assets/css', 'assets/js', 'vendor']:
    shutil.copytree(os.path.join(H, d), os.path.join(P, d))
shutil.rmtree(os.path.join(P, 'vendor/reveal/theme'), ignore_errors=True)
for f in used + vids:
    os.makedirs(os.path.dirname(os.path.join(P, f)), exist_ok=True); shutil.copy2(os.path.join(H, f), os.path.join(P, f))
open(os.path.join(P, '.nojekyll'), 'w').write('')   # keep files starting with "_" (e.g. assets/js/anim/_lib.js)
g = ['git', '-C', R, '-c', 'user.name=Hieu Le', '-c', 'user.email=hieult@tamu.edu']
subprocess.run(g + ['add', '-A'], check=True)
if subprocess.run(g + ['diff', '--cached', '--quiet']).returncode == 0:
    print('no changes'); raise SystemExit
subprocess.run(g + ['commit', '-q', '-m', 'Update presentation'], check=True)
tok = os.environ['GITHUB_TOKEN']
subprocess.run(['git', '-C', R, 'push', '-q', f'https://x-access-token:{tok}@github.com/hieutrungle/phd-defense.git', 'main'], check=True)
print('pushed; live in about a minute at https://hieutrungle.github.io/phd-defense/')
