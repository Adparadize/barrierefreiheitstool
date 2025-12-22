(function () {
  if (window.AdparadizeAccessibilityLoaded) return;
  window.AdparadizeAccessibilityLoaded = true;

  const ICON_BASE = "https://adparadize.github.io/barrierefreiheitstool/icons/";

  const state = {
    fontScale: 1,
    contrast: false,
    dyslexia: false,
    links: false,
    animations: false,
    bigCursor: false
  };

  const save = () =>
    localStorage.setItem("adp-accessibility", JSON.stringify(state));
  const load = () => {
    try {
      Object.assign(
        state,
        JSON.parse(localStorage.getItem("adp-accessibility")) || {}
      );
    } catch {}
  };

  load();

  /* ---------- ROOT ---------- */
  const root = document.createElement("div");
  root.id = "adp-accessibility-root";
  document.body.appendChild(root);

  /* ---------- HTML ---------- */
  root.innerHTML = `
    <button id="adp-toggle" aria-label="Barrierefreiheit öffnen">
      <img src="${ICON_BASE}Barrierefrei.png" alt="Barrierefreiheit">
    </button>

    <div id="adp-panel" hidden role="dialog" aria-label="Barrierefreiheit">
      <div class="adp-header">
        <strong>Barrierefreiheit</strong>
        <button class="adp-close" aria-label="Schließen">×</button>
      </div>

      <div class="adp-grid">
        <button data-action="fontPlus">
          <img src="${ICON_BASE}Groesser.png"><span>Text +</span>
        </button>
        <button data-action="fontMinus">
          <img src="${ICON_BASE}Kleiner.png"><span>Text −</span>
        </button>
        <button data-action="contrast">
          <img src="${ICON_BASE}Contrast.png"><span>Hoher Kontrast</span>
        </button>
        <button data-action="dyslexia">
          <img src="${ICON_BASE}Dyslexie.png"><span>Dyslexie-Schrift</span>
        </button>
        <button data-action="links">
          <img src="${ICON_BASE}Links.png"><span>Links hervorheben</span>
        </button>
        <button data-action="animations">
          <img src="${ICON_BASE}AnimationStop.png"><span>Animationen stoppen</span>
        </button>
        <button data-action="cursor">
          <img src="${ICON_BASE}Cursor.png"><span>Großer Cursor</span>
        </button>
      </div>

      <button data-action="reset" class="adp-reset">
        <img src="${ICON_BASE}Reset.png">
        <span>Einstellungen zurücksetzen</span>
      </button>
    </div>
  `;

  /* ---------- CSS ---------- */
  const style = document.createElement("style");
  style.innerHTML = `
    #adp-accessibility-root { all: initial; }

    #adp-toggle {
      position: fixed;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: #000;
      border-radius: 50%;
      padding: 10px;
      border: none;
      cursor: pointer;
      z-index: 100000;
    }

    #adp-toggle img {
      width: 32px;
      height: 32px;
      display: block;
    }

    #adp-panel {
      position: fixed;
      left: 72px;
      top: 50%;
      transform: translateY(-50%);
      width: 300px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0,0,0,.3);
      padding: 14px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 100000;
    }

    .adp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 16px;
    }

    .adp-close {
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
    }

    .adp-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .adp-grid button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px;
      background: #f4f4f4;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
    }

    .adp-grid button:hover {
      background: #e9e9e9;
    }

    .adp-grid img {
      width: 24px;
      height: 24px;
    }

    .adp-reset {
      margin-top: 14px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      background: #000;
      color: #fff;
      border-radius: 12px;
      padding: 10px;
      border: none;
      cursor: pointer;
      font-size: 13px;
    }

    .adp-reset img {
      width: 20px;
      height: 20px;
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

    @media (max-width: 600px) {
      #adp-panel {
        left: 50%;
        top: auto;
        bottom: 20px;
        transform: translateX(-50%);
        width: calc(100% - 40px);
      }
    }
  `;
  document.head.appendChild(style);

  /* ---------- LOGIC ---------- */
  const panel = root.querySelector("#adp-panel");

  root.querySelector("#adp-toggle").onclick = () => {
    panel.hidden = !panel.hidden;
  };

  root.querySelector(".adp-close").onclick = () => {
    panel.hidden = true;
  };

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    switch (btn.dataset.action) {
      case "fontPlus":
        state.fontScale = Math.min(state.fontScale + 0.1, 1.6);
        document.documentElement.style.fontSize = state.fontScale + "em";
        break;

      case "fontMinus":
        state.fontScale = Math.max(state.fontScale - 0.1, 0.8);
        document.documentElement.style.fontSize = state.fontScale + "em";
        break;

      case "contrast":
        document.documentElement.classList.toggle("adp-contrast");
        state.contrast = !state.contrast;
        break;

      case "dyslexia":
        document.documentElement.classList.toggle("adp-dyslexia");
        state.dyslexia = !state.dyslexia;
        break;

      case "links":
        document.documentElement.classList.toggle("adp-links");
        state.links = !state.links;
        break;

      case "animations":
        document.documentElement.classList.toggle("adp-no-anim");
        state.animations = !state.animations;
        break;

      case "cursor":
        document.documentElement.classList.toggle("adp-big-cursor");
        state.bigCursor = !state.bigCursor;
        break;

      case "reset":
        localStorage.removeItem("adp-accessibility");
        location.reload();
    }

    save();
  });

  /* ---------- RESTORE STATE ---------- */
  if (state.bigCursor) document.documentElement.classList.add("adp-big-cursor");
  if (state.contrast) document.documentElement.classList.add("adp-contrast");
  if (state.dyslexia) document.documentElement.classList.add("adp-dyslexia");
  if (state.links) document.documentElement.classList.add("adp-links");
  if (state.animations) document.documentElement.classList.add("adp-no-anim");
  if (state.fontScale !== 1)
    document.documentElement.style.fontSize = state.fontScale + "em";
})();
