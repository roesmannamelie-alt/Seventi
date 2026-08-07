# Fassungen für den Figma-Import

`anbieter.html` und `planner.html` sind flache Kopien der beiden Live-Seiten.
Gleiche Gestaltung, gleiche Inhalte, aber ohne Skript und ohne Bewegung.

## Warum es sie gibt

Die Live-Seiten zeigen beim Laden fast nichts. Import-Plugins nehmen genau
diesen Zustand ab und liefern halbe Abschnitte als leere Ebenen:

| Auf der Live-Seite | In der Importfassung |
|---|---|
| Abschnittsköpfe, Karten, Fragen starten auf `opacity: 0` | alles sichtbar |
| Die Headline im Hero wird per Skript in einzelne Wörter zerlegt | ein Textfeld |
| Die mitlaufende Leiste liegt fix über der Seite und ist ausgeblendet | steht als normale Zeile ganz oben |
| Im Suchergebnis liegt ein Zustand auf `visibility: hidden` | beide Zustände untereinander |
| Die vier Karten in „Warum mitmachen" stapeln sich beim Scrollen | flach untereinander |
| Die Fortschrittslinie füllt sich beim Scrollen | voll gefüllt |
| Kategorien und Logos laufen als Endlosband | ein Satz, umgebrochen |
| Alle Fragen im FAQ sind zu | alle offen, damit die Antworten im Import stehen |
| Hinweisfahnen erscheinen beim Hover | ausgeblendet, sie lägen sonst über dem Inhalt |

## Neu bauen

Die Dateien werden erzeugt, nicht von Hand gepflegt. Nach jeder Änderung an
den Live-Seiten:

```
python3 figma/bauen.py
```

Von Hand hier hineinschreiben lohnt nicht, der nächste Lauf überschreibt es.

## Hinweise

- Beide Dateien tragen `noindex, nofollow` und stehen in `robots.txt`.
- Die Bilder liegen weiterhin im Stammverzeichnis, die Pfade zeigen mit `../`
  dorthin. Beim Import muss der Ordner also mitsamt Bildern erreichbar sein.
- Der Import bringt keine Zustände mit: Hover, Fokus und die Suche mit ihren
  zwei Ergebnissen sind im Standbild nicht abgebildet. Was davon im Design
  gebraucht wird, entsteht in Figma als eigene Variante.
