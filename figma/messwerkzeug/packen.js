const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");

const ziel = DATEN;

// Kurze Schluesselnamen, ganze Zahlen wo moeglich, und x/y nur dort, wo sie
// gebraucht werden: naemlich unter Eltern ohne Auto-Layout.
const UM = {
  kinder: "c", text: "T", teile: "P", grund: "G", bild: "I", bildPos: "Ip", bildGr: "Ig",
  rad: "R", rahmen: "W", rahmenFarbe: "Wf", pad: "p", disp: "D", richt: "Dr", just: "Dj",
  align: "Da", luecke: "L", spalten: "S", umbruch: "Du", svg: "V", schatten: "H",
  deck: "O", ausr: "A", trans: "U", deko: "K", verlauf: "Q",
};

const spalten = (n) => {
  const s = n.spalten;
  if (!s || s === "none") return 1;
  return Math.max(1, String(s).trim().split(/\s+/).filter((x) => x).length);
};

const z = (n) => {
  if (n === undefined || n === null) return n;
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? r : r;
};

// x/y werden relativ zum Elternteil abgelegt und nur dort, wo der Elternteil
// kein Auto-Layout hat und die Kinder deshalb frei sitzen.
function packen(n, elternHatLayout, ex, ey) {
  const o = {};
  o.t = n.t === "div" ? undefined : n.t;
  if (n.k) o.k = n.k;
  if (!elternHatLayout) { o.x = z(n.x - ex); o.y = z(n.y - ey); }
  o.b = z(n.b); o.h = z(n.h);
  for (const [lang, kurz] of Object.entries(UM)) {
    if (lang === "kinder") continue;
    if (n[lang] !== undefined && n[lang] !== null) o[kurz] = n[lang];
  }
  if (o.S) {
    // nur die Spaltenzahl wird gebraucht, nicht die Pixelliste
    o.S = String(o.S).trim().split(/\s+/).filter((x) => x).length;
    if (o.S <= 1) delete o.S;
  }
  if (o.P) o.P = o.P.map((p) => [p.v, p.z, p.i]);
  if (o.p) o.p = o.p.map(z);
  if (o.L) o.L = o.L.map(z);
  if (n.kinder) {
    const hat = n.disp === "flex" || n.disp === "grid";
    // Der CSS-Abstand deckt sich nicht immer mit dem, was am Ende dasteht:
    // Rasterspalten sind breiter als ihr Inhalt, Wortabstaende kommen dazu.
    // Deshalb wird die Luecke aus den gemessenen Positionen abgeleitet.
    if (hat && n.kinder.length > 1) {
      const senk = /column/.test(n.richt || "") || (n.disp === "grid" && !n.spaltenZahl);
      const sp = n.disp === "grid" ? spalten(n) : (senk ? 1 : n.kinder.length);
      const quer = [], laengs = [];
      for (let i = 1; i < n.kinder.length; i++) {
        const a = n.kinder[i - 1], b = n.kinder[i];
        const inReihe = n.disp !== "grid" ? !senk : i % sp !== 0;
        const l = b.x - (a.x + a.b);
        const h = b.y - (a.y + a.h);
        if (n.disp === "grid") { if (inReihe) quer.push(l); else laengs.push(h); }
        else if (senk) laengs.push(h);
        else quer.push(l);
      }
      const mittel = (arr) => {
        const s = arr.filter((v) => v > -2 && v < 400).sort((p, q) => p - q);
        return s.length ? Math.round(s[Math.floor(s.length / 2)] * 10) / 10 : null;
      };
      const zeile = mittel(laengs), spalte = mittel(quer);
      if (zeile !== null || spalte !== null) {
        const alt = n.luecke || [0, 0];
        o.L = [zeile === null ? alt[0] : zeile, spalte === null ? alt[1] : spalte];
      }
    }
    o.c = n.kinder.map((k) => packen(k, hat, n.x, n.y));
  }
  for (const k of Object.keys(o)) if (o[k] === undefined) delete o[k];
  return o;
}

for (const name of ["anbieter-1440", "anbieter-390", "planner-1440", "planner-390"]) {
  const d = JSON.parse(fs.readFileSync(`${ziel}/${name}-dicht.json`));
  const raus = { s: d.stile.map((s) => [s.gr, s.gew, s.fam === "Fraunces" ? "F" : "M", s.zh || 0, s.sp || 0, s.farbe || ""]), a: d.abschnitte.map((x) => packen(x, false, x.x, x.y)) };
  const txt = JSON.stringify(raus);
  fs.writeFileSync(`${ziel}/${name}-paket.json`, txt);
  // einzeln je Abschnitt, damit sich der Bau aufteilen laesst
  d.abschnitte.forEach((_, i) => {
    const benutzt = new Set();
    const g = (n) => { (n.P || []).forEach((p) => benutzt.add(p[2])); (n.c || []).forEach(g); };
    const a = raus.a[i];
    g(a);
    const karte = {}; [...benutzt].sort((p, q) => p - q).forEach((v, j) => (karte[v] = j));
    const um = (n) => { if (n.P) n.P = n.P.map((p) => [p[0], p[1], karte[p[2]]]); (n.c || []).forEach(um); };
    const kopie = JSON.parse(JSON.stringify(a));
    um(kopie);
    fs.writeFileSync(`${ziel}/${name}-a${i}.json`, JSON.stringify({ s: [...benutzt].sort((p, q) => p - q).map((v) => raus.s[v]), a: [kopie] }));
  });
  console.log(name.padEnd(15), Math.round(txt.length / 1024) + "kb");
}
