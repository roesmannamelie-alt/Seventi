const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");

const ziel = DATEN;

// Attribute, die auf dem svg-Element stehen duerfen und von den Kindern geerbt werden
const ERBT = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"];
const GEOM = ["d", "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "width", "height", "points", "transform"];

function attrLesen(tag) {
  const a = {};
  for (const m of tag.matchAll(/([\w-]+)="([^"]*)"/g)) a[m[1]] = m[2];
  return a;
}

function schlank(svg) {
  const kopfM = svg.match(/^<svg([^>]*)>/);
  if (!kopfM) return svg;
  const kopf = attrLesen(kopfM[1]);
  const rumpf = svg.slice(kopfM[0].length).replace(/<\/svg>\s*$/, "");

  const erbe = {};
  for (const k of ERBT) if (kopf[k]) erbe[k] = kopf[k].replace(/px$/, "");

  const teile = [];
  for (const m of rumpf.matchAll(/<(\w+)([^>]*?)\/?>(?:<\/\1>)?/g)) {
    const tag = m[1];
    if (tag === "title" || tag === "desc") continue;
    const a = attrLesen(m[2]);
    const raus = [];
    for (const g of GEOM) if (a[g] !== undefined) raus.push(`${g}="${a[g]}"`);
    for (const k of ERBT) {
      const w = a[k] === undefined ? undefined : a[k].replace(/px$/, "");
      if (w !== undefined && w !== erbe[k]) raus.push(`${k}="${w}"`);
    }
    teile.push(`<${tag} ${raus.join(" ")}/>`);
  }

  const kAttr = [`viewBox="${kopf.viewBox || "0 0 24 24"}"`];
  for (const k of ERBT) if (erbe[k]) kAttr.push(`${k}="${erbe[k]}"`);
  return `<svg ${kAttr.join(" ")}>${teile.join("")}</svg>`;
}

for (const name of ["anbieter-1440", "anbieter-390", "planner-1440", "planner-390"]) {
  const d = JSON.parse(fs.readFileSync(`${ziel}/${name}-paket.json`));
  const tafel = [];
  const idx = new Map();
  const gehe = (n) => {
    if (n.V) {
      const s = schlank(n.V);
      // Die Wortmarke liegt als Komponente in der Datei, nicht als Pfad je Seite
      if (s.length > 2000) {
        n.Lg = /255, 255, 255/.test(s) ? "Weiss" : "Dunkel";
        delete n.V;
      } else {
        if (!idx.has(s)) { idx.set(s, tafel.length); tafel.push(s); }
        n.V = idx.get(s);
      }
    }
    (n.c || []).forEach(gehe);
  };
  d.a.forEach(gehe);
  d.v = tafel;
  const txt = JSON.stringify({ s: d.s, v: d.v, a: d.a });
  fs.writeFileSync(`${ziel}/${name}-fertig.json`, txt);
  console.log(name.padEnd(15), Math.round(txt.length / 1024) + "kb", "| symbole:", tafel.length, "(vorher", (JSON.stringify(d.a).match(/"V"/g) || []).length + " stellen)");
}
