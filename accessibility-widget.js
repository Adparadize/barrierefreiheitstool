/*! 
    Visuell verbessertes Barrierefreiheits-Widget
    - Grid-Layout mit Karten, Icons, Fokus/Hover-Styles
    - Beibehaltung vorhandener Funktionalität (Toggles, TTS, Persistenz)
*/

(function () {
    const STORAGE_KEY = 'adparadizeAccessibility_v1';
    const defaults = {
        toolbarOpen: false,
        textScaleStep: 2,
        highContrast: false,
        nightMode: false,
        blueFilter: false,
        colorBlind: false,
        sansSerif: false,
        dyslexic: false,
        titleHighlight: false,
        linksHighlight: false,
        letterSpacing: false,
        lineHeight: false,
        strongFont: false,
        largeCursor: false,
        readingBar: false,
        hideImages: false,
        pauseAnimations: false
    };

    let settings = Object.assign({}, defaults, loadSettings());
    let speech = { utterance: null, playing: false };

    const style = document.createElement('style');
    style.setAttribute('data-adparadize', 'styles');
    style.textContent = `
/* Container */
#adp-accessibility-toggle { position: fixed; top: 42%; left: 12px; z-index: 2147483000; width:52px; height:52px; border-radius:10px; background: linear-gradient(180deg,#0066cc,#0078d4); display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(2,6,23,0.35); cursor:pointer; }
#adp-accessibility-toggle img { width:28px;height:28px; }

#adp-accessibility-toolbar { position: fixed; top: 12%; left: 80px; z-index: 2147483000; width: 360px; max-height: 76vh; overflow:auto; background: #fff; border-radius: 14px; padding: 14px; box-shadow: 0 20px 50px rgba(2,6,23,0.25); font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#0f172a; font-size:14px; display:flex;flex-direction:column; gap:12px; }

/* Header */
#adp-accessibility-toolbar .header { display:flex; align-items:center; justify-content:space-between; gap:8px; }
#adp-accessibility-toolbar .title { font-weight:600; font-size:16px; }
#adp-accessibility-toolbar .controls { display:flex; gap:6px; align-items:center; }
#adp-accessibility-toolbar .small { color:#64748b; font-size:12px; }

/* Sections */
.adp-section { background: transparent; display:flex; flex-direction:column; gap:8px; }
.adp-section .section-title { font-weight:600; color:#0f172a; font-size:13px; }

/* Grid of cards */
.adp-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; }
.adp-card { display:flex; flex-direction:column; align-items:center; gap:6px; padding:10px; border-radius:10px; background:#f8fafc; border:1px solid rgba(15,23,42,0.04); cursor:pointer; transition: transform .08s, box-shadow .12s, background .12s; min-height:72px; justify-content:center; text-align:center; }
.adp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 18px rgba(2,6,23,0.06); }
.adp-card.active { background: linear-gradient(180deg,#eff6ff,#fff); border-color:#c7e0ff; box-shadow: 0 8px 26px rgba(3,102,214,0.06); }
.adp-card svg { width:22px;height:22px; color:#0f172a; }
.adp-card .label { font-size:12px; color:#0f172a; }

/* Controls row */
.adp-controls { display:flex; gap:8px; align-items:center; }
.adp-controls button { padding:8px 10px; border-radius:8px; background:#eef2ff; border:none; cursor:pointer; }
.adp-reset { background:#000; color:#fff; padding:10px;border-radius:10px;width:100%; }

/* Reading bar & large cursor */
#adp-reading-bar { position: fixed; left: 0; right: 0; height: 48px; pointer-events:none; background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04)); mix-blend-mode:multiply; z-index:2147483000; display:none; }
#adp-large-cursor { position: fixed; pointer-events: none; z-index: 2147483001; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,120,212,0.18); transform: translate(-50%,-50%); border:2px solid rgba(255,255,255,0.9); display:none; }

/* Focus */
#adp-accessibility-toolbar button:focus, .adp-card:focus { outline: 3px solid #ffd54a; outline-offset: 3px; }

/* Dyslexic-friendly font fallback and spacing adjustments */
body.adp-dyslexic * { font-family: 'OpenDyslexic', Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial !important; letter-spacing: 0.02em !important; }

/* Title highlight */
body.adp-title-highlight h1, body.adp-title-highlight h2, body.adp-title-highlight h3, body.adp-title-highlight h4, body.adp-title-highlight h5, body.adp-title-highlight h6 {
    background: linear-gradient(90deg, rgba(255,243,205,0.9), rgba(255,249,230,0.35));
    padding: 4px 8px; border-radius: 6px; display: inline-block;
}

/* Links highlight */
body.adp-links-highlight a { outline: 2px solid rgba(255,191,0,0.14); background: rgba(255,191,0,0.06); border-radius: 4px; padding: 2px 4px; }

/* Letter spacing */
body.adp-letterspacing * { letter-spacing: 0.12em !important; }

/* Line height */
body.adp-lineheight * { line-height: 1.8 !important; }

/* Stronger font weight */
body.adp-strongfont * { font-weight: 600 !important; }

@media (max-width:480px) {
    #adp-accessibility-toolbar { left: 10px; right: 10px; width: auto; top:10%; max-height:80vh; }
    .adp-grid { grid-template-columns: repeat(2, 1fr); }
}
`;
    document.head.appendChild(style);

    const toolbar = document.createElement('div');
    toolbar.id = 'adp-accessibility-toolbar';
    toolbar.setAttribute('role', 'region');
    toolbar.setAttribute('aria-label', 'Barrierefreiheitswerkzeug');

    toolbar.innerHTML = `
        <div class="header">
            <div>
                <div class="title">Barrierefreiheit</div>
                <div class="small">Inhaltsanpassungen und Kontrast</div>
            </div>
            <div class="controls">
                <select id="adp-lang" aria-label="Sprache"><option value="de">Deutsch (German)</option></select>
                <button id="adp-close" aria-label="Schließen" title="Schließen" style="background:transparent;padding:6px;border-radius:8px;">✕</button>
            </div>
        </div>

        <div class="adp-section">
            <div class="section-title">Inhaltsanpassungen</div>
            <div class="adp-grid" role="toolbar" aria-label="Funktionen">
                <div tabindex="0" class="adp-card" id="adp-card-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18M5 20h14M7 8h10"/></svg><div class="label">Titel hervorheben</div></div>
                <div tabindex="0" class="adp-card" id="adp-card-links"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 14a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 6.93"/><path d="M14 10a5 5 0 00-7.07 0L5.52 11.41a5 5 0 007.07 7.07L14 17.07"/></svg><div class="label">Links hervorh.</div></div>
                <div tabindex="0" class="adp-card" id="adp-card-dyslexic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"/><path d="M5 12h14"/></svg><div class="label">Dyslexie-Schrift</div></div>

                <div tabindex="0" class="adp-card" id="adp-card-letterspacing"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 18h18"/></svg><div class="label">Zeichenabstand</div></div>
                <div tabindex="0" class="adp-card" id="adp-card-lineheight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M10 12h4M4 18h16"/></svg><div class="label">Zeilenhöhe</div></div>
                <div tabindex="0" class="adp-card" id="adp-card-fontweight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4h6a2 2 0 012 2v12a2 2 0 01-2 2H6z"/><path d="M14 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2"/></svg><div class="label">Schriftstärke</div></div>
            </div>
        </div>

        <div class="adp-section">
            <div class="section-title">Farbanpassungen</div>
            <div class="adp-grid">
                <div tabindex="0" class="adp-card" id="adp-contrast"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18"/></svg><div class="label">Dunkler Kontrast</div></div>
                <div tabindex="0" class="adp-card" id="adp-night"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg><div class="label">Nacht</div></div>
                <div tabindex="0" class="adp-card" id="adp-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/></svg><div class="label">Blaufilter</div></div>

                <div tabindex="0" class="adp-card" id="adp-colorblind"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg><div class="label">Farbschwäche</div></div>
                <div tabindex="0" class="adp-card" id="adp-sans"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20h16"/><path d="M8 4l4 16 4-16"/></svg><div class="label">Serifenlos</div></div>
                <div tabindex="0" class="adp-card" id="adp-hide-images"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 9l9 6 9-6"/></svg><div class="label">Bilder ausblenden</div></div>
            </div>
        </div>

        <div class="adp-section">
            <div class="section-title">Werkzeuge</div>
            <div class="adp-grid">
                <div tabindex="0" class="adp-card" id="adp-large-cursor-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/></svg><div class="label">Großer Cursor</div></div>
                <div tabindex="0" class="adp-card" id="adp-readingbar-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="4" rx="1"/></svg><div class="label">Leseleiste</div></div>
                <div tabindex="0" class="adp-card" id="adp-pause-anim"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg><div class="label">Animationen</div></div>
            </div>
        </div>

        <div class="adp-section">
            <div class="adp-controls">
                <button id="adp-text-decrease" title="Text verkleinern">−</button>
                <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;">
                    <button id="adp-text-reset" title="Text zurücksetzen">100%</button>
                </div>
                <button id="adp-text-increase" title="Text vergrößern">+</button>
            </div>
        </div>

        <div style="display:flex;gap:8px;margin-top:6px;">
            <button id="adp-reset" class="adp-reset" title="Einstellungen zurücksetzen">Einstellungen zurücksetzen</button>
        </div>

        <div style="text-align:center;margin-top:6px;color:#64748b;font-size:12px;">Shortcut: Alt+Shift+A öffnen/schließen</div>
    `;

    toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none';
    document.body.appendChild(toolbar);

    const toggle = document.createElement('button');
    toggle.id = 'adp-accessibility-toggle';
    toggle.setAttribute('aria-label', 'Barrierefreiheit öffnen');
    toggle.title = 'Barrierefreiheit öffnen (Alt+Shift+A)';
    toggle.innerHTML = '<img src="data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;28&quot; height=&quot;28&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;white&quot;><path d=&quot;M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92c-.46.47-.59.86-.59 1.58V13h-2v-.25c0-1.1.45-1.99 1.17-2.71l1.24-1.27A1.993 1.993 0 0012 6c-1.1 0-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z&quot;/></svg>';
    document.body.appendChild(toggle);

    const largeCursor = document.createElement('div');
    largeCursor.id = 'adp-large-cursor';
    largeCursor.style.display = settings.largeCursor ? 'block' : 'none';
    document.body.appendChild(largeCursor);

    const readingBar = document.createElement('div');
    readingBar.id = 'adp-reading-bar';
    readingBar.style.display = settings.readingBar ? 'block' : 'none';
    document.body.appendChild(readingBar);

    // helper to map card id -> state toggle function
    function setActive(el, active) { el.classList.toggle('active', !!active); }

    // wire up card elements
    const map = {
        'adp-contrast': { el: null, toggle: toggleHighContrast, stateKey: 'highContrast' },
        'adp-night': { el: null, toggle: toggleNightMode, stateKey: 'nightMode' },
        'adp-blue': { el: null, toggle: toggleBlueFilter, stateKey: 'blueFilter' },
        'adp-colorblind': { el: null, toggle: toggleColorBlind, stateKey: 'colorBlind' },
        'adp-sans': { el: null, toggle: toggleSansSerif, stateKey: 'sansSerif' },
        'adp-hide-images': { el: null, toggle: toggleHideImages, stateKey: 'hideImages' },
        'adp-large-cursor-toggle': { el: null, toggle: toggleLargeCursor, stateKey: 'largeCursor' },
        'adp-readingbar-toggle': { el: null, toggle: toggleReadingBar, stateKey: 'readingBar' },
        'adp-pause-anim': { el: null, toggle: togglePauseAnimations, stateKey: 'pauseAnimations' },
        'adp-card-dyslexic': { el: null, toggle: toggleDyslexic, stateKey: 'dyslexic' },
        'adp-card-title': { el: null, toggle: toggleTitleHighlight, stateKey: 'titleHighlight' },
        'adp-card-links': { el: null, toggle: toggleLinksHighlight, stateKey: 'linksHighlight' },
        'adp-card-letterspacing': { el: null, toggle: toggleLetterSpacing, stateKey: 'letterSpacing' },
        'adp-card-lineheight': { el: null, toggle: toggleLineHeight, stateKey: 'lineHeight' },
        'adp-card-fontweight': { el: null, toggle: toggleStrongFont, stateKey: 'strongFont' }
    };

    Object.keys(map).forEach(id => { const el = toolbar.querySelector('#'+id); if (el) map[id].el = el; });

    // attach clicks
    Object.keys(map).forEach(id => {
        const entry = map[id];
        if (!entry.el) return;
        entry.el.addEventListener('click', () => {
            if (entry.toggle) entry.toggle();
            if (entry.stateKey) setActive(entry.el, settings[entry.stateKey]);
        });
        entry.el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); entry.el.click(); } });
    });

    // other UI buttons
    toolbar.querySelector('#adp-close').addEventListener('click', () => { settings.toolbarOpen = false; toolbar.style.display = 'none'; saveSettings(); });
    toggle.addEventListener('click', () => { settings.toolbarOpen = !settings.toolbarOpen; toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none'; saveSettings(); });

    toolbar.querySelector('#adp-text-increase').addEventListener('click', () => changeTextScale(1));
    toolbar.querySelector('#adp-text-decrease').addEventListener('click', () => changeTextScale(-1));
    toolbar.querySelector('#adp-text-reset').addEventListener('click', () => resetTextScale());
    toolbar.querySelector('#adp-reset').addEventListener('click', () => resetAllSettings());

    // keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); settings.toolbarOpen = !settings.toolbarOpen; toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none'; saveSettings();
        }
    });

    document.addEventListener('keydown', function onKeyDown(e) { if (e.key === 'Tab') document.documentElement.classList.add('adp-keyboard'); });

    // pointer tracking
    document.addEventListener('mousemove', (e) => {
        if (settings.largeCursor) {
            largeCursor.style.display = 'block';
            largeCursor.style.left = e.clientX + 'px';
            largeCursor.style.top = e.clientY + 'px';
        }
        if (settings.readingBar) {
            readingBar.style.display = 'block';
            const h = Math.max(28, Math.min(96, window.innerHeight * 0.08));
            readingBar.style.height = h + 'px';
            const top = Math.max(0, e.clientY - h / 2);
            readingBar.style.top = top + 'px';
        }
    });

    document.addEventListener('mouseleave', () => { if (settings.largeCursor) largeCursor.style.display = 'none'; });

    document.addEventListener('keydown', (e) => {
        if (!settings.readingBar) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); const step = Math.max(20, Math.round(window.innerHeight * 0.05)); const currentTop = parseInt(readingBar.style.top || '0', 10); readingBar.style.top = (e.key === 'ArrowDown' ? currentTop + step : currentTop - step) + 'px';
        }
    });

    // TTS (kept minimal)
    function startTTS() { stopTTS(); const sel = window.getSelection().toString().trim(); const text = sel || document.querySelector('main')?.innerText || document.body.innerText; if (!text) return; speech.utterance = new SpeechSynthesisUtterance(text); speech.utterance.lang = detectLanguage(text) || navigator.language || 'de-DE'; speech.utterance.rate = 1; speech.utterance.onend = () => { speech.playing = false; }; speechSynthesis.speak(speech.utterance); speech.playing = true; }
    function pauseTTS() { if (speechSynthesis.speaking) { if (speechSynthesis.paused) speechSynthesis.resume(); else speechSynthesis.pause(); } }
    function stopTTS() { if (speechSynthesis.speaking || speechSynthesis.paused) speechSynthesis.cancel(); speech.playing = false; speech.utterance = null; }

    // toggles
    function toggleHighContrast() { settings.highContrast = !settings.highContrast; applyClasses(); saveSettings(); }
    function toggleNightMode() { settings.nightMode = !settings.nightMode; applyClasses(); saveSettings(); }
    function toggleBlueFilter() { settings.blueFilter = !settings.blueFilter; applyClasses(); saveSettings(); }
    function toggleColorBlind() { settings.colorBlind = !settings.colorBlind; applyClasses(); saveSettings(); }
    function toggleSansSerif() { settings.sansSerif = !settings.sansSerif; applyClasses(); saveSettings(); }
    function toggleDyslexic() { settings.dyslexic = !settings.dyslexic; if (settings.dyslexic) _ensureDyslexicFontLoaded(); applyClasses(); saveSettings(); }
    function _ensureDyslexicFontLoaded() {
        if (document.getElementById('adp-open-dyslexic')) return;
        try {
            const l = document.createElement('link');
            l.id = 'adp-open-dyslexic';
            l.rel = 'stylesheet';
            l.href = 'https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic@master/OpenDyslexic.css';
            l.crossOrigin = 'anonymous';
            document.head.appendChild(l);
        } catch (e) {
            // fail silently; CSS fallback will still apply
        }
    }
    function toggleTitleHighlight() { settings.titleHighlight = !settings.titleHighlight; applyClasses(); saveSettings(); }
    function toggleLinksHighlight() { settings.linksHighlight = !settings.linksHighlight; applyClasses(); saveSettings(); }
    function toggleLetterSpacing() { settings.letterSpacing = !settings.letterSpacing; applyClasses(); saveSettings(); }
    function toggleLineHeight() { settings.lineHeight = !settings.lineHeight; applyClasses(); saveSettings(); }
    function toggleStrongFont() { settings.strongFont = !settings.strongFont; applyClasses(); saveSettings(); }
    function toggleLargeCursor() { settings.largeCursor = !settings.largeCursor; largeCursor.style.display = settings.largeCursor ? 'block' : 'none'; applyClasses(); saveSettings(); }
    function toggleReadingBar() { settings.readingBar = !settings.readingBar; readingBar.style.display = settings.readingBar ? 'block' : 'none'; saveSettings(); }
    function toggleHideImages() { settings.hideImages = !settings.hideImages; applyClasses(); saveSettings(); }
    function togglePauseAnimations() { settings.pauseAnimations = !settings.pauseAnimations; applyClasses(); saveSettings(); }

    function changeTextScale(dir) { settings.textScaleStep = Math.max(0, Math.min(8, (settings.textScaleStep || 2) + dir)); applyTextScale(); saveSettings(); }
    function resetTextScale() { settings.textScaleStep = 2; applyTextScale(); saveSettings(); }
    function resetAllSettings() { settings = Object.assign({}, defaults); applyAll(); saveSettings(); stopTTS(); }

    function applyTextScale() { const percent = 80 + (settings.textScaleStep * 10); document.documentElement.style.fontSize = percent + '%'; document.querySelectorAll('input, textarea, select, button').forEach((el) => { el.style.fontSize = Math.min(18, Math.max(12, Math.round(percent / 10))) + 'px'; }); }

    function applyClasses() {
        document.body.classList.toggle('adp-high-contrast', settings.highContrast);
        document.body.classList.toggle('adp-night', settings.nightMode);
        document.body.classList.toggle('adp-blue-filter', settings.blueFilter);
        document.body.classList.toggle('adp-colorblind', settings.colorBlind);
        document.body.classList.toggle('adp-sans', settings.sansSerif);
        document.body.classList.toggle('adp-dyslexic', settings.dyslexic);
        document.body.classList.toggle('adp-title-highlight', settings.titleHighlight);
        document.body.classList.toggle('adp-links-highlight', settings.linksHighlight);
        document.body.classList.toggle('adp-letterspacing', settings.letterSpacing);
        document.body.classList.toggle('adp-lineheight', settings.lineHeight);
        document.body.classList.toggle('adp-strongfont', settings.strongFont);
        document.body.classList.toggle('adp-hide-images', settings.hideImages);
        document.body.classList.toggle('adp-pause-anim', settings.pauseAnimations);
    }

    function applyAll() { applyClasses(); applyTextScale(); toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none'; largeCursor.style.display = settings.largeCursor ? 'block' : 'none'; readingBar.style.display = settings.readingBar ? 'block' : 'none'; updateCardStates(); }

    function updateCardStates() {
        Object.keys(map).forEach(id => { const entry = map[id]; if (!entry.el) return; if (entry.stateKey) setActive(entry.el, settings[entry.stateKey]); });
    }

    function saveSettings() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) {} }
    function loadSettings() { try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return {}; return JSON.parse(raw); } catch (e) { return {}; } }
    function detectLanguage(text) { if (/[äöüß]/i.test(text)) return 'de-DE'; if (/[àéèêîô]/i.test(text)) return 'fr-FR'; return null; }

    applyAll();

    // make toolbar keyboard accessible
    function makeFocusable(root) { root.querySelectorAll('button, [href], input, select, textarea, [role="button"], [tabindex]').forEach((el) => { if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0'); }); }
    makeFocusable(toolbar);

})();


