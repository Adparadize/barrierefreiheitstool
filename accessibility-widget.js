root.innerHTML = `
  <button id="adp-toggle" aria-label="Barrierefreiheit öffnen">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Barrierefrei.png" alt="">
  </button>

  <div id="adp-panel" hidden>
    <div class="adp-header">
      <strong>Barrierefreiheit</strong>
      <button class="adp-close">✕</button>
    </div>

    <div class="adp-grid">
      <button data-action="fontPlus">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Groesser.png">
        <span>Text +</span>
      </button>

      <button data-action="fontMinus">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Kleiner.png">
        <span>Text −</span>
      </button>

      <button data-action="contrast">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Contrast.png">
        <span>Hoher Kontrast</span>
      </button>

      <button data-action="dyslexia">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Dyslexie.png">
        <span>Dyslexie-Schrift</span>
      </button>

      <button data-action="links">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Links.png">
        <span>Links hervorheben</span>
      </button>

      <button data-action="animations">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/AnimationStop.png">
        <span>Animationen stoppen</span>
      </button>

      <button data-action="cursor">
        <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Cursor.png">
        <span>Großer Cursor</span>
      </button>
    </div>

    <button data-action="reset" class="adp-reset">
      <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Reset.png">
      <span>Einstellungen zurücksetzen</span>
    </button>
  </div>
`;

