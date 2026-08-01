# Systra Studios × Seventi

Entwürfe für die Seventi Landingpages.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Planner-Seite: Hero, Abschnitte 2, 3, 5, Abschluss und Footer |
| `KONZEPT.md` | Konzept der kompletten Planner-Seite: Abschnitte, Inhalte, offene Punkte |
| `anbieter/index.html` | Provider-Seite: Suche, Argumente, Kosten, Fragen, Abschluss |
| `provider.html` | Weiterleitung auf `anbieter/` |
| `entwuerfe.html` | Übersicht mit Links auf alle Entwürfe |
| `lenis.min.js` | Lenis 1.1.20, mitgeliefert statt über ein CDN geladen |

Zahlen und Firmenangaben in den Entwürfen sind Platzhalter. Die Bilder stammen von Seventi.

## Enthalten

- responsive Desktop- (1440 px) und Mobile-Ansicht (390 px)
- animiertes Miia-Briefing mit Matching-Ergebnissen
- gemeinsames Design-System für Planner- und Provider-Seite
- Manrope und Fraunces über Google Fonts
- sanftes Scrollen über Lenis, mitgeliefert und ohne externe Anfrage
- keine Build-Tools erforderlich

## Lokal ansehen

Die `index.html` kann direkt im Browser geöffnet werden. Alternativ im Projektordner:

```bash
python3 -m http.server 8080
```

Danach `http://localhost:8080` öffnen.

## Deployment

### GitHub Pages

1. Den Inhalt dieses Ordners in ein neues GitHub-Repository hochladen.
2. Unter **Settings → Pages → Build and deployment** bei **Source** die Option **GitHub Actions** wählen.
3. Der enthaltene Workflow veröffentlicht die Seite nach jedem Push auf `main`.

### Vercel

Das Repository in Vercel importieren. Es ist kein Framework-Preset und kein Build-Befehl nötig.

### Netlify

Das Repository in Netlify importieren. Die enthaltene `netlify.toml` veröffentlicht den Repository-Root direkt.

## Vor Übergabe an die Entwicklung

Der CTA führt derzeit auf `https://www.seventi.com/`. Sobald die endgültige Registrierungs-URL feststeht, den Wert im `href` des Elements mit der Klasse `.cta` ersetzen.

