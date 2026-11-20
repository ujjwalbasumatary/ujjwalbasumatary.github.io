"""Shrink assets/penrose.svg after running generate-penrose.cjs.

Rounds coordinates to whole viewBox units (under one screen pixel at the
size the background is drawn) and rewrites paths with relative commands.
Shared corners round identically, so tiles and outlines still meet exactly.

Usage: python _scripts/compact-svg.py [path/to/file.svg]
"""
import re
import sys
from pathlib import Path

path = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / "assets/penrose.svg")


def compact(d):
    out, cx, cy, sx, sy = [], 0, 0, 0, 0
    for cmd, args in re.findall(r"([MLZ])([^MLZ]*)", d):
        if cmd == "Z":
            out.append("z")
            cx, cy = sx, sy
            continue
        x, y = (round(float(t)) for t in args.split(","))
        dx, dy = x - cx, y - cy
        out.append(f"{'m' if cmd == 'M' else 'l'}{dx}{'' if dy < 0 else ' '}{dy}")
        cx, cy = x, y
        if cmd == "M":
            sx, sy = x, y
    return "".join(out)


svg = path.read_text(encoding="utf-8")
before = len(svg)
svg = re.sub(r'( d=")([MLZ][^"]*)"', lambda m: m.group(1) + compact(m.group(2)) + '"', svg)
svg = re.sub(r"\s*\n\s*", "", svg) + "\n"
path.write_text(svg, encoding="utf-8", newline="\n")
print(f"{path.name}: {before} -> {len(svg)} bytes")
