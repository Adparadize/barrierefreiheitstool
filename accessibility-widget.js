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
        <span class="adp-step-val" id="adp-font-val" aria
