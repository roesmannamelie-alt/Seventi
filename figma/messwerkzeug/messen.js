const { chromium } = require("playwright");
const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");


const wurzel = WURZEL;
const ziel = DATEN;

const auslesen = () => {
  const rnd = (n) => Math.round(n * 10) / 10;
  const INLINE = new Set(["em", "b", "strong", "span", "a", "i", "small", "br", "sup", "sub"]);

  const farbe = (c) => {
    if (!c || c === "rgba(0, 0, 0, 0)" || c === "transparent") return null;
    const m = c.match(/[\d.]+/g);
    if (!m) return c;
    const h = (x) => Number(x).toString(16).padStart(2, "0");
    const s = "#" + h(m[0]) + h(m[1]) + h(m[2]);
    return m[3] !== undefined && Number(m[3]) < 1 ? s + "|" + Number(m[3]) : s;
  };

  const schrift = (st) => ({
    gr: rnd(parseFloat(st.fontSize)),
    gew: parseInt(st.fontWeight, 10),
    fam: st.fontFamily.split(",")[0].replace(/["']/g, ""),
    zh: st.lineHeight === "normal" ? null : rnd(parseFloat(st.lineHeight)),
    sp: st.letterSpacing === "normal" ? 0 : rnd(parseFloat(st.letterSpacing)),
    farbe: farbe(st.color),
  });

  // Ein Element gilt als Textelement, wenn es ausser Inline-Auszeichnungen
  // nichts enthaelt. Die Auszeichnungen kommen als Bereiche mit.
  const nurInline = (el) =>
    el.childElementCount > 0 &&
    [...el.children].every((c) => INLINE.has(c.tagName.toLowerCase()));

  const bereiche = (el) => {
    const teile = [];
    const gehe = (n) => {
      if (n.nodeType === 3) {
        const t = n.textContent.replace(/\s+/g, " ");
        if (t) teile.push({ t: t, st: getComputedStyle(n.parentElement) });
        return;
      }
      if (n.nodeType !== 1) return;
      const s = getComputedStyle(n);
      // ausgeblendete Hinweisfahnen liegen im Markup, gehoeren aber nicht in den Text
      if (s.opacity === "0" || s.visibility === "hidden" || s.display === "none") return;
      if (n.tagName.toLowerCase() === "br") { teile.push({ t: "\n", st: getComputedStyle(n.parentElement) }); return; }
      // ein Kind auf eigener Zeile braucht auch im Textfeld eine eigene Zeile
      const eigeneZeile = !s.display.startsWith("inline") || s.display === "inline-block";
      if (eigeneZeile && teile.length && !/\n$/.test(teile[teile.length - 1].t)) teile.push({ t: "\n", st: s });
      [...n.childNodes].forEach(gehe);
      if (eigeneZeile) teile.push({ t: "\n", st: s });
    };
    [...el.childNodes].forEach(gehe);

    // fuehrende und schliessende Leerzeichen wegnehmen
    while (teile.length && !teile[0].t.trim()) teile.shift();
    while (teile.length && !teile[teile.length - 1].t.trim()) teile.pop();
    if (teile.length) {
      teile[0].t = teile[0].t.replace(/^\s+/, "");
      teile[teile.length - 1].t = teile[teile.length - 1].t.replace(/\s+$/, "");
    }
    // Leerzeichen direkt an einem Umbruch sind Auszeichnung, kein Inhalt
    for (let i = 1; i < teile.length; i++) {
      if (teile[i - 1].t.endsWith("\n")) teile[i].t = teile[i].t.replace(/^ +/, "");
      if (teile[i].t.startsWith("\n")) teile[i - 1].t = teile[i - 1].t.replace(/ +$/, "");
    }
    const sauber = teile.filter((p) => p.t.length);
    if (!sauber.length) return null;
    const ganz = sauber.map((p) => p.t).join("");
    const abschnitte = [];
    let pos = 0;
    for (const p of sauber) {
      const s = schrift(p.st);
      const letzte = abschnitte[abschnitte.length - 1];
      if (letzte && JSON.stringify(letzte.s) === JSON.stringify(s)) letzte.bis = pos + p.t.length;
      else abschnitte.push({ von: pos, bis: pos + p.t.length, s: s });
      pos += p.t.length;
    }
    return { text: ganz, teile: abschnitte };
  };

  const knoten = (el, bezug, tiefe) => {
    const st = getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden" || st.opacity === "0") return null;
    const r = el.getBoundingClientRect();
    if (r.width < 0.5 && r.height < 0.5) return null;
    const tag = el.tagName.toLowerCase();

    const o = {
      t: tag,
      k: typeof el.className === "string" ? el.className.trim() : "",
      x: rnd(r.left - bezug.left),
      y: rnd(r.top - bezug.top),
      b: rnd(r.width),
      h: rnd(r.height),
    };

    if (tag === "svg") {
      // currentColor und Stylesheet-Striche fest ins Markup schreiben,
      // sonst kommt das Symbol in Figma schwarz und ohne Strichstaerke an
      const klon = el.cloneNode(true);
      const echt = [el, ...el.querySelectorAll("*")];
      const kop = [klon, ...klon.querySelectorAll("*")];
      echt.forEach((q, i) => {
        const s = getComputedStyle(q);
        const c = kop[i];
        if (!c) return;
        c.setAttribute("fill", s.fill);
        c.setAttribute("stroke", s.stroke);
        if (parseFloat(s.strokeWidth)) c.setAttribute("stroke-width", s.strokeWidth);
        if (s.strokeLinecap) c.setAttribute("stroke-linecap", s.strokeLinecap);
        if (s.strokeLinejoin) c.setAttribute("stroke-linejoin", s.strokeLinejoin);
      });
      klon.setAttribute("width", rnd(r.width));
      klon.setAttribute("height", rnd(r.height));
      o.svg = klon.outerHTML.replace(/\s+/g, " ");
      return o;
    }
    if (tag === "img") { o.bild = (el.getAttribute("src") || "").split("/").pop(); return o; }

    const eigenerText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const textDazu = (o2, b) => {
      o2.text = b.text;
      o2.teile = b.teile;
      o2.ausr = st.textAlign;
      if (st.textTransform !== "none") o2.trans = st.textTransform;
      if (st.textDecorationLine !== "none") o2.deko = st.textDecorationLine;
    };

    if (eigenerText && (el.childElementCount === 0 || nurInline(el))) {
      const b = bereiche(el);
      if (b) textDazu(o, b);
    } else if (eigenerText) {
      // Text und Blockkinder nebeneinander, etwa "Kanton fehlt?" neben einem
      // Symbol. Der Text kommt als eigenes Kind mit gemessenem Kasten dazu.
      const laeufe = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
      if (laeufe.length) {
        const bereich = document.createRange();
        bereich.setStartBefore(laeufe[0]);
        bereich.setEndAfter(laeufe[laeufe.length - 1]);
        const rr = bereich.getBoundingClientRect();
        const s = schrift(st);
        const txt = laeufe.map((n) => n.textContent.replace(/\s+/g, " ")).join("").trim();
        o.textKind = {
          t: "span", k: "eigentext",
          x: rnd(rr.left - bezug.left), y: rnd(rr.top - bezug.top),
          b: rnd(rr.width), h: rnd(rr.height),
          text: txt, teile: [{ von: 0, bis: txt.length, s: s }],
          ausr: st.textAlign,
        };
      }
    }

    const bg = farbe(st.backgroundColor);
    if (bg) o.grund = bg;
    if (st.backgroundImage !== "none") {
      const m = st.backgroundImage.match(/url\(["']?([^"')]+)/);
      if (m) { o.bild = m[1].split("/").pop(); o.bildPos = st.backgroundPosition; o.bildGr = st.backgroundSize; }
      else o.verlauf = st.backgroundImage.slice(0, 120);
    }
    const rad = [st.borderTopLeftRadius, st.borderTopRightRadius, st.borderBottomRightRadius, st.borderBottomLeftRadius]
      .map((x) => rnd(parseFloat(x)) || 0);
    if (rad.some((x) => x)) o.rad = rad.every((x) => x === rad[0]) ? rad[0] : rad;
    const bw = [st.borderTopWidth, st.borderRightWidth, st.borderBottomWidth, st.borderLeftWidth].map((x) => rnd(parseFloat(x)) || 0);
    if (bw.some((x) => x)) { o.rahmen = bw.join("/"); o.rahmenFarbe = farbe(st.borderTopColor); }
    const pad = [st.paddingTop, st.paddingRight, st.paddingBottom, st.paddingLeft].map((x) => rnd(parseFloat(x)) || 0);
    if (pad.some((x) => x)) o.pad = pad;
    if (st.boxShadow !== "none") o.schatten = st.boxShadow.slice(0, 90);

    if (st.display.includes("flex") || st.display.includes("grid")) {
      o.disp = st.display.includes("grid") ? "grid" : "flex";
      const g = parseFloat(st.rowGap);
      const g2 = parseFloat(st.columnGap);
      if (!isNaN(g)) o.luecke = [rnd(g), rnd(isNaN(g2) ? g : g2)];
      if (o.disp === "flex") { o.richt = st.flexDirection; o.just = st.justifyContent; o.align = st.alignItems; o.umbruch = st.flexWrap; }
      else { o.spalten = st.gridTemplateColumns; o.just = st.justifyItems; o.align = st.alignItems; }
    }
    if (st.opacity !== "1") o.deck = rnd(parseFloat(st.opacity));

    if (tiefe > 0 && el.childElementCount && !o.text) {
      const kinder = [...el.children].map((c) => knoten(c, bezug, tiefe - 1)).filter(Boolean);
      if (o.textKind) {
        // an die gemessene Stelle einsortieren, damit die Reihenfolge stimmt
        const vor = kinder.filter((c) => c.x + c.b <= o.textKind.x + 0.5 && c.y <= o.textKind.y + 0.5);
        kinder.splice(vor.length, 0, o.textKind);
      }
      if (kinder.length) o.kinder = kinder;
    } else if (o.textKind) {
      o.kinder = [o.textKind];
    }
    delete o.textKind;
    return o;
  };

  const bezug = document.body.getBoundingClientRect();
  return [...document.body.children]
    .filter((el) => getComputedStyle(el).display !== "none" && el.getBoundingClientRect().height > 0)
    .map((el) => knoten(el, bezug, 15))
    .filter(Boolean);
};

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  for (const [datei, kurz] of [["figma/anbieter.html", "anbieter"], ["figma/planner.html", "planner"]]) {
    for (const breite of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width: breite, height: 900 }, deviceScaleFactor: 1 });
      await page.goto("file://" + ORT.join(wurzel, datei), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      // Einblendungen zu Ende laufen lassen, sonst fehlen halbe Abschnitte
      await page.waitForTimeout(2500);
      const daten = await page.evaluate(auslesen);
      const name = `${kurz}-${breite}`;
      fs.writeFileSync(ORT.join(ziel, name + ".json"), JSON.stringify(daten));
      await page.screenshot({ path: ORT.join(ziel, name + ".png"), fullPage: true });
      console.log(name, "bloecke", daten.length, Math.round(fs.statSync(ORT.join(ziel, name + ".json")).size / 1024) + "kb");
      await page.close();
    }
  }
  await browser.close();
})();
