#!/usr/bin/env python3
"""Regenerate docs/ (the public website, speaker notes removed) from this repo, then commit and push.

    python build.py                 # assemble index.html + speaker_notes.md from src/
    python tools/publish.py         # rebuild docs/, git add -A, commit, push (live ~1 min later)
    python tools/publish.py --no-push            # only rebuild docs/ (preview: open docs/index.html)
    python tools/publish.py -m "Fix slide 12"    # custom commit message

GitHub Pages serves only docs/ (https://hieutrungle.github.io/phd-defense/). Everything else in the repo
(speaker_notes.md, src/, tools/, ...) is visible on GitHub but is not part of the website.
Push uses your normal git credentials; if GITHUB_TOKEN is set it is used instead.
"""
import os, re, glob, shutil, subprocess, hashlib, argparse
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'docs')
ap = argparse.ArgumentParser(); ap.add_argument('--no-push', action='store_true'); ap.add_argument('-m', default='Update presentation')
a = ap.parse_args()

src = open(os.path.join(R, 'index.html'), encoding='utf-8').read()
pub = re.sub(r'\s*<aside class="notes">.*?</aside>', '', src, flags=re.S)
if 'noindex' not in pub:
    pub = pub.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
assert 'class="notes"' not in pub
def _ver(m):  # cache-busting: browsers reload CSS/JS whenever they change
    f = os.path.join(R, m.group(2))
    if not os.path.isfile(f): return m.group(0)
    return f'{m.group(1)}="{m.group(2)}?v={hashlib.md5(open(f, "rb").read()).hexdigest()[:8]}"'
pub = re.sub(r'(href|src)="((?:assets|vendor)/[^"?]+\.(?:css|js))"', _ver, pub)

texts = src + ''.join(open(f, errors='ignore').read() for f in glob.glob(f'{R}/assets/**/*.css', recursive=True) + glob.glob(f'{R}/assets/**/*.js', recursive=True))
imgs = [os.path.relpath(f, R) for f in glob.glob(f'{R}/assets/img/**/*', recursive=True) if os.path.isfile(f)]
used = [f for f in imgs if os.path.basename(f) in texts]          # only images the deck uses
vids = sorted(set(re.findall(r'src="(media/[^"]+)"', src)))

shutil.rmtree(D, ignore_errors=True); os.makedirs(D)
open(os.path.join(D, 'index.html'), 'w', encoding='utf-8').write(pub)
for d in ['assets/css', 'assets/js', 'vendor']:
    shutil.copytree(os.path.join(R, d), os.path.join(D, d))
shutil.rmtree(os.path.join(D, 'vendor/reveal/theme'), ignore_errors=True)
for f in used + vids:
    os.makedirs(os.path.dirname(os.path.join(D, f)), exist_ok=True); shutil.copy2(os.path.join(R, f), os.path.join(D, f))
open(os.path.join(D, '.nojekyll'), 'w').write('')   # serve files starting with "_" (assets/js/anim/_lib.js)
print(f'docs/ rebuilt: {len(used)} images, {len(vids)} videos')
if a.no_push: raise SystemExit

URL = 'https://github.com/hieutrungle/phd-defense.git'
g = ['git', '-C', R]
if not subprocess.run(g + ['config', 'user.name'], capture_output=True, text=True).stdout.strip():
    g += ['-c', 'user.name=Hieu Le', '-c', 'user.email=hieult@tamu.edu']   # no git identity configured on this machine
has_origin = subprocess.run(['git', '-C', R, 'remote', 'get-url', 'origin'], capture_output=True).returncode == 0
subprocess.run(g + ['add', '-A'], check=True)
if subprocess.run(g + ['diff', '--cached', '--quiet']).returncode == 0:
    print('nothing to commit'); raise SystemExit
subprocess.run(g + ['commit', '-q', '-m', a.m], check=True)
tok = os.environ.get('GITHUB_TOKEN')
if tok:
    subprocess.run(g + ['push', '-q', URL.replace('https://', f'https://x-access-token:{tok}@'), 'HEAD:main'], check=True)
else:
    subprocess.run(g + ['push', '-q', 'origin' if has_origin else URL, 'HEAD:main'], check=True)
print('pushed; live in about a minute at https://hieutrungle.github.io/phd-defense/')
