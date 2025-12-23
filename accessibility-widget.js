/*!
    Barrierefreiheits-Widget (Einbettbares Skript)
    Unterstützt: TYPO3, Squarespace, WordPress (einfaches <script src="..."> einbinden)
    Features (DE):
    - Adaptive Schriftvergrößerung, vergrößerter Mauszeiger, serifenlose Schriften, Leseleiste, Text-to-Speech
    - Kontrastmodi (inkl. Nacht), Blaufilter, Farbsehschwäche-Modus, Bilder/Animationen ausblenden
    - Vollständige Tastaturnavigation, Steuerung von Audio/Animationen, Einstellungen speichern
*/

(function () {
    const STORAGE_KEY = 'adparadizeAccessibility_v1';
    const defaults = {
        toolbarOpen: false,
        textScaleStep: 2, // 0..8 -> ~80%..160%
        highContrast: false,
        nightMode: false,
        blueFilter: false,
        colorBlind: false,
        sansSerif: false,
        largeCursor: false,
        readingBar: false,
        hideImages: false,
        pauseAnimations: false
    };

    // state
    let settings = Object.assign({}, defaults, loadSettings());
    let speech = { utterance: null, playing: false };

    // inject styles and toolbar
    const style = document.createElement('style');
    style.setAttribute('data-adparadize', 'styles');
    style.textContent = `
/* Basis-UI */
#adp-accessibility-toggle {
    position: fixed; top: 42%; left: 8px; z-index: 2147483000;
    width: 52px; height: 52px; border-radius: 8px;
    background: #0078d4; display:flex; align-items:center; justify-content:center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.25); cursor: pointer;
}
#adp-accessibility-toggle img { width: 28px; height: 28px; pointer-events:none; }
#adp-accessibility-toolbar {
    position: fixed; top: 36%; left: 70px; z-index: 2147483000;
    background: #fff; border-radius: 10px; padding: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.25);
    display: flex; flex-direction: column; gap:8px; min-width: 220px;
    font-family: Arial, Helvetica, sans-serif; font-size: 14px;
}
#adp-accessibility-toolbar button {
    display:flex; gap:8px; align-items:center; padding:8px; border-radius:6px;
    border: none; background:#f3f4f6; cursor:pointer; text-align:left;
}
#adp-accessibility-toolbar button:focus { outline: 3px solid #ffcc00; outline-offset: 2px; }
#adp-accessibility-toolbar .row { display:flex; gap:8px; flex-wrap:wrap; }
#adp-accessibility-toolbar small { color:#666; display:block; margin-top:6px; font-size:12px; }

/* Accessibility classes applied to body/html */
html.adp-text-scale { font-size: 100%; }
body.adp-high-contrast { background:#000 !important; color:#fff !important; filter: none !important; }
body.adp-night { background:#0b0b0b !important; color:#e5e7eb !important; filter: none !important; }
body.adp-blue-filter { filter: sepia(0.08) saturate(0.9) hue-rotate(200deg) brightness(0.95); }
body.adp-colorblind { filter: grayscale(0.05) contrast(1.05) saturate(0.8); }

/* Sans serif */
body.adp-sans * { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial !important; }

/* Hide images */
body.adp-hide-images img, body.adp-hide-images picture, body.adp-hide-images video { visibility: hidden !important; opacity: 0 !important; }

/* Pause animations */
body.adp-pause-anim *, body.adp-pause-anim *::before, body.adp-pause-anim *::after {
    animation-play-state: paused !important;
    transition-duration: 0s !important;
}

/* Focus outline for keyboard */
.adp-focus-visible:focus { outline: 3px solid #ffcc00 !important; outline-offset: 2px; }

/* Large cursor element */
#adp-large-cursor {
    position: fixed; pointer-events: none; z-index: 2147483001;
    width: 28px; height: 28px; border-radius: 50%; background: rgba(0,120,212,0.35);
    transform: translate(-50%, -50%); mix-blend-mode: multiply; transition: width .12s,height .12s,background .12s;
    border: 2px solid rgba(255,255,255,0.9);
}

/* Reading bar (Leseleiste) */
#adp-reading-bar {
    position: fixed; left: 0; right: 0; height: 42px; pointer-events: none;
    background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05));
    mix-blend-mode: multiply; z-index: 2147483000; display:none;
}

/* Simple responsive adjustments */
@media (max-width:420px) {
    #adp-accessibility-toolbar { left: 62px; min-width: 180px; padding:8px; }
}
`;

    document.head.appendChild(style);

    // toolbar HTML
    const toolbar = document.createElement('div');
    toolbar.id = 'adp-accessibility-toolbar';
    toolbar.setAttribute('role', 'region');
    toolbar.setAttribute('aria-label', 'Barrierefreiheitswerkzeug');
    toolbar.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>Barrierefreiheit</strong>
            <button id="adp-close" aria-label="Schließen" title="Schließen" style="background:transparent;padding:4px;border-radius:6px;">✕</button>
        </div>
        <div class="row" role="toolbar" aria-label="Funktionen">
            <button id="adp-contrast" title="Kontrast umschalten">Kontrast</button>
            <button id="adp-night" title="Nachtmodus">Nacht</button>
            <button id="adp-blue" title="Blaufilter">Blaufilter</button>
            <button id="adp-colorblind" title="Farbschwäche-Modus">Farbschw.</button>
            <button id="adp-sans" title="Serifenlose Schrift">Serifenlos</button>
        </div>
        <div class="row">
            <button id="adp-text-decrease" title="Text verkleinern">Text −</button>
            <button id="adp-text-reset" title="Text zurücksetzen">Text 100%</button>
            <button id="adp-text-increase" title="Text vergrößern">Text +</button>
        </div>
        <div class="row">
            <button id="adp-large-cursor-toggle" title="Großer Mauszeiger">Großer Zeiger</button>
            <button id="adp-readingbar-toggle" title="Leseleiste">Leseleiste</button>
            <button id="adp-hide-images" title="Bilder ausblenden">Bilder</button>
            <button id="adp-pause-anim" title="Animationen anhalten">Animationen</button>
        </div>
        <div class="row">
            <button id="adp-tts-start" title="Vorlesen starten">Vorlesen</button>
            <button id="adp-tts-pause" title="Vorlesen pausieren">Pause</button>
            <button id="adp-tts-stop" title="Vorlesen stoppen">Stop</button>
        </div>
        <div style="display:flex;gap:8px;margin-top:6px;">
            <button id="adp-reset" title="Einstellungen zurücksetzen" style="flex:1;background:#ffefef;color:#900;">Zurücksetzen</button>
        </div>
        <small>Shortcut: Alt+Shift+A öffnen/schließen · Pfeiltasten/Leseleiste per Maus</small>
    `;
    toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none';
    document.body.appendChild(toolbar);

    // toggle button
    const toggle = document.createElement('button');
    toggle.id = 'adp-accessibility-toggle';
    toggle.setAttribute('aria-label', 'Barrierefreiheit öffnen');
    toggle.title = 'Barrierefreiheit öffnen (Alt+Shift+A)';
    toggle.innerHTML = '<img src="data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;28&quot; height=&quot;28&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;white&quot;><path d=&quot;M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92c-.46.47-.59.86-.59 1.58V13h-2v-.25c0-1.1.45-1.99 1.17-2.71l1.24-1.27A1.993 1.993 0 0012 6c-1.1 0-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z&quot;/></svg>' ;
    document.body.appendChild(toggle);

    // large cursor element
    const largeCursor = document.createElement('div');
    largeCursor.id = 'adp-large-cursor';
    largeCursor.style.display = settings.largeCursor ? 'block' : 'none';
    document.body.appendChild(largeCursor);

    // reading bar
    const readingBar = document.createElement('div');
    readingBar.id = 'adp-reading-bar';
    readingBar.style.display = settings.readingBar ? 'block' : 'none';
    document.body.appendChild(readingBar);

    // attach event listeners
    toggle.addEventListener('click', () => {
        settings.toolbarOpen = !settings.toolbarOpen;
        toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none';
        saveSettings();
    });

    toolbar.querySelector('#adp-close').addEventListener('click', () => {
        settings.toolbarOpen = false;
        toolbar.style.display = 'none';
        saveSettings();
    });

    toolbar.querySelector('#adp-contrast').addEventListener('click', toggleHighContrast);
    toolbar.querySelector('#adp-night').addEventListener('click', toggleNightMode);
    toolbar.querySelector('#adp-blue').addEventListener('click', toggleBlueFilter);
    toolbar.querySelector('#adp-colorblind').addEventListener('click', toggleColorBlind);
    toolbar.querySelector('#adp-sans').addEventListener('click', toggleSansSerif);

    toolbar.querySelector('#adp-text-increase').addEventListener('click', () => changeTextScale(1));
    toolbar.querySelector('#adp-text-decrease').addEventListener('click', () => changeTextScale(-1));
    toolbar.querySelector('#adp-text-reset').addEventListener('click', () => resetTextScale());

    toolbar.querySelector('#adp-large-cursor-toggle').addEventListener('click', toggleLargeCursor);
    toolbar.querySelector('#adp-readingbar-toggle').addEventListener('click', toggleReadingBar);
    toolbar.querySelector('#adp-hide-images').addEventListener('click', toggleHideImages);
    toolbar.querySelector('#adp-pause-anim').addEventListener('click', togglePauseAnimations);

    toolbar.querySelector('#adp-tts-start').addEventListener('click', startTTS);
    toolbar.querySelector('#adp-tts-pause').addEventListener('click', pauseTTS);
    toolbar.querySelector('#adp-tts-stop').addEventListener('click', stopTTS);

    toolbar.querySelector('#adp-reset').addEventListener('click', resetAllSettings);

    // keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            settings.toolbarOpen = !settings.toolbarOpen;
            toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none';
            saveSettings();
        }
    });

    // focus visible polyfill for keyboard navigation
    document.addEventListener('keydown', function onKeyDown(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('adp-keyboard');
        }
    });

    // pointer tracking for large cursor and reading bar
    document.addEventListener('mousemove', (e) => {
        if (settings.largeCursor) {
            largeCursor.style.display = 'block';
            largeCursor.style.left = e.clientX + 'px';
            largeCursor.style.top = e.clientY + 'px';
            largeCursor.style.width = '36px';
            largeCursor.style.height = '36px';
            largeCursor.style.background = 'rgba(0,120,212,0.25)';
        }
        if (settings.readingBar) {
            readingBar.style.display = 'block';
            const h = Math.max(28, Math.min(96, window.innerHeight * 0.08));
            readingBar.style.height = h + 'px';
            const top = Math.max(0, e.clientY - h / 2);
            readingBar.style.top = top + 'px';
        }
    });

    // hide large cursor when pointer leaves
    document.addEventListener('mouseleave', () => {
        if (settings.largeCursor) largeCursor.style.display = 'none';
    });

    // reading bar keyboard control (up/down)
    document.addEventListener('keydown', (e) => {
        if (!settings.readingBar) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const step = Math.max(20, Math.round(window.innerHeight * 0.05));
            const currentTop = parseInt(readingBar.style.top || '0', 10);
            readingBar.style.top = (e.key === 'ArrowDown' ? currentTop + step : currentTop - step) + 'px';
        }
    });

    // TTS helpers
    function startTTS() {
        stopTTS();
        const sel = window.getSelection().toString().trim();
        const text = sel || document.querySelector('main')?.innerText || document.body.innerText;
        if (!text) return;
        speech.utterance = new SpeechSynthesisUtterance(text);
        speech.utterance.lang = detectLanguage(text) || navigator.language || 'de-DE';
        speech.utterance.rate = 1;
        speech.utterance.onend = () => { speech.playing = false; };
        speechSynthesis.speak(speech.utterance);
        speech.playing = true;
    }

    function pauseTTS() {
        if (speechSynthesis.speaking) {
            if (speechSynthesis.paused) speechSynthesis.resume();
            else speechSynthesis.pause();
        }
    }

    function stopTTS() {
        if (speechSynthesis.speaking || speechSynthesis.paused) {
            speechSynthesis.cancel();
        }
        speech.playing = false;
        speech.utterance = null;
    }

    // toggles and state modifications
    function toggleHighContrast() { settings.highContrast = !settings.highContrast; applyClasses(); saveSettings(); }
    function toggleNightMode() { settings.nightMode = !settings.nightMode; applyClasses(); saveSettings(); }
    function toggleBlueFilter() { settings.blueFilter = !settings.blueFilter; applyClasses(); saveSettings(); }
    function toggleColorBlind() { settings.colorBlind = !settings.colorBlind; applyClasses(); saveSettings(); }
    function toggleSansSerif() { settings.sansSerif = !settings.sansSerif; applyClasses(); saveSettings(); }

    function toggleLargeCursor() {
        settings.largeCursor = !settings.largeCursor;
        largeCursor.style.display = settings.largeCursor ? 'block' : 'none';
        applyClasses();
        saveSettings();
    }

    function toggleReadingBar() {
        settings.readingBar = !settings.readingBar;
        readingBar.style.display = settings.readingBar ? 'block' : 'none';
        saveSettings();
    }

    function toggleHideImages() {
        settings.hideImages = !settings.hideImages;
        applyClasses();
        saveSettings();
    }

    function togglePauseAnimations() {
        settings.pauseAnimations = !settings.pauseAnimations;
        applyClasses();
        saveSettings();
    }

    function changeTextScale(dir) {
        settings.textScaleStep = Math.max(0, Math.min(8, (settings.textScaleStep || 2) + dir));
        applyTextScale();
        saveSettings();
    }

    function resetTextScale() {
        settings.textScaleStep = 2;
        applyTextScale();
        saveSettings();
    }

    function resetAllSettings() {
        settings = Object.assign({}, defaults);
        applyAll();
        saveSettings();
        stopTTS();
    }

    // apply text scale
    function applyTextScale() {
        // steps 0..8 => 80%..160%
        const percent = 80 + (settings.textScaleStep * 10);
        document.documentElement.style.fontSize = percent + '%';
        // small additional increase for buttons/inputs
        document.querySelectorAll('input, textarea, select, button').forEach((el) => {
            el.style.fontSize = Math.min(18, Math.max(12, Math.round(percent / 10))) + 'px';
        });
    }

    // apply classes
    function applyClasses() {
        document.body.classList.toggle('adp-high-contrast', settings.highContrast);
        document.body.classList.toggle('adp-night', settings.nightMode);
        document.body.classList.toggle('adp-blue-filter', settings.blueFilter);
        document.body.classList.toggle('adp-colorblind', settings.colorBlind);
        document.body.classList.toggle('adp-sans', settings.sansSerif);
        document.body.classList.toggle('adp-hide-images', settings.hideImages);
        document.body.classList.toggle('adp-pause-anim', settings.pauseAnimations);
        // large cursor handled separately
    }

    function applyAll() {
        applyClasses();
        applyTextScale();
        toolbar.style.display = settings.toolbarOpen ? 'flex' : 'none';
        largeCursor.style.display = settings.largeCursor ? 'block' : 'none';
        readingBar.style.display = settings.readingBar ? 'block' : 'none';
    }

    // persistence
    function saveSettings() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) { /* ignore */ }
    }
    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            return JSON.parse(raw);
        } catch (e) { return {}; }
    }

    // simple language detection fallback
    function detectLanguage(text) {
        // naive: check for common German characters
        if (/[äöüß]/i.test(text)) return 'de-DE';
        if (/[àéèêîô]/i.test(text)) return 'fr-FR';
        return null;
    }

    // Initialize
    applyAll();

    // Accessibility: add tabindex to interactive elements so keyboard can reach them
    function makeFocusable(root) {
        root.querySelectorAll('button, [href], input, select, textarea, [role="button"]').forEach((el) => {
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
            el.classList.add('adp-focus-visible');
        });
    }
    makeFocusable(toolbar);
})();
