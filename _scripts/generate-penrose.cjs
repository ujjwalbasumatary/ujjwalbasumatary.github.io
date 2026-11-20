const fs = require('node:fs');
const path = require('node:path');

// Robinson-triangle subdivision: https://preshing.com/20110831/penrose-tiling-explained/
const phi = (1 + Math.sqrt(5)) / 2;
const size = 2800;
const radius = 2400;
const split = (a, b) => a.map((value, i) => value + (b[i] - value) / phi);
const polar = angle => [radius * Math.cos(angle), radius * Math.sin(angle)];
let triangles = Array.from({ length: 10 }, (_, i) => {
  const corners = [polar((2 * i - 1) * Math.PI / 10), polar((2 * i + 1) * Math.PI / 10)];
  if (i % 2 === 0) corners.reverse();
  return [0, [0, 0], ...corners];
});

for (let level = 0; level < 7; level++) {
  triangles = triangles.flatMap(([type, a, b, c]) => {
    if (type === 0) {
      const p = split(a, b);
      return [[0, c, p, b], [1, p, c, a]];
    }
    const q = split(b, a);
    const r = split(b, c);
    return [[1, r, c, a], [1, q, r, b], [0, r, q, a]];
  });
}

// Omit triangle bases so paired triangles form rhombs; draw shared edges once.
const edges = new Map();
const point = p => p.map(value => (value + size / 2).toFixed(2)).join(',');
const halves = new Map();
const fills = [[], []];
for (const [type, a, b, c] of triangles) {
  const base = [point(b), point(c)].sort().join('|');
  if (halves.has(base)) {
    const other = halves.get(base);
    const corners = [a, b, other, c];
    if (!corners.some(p => p.every(value => Math.abs(value) <= size / 2 + 100))) continue;
    fills[type].push(`M${corners.map(point).join('L')}Z`);
  } else {
    halves.set(base, a);
  }
}
for (const [, a, b, c] of triangles) {
  for (const [from, to] of [[c, a], [a, b]]) {
    if ([0, 1].some(axis => Math.min(from[axis], to[axis]) > size / 2 || Math.max(from[axis], to[axis]) < -size / 2)) continue;
    const ends = [point(from), point(to)].sort();
    edges.set(ends.join('|'), `M${ends[0]}L${ends[1]}`);
  }
}
const colors = ['#ead4dc', '#dce9e4'];
const coloredTiles = fills.map((tiles, type) => `  <path fill="${colors[type]}" d="${tiles.join('')}"/>`).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">\n${coloredTiles}\n  <path fill="none" stroke="#aaa4a4" stroke-width="1" stroke-linejoin="round" d="${[...edges.values()].join('')}"/>\n</svg>\n`;
fs.writeFileSync(path.join(__dirname, '../assets/penrose.svg'), svg);
console.log(`Generated ${edges.size} unique edges (${Buffer.byteLength(svg)} bytes).`);
