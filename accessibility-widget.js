/**
 * Accessibility Widget - CMS-unabhängiges Web Accessibility Tool
 * WCAG 2.2 & BITV konform
 * Keine Dependencies, Vanilla JavaScript
 */

(function() {
    'use strict';

    // Namespace
    window.AccessibilityWidget = window.AccessibilityWidget || {};

    const WIDGET_ID = 'accessibility-widget';
    const STORAGE_KEY = 'a11y-widget-settings';
    const POSITIONS = ['bottom-right', 'bottom-left', 'middle-right', 'middle-left'];

    // Standard-Settings
    const DEFAULT_SETTINGS = {
        position: 'bottom-right',
        fontSize: 100,
        highlightTitles: false,
        highlightLinks: false,
        letterSpacing: 0,
        lineHeight: 1.5,
        fontWeight: 400,
        contrastMode: 'normal', // normal, dark, light, high, lowsat, monochrome
        readingGuide: false,
        stopAnimations: false,
        largeCursor: false,
        panelOpen: false
    };

    let settings = { ...DEFAULT_SETTINGS };
    let widget = null;
    let styleElement = null;

    /**
     * Initialisierung des Widgets
     */
    function init(options = {}) {
        // Optionen mergen
        const config = { ...DEFAULT_SETTINGS, ...options };
        
        // Existierendes Widget entfernen
        if (document.getElementById(WIDGET_ID)) {
            return console.warn('AccessibilityWidget bereits initialisiert');
        }

        // Settings laden
        loadSettings();

        // UI erstellen
        createUI();

        // Styles injizieren
        injectStyles();

        // Event-Listener
        attachEventListeners();

        // Gespeicherte Settings anwenden
        applySettings();

        console.log('AccessibilityWidget initialized');
    }

    /**
     * UI-Struktur erstellen
     */
    function createUI() {
        // Container für Widget
        const container = document.createElement('div');
        container.id = WIDGET_ID;
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Accessibility Options Panel');

        // HTML-Struktur
        container.innerHTML = `
            <div class="a11y-floating-button" role="button" tabindex="0" aria-label="Accessibility Options" aria-expanded="false" aria-controls="a11y-panel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="8" r="2"/>
                    <path d="M12 14c-3.31 0-6 1.79-6 4v2h12v-2c0-2.21-2.69-4-6-4z"/>
                </svg>
            </div>

            <div class="a11y-panel" id="a11y-panel" hidden role="dialog" aria-labelledby="a11y-panel-title">
                <div class="a11y-panel-header">
                    <h2 id="a11y-panel-title" class="a11y-panel-title">Eingabehilfen</h2>
                    <button class="a11y-close-btn" aria-label="Panel schließen">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <div class="a11y-panel-content">
                    
                    <!-- Text Anpassungen -->
                    <fieldset class="a11y-fieldset">
                        <legend class="a11y-legend">Textanpassung</legend>
                        
                        <div class="a11y-control">
                            <label for="a11y-font-size">Schriftgröße: <span class="a11y-value">100%</span></label>
                            <input type="range" id="a11y-font-size" class="a11y-slider" min="80" max="200" value="100" aria-label="Schriftgröße Prozent" />
                        </div>

                        <div class="a11y-control">
                            <label for="a11y-line-height">Zeilenhöhe: <span class="a11y-value">1.5</span></label>
                            <input type="range" id="a11y-line-height" class="a11y-slider" min="1" max="2.5" step="0.1" value="1.5" aria-label="Zeilenhöhe" />
                        </div>

                        <div class="a11y-control">
                            <label for="a11y-letter-spacing">Zeichenabstand: <span class="a11y-value">0px</span></label>
                            <input type="range" id="a11y-letter-spacing" class="a11y-slider" min="0" max="10" step="0.5" value="0" aria-label="Zeichenabstand Pixel" />
                        </div>

                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-bold" class="a11y-checkbox" />
                            <label for="a11y-bold">Text fettgedruckt</label>
                        </div>

                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-titles" class="a11y-checkbox" />
                            <label for="a11y-titles">Titel hervorheben</label>
                        </div>

                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-links" class="a11y-checkbox" />
                            <label for="a11y-links">Links hervorheben</label>
                        </div>
                    </fieldset>

                    <!-- Farb-Modus -->
                    <fieldset class="a11y-fieldset">
                        <legend class="a11y-legend">Farbmodus</legend>
                        
                        <div class="a11y-radio-group">
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-normal" name="contrast" value="normal" class="a11y-radio" />
                                <label for="a11y-contrast-normal">Normal</label>
                            </div>
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-dark" name="contrast" value="dark" class="a11y-radio" />
                                <label for="a11y-contrast-dark">Dunkel</label>
                            </div>
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-light" name="contrast" value="light" class="a11y-radio" />
                                <label for="a11y-contrast-light">Hell</label>
                            </div>
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-high" name="contrast" value="high" class="a11y-radio" />
                                <label for="a11y-contrast-high">Hoher Kontrast</label>
                            </div>
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-lowsat" name="contrast" value="lowsat" class="a11y-radio" />
                                <label for="a11y-contrast-lowsat">Niedrige Sättigung</label>
                            </div>
                            <div class="a11y-control radio">
                                <input type="radio" id="a11y-contrast-monochrome" name="contrast" value="monochrome" class="a11y-radio" />
                                <label for="a11y-contrast-monochrome">Monochrom</label>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Werkzeuge -->
                    <fieldset class="a11y-fieldset">
                        <legend class="a11y-legend">Werkzeuge</legend>
                        
                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-reading-guide" class="a11y-checkbox" />
                            <label for="a11y-reading-guide">Lesehilfe aktivieren</label>
                        </div>

                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-stop-animations" class="a11y-checkbox" />
                            <label for="a11y-stop-animations">Animationen stoppen</label>
                        </div>

                        <div class="a11y-control checkbox">
                            <input type="checkbox" id="a11y-large-cursor" class="a11y-checkbox" />
                            <label for="a11y-large-cursor">Großer Cursor</label>
                        </div>
                    </fieldset>

                    <!-- Reset Button -->
                    <button id="a11y-reset" class="a11y-reset-btn" aria-label="Alle Einstellungen zurücksetzen">
                        Alles zurücksetzen
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        widget = container;
    }

    /**
     * CSS in den DOM injizieren
     */
    function injectStyles() {
        if (document.getElementById('a11y-widget-styles')) return;

        const style = document.createElement('style');
        style.id = 'a11y-widget-styles';
        style.textContent = `
            /* Accessibility Widget Styles */
            #${WIDGET_ID} {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                --a11y-primary: #0066cc;
                --a11y-text: #333;
                --a11y-bg: #fff;
                --a11y-border: #ddd;
                --a11y-shadow: rgba(0, 0, 0, 0.1);
            }

            #${WIDGET_ID} * {
                box-sizing: border-box;
            }

            /* Floating Button */
            .a11y-floating-button {
                position: fixed;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: var(--a11y-primary);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px var(--a11y-shadow);
                transition: transform 0.2s, box-shadow 0.2s;
                z-index: 999998;
                border: none;
                padding: 0;
            }

            .a11y-floating-button:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px var(--a11y-shadow);
            }

            .a11y-floating-button:focus {
                outline: 2px solid #fff;
                outline-offset: 2px;
            }

            .a11y-floating-button:active {
                transform: scale(0.95);
            }

            /* Panel */
            .a11y-panel {
                position: fixed;
                width: 360px;
                max-height: 80vh;
                background: var(--a11y-bg);
                border: 1px solid var(--a11y-border);
                border-radius: 8px;
                box-shadow: 0 4px 24px var(--a11y-shadow);
                z-index: 999999;
                display: flex;
                flex-direction: column;
                color: var(--a11y-text);
            }

            .a11y-panel:not([hidden]) {
                display: flex;
            }

            /* Panel Header */
            .a11y-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid var(--a11y-border);
            }

            .a11y-panel-title {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .a11y-close-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                color: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .a11y-close-btn:focus {
                outline: 2px solid var(--a11y-primary);
                outline-offset: 2px;
            }

            /* Panel Content */
            .a11y-panel-content {
                overflow-y: auto;
                padding: 16px;
                flex: 1;
            }

            /* Fieldset */
            .a11y-fieldset {
                margin: 0 0 20px 0;
                padding: 12px;
                border: 1px solid var(--a11y-border);
                border-radius: 6px;
            }

            .a11y-legend {
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 12px;
                display: block;
                padding: 0 4px;
            }

            /* Controls */
            .a11y-control {
                margin-bottom: 12px;
            }

            .a11y-control:last-child {
                margin-bottom: 0;
            }

            .a11y-control label {
                display: flex;
                align-items: center;
                font-size: 14px;
                gap: 8px;
                cursor: pointer;
                user-select: none;
            }

            /* Slider */
            .a11y-slider {
                width: 100%;
                height: 6px;
                border-radius: 3px;
                background: var(--a11y-border);
                outline: none;
                -webkit-appearance: none;
                margin-top: 4px;
            }

            .a11y-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: var(--a11y-primary);
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 2px 4px var(--a11y-shadow);
            }

            .a11y-slider::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: var(--a11y-primary);
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 2px 4px var(--a11y-shadow);
            }

            .a11y-slider:focus {
                outline: 2px solid var(--a11y-primary);
                outline-offset: 2px;
            }

            .a11y-value {
                font-weight: 600;
                color: var(--a11y-primary);
            }

            /* Checkbox & Radio */
            .a11y-checkbox,
            .a11y-radio {
                width: 18px;
                height: 18px;
                cursor: pointer;
                margin: 0;
            }

            .a11y-control.checkbox label,
            .a11y-control.radio label {
                flex-direction: row;
                margin-bottom: 8px;
            }

            .a11y-radio-group {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            /* Buttons */
            .a11y-reset-btn {
                width: 100%;
                padding: 12px;
                background: var(--a11y-primary);
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s;
                margin-top: 8px;
            }

            .a11y-reset-btn:hover {
                opacity: 0.9;
            }

            .a11y-reset-btn:focus {
                outline: 2px solid #000;
                outline-offset: 2px;
            }

            /* Positioning */
            #${WIDGET_ID}.bottom-right .a11y-floating-button {
                bottom: 20px;
                right: 20px;
            }

            #${WIDGET_ID}.bottom-right .a11y-panel {
                bottom: 80px;
                right: 20px;
            }

            #${WIDGET_ID}.bottom-left .a11y-floating-button {
                bottom: 20px;
                left: 20px;
            }

            #${WIDGET_ID}.bottom-left .a11y-panel {
                bottom: 80px;
                left: 20px;
            }

            #${WIDGET_ID}.middle-right .a11y-floating-button {
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
            }

            #${WIDGET_ID}.middle-right .a11y-panel {
                top: 50%;
                transform: translateY(-50%);
                right: 80px;
            }

            #${WIDGET_ID}.middle-left .a11y-floating-button {
                top: 50%;
                transform: translateY(-50%);
                left: 20px;
            }

            #${WIDGET_ID}.middle-left .a11y-panel {
                top: 50%;
                transform: translateY(-50%);
                left: 80px;
            }

            /* Highlight Styles */
            .a11y-highlight-titles h1,
            .a11y-highlight-titles h2,
            .a11y-highlight-titles h3,
            .a11y-highlight-titles h4,
            .a11y-highlight-titles h5,
            .a11y-highlight-titles h6 {
                outline: 2px solid var(--a11y-primary);
                outline-offset: 2px;
                padding: 4px;
            }

            .a11y-highlight-links a {
                outline: 2px solid var(--a11y-primary);
                outline-offset: 2px;
                padding: 2px 4px;
            }

            /* Reading Guide */
            .a11y-reading-guide-line {
                position: fixed;
                left: 0;
                right: 0;
                height: 3px;
                background: rgba(0, 102, 204, 0.3);
                pointer-events: none;
                z-index: 999997;
            }

            /* Large Cursor */
            .a11y-large-cursor * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="black" stroke-width="2"/><circle cx="16" cy="16" r="3" fill="black"/></svg>') 16 16, auto !important;
            }

            /* Stop Animations */
            .a11y-stop-animations * {
                animation: none !important;
                transition: none !important;
            }

            .a11y-stop-animations img,
            .a11y-stop-animations video {
                animation: none !important;
            }

            /* Contrast Modes */
            .a11y-contrast-dark {
                background: #1a1a1a !important;
                color: #e0e0e0 !important;
            }

            .a11y-contrast-light {
                background: #f5f5f5 !important;
                color: #000 !important;
            }

            .a11y-contrast-high {
                background: #000 !important;
                color: #fff !important;
                border-color: #fff !important;
            }

            .a11y-contrast-high a {
                color: #ffff00 !important;
                text-decoration: underline !important;
            }

            .a11y-contrast-lowsat {
                filter: saturate(0.3) !important;
            }

            .a11y-contrast-monochrome {
                filter: grayscale(1) !important;
            }

            /* Responsive */
            @media (max-width: 480px) {
                .a11y-panel {
                    width: calc(100vw - 40px);
                    max-height: 70vh;
                }

                #${WIDGET_ID}.middle-right .a11y-panel,
                #${WIDGET_ID}.middle-left .a11y-panel {
                    top: auto !important;
                    transform: none !important;
                    bottom: 80px;
                    left: 20px !important;
                    right: 20px !important;
                }
            }

            /* Print Styles */
            @media print {
                #${WIDGET_ID} {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);
        styleElement = style;
    }

    /**
     * Event-Listener attachen
     */
    function attachEventListeners() {
        const button = widget.querySelector('.a11y-floating-button');
        const closeBtn = widget.querySelector('.a11y-close-btn');
        const panel = widget.querySelector('.a11y-panel');
        const resetBtn = widget.querySelector('#a11y-reset');

        // Button click
        button.addEventListener('click', togglePanel);
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePanel();
            }
        });

        // Close button
        closeBtn.addEventListener('click', closePanel);

        // Panel close
        panel.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePanel();
            }
        });

        // Reset button
        resetBtn.addEventListener('click', resetSettings);

        // Slider inputs
        const fontSizeInput = panel.querySelector('#a11y-font-size');
        const lineHeightInput = panel.querySelector('#a11y-line-height');
        const letterSpacingInput = panel.querySelector('#a11y-letter-spacing');

        fontSizeInput.addEventListener('input', (e) => {
            settings.fontSize = parseInt(e.target.value);
            updateSliderLabel(e.target);
            applySettings();
            saveSettings();
        });

        lineHeightInput.addEventListener('input', (e) => {
            settings.lineHeight = parseFloat(e.target.value);
            updateSliderLabel(e.target);
            applySettings();
            saveSettings();
        });

        letterSpacingInput.addEventListener('input', (e) => {
            settings.letterSpacing = parseFloat(e.target.value);
            updateSliderLabel(e.target);
            applySettings();
            saveSettings();
        });

        // Checkboxes
        const boldCheckbox = panel.querySelector('#a11y-bold');
        const titlesCheckbox = panel.querySelector('#a11y-titles');
        const linksCheckbox = panel.querySelector('#a11y-links');
        const readingGuideCheckbox = panel.querySelector('#a11y-reading-guide');
        const stopAnimationsCheckbox = panel.querySelector('#a11y-stop-animations');
        const largeCursorCheckbox = panel.querySelector('#a11y-large-cursor');

        boldCheckbox.addEventListener('change', (e) => {
            settings.fontWeight = e.target.checked ? 700 : 400;
            applySettings();
            saveSettings();
        });

        titlesCheckbox.addEventListener('change', (e) => {
            settings.highlightTitles = e.target.checked;
            applySettings();
            saveSettings();
        });

        linksCheckbox.addEventListener('change', (e) => {
            settings.highlightLinks = e.target.checked;
            applySettings();
            saveSettings();
        });

        readingGuideCheckbox.addEventListener('change', (e) => {
            settings.readingGuide = e.target.checked;
            applySettings();
            saveSettings();
        });

        stopAnimationsCheckbox.addEventListener('change', (e) => {
            settings.stopAnimations = e.target.checked;
            applySettings();
            saveSettings();
        });

        largeCursorCheckbox.addEventListener('change', (e) => {
            settings.largeCursor = e.target.checked;
            applySettings();
            saveSettings();
        });

        // Radio buttons (Contrast modes)
        const contrastRadios = panel.querySelectorAll('input[name="contrast"]');
        contrastRadios.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    settings.contrastMode = e.target.value;
                    applySettings();
                    saveSettings();
                }
            });
        });

        // Focus trap
        setupFocusTrap();
    }

    /**
     * Toggle Panel
     */
    function togglePanel() {
        const panel = widget.querySelector('.a11y-panel');
        const button = widget.querySelector('.a11y-floating-button');

        if (panel.hasAttribute('hidden')) {
            openPanel();
        } else {
            closePanel();
        }
    }

    /**
     * Panel öffnen
     */
    function openPanel() {
        const panel = widget.querySelector('.a11y-panel');
        const button = widget.querySelector('.a11y-floating-button');

        panel.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        settings.panelOpen = true;

        // Focus auf ersten Input
        setTimeout(() => {
            const firstInput = panel.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 0);
    }

    /**
     * Panel schließen
     */
    function closePanel() {
        const panel = widget.querySelector('.a11y-panel');
        const button = widget.querySelector('.a11y-floating-button');

        panel.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
        settings.panelOpen = false;
    }

    /**
     * Slider Label updaten
     */
    function updateSliderLabel(input) {
        const value = input.value;
        const label = input.closest('.a11y-control').querySelector('.a11y-value');
        if (label) {
            if (input.id === 'a11y-font-size') {
                label.textContent = value + '%';
            } else if (input.id === 'a11y-line-height') {
                label.textContent = parseFloat(value).toFixed(1);
            } else if (input.id === 'a11y-letter-spacing') {
                label.textContent = value + 'px';
            }
        }
    }

    /**
     * Settings anwenden
     */
    function applySettings() {
        const body = document.body;

        // Remove all a11y classes
        body.classList.remove(
            'a11y-highlight-titles',
            'a11y-highlight-links',
            'a11y-reading-guide',
            'a11y-stop-animations',
            'a11y-large-cursor',
            'a11y-contrast-dark',
            'a11y-contrast-light',
            'a11y-contrast-high',
            'a11y-contrast-lowsat',
            'a11y-contrast-monochrome'
        );

        // Apply font size
        document.documentElement.style.fontSize = settings.fontSize + '%';

        // Apply line height & letter spacing globally
        const style = document.createElement('style');
        style.id = 'a11y-temp-styles';
        const existing = document.getElementById('a11y-temp-styles');
        if (existing) existing.remove();

        style.textContent = `
            * {
                line-height: ${settings.lineHeight} !important;
                letter-spacing: ${settings.letterSpacing}px !important;
                font-weight: ${settings.fontWeight} !important;
            }
        `;
        document.head.appendChild(style);

        // Apply highlights
        if (settings.highlightTitles) {
            body.classList.add('a11y-highlight-titles');
        }
        if (settings.highlightLinks) {
            body.classList.add('a11y-highlight-links');
        }

        // Apply reading guide
        if (settings.readingGuide) {
            body.classList.add('a11y-reading-guide');
            createReadingGuide();
        } else {
            removeReadingGuide();
        }

        // Apply animations stop
        if (settings.stopAnimations) {
            body.classList.add('a11y-stop-animations');
        }

        // Apply large cursor
        if (settings.largeCursor) {
            body.classList.add('a11y-large-cursor');
        }

        // Apply contrast mode
        if (settings.contrastMode !== 'normal') {
            body.classList.add('a11y-contrast-' + settings.contrastMode);
        }

        // Update UI
        updateUI();
    }

    /**
     * UI Controls mit aktuellen Settings updaten
     */
    function updateUI() {
        if (!widget) return;

        const panel = widget.querySelector('.a11y-panel');

        // Update sliders
        const fontSizeInput = panel.querySelector('#a11y-font-size');
        const lineHeightInput = panel.querySelector('#a11y-line-height');
        const letterSpacingInput = panel.querySelector('#a11y-letter-spacing');

        fontSizeInput.value = settings.fontSize;
        updateSliderLabel(fontSizeInput);

        lineHeightInput.value = settings.lineHeight;
        updateSliderLabel(lineHeightInput);

        letterSpacingInput.value = settings.letterSpacing;
        updateSliderLabel(letterSpacingInput);

        // Update checkboxes
        panel.querySelector('#a11y-bold').checked = settings.fontWeight === 700;
        panel.querySelector('#a11y-titles').checked = settings.highlightTitles;
        panel.querySelector('#a11y-links').checked = settings.highlightLinks;
        panel.querySelector('#a11y-reading-guide').checked = settings.readingGuide;
        panel.querySelector('#a11y-stop-animations').checked = settings.stopAnimations;
        panel.querySelector('#a11y-large-cursor').checked = settings.largeCursor;

        // Update radio buttons
        const contrastRadio = panel.querySelector(`input[value="${settings.contrastMode}"]`);
        if (contrastRadio) {
            contrastRadio.checked = true;
        }
    }

    /**
     * Settings zurücksetzen
     */
    function resetSettings() {
        settings = { ...DEFAULT_SETTINGS };
        localStorage.removeItem(STORAGE_KEY);
        applySettings();
        removeReadingGuide();
        console.log('Settings reset');
    }

    /**
     * Settings speichern
     */
    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }

    /**
     * Settings laden
     */
    function loadSettings() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }

    /**
     * Reading Guide erstellen
     */
    function createReadingGuide() {
        removeReadingGuide();

        const guideLine = document.createElement('div');
        guideLine.id = 'a11y-reading-guide-line';
        guideLine.className = 'a11y-reading-guide-line';
        document.body.appendChild(guideLine);

        document.addEventListener('mousemove', updateReadingGuide);
    }

    /**
     * Reading Guide updaten
     */
    function updateReadingGuide(e) {
        const guideLine = document.getElementById('a11y-reading-guide-line');
        if (guideLine) {
            guideLine.style.top = e.clientY + 'px';
        }
    }

    /**
     * Reading Guide entfernen
     */
    function removeReadingGuide() {
        const guideLine = document.getElementById('a11y-reading-guide-line');
        if (guideLine) {
            guideLine.remove();
        }
        document.removeEventListener('mousemove', updateReadingGuide);
    }

    /**
     * Focus Trap im Panel
     */
    function setupFocusTrap() {
        const panel = widget.querySelector('.a11y-panel');
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        panel.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusables = Array.from(panel.querySelectorAll(focusableElements));
            const firstFocusable = focusables[0];
            const lastFocusable = focusables[focusables.length - 1];
            const activeElement = document.activeElement;

            if (e.shiftKey) {
                if (activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    /**
     * Widget setzen (vor init ausführen)
     */
    function setPosition(pos) {
        if (POSITIONS.includes(pos)) {
            DEFAULT_SETTINGS.position = pos;
        }
    }

    /**
     * Public API
     */
    window.AccessibilityWidget.init = init;
    window.AccessibilityWidget.setPosition = setPosition;
    window.AccessibilityWidget.destroy = function() {
        if (widget) widget.remove();
        if (styleElement) styleElement.remove();
        removeReadingGuide();
        widget = null;
        styleElement = null;
    };

    // Auto-init wenn Data-Attribut vorhanden
    if (document.currentScript && document.currentScript.hasAttribute('data-auto-init')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})();




