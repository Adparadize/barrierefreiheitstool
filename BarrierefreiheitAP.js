<!-- 🦽 Barrierefreiheits-Widget Adparadize -->
<div id="accessibility-toggle" onclick="toggleToolbar()" title="Barrierefreiheit öffnen">
  <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Barrierefrei.png" alt="Barrierefreiheit" />
</div>

<div id="accessibility-toolbar" style="display: none;">
  <div id="accessibility-header"><strong>Adparadize</strong></div>
  <button onclick="applyInstantView()">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Sofortansicht.png" alt="Sofortansicht" /> Sofortansicht
  </button>
  <button onclick="toggleContrast()">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Contrast.png" alt="Kontrast" /> Kontrast
  </button>
  <button onclick="changeTextSize(1)">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Groesser.png" alt="Textgröße erhöhen" /> Text +
  </button>
  <button onclick="changeTextSize(-1)">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Kleiner.png" alt="Textgröße verringern" /> Text −
  </button>
  <button onclick="toggleColorBlindMode()">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Farbschwache.png" alt="Farbschwächemodus" /> Farbschwäche
  </button>
  <button onclick="startReading()">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Vorlesen.png" alt="Vorlesen" /> Vorlesen
  </button>
  <button onclick="resetAccessibility()">
    <img src="https://adparadize.github.io/barrierefreiheitstool/icons/Reset.png" alt="Zurücksetzen" /> Zurücksetzen
  </button>
</div>

<style>
  #accessibility-toggle {
    position: fixed;
    top: 40%;
    left: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10000;
  }

  #accessibility-toggle img {
    width: 48px;
    height: 48px;
  }

  #accessibility-toolbar {
    position: fixed;
    top: 40%;
    left: 70px;
    background: #ffffff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: sans-serif;
  }

  #accessibility-toolbar button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #f0f0f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  #accessibility-toolbar button img {
    width: 20px;
    height: 20px;
  }

  #accessibility-header {
    font-size: 16px;
    margin-bottom: 6px;
    text-align: center;
    color: #333;
    font-weight: bold;
  }

  body.high-contrast {
    background-color: #000 !important;
    color: #fff !important;
    filter: contrast(180%) grayscale(100%);
  }

  body.colorblind-mode, body.colorblind-mode * {
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }

  *:focus {
    outline: 3px solid #ffcc00;
    outline-offset: 2px;
  }
</style>

