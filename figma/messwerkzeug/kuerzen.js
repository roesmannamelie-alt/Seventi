const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");

const ziel = DATEN;

// Wrapper ohne eigene Wirkung fallen weg: kein Grund, kein Rahmen, kein Radius,
// kein Text, kein Abstand und genau ein Kind, das die volle Flaeche fuellt.
const nutzlos = (n) =>
  !n.text && !n.grund && !n.bild && !n.rad && !n.rahmen && !n.disp &&
  n.kinder && n.kinder.length === 1 &&
  Math.abs(n.kinder[0].b - n.b) < 1.5 && Math.abs(n.kinder[0].h - n.h) < 1.5;

const putzen = (n) => {
  if (n.kinder) n.kinder = n.kinder.map(putzen);
  while (nutzlos(n)) {
    const k = n.kinder[0];
    k.x = n.x; k.y = n.y;
    n = k;
    if (n.kinder) n.kinder = n.kinder.map(putzen);
  }
  return n;
};

for (const name of ["anbieter-1440", "anbieter-390", "planner-1440", "planner-390"]) {
  const roh = JSON.parse(fs.readFileSync(`${ziel}/${name}.json`));
  const flach = [];
  // die Abschnitte liegen unter body > (leiste | main | footer)
  const sammeln = (n, tiefe) => {
    if (n.t === "section" || n.t === "footer" || (n.t === "div" && /leiste|closing-bed/.test(n.k))) {
      flach.push(putzen(n));
      return;
    }
    if (n.kinder && tiefe < 3) n.kinder.forEach((k) => sammeln(k, tiefe + 1));
  };
  roh.forEach((n) => sammeln(n, 0));
  fs.writeFileSync(`${ziel}/${name}-abschnitte.json`, JSON.stringify(flach));
  console.log(name, "abschnitte:", flach.length);
  flach.forEach((a, i) => {
    const kb = Math.round(JSON.stringify(a).length / 1024);
    console.log("   ", String(i).padStart(2), (a.k || a.t).slice(0, 34).padEnd(36), String(Math.round(a.h)).padStart(5) + "px", kb + "kb");
  });
}
