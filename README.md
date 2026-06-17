# Adparadize Accessibility Widget

Ein professionelles Barrierefreiheits-Widget für Websites — einfach einbinden, für jeden Kunden konfigurierbar.

## Schnellstart

```html
<!-- Vor dem schließenden </body>-Tag einfügen -->
<script
  src="https://cdn.jsdelivr.net/gh/Adparadize/barrierefreiheitstool@main/accessibility-widget.js"
  data-lang="de"
  data-statement="https://www.deine-firma.de/barrierefreiheit"
></script>
```

Das war's. Das Widget erscheint unten links als schwarzer Button.

---

## Konfiguration per data-Attribut

Alle Optionen werden direkt am `<script>`-Tag gesetzt — kein JavaScript nötig.

| Attribut | Beschreibung | Standardwert |
|---|---|---|
| `data-lang` | Sprache der Benutzeroberfläche | `de` |
| `data-position` | Position des Buttons | `bottom-left` |
| `data-statement` | URL der Barrierefreiheitserklärung | *(Adparadize-URL)* |
| `data-brand-link` | Link hinter dem Branding im Footer | `https://adparadize.com` |
| `data-brand-label` | Text des Branding-Links im Footer | `Adparadize Accessibility` |
| `data-hide-brand` | Branding ausblenden (`true` / `false`) | `false` |
| `data-primary-color` | Akzentfarbe des Widgets | `#000000` |
| `data-offset` | Abstand vom Rand in px (x,y) | `20,25` |

### Beispiel — Kundeninstallation mit eigener Erklärung

```html
<script
  src="https://cdn.jsdelivr.net/gh/Adparadize/barrierefreiheitstool@main/accessibility-widget.js"
  data-lang="de"
  data-position="bottom-right"
  data-statement="https://www.muster-gmbh.de/barrierefreiheit"
  data-brand-link="https://adparadize.com"
  data-brand-label="Powered by Adparadize"
></script>
```

### Beispiel — Ohne Adparadize-Branding

```html
<script
  src="https://cdn.jsdelivr.net/gh/Adparadize/barrierefreiheitstool@main/accessibility-widget.js"
  data-lang="de"
  data-statement="https://www.muster-gmbh.de/barrierefreiheit"
  data-hide-brand="true"
></script>
```

---

## Positionierung

| Wert | Position |
|---|---|
| `bottom-left` | Unten links *(Standard)* |
| `bottom-right` | Unten rechts |
| `top-left` | Oben links |
| `top-right` | Oben rechts |
| `bottom-center` | Unten Mitte |
| `top-center` | Oben Mitte |
| `center-left` | Mitte links |
| `center-right` | Mitte rechts |

---

## Funktionen

### Inhaltsanpassungen
- Schriftgröße (stufenlos)
- Zeilenhöhe
- Buchstabenabstand
- Schriftstärke
- Dyslexie-Schrift (OpenDyslexic)
- Links hervorheben
- Überschriften hervorheben

### Farbmodi
- Dunkler Kontrast
- Heller Kontrast
- Hoher Kontrast
- Hohe Sättigung
- Niedrige Sättigung
- Monochrom
- Protanopie / Deuteranopie / Tritanopie

### Navigation & Hilfsmittel
- Screenreader (Web Speech API)
- Leseguide
- Großer Cursor
- Animationen stoppen
- Bilder ausblenden
- Bild-Tooltips
- Super-Fokus
- PDF-Reader
- Seitenstruktur (Headings, Landmarks, Links)

### Profile
- Anfallssicher
- Blind
- Sehbehindert
- ADHS-freundlich
- Kognitiv & Lernen
- Motorisch eingeschränkt

### Weitere Features
- 50+ Sprachen
- Einstellungen werden gespeichert (localStorage / Cookie-Fallback)
- Vollständig responsiv (Mobile-optimiert)
- ARIA-konform

---

## Barrierefreiheitserklärung

Das Widget verlinkt im Footer auf eine Barrierefreiheitserklärung. Diese Seite muss auf der Website des Kunden existieren.

Vorlage: [adparadize.com/accessibility-statement](https://adparadize.com/accessibility-statement/)

---

## Konfigurator

Öffne `index.html` im Browser für einen visuellen Konfigurator mit Live-Vorschau und Einbindungscode-Generator.

---

## CDN-Link

```
https://cdn.jsdelivr.net/gh/Adparadize/barrierefreiheitstool@main/accessibility-widget.js
```

Immer die neueste Version. Kostenlos. Kein Account erforderlich.

---

## Lizenz

© 2026 Adparadize, Passau. Alle Rechte vorbehalten.
