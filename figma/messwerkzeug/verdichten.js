const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");

const ziel = DATEN;

// Stilobjekte der Textbereiche wiederholen sich staendig. Sie wandern in eine
// gemeinsame Tabelle, im Baum steht nur noch der Index.
function verdichten(abschnitte) {
  const stile = [];
  const schluessel = new Map();
  const merken = (s) => {
    const k = JSON.stringify(s);
    if (!schluessel.has(k)) { schluessel.set(k, stile.length); stile.push(s); }
    return schluessel.get(k);
  };
  const zahl = (n) => (n === undefined || n === null ? n : Math.round(n * 10) / 10);

  const gehe = (n) => {
    n.x = zahl(n.x); n.y = zahl(n.y); n.b = zahl(n.b); n.h = zahl(n.h);
    if (n.k) n.k = n.k.split(" ")[0];
    if (n.teile) n.teile = n.teile.map((p) => ({ v: p.von, z: p.bis, i: merken(p.s) }));
    if (n.pad && n.pad.every((x) => !x)) delete n.pad;
    if (n.luecke && n.luecke.every((x) => !x)) delete n.luecke;
    if (n.just === "normal") delete n.just;
    if (n.align === "normal") delete n.align;
    if (n.umbruch === "nowrap") delete n.umbruch;
    if (n.ausr === "start") delete n.ausr;
    for (const key of Object.keys(n)) if (n[key] === null || n[key] === "") delete n[key];
    if (n.kinder) n.kinder.forEach(gehe);
  };
  abschnitte.forEach(gehe);
  return { stile, abschnitte };
}

for (const name of ["anbieter-1440", "anbieter-390", "planner-1440", "planner-390"]) {
  const roh = JSON.parse(fs.readFileSync(`${ziel}/${name}-abschnitte.json`));
  const dicht = verdichten(roh);
  const txt = JSON.stringify(dicht);
  fs.writeFileSync(`${ziel}/${name}-dicht.json`, txt);
  const svgAnteil = (txt.match(/"svg":"[^"]*"/g) || []).join("").length;
  console.log(name.padEnd(15), Math.round(txt.length / 1024) + "kb", "| stile:", dicht.stile.length, "| svg:", Math.round(svgAnteil / 1024) + "kb");
}
