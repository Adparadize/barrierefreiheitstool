<!-- ============================================================
     ADPARADIZE ACCESSIBILITY WIDGET v1.1
     Squarespace / WordPress / Wix / Webflow / Typo3 kompatibel
     Einbau: Kurz vor </body> oder in Code-Block / Custom HTML
     ============================================================ -->

<div id="adp-reading-guide" role="presentation" aria-hidden="true"></div>

<button id="adp-trigger"
  aria-label="Barrierefreiheit-Einstellungen öffnen"
  aria-expanded="false"
  aria-controls="adp-panel"
  type="button">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="4" r="1.5"/>
    <path d="M6 8h12M9 8v8M15 8v8M9 14l-3 4M15 14l3 4"/>
  </svg>
</button>

<div id="adp-panel" role="dialog" aria-modal="false" aria-label="Barrierefreiheit-Einstellungen">

  <div class="adp-panel-header">
    <div class="adp-brand">
      <span class="adp-brand-name">Adparadize</span>
      <span class="adp-panel-title">Accessibility Tool</span>
    </div>
    <button class="adp-close" type="button" aria-label="Schließen" id="adp-close-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>

  <div class="adp-reset-bar">
    <button class="adp-reset-btn" type="button" id="adp-reset-btn">↺ Alles zurücksetzen</button>
  </div>

  <div class="adp-section">
    <div class="adp-section-label">Schnellprofile</div>
    <div class="adp-profiles">
      <button class="adp-profile-btn" type="button" data-profile="seizure" aria-pressed="false">
        <span class="adp-pb-icon">⚡</span><span class="adp-pb-label">Anfallssicher</span>
      </button>
      <button class="adp-profile-btn" type="button" data-profile="vision" aria-pressed="false">
        <span class="adp-pb-icon">👁</span><span class="adp-pb-label">Sehbehinderung</span>
      </button>
      <button class="adp-profile-btn" type="button" data-profile="cognitive" aria-pressed="false">
        <span class="adp-pb-icon">🧠</span><span class="adp-pb-label">Kognitiv</span>
      </button>
      <button class="adp-profile-btn" type="button" data-profile="adhd" aria-pressed="false">
        <span class="adp-pb-icon">🎯</span><span class="adp-pb-label">ADHS-freundlich</span>
      </button>
      <button class="adp-profile-btn" type="button" data-profile="dyslexia" aria-pressed="false">
        <span class="adp-pb-icon">📖</span><span class="adp-pb-label">Legasthenie</span>
      </button>
      <button class="adp-profile-btn" type="button" data-profile="keyboard" aria-pressed="false">
        <span class="adp-pb-icon">⌨️</span><span class="adp-pb-label">Tastatur-Navigation</span>
      </button>
    </div>
  </div>

  <div class="adp-section">
    <div class="adp-section-label">Schrift &amp; Lesen</div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Schriftgröße</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" type="button" id="adp-font-dec" aria-label="Schrift verkleinern">−</button>
        <span class="adp-step-val" id="adp-font-val" aria-live="polite">100%</span>
        <button class="adp-step-btn" type="button" id="adp-font-inc" aria-label="Schrift vergrößern">+</button>
      </div>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Zeilenhöhe</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" type="button" id="adp-lh-dec" aria-label="Zeilenhöhe verringern">−</button>
        <span class="adp-step-val" id="adp-lh-val" aria-live="polite">1×</span>
        <button class="adp-step-btn" type="button" id="adp-lh-inc" aria-label="Zeilenhöhe erhöhen">+</button>
      </div>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Zeichenabstand</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" type="button" id="adp-ls-dec" aria-label="Abstand verringern">−</button>
        <span class="adp-step-val" id="adp-ls-val" aria-live="polite">0×</span>
        <button class="adp-step-btn" type="button" id="adp-ls-inc" aria-label="Abstand erhöhen">+</button>
      </div>
    </div>
    <div class="adp-toggle-row" style="margin-top:12px">
      <div class="adp-toggle-label">Legasthenie-Schrift<small>OpenDyslexic-Stil</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-dyslexia-font"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Links unterstreichen</div>
      <label class="adp-switch"><input type="checkbox" id="adp-underline-links"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Text hervorheben<small>beim Hovern</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-text-highlight"><span class="adp-slider"></span></label>
    </div>
  </div>

  <div class="adp-section">
    <div class="adp-section-label">Farbe &amp; Kontrast</div>
    <div class="adp-color-grid">
      <button class="adp-color-btn" type="button" data-filter="mono">
        <span class="adp-cb-dot" style="background:linear-gradient(135deg,#999,#333)"></span>Graustufen
      </button>
      <button class="adp-color-btn" type="button" data-filter="invert">
        <span class="adp-cb-dot" style="background:linear-gradient(135deg,#000,#fff)"></span>Invertiert
      </button>
      <button class="adp-color-btn" type="button" data-filter="high-contrast">
        <span class="adp-cb-dot" style="background:#000;border-color:#fff"></span>Hoher Kontrast
      </button>
      <button class="adp-color-btn" type="button" data-filter="high-contrast-soft">
        <span class="adp-cb-dot" style="background:linear-gradient(135deg,#333,#ccc)"></span>Sanfter Kontrast
      </button>
      <button class="adp-color-btn" type="button" data-filter="desat">
        <span class="adp-cb-dot" style="background:linear-gradient(135deg,#c8b8a2,#9ea8c8)"></span>Desaturiert
      </button>
      <button class="adp-color-btn" type="button" data-filter="sat">
        <span class="adp-cb-dot" style="background:linear-gradient(135deg,#ff4444,#44aaff)"></span>Gesättigt
      </button>
    </div>
  </div>

  <div class="adp-section">
    <div class="adp-section-label">Visuelle Hilfsmittel</div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Leselinie<small>Hilft beim Zeilenverfolgen</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-reading-guide-toggle"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Großer Cursor</div>
      <label class="adp-switch"><input type="checkbox" id="adp-big-cursor"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Animationen stoppen</div>
      <label class="adp-switch"><input type="checkbox" id="adp-no-anim"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Fokus hervorheben<small>Für Tastatur-Navigation</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-focus-highlight"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Screenreader-Modus<small>Bilder ohne alt-Text markieren</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-screen-reader"><span class="adp-slider"></span></label>
    </div>
  </div>

  <div class="adp-panel-footer">Accessibility Tool by Adparadize</div>
</div>

<style>
/* Hohe Spezifität via ID, damit CMS-Themes nichts überschreiben */
#adp-reading-guide {
  position: fixed !important; left: 0 !important; right: 0 !important; height: 40px !important;
  background: rgba(0,0,0,.12) !important; pointer-events: none !important;
  z-index: 2147483645 !important; display: none !important;
  border-top: 2px solid rgba(0,0,0,.4) !important;
  border-bottom: 2px solid rgba(0,0,0,.4) !important;
}
#adp-reading-guide.adp-rg-visible {
  display: block !important;
}
#adp-trigger {
  position: fixed !important; bottom: 28px !important; right: 28px !important;
  z-index: 2147483646 !important;
  width: 56px !important; height: 56px !important;
  background: #1a1a1a !important; color: #fff !important;
  border: none !important; border-radius: 50% !important; cursor: pointer !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  box-shadow: 0 4px 24px rgba(0,0,0,.35) !important;
  transition: transform .2s, box-shadow .2s !important;
  outline: none !important;
  padding: 0 !important; margin: 0 !important;
  pointer-events: all !important;
  -webkit-appearance: none !important; appearance: none !important;
  line-height: 1 !important; font-size: 0 !important;
}
#adp-trigger:hover { transform: scale(1.08) !important; box-shadow: 0 6px 30px rgba(0,0,0,.45) !important; }
#adp-trigger:focus-visible { outline: 3px solid #fff !important; outline-offset: 3px !important; }
#adp-trigger svg { width: 26px !important; height: 26px !important; display: block !important; pointer-events: none !important; }
#adp-panel {
  position: fixed !important; bottom: 96px !important; right: 28px !important;
  z-index: 2147483647 !important;
  width: 340px !important; max-height: 88vh !important; overflow-y: auto !important;
  background: #fff !important; border: 2px solid #1a1a1a !important; border-radius: 4px !important;
  box-shadow: 8px 8px 0 #1a1a1a !important;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-size: 14px !important;
  transform: translateY(20px) scale(.97) !important; opacity: 0 !important;
  pointer-events: none !important;
  transition: transform .25s cubic-bezier(.16,1,.3,1), opacity .2s !important;
  box-sizing: border-box !important;
}
#adp-panel.open {
  transform: translateY(0) scale(1) !important;
  opacity: 1 !important;
  pointer-events: all !important;
}
#adp-panel::-webkit-scrollbar { width: 4px; }
#adp-panel::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }

/* Alle internen Elemente: Spezifität durch #adp-panel Prefix */
#adp-panel .adp-panel-header {
  background: #1a1a1a !important; color: #fff !important; padding: 18px 20px 14px !important;
  display: flex !important; align-items: flex-start !important;
  justify-content: space-between !important; gap: 12px !important;
}
#adp-panel .adp-brand { display: flex !important; flex-direction: column !important; gap: 2px !important; }
#adp-panel .adp-brand-name {
  font-size: 11px !important; letter-spacing: .18em !important; text-transform: uppercase !important;
  opacity: .55 !important; font-weight: 400 !important; color: #fff !important;
}
#adp-panel .adp-panel-title { font-size: 16px !important; font-weight: 700 !important; letter-spacing: -.01em !important; color: #fff !important; }
#adp-panel .adp-close {
  background: none !important; border: none !important; color: #fff !important;
  cursor: pointer !important; opacity: .7 !important; padding: 2px !important;
  margin-top: 2px !important; line-height: 1 !important;
  transition: opacity .15s !important; pointer-events: all !important;
  -webkit-appearance: none !important; appearance: none !important;
}
#adp-panel .adp-close:hover { opacity: 1 !important; }
#adp-panel .adp-close svg { width: 18px !important; height: 18px !important; display: block !important; pointer-events: none !important; }
#adp-panel .adp-reset-bar {
  padding: 10px 20px !important; border-bottom: 1px solid #e8e8e8 !important;
  display: flex !important; justify-content: flex-end !important;
}
#adp-panel .adp-reset-btn {
  background: none !important; border: 1.5px solid #1a1a1a !important; color: #1a1a1a !important;
  font-size: 11px !important; letter-spacing: .08em !important; text-transform: uppercase !important;
  padding: 4px 12px !important; cursor: pointer !important; border-radius: 2px !important;
  font-family: inherit !important; transition: background .15s, color .15s !important;
  -webkit-appearance: none !important; appearance: none !important;
  pointer-events: all !important;
}
#adp-panel .adp-reset-btn:hover { background: #1a1a1a !important; color: #fff !important; }
#adp-panel .adp-section {
  padding: 16px 20px !important; border-bottom: 1px solid #e8e8e8 !important;
}
#adp-panel .adp-section:last-child { border-bottom: none !important; }
#adp-panel .adp-section-label {
  font-size: 10px !important; letter-spacing: .16em !important; text-transform: uppercase !important;
  color: #888 !important; margin-bottom: 12px !important; font-weight: 600 !important;
}
#adp-panel .adp-profiles {
  display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important;
}
#adp-panel .adp-profile-btn {
  background: #fff !important; border: 1.5px solid #d0d0d0 !important; border-radius: 3px !important;
  padding: 10px 10px 9px !important; cursor: pointer !important; text-align: left !important;
  transition: border-color .15s, background .15s !important; font-family: inherit !important;
  display: flex !important; flex-direction: column !important; gap: 5px !important;
  pointer-events: all !important; -webkit-appearance: none !important; appearance: none !important;
  color: #1a1a1a !important;
}
#adp-panel .adp-profile-btn:hover { border-color: #1a1a1a !important; background: #fafafa !important; }
#adp-panel .adp-profile-btn.active { background: #1a1a1a !important; border-color: #1a1a1a !important; color: #fff !important; }
#adp-panel .adp-pb-icon { font-size: 18px !important; line-height: 1 !important; }
#adp-panel .adp-pb-label { font-size: 11px !important; font-weight: 600 !important; letter-spacing: .02em !important; line-height: 1.3 !important; }
#adp-panel .adp-toggle-row {
  display: flex !important; align-items: center !important;
  justify-content: space-between !important; margin-bottom: 10px !important;
}
#adp-panel .adp-toggle-row:last-child { margin-bottom: 0 !important; }
#adp-panel .adp-toggle-label { font-size: 13px !important; color: #1a1a1a !important; font-weight: 500 !important; }
#adp-panel .adp-toggle-label small { display: block !important; font-size: 11px !important; font-weight: 400 !important; color: #888 !important; margin-top: 1px !important; }
#adp-panel .adp-switch { position: relative !important; width: 42px !important; height: 24px !important; flex-shrink: 0 !important; display: inline-block !important; }
#adp-panel .adp-switch input { opacity: 0 !important; width: 0 !important; height: 0 !important; position: absolute !important; }
#adp-panel .adp-slider {
  position: absolute !important; cursor: pointer !important; inset: 0 !important;
  background: #d8d8d8 !important; border-radius: 24px !important; transition: background .2s !important;
}
#adp-panel .adp-slider::before {
  content: '' !important; position: absolute !important; width: 18px !important; height: 18px !important;
  left: 3px !important; bottom: 3px !important; background: #fff !important;
  border-radius: 50% !important; transition: transform .2s !important;
  box-shadow: 0 1px 3px rgba(0,0,0,.2) !important;
}
#adp-panel .adp-switch input:checked + .adp-slider { background: #1a1a1a !important; }
#adp-panel .adp-switch input:checked + .adp-slider::before { transform: translateX(18px) !important; }
#adp-panel .adp-switch input:focus-visible + .adp-slider { outline: 2px solid #1a1a1a !important; outline-offset: 2px !important; }
#adp-panel .adp-stepper {
  display: flex !important; align-items: center !important;
  border: 1.5px solid #d0d0d0 !important; border-radius: 3px !important; overflow: hidden !important;
}
#adp-panel .adp-step-btn {
  background: #fff !important; border: none !important; cursor: pointer !important;
  width: 32px !important; height: 32px !important; font-size: 18px !important;
  color: #1a1a1a !important; display: flex !important; align-items: center !important;
  justify-content: center !important; transition: background .15s !important;
  font-family: inherit !important; flex-shrink: 0 !important;
  pointer-events: all !important; -webkit-appearance: none !important; appearance: none !important;
}
#adp-panel .adp-step-btn:hover { background: #f0f0f0 !important; }
#adp-panel .adp-step-val {
  width: 36px !important; text-align: center !important; font-size: 12px !important;
  font-weight: 700 !important; color: #1a1a1a !important; user-select: none !important;
  border-left: 1.5px solid #d0d0d0 !important; border-right: 1.5px solid #d0d0d0 !important;
}
#adp-panel .adp-color-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
#adp-panel .adp-color-btn {
  border: 1.5px solid #d0d0d0 !important; border-radius: 3px !important;
  padding: 8px 10px !important; cursor: pointer !important; background: #fff !important;
  font-family: inherit !important; font-size: 12px !important; font-weight: 600 !important;
  color: #1a1a1a !important; text-align: left !important;
  transition: border-color .15s, background .15s !important;
  pointer-events: all !important; -webkit-appearance: none !important; appearance: none !important;
  display: flex !important; align-items: center !important;
}
#adp-panel .adp-color-btn:hover { border-color: #1a1a1a !important; }
#adp-panel .adp-color-btn.active { background: #1a1a1a !important; color: #fff !important; border-color: #1a1a1a !important; }
#adp-panel .adp-cb-dot {
  width: 10px !important; height: 10px !important; border-radius: 50% !important;
  display: inline-block !important; margin-right: 6px !important;
  border: 1px solid rgba(0,0,0,.15) !important; flex-shrink: 0 !important;
}
#adp-panel .adp-panel-footer {
  padding: 10px 20px !important; background: #f5f5f0 !important;
  border-top: 1px solid #e8e8e8 !important; font-size: 10px !important;
  color: #aaa !important; letter-spacing: .06em !important;
  text-transform: uppercase !important; text-align: center !important;
}

/* Accessibility state classes — höchste Spezifität */
html.adp-high-contrast body,
html.adp-high-contrast #content,
html.adp-high-contrast .site-content { filter: contrast(1.6) !important; }

html.adp-high-contrast-soft body,
html.adp-high-contrast-soft #content,
html.adp-high-contrast-soft .site-content { filter: contrast(1.35) brightness(1.05) !important; }

html.adp-mono body,
html.adp-mono #content,
html.adp-mono .site-content { filter: grayscale(1) !important; }

html.adp-desat body,
html.adp-desat #content,
html.adp-desat .site-content { filter: saturate(.4) !important; }

html.adp-sat body,
html.adp-sat #content,
html.adp-sat .site-content { filter: saturate(2) !important; }

html.adp-invert body,
html.adp-invert #content,
html.adp-invert .site-content { filter: invert(1) hue-rotate(180deg) !important; }

html.adp-no-anim *,
html.adp-no-anim *::before,
html.adp-no-anim *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }

html.adp-underline-links a { text-decoration: underline !important; text-underline-offset: 3px !important; }

html.adp-dyslexia body,
html.adp-dyslexia p,
html.adp-dyslexia li,
html.adp-dyslexia h1,
html.adp-dyslexia h2,
html.adp-dyslexia h3 { font-family: 'Comic Sans MS', cursive !important; letter-spacing: .07em !important; word-spacing: .2em !important; line-height: 1.9 !important; }

html.adp-focus-highlight *:focus { outline: 3px solid #1a1a1a !important; outline-offset: 3px !important; box-shadow: 0 0 0 5px rgba(26,26,26,.25) !important; }

html.adp-screen-reader img:not([alt]),
html.adp-screen-reader img[alt=""] { outline: 3px solid red !important; }

html.adp-big-cursor,
html.adp-big-cursor * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M8 4l24 16-10 2-6 12z' fill='%231a1a1a' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 8 4, auto !important; }
</style>

<script>
(function(){
  'use strict';

  /* ── DOM-Ready-Wrapper: funktioniert in jedem CMS ── */
  function adpInit() {
    var trigger = document.getElementById('adp-trigger');
    var panel   = document.getElementById('adp-panel');
    if (!trigger || !panel) return; /* Elemente noch nicht im DOM – wird nicht vorkommen wenn korrekt eingebaut */

    var DEFAULT = {
      fontScale:0, lineHeight:0, letterSpacing:0, filter:null,
      dyslexiaFont:false, underlineLinks:false, textHighlight:false,
      readingGuide:false, bigCursor:false, noAnim:false,
      focusHighlight:false, screenReader:false, profile:null
    };
    var state = Object.assign({}, DEFAULT);
    var KEY   = 'adp_a11y';

    /* Sicherer localStorage-Zugriff (Squarespace-Sandboxes blockieren ihn manchmal) */
    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {}
    }
    function load() {
      try {
        var r = localStorage.getItem(KEY);
        if (r) state = Object.assign({}, DEFAULT, JSON.parse(r));
      } catch(e) {}
    }

    var closeBtn = document.getElementById('adp-close-btn');
    var resetBtn = document.getElementById('adp-reset-btn');
    var guide    = document.getElementById('adp-reading-guide');
    var fontVal  = document.getElementById('adp-font-val');
    var lhVal    = document.getElementById('adp-lh-val');
    var lsVal    = document.getElementById('adp-ls-val');
    var html     = document.documentElement;
    /* body kann in manchen CMS-Frameworks beim ersten Load noch fehlen */
    function getBody() { return document.body || document.documentElement; }

    /* ── Panel öffnen/schließen ── */
    var isOpen = false;
    function openPanel() {
      isOpen = true;
      panel.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }
    function closePanel() {
      isOpen = false;
      panel.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }

    /* Robuster Event-Listener: funktioniert auch wenn Theme jQuery nutzt */
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      isOpen ? closePanel() : openPanel();
    }, true); /* capture:true überschreibt CMS-Bubbling-Blocker */

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) { e.stopPropagation(); closePanel(); }, true);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    document.addEventListener('click', function(e) {
      if (!isOpen) return;
      if (!panel.contains(e.target) && e.target !== trigger) closePanel();
    });

    /* ── Filter ── */
    var FMAP = {
      'mono':             'adp-mono',
      'invert':           'adp-invert',
      'high-contrast':    'adp-high-contrast',
      'high-contrast-soft':'adp-high-contrast-soft',
      'desat':            'adp-desat',
      'sat':              'adp-sat'
    };
    function applyFilter(f) {
      Object.values(FMAP).forEach(function(c) { html.classList.remove(c); });
      if (f && FMAP[f]) html.classList.add(FMAP[f]);
    }

    /* ── Schriftgröße ── */
    var FSTEPS = [75, 87, 100, 112, 125, 150, 175, 200];
    function setFont(v) {
      state.fontScale = v;
      getBody().style.fontSize = v + '%';
      if (fontVal) fontVal.textContent = v + '%';
    }

    /* ── Zeilenhöhe ── */
    var LHV = [null, '1.8', '2.2', '2.6'];
    var LHL = ['1×', '1.8×', '2.2×', '2.6×'];
    function setLH(s) {
      state.lineHeight = s;
      if (lhVal) lhVal.textContent = LHL[s];
      getBody().style.lineHeight = LHV[s] || '';
    }

    /* ── Zeichenabstand ── */
    var LSV = [null, '.04em', '.09em', '.15em'];
    var LSL = ['0×', '1×', '2×', '3×'];
    function setLS(s) {
      state.letterSpacing = s;
      if (lsVal) lsVal.textContent = LSL[s];
      document.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,a,span,td,th').forEach(function(el) {
        el.style.letterSpacing = LSV[s] || '';
      });
    }

    /* ── Text-Highlight ── */
    function hiOn(e) { e.currentTarget.style.background = 'rgba(255,255,100,.35)'; }
    function hiOff(e) { e.currentTarget.style.background = ''; }

    /* ── Alle Toggles anwenden ── */
    function applyToggles() {
      /* Legasthenie */
      html.classList.toggle('adp-dyslexia', !!state.dyslexiaFont);
      var df = document.getElementById('adp-dyslexia-font');
      if (df) df.checked = !!state.dyslexiaFont;

      /* Links */
      html.classList.toggle('adp-underline-links', !!state.underlineLinks);
      var ul = document.getElementById('adp-underline-links');
      if (ul) ul.checked = !!state.underlineLinks;

      /* Text-Highlight */
      var els = document.querySelectorAll('p,li');
      if (state.textHighlight) {
        els.forEach(function(el) {
          el.addEventListener('mouseover', hiOn);
          el.addEventListener('mouseout', hiOff);
        });
      } else {
        els.forEach(function(el) {
          el.removeEventListener('mouseover', hiOn);
          el.removeEventListener('mouseout', hiOff);
          el.style.background = '';
        });
      }
      var th = document.getElementById('adp-text-highlight');
      if (th) th.checked = !!state.textHighlight;

      /* Leselinie */
      if (guide) guide.classList.toggle('adp-rg-visible', !!state.readingGuide);
      var rg = document.getElementById('adp-reading-guide-toggle');
      if (rg) rg.checked = !!state.readingGuide;

      /* Cursor */
      html.classList.toggle('adp-big-cursor', !!state.bigCursor);
      var bc = document.getElementById('adp-big-cursor');
      if (bc) bc.checked = !!state.bigCursor;

      /* Animationen */
      html.classList.toggle('adp-no-anim', !!state.noAnim);
      var na = document.getElementById('adp-no-anim');
      if (na) na.checked = !!state.noAnim;

      /* Fokus */
      html.classList.toggle('adp-focus-highlight', !!state.focusHighlight);
      var fh = document.getElementById('adp-focus-highlight');
      if (fh) fh.checked = !!state.focusHighlight;

      /* Screenreader */
      html.classList.toggle('adp-screen-reader', !!state.screenReader);
      var sr = document.getElementById('adp-screen-reader');
      if (sr) sr.checked = !!state.screenReader;
    }

    /* ── Farb-Buttons ── */
    document.querySelectorAll('.adp-color-btn').forEach(function(btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var f = btn.dataset.filter;
        state.filter = (state.filter === f) ? null : f;
        applyFilter(state.filter);
        document.querySelectorAll('.adp-color-btn').forEach(function(b) {
          var on = b.dataset.filter === state.filter;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        save();
      }, true);
    });

    /* ── Profile ── */
    var PROFILES = {
      seizure:  { noAnim:true, filter:'desat' },
      vision:   { filter:'high-contrast', fontScale:125, focusHighlight:true },
      cognitive:{ fontScale:112, lineHeight:1, underlineLinks:true, noAnim:true },
      adhd:     { textHighlight:true, readingGuide:true, noAnim:true },
      dyslexia: { dyslexiaFont:true, lineHeight:2, letterSpacing:1 },
      keyboard: { focusHighlight:true, underlineLinks:true },
    };
    document.querySelectorAll('.adp-profile-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var k = btn.dataset.profile;
        if (state.profile === k) {
          state = Object.assign({}, DEFAULT);
        } else {
          state = Object.assign({}, DEFAULT, PROFILES[k], { profile:k });
        }
        applyAll(); save();
      }, true);
    });
    function syncProfiles() {
      document.querySelectorAll('.adp-profile-btn').forEach(function(btn) {
        var a = btn.dataset.profile === state.profile;
        btn.classList.toggle('active', a);
        btn.setAttribute('aria-pressed', a ? 'true' : 'false');
      });
    }

    /* ── Checkbox-Bindings ── */
    function bind(id, key) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('change', function() {
        state[key] = this.checked;
        applyToggles();
        save();
      });
    }
    bind('adp-dyslexia-font',       'dyslexiaFont');
    bind('adp-underline-links',     'underlineLinks');
    bind('adp-text-highlight',      'textHighlight');
    bind('adp-reading-guide-toggle','readingGuide');
    bind('adp-big-cursor',          'bigCursor');
    bind('adp-no-anim',             'noAnim');
    bind('adp-focus-highlight',     'focusHighlight');
    bind('adp-screen-reader',       'screenReader');

    /* ── Stepper-Buttons ── */
    function stepBtn(id, fn) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function(e) { e.stopPropagation(); fn(); save(); }, true);
    }
    stepBtn('adp-font-inc', function() { var i=FSTEPS.indexOf(state.fontScale); if(i<FSTEPS.length-1) setFont(FSTEPS[i+1]); });
    stepBtn('adp-font-dec', function() { var i=FSTEPS.indexOf(state.fontScale); if(i>0) setFont(FSTEPS[i-1]); });
    stepBtn('adp-lh-inc',   function() { if(state.lineHeight<3) setLH(state.lineHeight+1); });
    stepBtn('adp-lh-dec',   function() { if(state.lineHeight>0) setLH(state.lineHeight-1); });
    stepBtn('adp-ls-inc',   function() { if(state.letterSpacing<3) setLS(state.letterSpacing+1); });
    stepBtn('adp-ls-dec',   function() { if(state.letterSpacing>0) setLS(state.letterSpacing-1); });

    /* ── Leselinie Mausverfolgung ── */
    document.addEventListener('mousemove', function(e) {
      if (state.readingGuide && guide) guide.style.top = (e.clientY - 20) + 'px';
    });

    /* ── Reset ── */
    if (resetBtn) {
      resetBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        state = Object.assign({}, DEFAULT);
        applyAll(); save();
      }, true);
    }

    /* ── Alles anwenden ── */
    function syncColorBtns() {
      document.querySelectorAll('.adp-color-btn').forEach(function(b) {
        var on = b.dataset.filter === state.filter;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    function applyAll() {
      /* fontScale 0 = Standardwert, kein override */
      if (state.fontScale > 0) setFont(state.fontScale);
      else { getBody().style.fontSize = ''; if (fontVal) fontVal.textContent = '100%'; }
      setLH(state.lineHeight);
      setLS(state.letterSpacing);
      applyFilter(state.filter);
      applyToggles();
      syncProfiles();
      syncColorBtns();
    }

    load();
    applyAll();
  }

  /* ── DOM-Ready: sicher für alle CMS ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adpInit);
  } else {
    /* readyState ist 'interactive' oder 'complete' — DOM schon da */
    adpInit();
  }

})();
</script>

<!-- ============================================================
     ENDE ADPARADIZE ACCESSIBILITY WIDGET v1.1
     ============================================================ -->
