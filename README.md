# Systra Studios × Seventi

Animierter Hero-Entwurf für die Seventi Planner-Landingpage.

## Enthalten

- responsive Desktop- und Mobile-Ansicht
- animiertes Miia-Briefing mit Matching-Ergebnissen
- Hintergrundbild lokal eingebunden
- Manrope und Fraunces über Google Fonts
- keine Build-Tools oder Abhängigkeiten erforderlich

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

