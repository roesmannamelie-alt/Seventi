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
- **Strichstärken werden beim Import nicht mitverkleinert.** Ein Symbol mit
  `viewBox="0 0 24 24"`, das auf 16 px steht, bekommt seine Geometrie sauber
  skaliert, behält aber `stroke-width` 1.8 statt 1.2. Die Symbole sehen dadurch
  durchgehend zu fett aus. Nach dem Import jede Strichstärke mit
  Rahmenbreite/viewBox multiplizieren.
- **Endlosbänder kommen als ein zentrierter Satz an.** Die Importfassung klappt
  die Marquees bewusst zusammen, damit kein Text doppelt im Import landet. Wer
  das eins zu eins übernimmt, bekommt fünf Pillen in der Mitte statt eines
  Bandes. Auf der Seite laufen 15 Pillen über 2056 px und werden bei 1440
  beschnitten — in Figma also den Satz dreimal setzen und den Abschnitt
  beschneiden lassen.
- **Reveals verfälschen jede Position, nicht die Höhe.** Wer die Live-Seite
  misst und nur `.is-in` setzt, erwischt Elemente mitten in der Bewegung: Sie
  stehen dann um den Reveal-Versatz zu tief, meist 20 px. Höhen stimmen dabei
  trotzdem, `transform` ändert kein Layout — man sucht also einen Fehler, den
  es nicht gibt. Vor dem Messen `transform`, `opacity`, `transition` und
  `animation` per Style-Tag ausschalten, dann decken sich die Zahlen.
- **Unterstreichungen gehen beim Import verloren.** Textlinks kommen in Farbe
  und Gewicht richtig an, aber ohne `text-decoration`. Auf der Anbieter-Seite
  betrifft das vier Stellen: „Eintrag entfernen", „Nicht mein Unternehmen",
  „Mehr zum Profil" und das `entfernt` mitten im Fliesstext. Ohne den Strich
  liest sich der Link wie eine fette Auszeichnung, der Handlungsweg verschwindet.
- **`text-wrap: balance` gibt es in Figma nicht.** Der Browser verteilt die
  Zeilen gleichmässig, Figma bricht gierig um — bei gleicher Rahmenbreite steht
  auf Zeile 1 also mehr als auf der Seite. Betroffen sind 25 Überschriften, 14
  auf der Anbieter- und 11 auf der Planner-Seite. Die Umbruchstellen gehören als
  harte Zeilenumbrüche in den Text; die gemessene Rahmenbreite bleibt dabei
  stehen, damit niemand später eine erfundene Breite übernimmt. Leerzeichen
  einzeln durch `\n` ersetzen (`deleteCharacters` + `insertCharacters`), nicht
  `characters` neu setzen — das plattet die zweifarbige Auszeichnung.
- **Zeilen nicht über die Oberkante gruppieren.** Wer die echten Umbrüche
  ausmisst, indem er Wörter nach `rect.top` bündelt, zerschneidet jede Zeile an
  der Grenze zwischen Grotesk und Serife: die beiden Schnitte sitzen auf
  derselben Zeile, haben aber verschiedene Oberkanten. Über die Zeilenmitte
  bündeln und gegen `Höhe / Zeilenhöhe` gegenprüfen, sonst entstehen erfundene
  Umbrüche.
- **`node.x` ist elternrelativ.** Auf der Planner-Seite liegen die Überschriften
  in Containern, die selbst bei 330 stehen; ihr lokales `x` ist dort korrekt 0.
  Wer das gegen die auf der Seite gemessenen 330 prüft, „korrigiert" sie auf 660.
  Immer über `absoluteBoundingBox` minus Rahmenursprung vergleichen.
- **Zentrierter Text braucht den Rahmen der Seite, nicht den des Textes.** Beim
  Import wird aus einem `<p>` über die volle Kartenbreite ein Feld, das den Text
  umschliesst. Zentriert sieht das gleich aus, sitzt aber auf dem Mittelpunkt
  des Textes statt auf dem der Karte — auf der Profilkarte 715 statt 720. Bei
  mittiger Ausrichtung die gemessene Rahmenbreite setzen und `textAutoResize`
  auf `HEIGHT` lassen.

## Vergleichen

```
node vergleich.js echt.png figma.png abweichung.png
```

Legt beide Bilder übereinander und meldet den Anteil abweichender Punkte sowie
die auffälligsten Zeilenbänder. Reine Textkanten liegen bei zwei bis drei
Prozent, das ist der Unterschied zwischen den beiden Textrastern und nicht zu
beheben. Alles darüber ist ein echter Fehler im Aufbau.
