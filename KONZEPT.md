# Konzept Landingpages Seventi

Arbeitsstand Systra Studios. Grundlage: Briefing Cody Holden, aktueller Hero-Entwurf in `index.html`.

---

## 1. Wofür die Seite da ist

Eine Assistentin der Geschäftsleitung oder HR-Managerin, 50–500 Mitarbeitende, Raum Zürich, kommt über eine deutschsprachige Google-Anzeige mit hoher Kaufabsicht. Sie hat einen Auftrag auf dem Tisch, kein Interesse an Inspiration und ungefähr fünf Sekunden Geduld.

Die Seite hat eine Aufgabe: Klick auf „Event planen" und Konto anlegen.

Daraus folgen vier Regeln, die für jeden Abschnitt gelten:

1. **Jeder Abschnitt beantwortet eine Frage, die sie wirklich hat.** Keine Abschnitte, die es „auch noch braucht".
2. **Unsicherheit ist der Hauptabsprunggrund bei Marktplätzen.** Sie weiß nicht, ob drei Angebote kommen oder keins. Alles, was diese Unsicherheit reduziert, hat Vorrang vor allem, was das Produkt lobt.
3. **Konkret statt allgemein.** Zahlen, Zeitangaben, Schweizer Regionen, echte Beträge in CHF. Keine Superlative.
4. **Ein Ausgang.** Keine Navigation, keine Nebenlinks. Der einzige zweite Weg ist ganz unten im Footer der Link zur Anbieter-Seite.

---

## 2. Die Abschnitte im Überblick

| # | Abschnitt | Beantwortet die Frage |
|---|---|---|
| 0 | Hero *(steht)* | Was ist das und was bringt es mir? |
| 1 | Vertrauensleiste | Nutzt das schon jemand wie ich? |
| 2 | So läuft es ab *(gebaut)* | Was passiert nach dem Klick, und wie lange dauert das? |
| 3 | Vergleich zum heutigen Vorgehen *(gebaut)* | Warum nicht einfach wie bisher? |
| 4 | Der Angebotsvergleich | Was bekomme ich am Ende in die Hand? |
| 5 | Für welche Anlässe *(gebaut)* | Ist mein Event überhaupt gemeint? |
| 6 | Anbieter und Regionen | Gibt es bei mir genug Auswahl? |
| 7 | Ein Ablauf im Detail | Funktioniert das in echt? |
| 8 | Was es kostet | Wo ist der Haken? |
| 9 | Häufige Fragen | Alles, was sonst zum Absprung führt |
| 10 | Abschluss-CTA *(gebaut)* | Letzter Einstieg |
| 11 | Footer *(gebaut)* | Pflichtangaben, Ausgang für Anbieter |

Elf Abschnitte klingen viel, sind aber überwiegend kurz. Die Seite soll sich schnell scrollen lassen, nicht lang lesen.

---

## 2b. Stand und Arbeitsregel

**Gebaut:** Hero, 2 (So läuft es ab), 3 (Der Unterschied), 5 (Für welche Anlässe), 10 (Abschluss), 11 (Footer).

**Bewusst offen:** 1 (Vertrauensleiste), 4 (Angebotsvergleich), 6 (Anbieter und Regionen), 7 (Ablauf im Detail), 8 (Was es kostet), 9 (Häufige Fragen). Diese Abschnitte bestehen fast vollständig aus Angaben, die nur Seventi kennt: Anbieterzahlen, Reaktionszeiten, Preismodell, Kundenreferenzen, Feldstruktur der Angebotsansicht. Wir bauen sie, sobald die Werte da sind.

**Regel für alles Weitere:** Auf die Seite kommt nur, was wir wirklich wissen. Geschätzte Zahlen, angenommene Produktfunktionen und erfundene Referenzen bleiben draussen. Wo eine Angabe fehlt, das Layout sie aber braucht, steht ein sichtbar gekennzeichneter Platzhalter statt einer plausiblen Erfindung.

### Angaben, die aktuell auf der Seite stehen und bestätigt werden müssen

| Wo | Aussage | Status |
|---|---|---|
| Hero und Abschluss | „Start in ca. 3 Minuten" | unsere Schätzung, wie lange das Briefing dauert |
| Hero und Abschluss | „Unverbindlich und kostenlos" | Preismodell für Planerinnen ist uns nicht bestätigt |
| Abschnitt 2, Schritt 1 | „3 Minuten" | wie oben |
| Abschnitt 2, Schritt 2 | Zeit bis zum ersten Angebot | als offener Platzhalter gekennzeichnet |
| Abschnitt 2, Kasten | Miia schlägt Anbieter zum Anschreiben vor | steht so im Briefing, Ablauf im Detail unklar |

Alles andere auf der Seite beschreibt entweder die Mechanik aus dem Briefing oder den heutigen Arbeitsalltag der Zielgruppe.

---

## 2c. Gestaltungsregeln für alle weiteren Abschnitte

- **Keine Rahmen und Ränder um Karten.** Abgrenzung entsteht über Flächen, Radien und Abstand, nicht über Konturen. Trennlinien innerhalb einer Karte sind erlaubt.
- **Kicker sind dezente Pills mit Icon**, in derselben Form wie der Hero-Eyebrow. Keine Striche, keine Versalien.
- **Bildflächen ohne Bild werden gekennzeichnet.** Solange kein Bild vorliegt, trägt die Fläche sichtbar den Hinweis „Bildplatzhalter" mit Zweck. Eingesetzt sind aktuell zwei Bilder von Seventi: ein Firmenanlass für Abschnitt 5, eine Eventlocation für die Provider-Seite.
- **Bewegung folgt dem Scrollen.** Abschnitt 2 hat eine durchgehende Linie über alle drei Schritte, die sich beim Scrollen füllt; die Schrittnummern schalten mit und zeigen beim Hover ein passendes Icon. Abschnitt 3 wird über einen Tab umgeschaltet: „Heute" und „Mit Seventi" tauschen dieselbe Karte per Überblendung, der Abschnittskopf steht mittig. Bei `prefers-reduced-motion` steht alles sofort im Endzustand.
- **Anlass-Pills** liegen im Glaslook mit weisser Schrift auf dem Bild und zeigen beim Hover den typischen Bedarf. Jede reagiert einzeln auf den Zeiger, gemessen wird der Abstand zu ihrem Rand: ab etwa 110 px passiert nichts, dicht davor weicht sie deutlich aus. Die Pill unter dem Zeiger bleibt stehen, damit sie anklickbar bleibt.
- **Hervorgehobene Kästen bleiben schmal und mittig**, nicht über die volle Breite gezogen.
- **Keine Gedankenstriche im Fliesstext.** Wo einer stehen würde, tut es ein Komma, ein Doppelpunkt oder ein Punkt.
- **Arbeitshinweise stehen hinter einem Info-Icon**, nicht als Dauertext unter dem Element. Sichtbar bleiben nur Hinweise, die auch in der fertigen Fassung stehen sollen.
- **Ein FAQ enthält nur Fragen, die kein anderer Abschnitt schon beantwortet.** Wiederholung macht die Seite lang, ohne einen Einwand zusätzlich auszuräumen. Fehlt uns die Antwort noch, steht die Frage im Konzept und nicht auf der Seite.

---

## 3. Die Abschnitte im Einzelnen

### 1 · Vertrauensleiste

**Aufgabe:** Innerhalb der ersten Sekunde nach dem Hero zeigen, dass hier bereits Firmen buchen. Schmal, ruhig, kein eigener Abschnitt mit großer Headline.

**Inhalt**

> Bereits im Einsatz bei Teams in Zürich, Zug und Luzern

Fünf Logo-Plätze *(Platzhalter, echte Logos von Cody, Freigabe der Firmen nötig)*

Darunter drei Zahlen in einer Zeile:

- **142** geprüfte Anbieter in der Region Zürich
- **4** Angebote pro Anfrage im Durchschnitt
- **32 Stunden** bis zum ersten Angebot

**Gestaltung:** helle Fläche, Logos einfarbig in Graugrün, Zahlen in Fraunces. Höhe ca. 140 px Desktop.

**Wenn Cody keine Logos freigeben kann:** Zahlenzeile allein, dafür größer. Nie Platzhalter-Logos stehen lassen, lieber weniger als erfunden.

---

### 2 · So läuft es ab

**Aufgabe:** Der wichtigste Abschnitt der Seite. Er nimmt die Unsicherheit, die bei Marktplätzen zum Absprung führt, und er tut es mit ehrlichen Zeitangaben.

**Headline**

> Drei Schritte. Der erste dauert drei Minuten.

**Schritt 1 · Event beschreiben, 3 Minuten**
Datum, Personenzahl, Region, Budget und was du brauchst. Miia fragt nach, wenn etwas fehlt. Ein Briefing, egal wie viele Anbieter du danach vergleichst.

**Schritt 2 · Angebote erhalten, Zeitangabe folgt**
Passende Locations und Caterer bewerben sich mit einem konkreten Angebot. Nachfassen musst du bei niemandem. Die Zeitspanne steht als offener Platzhalter, bis Seventi den realen Wert liefert.

**Schritt 3 · Vergleichen und buchen, wann es dir passt**
Alle Angebote in derselben Struktur: Preis total, Preis pro Person, was inklusive ist, bis wann die Option gilt. Du buchst direkt oder lehnst ab.

**Direkt darunter, klein, aber nicht versteckt:**

> **Und wenn sich niemand meldet?**
> Dann schlägt Miia dir passende Anbieter vor, die du direkt aus deinem Briefing heraus anschreiben kannst. Du fängst nicht wieder bei null an.

Dieser Kasten ist der Grund, warum der Abschnitt an zweiter Stelle steht. Genau diese Frage bricht die Anmeldung sonst ab.

**Gestaltung:** drei Spalten Desktop, untereinander Mobil, mit derselben Fortschrittslinie wie in der Hero-Animation. Die Zeitangabe ist typografisch gleichwertig zur Schrittüberschrift, nicht Kleingedrucktes.

---

### 3 · Vergleich zum heutigen Vorgehen

**Aufgabe:** Sie erkennt ihren Arbeitsalltag wieder. Das ist der Abschnitt, der emotional trägt, ohne emotional zu werden.

**Headline**

> Elf E-Mails, drei Rückrufe, ein Excel.

**Zwei Spalten, nüchtern gegenübergestellt:**

*Wie es heute läuft*
- Locations googeln und einzeln anschreiben
- Jede Antwort in einem anderen Format, manche gar nicht
- Nachfassen bei denen, die nicht antworten
- Die Angebote selbst vergleichbar machen, meist in Excel

*Mit Seventi*
- Ein Briefing, einmal ausgefüllt
- Anbieter melden sich von sich aus
- Alle Angebote in derselben Struktur
- Der Vergleich steht, ohne dass du eine Tabelle baust

**Gestaltung:** Keine rote Spalte mit Kreuzen und keine zwei Spalten nebeneinander, sondern eine schmale, hohe Karte, die per Tab zwischen „Heute" und „Mit Seventi" wechselt. Die heutige Seite trägt stumpfe Striche, die Seventi-Seite je ein eigenes Icon pro Punkt. Der Unterschied entsteht durch Ruhe, nicht durch Dramatik.

---

### 4 · Der Angebotsvergleich

**Aufgabe:** Zeigen, was sie am Ende in der Hand hält. Das ist auch das, was sie ihrer Geschäftsleitung vorlegt, ein unterschätztes Kaufargument in dieser Rolle.

**Headline**

> Angebote, die man nebeneinanderlegen kann.

**Text**

> Jeder Anbieter antwortet in derselben Struktur. Du siehst Preis pro Person, was inklusive ist und bis wann die Option gilt, und exportierst den Vergleich als PDF für die Freigabe.

**Visual:** Vergleichsansicht mit drei Angeboten nebeneinander. Zeilen: Preis total, Preis pro Person, Räumlichkeit, Catering, Technik, ÖV-Anbindung, Storno, gültig bis. *(Bildplatzhalter, später echter Produkt-Screenshot oder nachgebaute Ansicht.)*

**Gestaltung:** breit, fast randlos, leicht angeschnitten, damit man sieht, dass es mehr Spalten gibt. Mobil: horizontal scrollbar mit der ersten Spalte fixiert.

---

### 5 · Für welche Anlässe

**Aufgabe:** Qualifizierung, kein Inspirationskatalog. Sie soll ihr Event wiedererkennen, nicht ein neues suchen. Das ist der Abschnitt, den die aktuelle Seite mit „Explore popular event ideas" falsch löst.

**Headline**

> Für die Anlässe, die im Firmenkalender stehen.

**Sechs Kacheln, je mit typischer Größe:**

- Sommerfest · 50–300 Personen
- Weihnachtsessen · 30–200 Personen
- Team-Offsite · 10–60 Personen
- Kundenanlass · 40–150 Personen
- Generalversammlung und Konferenz · 80–500 Personen
- Firmenjubiläum · 100–400 Personen

**Gestaltung:** Text-Kacheln mit dünner Linie, ohne Fotos, ohne Grill- und Disco-Icons. Wenn Bilder, dann Innenräume ohne Menschen. Die Größenangabe ist wichtiger als das Bild, sie beantwortet nebenbei „passt meine Personenzahl?".

---

### 6 · Anbieter und Regionen

**Aufgabe:** Die zweite große Unsicherheitsfrage: Gibt es bei mir überhaupt genug Auswahl?

**Headline**

> Geprüfte Anbieter, dort wo dein Event stattfindet.

**Regionsliste mit Zahlen** *(Werte von Cody)*
Zürich 142 · Zug 38 · Luzern 44 · Aargau 51 · St. Gallen 29 · Basel 63 · Bern 57 · Innerschweiz 26

**Was „geprüft" heißt, drei Punkte:**
- Handelsregistereintrag und Firmensitz geprüft
- Mindestens ein durchgeführtes Firmenevent nachgewiesen
- Antwortzeit und Zusagequote werden gemessen und sind im Profil sichtbar

**Gestaltung:** Regionen als Liste oder schlichte Schweizer Karte *(Bildplatzhalter)*. Keine Anbieter-Logos, keine Stockfotos von Locations, solange keine echten Bilder vorliegen.

---

### 7 · Ein Ablauf im Detail

**Aufgabe:** Beweis statt Behauptung. Ein einziges Beispiel, mit Uhrzeiten.

**Headline**

> Sommerfest, 140 Personen, Zürich West.

**Zeitachse**
- **Dienstag, 14:20**, Briefing bei Miia, 4 Minuten
- **Mittwoch, 09:10**, erstes Angebot
- **Donnerstag**, fünf Angebote, alle vergleichbar
- **Montag**, gebucht

**Zitat** *(nur wenn echt, Cody muss ein freigegebenes Zitat liefern)*

> „Am Donnerstag hatte ich fünf Angebote auf dem Tisch und musste keinem hinterhertelefonieren."
> Assistenz der Geschäftsleitung, Industrieunternehmen mit 240 Mitarbeitenden

**Wichtig:** Wenn kein freigegebenes Zitat kommt, bleibt die Zeitachse allein stehen. Keine erfundenen Testimonials und keine Stock-Avatare, bei dieser Zielgruppe fällt das sofort auf und kostet mehr, als es bringt.

---

### 8 · Was es kostet

**Aufgabe:** Den vermuteten Haken auflösen, bevor er im Kopf entsteht. Kurz, ein Kasten.

**Headline**

> Für dich kostenlos.

**Text**

> Anfragen, Angebote und Buchung sind für planende Unternehmen kostenlos. Seventi verdient auf der Anbieterseite. Ein Briefing ist keine Buchung, du kannst jedes Angebot ablehnen.

*(Geschäftsmodell muss Cody bestätigen, bevor dieser Abschnitt live geht.)*

---

### 9 · Häufige Fragen

**Aufgabe:** Alles auffangen, was sonst zum Absprung führt. Aufklappbar, sieben bis neun Fragen, Antworten in zwei bis drei Sätzen.

1. Was kostet mich Seventi?
2. Wie schnell bekomme ich Angebote?
3. Was passiert, wenn kein passendes Angebot kommt?
4. Bin ich verpflichtet zu buchen?
5. Sehen alle Anbieter meinen Firmennamen?
6. Wer sind die Anbieter und wie werden sie geprüft?
7. Was, wenn Datum oder Personenzahl noch nicht feststehen?
8. Kann ich den Angebotsvergleich als PDF für die interne Freigabe exportieren?
9. Wo liegen meine Daten?

Frage 5, 7 und 8 kommen aus der konkreten Rolle: Sie darf oft nicht öffentlich machen, für welche Firma sie plant, hat selten schon fixe Zahlen und muss die Entscheidung intern freigeben lassen. Diese drei Fragen stehen sonst nirgends auf Marktplatzseiten und sind genau deshalb wirksam.

---

### 10 · Abschluss-CTA

**Aufgabe:** Letzter Einstieg für alle, die bis unten gelesen haben. Wiederholt das Hero-Versprechen mit anderen Worten, ohne neuen Hype.

> **Ein Briefing. Dann melden sich die Anbieter.**
> Button „Event planen" · Start in ca. 3 Minuten, unverbindlich und kostenlos

**Gestaltung:** volle Breite, Markenfarbe oder dunkler Block als einziger Farbakzent dieser Größe auf der Seite.

---

### 11 · Footer

Minimal: Impressum, Datenschutz, Kontakt, Sprachwahl. Dazu der einzige Nebenausgang der Seite:

> Sie sind Location oder Caterer? → Für Anbieter

---

## 4. Warum diese Reihenfolge

Nach dem Hero kommt zuerst der Beweis, dass andere Firmen das nutzen (1), dann sofort der Ablauf mit Zeitangaben (2). Das ist bewusst früh: Wer nach dem Hero weiterscrollt, tut das mit der Frage „und dann?". Erst danach kommt der Vergleich zum bisherigen Vorgehen (3), der überzeugt nur jemanden, der die Mechanik schon verstanden hat.

Die Abschnitte 4 bis 7 sind Beweismaterial in absteigender Wichtigkeit. Kosten (8) und FAQ (9) stehen bewusst spät, sie werden nur von denen gelesen, die kurz vor der Anmeldung noch einen Einwand haben.

Sollte Material fehlen, sind 5, 6 und 7 die Abschnitte, die man ohne großen Schaden weglassen kann. 2 und 8 nicht.

---

## 5. Was wir dafür von Cody brauchen

| Braucht es für | Was genau |
|---|---|
| Abschnitt 1 | Anbieterzahl Region Zürich, Ø Angebote pro Anfrage, Ø Zeit bis zum ersten Angebot, Freigabe für 5 Firmenlogos |
| Abschnitt 2 | Realistische Zeitspanne bis zum ersten Angebot, Ablauf wenn kein Angebot kommt |
| Abschnitt 4 | Screenshot der Angebotsansicht oder Feldliste, damit wir sie nachbauen |
| Abschnitt 6 | Anbieterzahlen pro Region, Prüfkriterien |
| Abschnitt 7 | Ein echtes, freigegebenes Beispiel mit Zitat |
| Abschnitt 8 | Bestätigung des Geschäftsmodells |
| Alle | Definitive Farbpalette, Logo-Dateien, Bildmaterial |

Bis das da ist, arbeiten wir mit klar gekennzeichneten Platzhaltern. Kein Wert auf der Seite ist erfunden und bleibt dann stehen.

---

## 6. Offene Entscheidungen

**Du oder Sie.** Der bestehende Hero duzt. Für eine Assistenz der Geschäftsleitung im Schweizer B2B-Umfeld ist „Sie" der sichere Standard, „du" wirkt moderner und passt zum KI-Assistenten. Das muss einheitlich entschieden werden, bevor wir die Abschnitte texten, die Umstellung später ist zwar mechanisch, aber sie betrifft jeden Satz. **Empfehlung: bei „du" bleiben**, weil das Produkt selbst über einen Assistenten läuft und die Seite sonst distanzierter wirkt als das Produkt dahinter.

**Logo im Hero.** Die Planner-Seite hat aktuell oben links keine Wortmarke. Auf einer Landingpage aus einer Anzeige ist mindestens die Marke sinnvoll, damit erkennbar ist, wo man gelandet ist, ohne Menü. In den Provider-Entwürfen ist sie testweise gesetzt. Sollten wir für beide Seiten gleich lösen.

**Sprachversionen.** Cody liefert Übersetzungen. Layout muss längere französische Zeilen aushalten: Headline und Button auf mindestens +25 % Textlänge prüfen.

---

## 7. Provider-Seite

Gebaut als eigene Unterseite unter `anbieter/`, nach dem Provider-Briefing von Cody. Die alte Adresse `provider.html` leitet dorthin weiter.

### Was das Briefing geändert hat

Die drei ersten Hero-Entwürfe entstanden vor dem Provider-Briefing. Drei Punkte darin haben sie überholt:

1. **Die Hauptaktion ist nicht „anmelden", sondern eine Suche.** „Ist dein Betrieb schon auf Seventi?" ersetzt den Anmelde-Button. Sie löst alle drei Besuchertypen auf: bereits gelistet und per Mail eingeladen, unsicher ob gelistet, sicher nicht gelistet.
2. **Der Nicht-Treffer ist der Hauptweg, kein Fehler.** Bei der aktuellen Datenbankgrösse findet die Suche meistens nichts. Das Ergebnis nimmt den getippten Namen direkt in das Anmeldeformular mit und liest sich als erwarteter nächster Schritt.
3. **Beim Treffer steht offen da, woher das Profil kommt**, aus öffentlich zugänglichen Quellen, und daneben sichtbar „Eintrag entfernen". Der sichtbare Ausgang ist das, was das Angebot glaubwürdig macht, und zugleich unsere Datenschutzposition.

### Was inhaltlich falsch war und korrigiert wurde

| Wo | Alte Aussage | Richtig laut Briefing |
|---|---|---|
| Entwurf A, Headline | „Ohne Provision auf deinen Umsatz" | 10 % Kommission, wenn die Zahlung über Seventi läuft |
| Entwurf A und B | „Profil und Anfragen kostenlos, keine Umsatzbeteiligung" | kostenlos gelistet und Anfragen erhalten, Kommission nur bei Zahlung über die Plattform |
| Entwurf B | „14 Anfragen pro Monat" | keine Anbieter- oder Anfragezahlen nennen |
| Entwurf B und C | „2 Minuten für ein Angebot" | rund zehn Minuten Einrichtung, danach nichts zu pflegen |
| Entwurf C | „6 offen", „letzte 7 Tage", „drei weitere Anfragen" | keine Volumenangaben |
| alle | „Locations und Caterer" | Locations, Catering, DJs, Technik und Fotografie |

### Aufbau der Anbieter-Seite

0. **Gewählt: Richtung A**, Versprechen links, die Anfrage als Produktobjekt rechts. Die Karte füllt sich Feld für Feld, damit sichtbar wird, was vor dem ersten Blick schon feststeht.
1. **Hero**, Kernargument „Die Arbeit kommt zu dir. Schon gefiltert." Rechts eine Beispielanfrage, die zeigt, was vor dem ersten Blick schon feststeht: Datum, Personenzahl, Region, Budget, Kategorien. Darunter die Suche als einzige Hauptaktion.
2. **So läuft es ab**, drei Schritte mit derselben Fortschrittslinie wie auf der Planner-Seite: einrichten, Anfragen per E-Mail, antworten oder ablehnen.
3. **Warum mitmachen**, drei Blöcke à vier Punkte: Bessere Anfragen, Kein Risiko, Kein Aufwand. Der Einwand dahinter ist immer derselbe: noch ein Portal, noch ein Abo, noch ein Postfach.
4. **Was es kostet**, CHF 0 fürs Gelistetsein, 10 % nur bei Zahlung über Seventi, jederzeit wieder raus. Vollständig hingeschrieben statt im Kleingedruckten.
5. **Häufige Fragen**, bewusst kurz: Herkunft der öffentlich erstellten Profile, Ablauf bei einem Auftrag, abgedeckte Regionen und Inhalt eines Profils. Alles andere beantworten die Argumentblöcke schon, und das Briefing will, dass die Seite sich leicht anfühlt statt lang zu erklären. Der Abschnitt steht zweispaltig: Kopf links, aufklappbare Fragen rechts. Ein Hinweis im Kopf hält fest, dass weitere Fragen ergänzt werden, sobald klar ist, welche Anbieter tatsächlich stellen.
6. **Abschluss**, dieselbe Suche noch einmal, dunkler Block.
7. **Footer**, Rechtliches und der Quereinstieg zur Planner-Seite.

### Zum FAQ

Ein FAQ steht in keinem der beiden Briefings. Das Provider-Briefing überlässt den Aufbau ausdrücklich uns („you are free to use your experience and expertise on what you feel is best"), gibt aber eine Richtung vor, die dagegen spricht: Die Antworten auf Kosten, Aufwand und Ausstieg sollen sich in der Seite *anfühlen*, nicht bloss behauptet werden. Ein langes FAQ ist das Gegenteil davon.

Auf der Planner-Seite liegt der Fall anders. Dort fängt Abschnitt 9 Fragen auf, die aus der Rolle der Planerin kommen und sonst nirgends stehen: ob ihr Firmenname für alle sichtbar ist, was passiert, wenn Datum und Personenzahl noch nicht feststehen, und ob sie den Angebotsvergleich als PDF für die interne Freigabe exportieren kann. Das sind echte Absprunggründe, keine Wiederholung, gebaut wird der Abschnitt, sobald Cody die Antworten liefert.

### Offene Punkte

- Das Briefing kündigt **vier Argumentblöcke** an und führt drei aus (Bessere Anfragen, Kein Risiko, Kein Aufwand). Wir haben drei gebaut. Falls ein vierter gemeint war, fehlt er.
- Die Suche ist eine Vorschau ohne Datenbank. Tippt man „Beispiel", erscheint der Trefferfall, alles andere zeigt den Normalfall. Ein Hinweis darauf steht sichtbar unter dem Feld.
- „Jederzeit pausieren" stand in allen drei früheren Entwürfen und ist entfernt. Das Briefing nennt nur „no exclusivity, no minimum, no lock-in" und das Entfernen des Eintrags, eine Pausier-Funktion ist nicht bestätigt.
- Die drei alten Hero-Entwürfe liegen weiterhin im Repository. Sie sind inhaltlich korrigiert, aber ohne den Such-Mechanismus. Sobald die Anbieter-Seite steht, können sie weg.

---

## 8. Beide Seiten verbinden

- Der Footer der Planner-Seite führt zur Provider-Seite, der Footer der Provider-Seite zurück. Das bleibt der einzige Nebenausgang.
- Beide Seiten haben oben rechts eine Sprachwahl DE/EN. Im Raum Zürich, Zug und Luzern arbeiten viele englischsprachige Angestellte in Unternehmen. Der Umschalter ist bisher nur die Oberfläche, die Übersetzungen kommen von Cody.
