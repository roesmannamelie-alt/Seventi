// Legt zwei PNG uebereinander und meldet, wie stark sie abweichen.
// Aufruf: node vergleich.js echt.png figma.png [ausgabe.png]
const { chromium } = require("playwright");
const fs = require("fs");
const ORT = require("path");
const DATEN = process.env.SEVENTI_DATEN || ORT.join(__dirname, "daten");
const WURZEL = ORT.resolve(__dirname, "..", "..");


(async () => {
  const [a, b, aus] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const page = await browser.newPage();
  const d64 = (p) => "data:image/png;base64," + fs.readFileSync(p).toString("base64");

  const erg = await page.evaluate(async ([qa, qb]) => {
    const laden = (src) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = src; });
    const [ia, ib] = await Promise.all([laden(qa), laden(qb)]);
    const w = Math.max(ia.width, ib.width), h = Math.max(ia.height, ib.height);
    const holen = (img) => {
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const x = c.getContext("2d");
      x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
      x.drawImage(img, 0, 0, img.width, img.height);
      return x.getImageData(0, 0, w, h).data;
    };
    const pa = holen(ia), pb = holen(ib);
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    const out = ctx.createImageData(w, h);
    let ab = 0;
    const zeilen = new Array(h).fill(0);
    for (let i = 0; i < pa.length; i += 4) {
      const dd = Math.abs(pa[i] - pb[i]) + Math.abs(pa[i + 1] - pb[i + 1]) + Math.abs(pa[i + 2] - pb[i + 2]);
      const stark = dd > 90;
      if (stark) { ab++; zeilen[Math.floor(i / 4 / w)]++; }
      out.data[i] = stark ? 255 : Math.round((pa[i] + 255 * 2) / 3);
      out.data[i + 1] = stark ? 0 : Math.round((pa[i + 1] + 255 * 2) / 3);
      out.data[i + 2] = stark ? 0 : Math.round((pa[i + 2] + 255 * 2) / 3);
      out.data[i + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
    // die zehn auffaelligsten Bandbereiche melden
    const baender = [];
    let start = -1;
    for (let y = 0; y <= h; y++) {
      const heiss = y < h && zeilen[y] > w * 0.02;
      if (heiss && start < 0) start = y;
      if (!heiss && start >= 0) { baender.push([start, y - 1, Math.max(...zeilen.slice(start, y))]); start = -1; }
    }
    baender.sort((x, y) => y[2] - x[2]);
    return {
      breiteA: ia.width, hoeheA: ia.height, breiteB: ib.width, hoeheB: ib.height,
      anteil: Math.round((ab / (w * h)) * 10000) / 100,
      baender: baender.slice(0, 10).map((z) => ({ von: z[0], bis: z[1], punkte: z[2] })),
      png: c.toDataURL("image/png"),
    };
  }, [d64(a), d64(b)]);

  if (aus) fs.writeFileSync(aus, Buffer.from(erg.png.split(",")[1], "base64"));
  delete erg.png;
  console.log(JSON.stringify(erg, null, 1));
  await browser.close();
})();
