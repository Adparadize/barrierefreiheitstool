(function () {
  if (window.AdparadizeAccessibility) return;
  window.AdparadizeAccessibility = true;

  const state = {
    fontScale: 1,
    contrast: false,
    dyslexiaFont: false,
    highlightLinks: false,
    stopAnimations: false,
    bigCursor: false
  };

  const save = () => localStorage.setItem('adp-accessibility', JSON.stringify(state));
  const load = () => Object.assign(state, JSON.parse(localStorage.getItem('adp-accessibility') || '{}'));

  load();

  const root = document.createElement('div');
  root.id = 'adp-accessibility-root';
  document.body.appendChild(root);

  root.innerHTML = `
    <button id="adp-toggle" aria-label="Barrierefreiheit öffnen">🦽</button>
    <div id="adp-panel" hidden>
      <h3>Barrierefreiheit</h3>

      <div class="adp-group">
        <button data-action="fontPlus">Text +</button>
        <button data-action="fontMinus">Text −</button>
      </div>

      <button data-action="contrast">Hoher Kontrast</button>
      <button data-action="dyslexia">Dyslexie-Schrift</button>
      <button data-action="links">Links hervorheben</button>
      <button data-action="animations">Animationen stoppen</button>
      <button data-action="cursor">Großer Cursor</button>

      <button data-action="reset" class="adp-reset">Zurücksetzen</button>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    #adp-toggle {
      position: fixed;
      left: 12px;
      top: 40%;
      z-index: 100000;
      font-size: 24px;
      border-radius: 50%;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    #adp-panel {
      position: fixed;
      left: 70px;
      top: 30%;
      background: #fff;
      padding: 14px;
      width: 240px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      z-index: 100000;
      font-family: system-ui, sans-serif;
    }

    .adp-group {
      display: flex;
      gap: 6px;
    }

    .adp-reset {
      margin-top: 10px;
      background: #000;
      color: #fff;
    }

    .adp-contrast {
      background: #000 !important;
      color: #fff !important;
    }

    .adp-dyslexia {
      font-family: "OpenDyslexic", Arial, sans-serif !important;
    }

    .adp-links a {
      outline: 3px solid #ffcc00;
      background: #000;
      color: #fff !important;
    }

    .adp-no-anim * {
      animation: none !important;
      transition: none !important;
    }

    .adp-big-cursor,
    .adp-big-cursor * {
      cursor: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'>\
<polygon points='0,0 0,40 12,30 22,50 28,46 18,26 38,26' fill='black' stroke='white' stroke-width='2'/>\
</svg>") 0 0, auto !important;
    }
  `;
  document.head.appendChild(style);

  const panel = root.querySelector('#adp-panel');

  root.querySelector('#adp-toggle').addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });

  root.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    switch (action) {
      case 'fontPlus':
        state.fontScale = Math.min(state.fontScale + 0.1, 1.6);
        document.documentElement.style.fontSize = state.fontScale + 'em';
        break;

      case 'fontMinus':
        state.fontScale = Math.max(state.fontScale - 0.1, 0.8);
        document.documentElement.style.fontSize = state.fontScale + 'em';
        break;

      case 'contrast':
        document.documentElement.classList.toggle('adp-contrast');
        state.contrast = !state.contrast;
        break;

      case 'dyslexia':
        document.documentElement.classList.toggle('adp-dyslexia');
        state.dyslexiaFont = !state.dyslexiaFont;
        break;

      case 'links':
        document.documentElement.classList.toggle('adp-links');
        state.highlightLinks = !state.highlightLinks;
        break;

      case 'animations':
        document.documentElement.classList.toggle('adp-no-anim');
        state.stopAnimations = !state.stopAnimations;
        break;

      case 'cursor':
        document.documentElement.classList.toggle('adp-big-cursor');
        state.bigCursor = !state.bigCursor;
        break;

      case 'reset':
        localStorage.removeItem('adp-accessibility');
        location.reload();
    }

    save();
  });

  if (state.bigCursor) document.documentElement.classList.add('adp-big-cursor');
})();
