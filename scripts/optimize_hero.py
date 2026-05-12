#!/usr/bin/env python3
"""
optimize_hero.py — generate responsive WebP variants from hoshang.png.

Run once at build/optimization time. Produces:
  - hoshang.webp        (480x480, quality 82)  — primary use
  - hoshang@2x.webp     (240x240, quality 82)  — small avatar
  - hoshang.avif        (480x480, quality 60)  — modern AVIF (if libavif present)

The original file is 1.74MB. Targets: < 60kB WebP, < 40kB AVIF.
"""
import sys
from pathlib import Path
from PIL import Image, ImageFilter

SRC = Path("/app/frontend/public/img/hoshang.png")
OUT_DIR = SRC.parent

img = Image.open(SRC).convert("RGBA")
print(f"source: {img.size}, {SRC.stat().st_size / 1024:.1f} KB")

# Hero capsule renders the photo at ~120x120 CSS px. With DPR=2 that's a 240px
# physical buffer. We export a 480px variant so the source supports DPR=3
# (premium phones / Retina) and lets the browser downsample cleanly.

for size, suffix in [(480, ""), (240, "@small")]:
    resized = img.resize((size, size), Image.LANCZOS)
    out_webp = OUT_DIR / f"hoshang{suffix}.webp"
    resized.save(out_webp, "WEBP", quality=82, method=6)
    print(f"wrote {out_webp.name}: {out_webp.stat().st_size / 1024:.1f} KB")

    # AVIF is opt-in via Pillow; gracefully skip if libavif isn't built in.
    try:
        out_avif = OUT_DIR / f"hoshang{suffix}.avif"
        resized.save(out_avif, "AVIF", quality=60, speed=4)
        print(f"wrote {out_avif.name}: {out_avif.stat().st_size / 1024:.1f} KB")
    except Exception as e:
        print(f"avif skipped ({suffix or 'main'}): {e}")

print("done")
