# Messwerkzeug für den Figma-Aufbau

Die Figma-Seiten werden nicht nach Augenmass nachgebaut, sondern aus den
gerenderten Seiten ausgemessen. Der Grund steht in `FIGMA.md`: das Stylesheet
rechnet fast jede Grösse mit `clamp()`, ein Wert wie `clamp(46px, 4.3vw, 64px)`
hat also keine Zahl, die man übergeben könnte. Gemessen wird deshalb, was der
Browser bei 1440 und bei 390 tatsächlich hinstellt.

## Ablauf

```
npm i playwright          # einmalig
node messen.js            # rendert beide Importfassungen und liest alles aus
node kuerzen.js           # zerlegt in Abschnitte, wirft leere Hüllen weg
node verdichten.js        # Textstile in eine gemeinsame Tabelle
node packen.js            # kurze Schlüssel, relative Positionen, echte Abstände
node symbole.js           # Symbole entdoppeln, Wortmarke herauslösen
```

Danach liegt in `daten/` je Seite eine `-fertig.json`. Deren Inhalt geht in den
Figma-Aufruf, wo ein Wandler daraus Ebenen baut: Auto-Layout aus den Flex- und
Rasterwerten, Farben an die Variablen gebunden, Symbole als Vektoren.

`daten/` ist bewusst nicht versioniert, die Dateien entstehen bei jedem Lauf neu.
Mit `SEVENTI_DATEN` lässt sich ein anderer Ablageort setzen.

## Was dabei gelernt wurde

Vier Dinge, die beim Übertragen immer wieder schiefgehen und die die Skripte
deshalb ausdrücklich behandeln:

- **Abstände nicht aus dem Stylesheet nehmen.** Eine Rasterspalte ist breiter
  als ihr Inhalt, und zwischen zwei Wörtern im Knopf stehen 6 px, die in keiner
  `gap`-Regel auftauchen. `packen.js` leitet den Abstand aus den gemessenen
  Positionen ab, nicht aus `gap`.
- **`layoutMode` setzt die Grösse zurück.** Wer in Figma erst `resize()` aufruft
  und danach das Auto-Layout einschaltet, bekommt eine Hülle, die auf ihren
  Inhalt schrumpft. Erst Layout, dann `primaryAxisSizingMode = "FIXED"`, dann
  `resize()`.
- **Figma setzt Text minimal breiter als Chromium.** Ohne Gegenmassnahme
  bricht jede zweite Zeile zusätzlich um. Die Textfelder werden deshalb auf die
  gemessene Breite gesetzt und danach so weit geweitet, bis die Zeilenzahl
  wieder stimmt.
- **WebP wird angenommen, aber nicht gezeichnet.** Der Upload meldet Erfolg und
  liefert einen Hash, die Fläche bleibt trotzdem leer. Bilder vor dem Hochladen
  nach JPEG wandeln.

## Vergleichen

```
node vergleich.js echt.png figma.png abweichung.png
```

Legt beide Bilder übereinander und meldet den Anteil abweichender Punkte sowie
die auffälligsten Zeilenbänder. Reine Textkanten liegen bei zwei bis drei
Prozent, das ist der Unterschied zwischen den beiden Textrastern und nicht zu
beheben. Alles darüber ist ein echter Fehler im Aufbau.
