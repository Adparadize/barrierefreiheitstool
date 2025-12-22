(function () {
  if (window.AdparadizeAccessibilityLoaded) return;
  window.AdparadizeAccessibilityLoaded = true;

  const script = document.currentScript;

  /* ========= KONFIGURATION ÜBER DATA-ATTRIBUTES ========= */
  const config = {
    position: script.dataset.adpPosition || "bottom-left",
    primary: script.dataset.adpPrimary || "#000000",
    background: script.dataset.adpBackground || "#ffffff",
    outline: script.dataset.adpOutline || "#000000",
    statement: script.dataset.adpStatement || ""
  };

  const ICON_BASE = "https://adparadize.github.io/barrierefreiheitstool/icons/";

  /* ========= POSITION ========= */
  const pos = {
    "bottom-left": "left:16px; bottom:16px;",
    "bottom-right": "right:16px; bottom:16px;",
    "middle-left": "left:16px; top:50%; transform:translateY(-50%);",
    "middle-right": "right:16px; top:50%; transform:translateY(-50%);"
  }[config.position];

  /* ========= HTML ========= */
  const root = document.createElement("div");
  root.innerHTML = `
    <button id="adp-toggle" aria-label="Barrierefreiheit">
      <img src="${ICON_BASE}Barrierefrei.png" alt="">
    </button>

    <div id="adp-panel" hidden>
      <div class="adp-header">
        <strong>Barrierefreiheit</strong>
        <button id="adp-close">×</button>
      </div>

      <div class="adp-grid">
        <button data-action="fontPlus"><img src="${ICON_BASE}Groesser.png"><span>Text +</span></button>
        <button data-action="fontMinus"><img src="${ICON_BASE}Kleiner.png"><span>Text −</span></button>
        <button data-action="contrast"><img src="${ICON_BASE}Contrast.png"><span>Kontrast</span></button>
        <button data-action="dyslexia"><img src="${ICON_BASE}Dyslexie.png"><span>Dyslexie</span></button>
        <button data-action="cursor"><img src="${ICON_BASE}Cursor.png"><span>Cursor</span></button>
      </div>

      ${
        config.statement
          ? `<a class="adp-statement" href="${config.statement}" target="_blank">Barrierefreiheitserklärung</a>`
          : ""
      }
    </div>
  `;
  document.body.appendChild(root);

  /* ========= CSS ========= */
  const style = document.createElement("style");
  style.innerHTML = `
    #adp-toggle {
      position: fixed;
      ${pos}
      background:${config.primary};
      border:2px solid ${config.outline};
      border-radius:50%;
      padding:10px;
      cursor:pointer;
      z-index:999999;
    }

    #adp-toggle img { width:28px; height:28px; }

    #adp-panel {
      position: fixed;
      ${pos}
      margin-bottom:70px;
      width:280px;
      background:${config.background};
      border-radius:16px;
      box-shadow:0 20px 40px rgba(0,0,0,.3);
      padding:14px;
      font-family:system-ui,sans-serif;
      z-index:999999;
    }

    .adp-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:12px;
    }

    .adp-grid {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:10px;
    }

    .adp-grid button {
      border:none;
      background:#f3f3f3;
      border-radius:10px;
      padding:10px;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:6px;
      cursor:pointer;
      font-size:12px;
    }

    .adp-statement {
      display:block;
      margin-top:12px;
      text-align:center;
      font-size:12px;
    }

    .adp-big-cursor, .adp-big-cursor * {
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(style);

  /* ========= LOGIK ========= */
  const panel = root.querySelector("#adp-panel");
  root.querySelector("#adp-toggle").onclick = () => (panel.hidden = !panel.hidden);
  root.querySelector("#adp-close").onclick = () => (panel.hidden = true);

  root.onclick = (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    if (btn.dataset.action === "cursor") {
      document.documentElement.classList.toggle("adp-big-cursor");
    }
  };
})();
