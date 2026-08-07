#!/usr/bin/env python3
"""
Baut aus den beiden Live-Seiten flache Fassungen fuer den Figma-Import.

Warum das noetig ist: Die Seiten zeigen beim Laden fast nichts. Alles mit
gestaffeltem Auftritt steht auf opacity 0, die Headline wird per Skript in
einzelne Woerter zerlegt, die mitlaufende Leiste ist ausgeblendet, im
Umschalter liegt ein Feld auf visibility hidden. Ein Import-Plugin nimmt
genau diesen Zustand und liefert halbe Abschnitte als leere Ebenen.

Die flache Fassung nimmt dieselben Dateien, entfernt alle Skripte und legt
eine Regelschicht darueber, die jeden Endzustand fest verdrahtet.

Aufruf aus dem Projektstamm:  python3 figma/bauen.py
"""

import io
import os
import re

STAMM = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FLACH = """
  <style>
    /* ---------- Fassung fuer den Figma-Import ----------
       Kein Skript, kein Auftritt, alles im Endzustand. */

    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }

    /* Auftritt und Einblenden: alles sichtbar */
    .reveal,
    .staffel-teil,
    .hero .mark,
    .hero .lang,
    .hero .eyebrow,
    .hero .lead,
    .hero .visual,
    .hero .such-rahmen,
    .hero .bild-hinweis,
    .price,
    .stapel-karte {
      opacity: 1 !important;
      transform: none !important;
      clip-path: none !important;
      visibility: visible !important;
    }

    /* Die mitlaufende Leiste steht oben in der Seite statt darueber,
       sonst deckt sie im Import den Hero zu. */
    .stange {
      position: static !important;
      transform: none !important;
      visibility: visible !important;
      background: var(--white) !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      box-shadow: none !important;
      border-bottom: 1px solid var(--line) !important;
    }

    /* Fortschrittslinie voll gefuellt */
    .step-grid { --fill: 100% !important; }

    .step .step-index { background: var(--brand) !important; color: var(--ink) !important; }

    /* Gestapelte Karten flach untereinander, sonst liegen sie im Import
       uebereinander und nur die oberste ist zu sehen. */
    .stapel-karte { position: static !important; }

    /* Beide Suchergebnisse untereinander statt uebereinander, damit beide
       Zustaende als eigene Flaeche im Import ankommen. */
    .weg-buehne {
      height: auto !important;
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 40px;
      overflow: visible !important;
    }

    .weg-panel {
      grid-area: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
    }

    .weg-panel > * { opacity: 1 !important; transform: none !important; }

    /* Der Umschalter zeigt im Standbild den ersten Zustand */
    .wege-switch::before { transform: none !important; }

    /* Laufbaender stehen still und zeigen einen vollen Satz */
    .kategorien-lauf,
    .logo-lauf {
      -webkit-mask-image: none !important;
      mask-image: none !important;
      overflow: visible !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
    }

    .kategorien-spur:nth-child(2),
    .logo-spur:nth-child(2) { display: none !important; }

    .kategorien-spur,
    .logo-spur { flex-wrap: wrap !important; justify-content: center !important; }

    /* Bildebene im Hero ohne Versatz */
    .visual-bild { transform: none !important; }

    /* Aufgeklappte Antworten sichtbar machen */
    .faq details > .faq-antwort { height: auto !important; }

    /* Hinweisfahnen sind Hover-Zustaende und stoeren im Import */
    .info b { display: none !important; }
  </style>
"""


def flach_machen(quelle, ziel, bilder_umschreiben=False):
    s = io.open(quelle, encoding="utf-8").read()

    # 1) alle Skripte raus, damit nichts mehr versteckt oder zerlegt wird
    s = re.sub(r"<script\b[^>]*>.*?</script>", "", s, flags=re.S)
    s = re.sub(r"<script\b[^>]*/?>\s*", "", s)

    # 2) Bildpfade eine Ebene tiefer, wenn die Quelle im Stammverzeichnis liegt
    if bilder_umschreiben:
        s = re.sub(r'url\("(?:\./)?(seventi-[a-z0-9-]+\.webp)"\)', r'url("../\1")', s)
        s = re.sub(r'(href|content|src)="(?:\./)?((?:favicon|og-planner)\.(?:svg|png)|seventi-[a-z0-9-]+\.webp)"',
                   r'\1="../\2"', s)

    # 3) alle Fragen aufgeklappt, damit die Antworten im Import stehen
    s = s.replace("<details>", "<details open>")

    # 4) Regelschicht ans Ende des Kopfes
    s = s.replace("</head>", FLACH + "</head>")

    # 5) Suchmaschinen sollen die Importfassung nicht sehen
    s = s.replace('<meta charset="UTF-8" />',
                  '<meta charset="UTF-8" />\n  <meta name="robots" content="noindex, nofollow" />')

    io.open(ziel, "w", encoding="utf-8").write(s)
    return len(s)


if __name__ == "__main__":
    a = flach_machen(os.path.join(STAMM, "anbieter", "index.html"),
                     os.path.join(STAMM, "figma", "anbieter.html"))
    b = flach_machen(os.path.join(STAMM, "index.html"),
                     os.path.join(STAMM, "figma", "planner.html"),
                     bilder_umschreiben=True)
    print("figma/anbieter.html", a, "Zeichen")
    print("figma/planner.html", b, "Zeichen")
