(function(){
  'use strict';

  /* ============================================================
     ADPARADIZE ACCESSIBILITY WIDGET v1.0
     Selbst-injizierendes Widget – einfach hosten & einbinden.
     adparadize.de
     ============================================================ */

  // Verhindert doppeltes Laden
  if (document.getElementById('adp-trigger')) return;

  // ── CSS injizieren ──────────────────────────────────────────
  const css = `
#adp-reading-guide{position:fixed;left:0;right:0;height:40px;background:rgba(0,0,0,.12);pointer-events:none;z-index:99997;display:none;border-top:2px solid rgba(0,0,0,.4);border-bottom:2px solid rgba(0,0,0,.4)}
#adp-trigger{position:fixed;bottom:28px;right:28px;z-index:99998;width:56px;height:56px;background:#1a1a1a;color:#fff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(0,0,0,.35);transition:transform .2s,box-shadow .2s;outline:none}
#adp-trigger:hover{transform:scale(1.08);box-shadow:0 6px 30px rgba(0,0,0,.45)}
#adp-trigger:focus-visible{outline:3px solid #fff;outline-offset:3px}
#adp-trigger svg{width:26px;height:26px}
#adp-panel{position:fixed;bottom:96px;right:28px;z-index:99999;width:340px;max-height:88vh;overflow-y:auto;background:#fff;border:2px solid #1a1a1a;border-radius:4px;box-shadow:8px 8px 0 #1a1a1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;transform:translateY(20px) scale(.97);opacity:0;pointer-events:none;transition:transform .25s cubic-bezier(.16,1,.3,1),opacity .2s}
#adp-panel.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all}
#adp-panel::-webkit-scrollbar{width:4px}
#adp-panel::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}
.adp-panel-header{background:#1a1a1a;color:#fff;padding:18px 20px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.adp-brand{display:flex;flex-direction:column;gap:2px}
.adp-brand-name{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.55;font-weight:400}
.adp-panel-title{font-size:16px;font-weight:700;letter-spacing:-.01em}
.adp-close{background:none;border:none;color:#fff;cursor:pointer;opacity:.7;padding:2px;margin-top:2px;line-height:1;transition:opacity .15s}
.adp-close:hover{opacity:1}
.adp-close svg{width:18px;height:18px;display:block}
.adp-reset-bar{padding:10px 20px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:flex-end}
.adp-reset-btn{background:none;border:1.5px solid #1a1a1a;color:#1a1a1a;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;cursor:pointer;border-radius:2px;font-family:inherit;transition:background .15s,color .15s}
.adp-reset-btn:hover{background:#1a1a1a;color:#fff}
.adp-section{padding:16px 20px;border-bottom:1px solid #e8e8e8}
.adp-section:last-child{border-bottom:none}
.adp-section-label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;margin-bottom:12px;font-weight:600}
.adp-profiles{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.adp-profile-btn{background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px 10px 9px;cursor:pointer;text-align:left;transition:border-color .15s,background .15s;font-family:inherit;display:flex;flex-direction:column;gap:5px}
.adp-profile-btn:hover{border-color:#1a1a1a;background:#fafafa}
.adp-profile-btn.active{background:#1a1a1a;border-color:#1a1a1a;color:#fff}
.adp-pb-icon{font-size:18px;line-height:1}
.adp-pb-label{font-size:11px;font-weight:600;letter-spacing:.02em;line-height:1.3}
.adp-toggle-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.adp-toggle-row:last-child{margin-bottom:0}
.adp-toggle-label{font-size:13px;color:#1a1a1a;font-weight:500}
.adp-toggle-label small{display:block;font-size:11px;font-weight:400;color:#888;margin-top:1px}
.adp-switch{position:relative;width:42px;height:24px;flex-shrink:0}
.adp-switch input{opacity:0;width:0;height:0;position:absolute}
.adp-slider{position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s}
.adp-slider::before{content:'';position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.adp-switch input:checked+.adp-slider{background:#1a1a1a}
.adp-switch input:checked+.adp-slider::before{transform:translateX(18px)}
.adp-switch input:focus-visible+.adp-slider{outline:2px solid #1a1a1a;outline-offset:2px}
.adp-stepper{display:flex;align-items:center;border:1.5px solid #d0d0d0;border-radius:3px;overflow:hidden}
.adp-step-btn{background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;transition:background .15s;font-family:inherit;flex-shrink:0}
.adp-step-btn:hover{background:#f0f0f0}
.adp-step-val{width:36px;text-align:center;font-size:12px;font-weight:700;color:#1a1a1a;user-select:none;border-left:1.5px solid #d0d0d0;border-right:1.5px solid #d0d0d0}
.adp-color-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.adp-color-btn{border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-family:inherit;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;transition:border-color .15s,background .15s}
.adp-color-btn:hover{border-color:#1a1a1a}
.adp-color-btn.active{background:#1a1a1a;color:#fff;border-color:#1a1a1a}
.adp-cb-dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:6px;vertical-align:middle;border:1px solid rgba(0,0,0,.15)}
.adp-panel-footer{padding:10px 20px;background:#f5f5f0;border-top:1px solid #e8e8e8;font-size:10px;color:#aaa;letter-spacing:.06em;text-transform:uppercase;text-align:center}
html.adp-high-contrast body{filter:contrast(1.6)!important}
html.adp-high-contrast-soft body{filter:contrast(1.35) brightness(1.05)!important}
html.adp-mono body{filter:grayscale(1)!important}
html.adp-desat body{filter:saturate(.4)!important}
html.adp-sat body{filter:saturate(2)!important}
html.adp-invert body{filter:invert(1) hue-rotate(180deg)!important}
html.adp-no-anim *,html.adp-no-anim *::before,html.adp-no-anim *::after{animation-duration:.001ms!important;transition-duration:.001ms!important}
html.adp-underline-links a{text-decoration:underline!important;text-underline-offset:3px!important}
html.adp-dyslexia body,html.adp-dyslexia p,html.adp-dyslexia li,html.adp-dyslexia h1,html.adp-dyslexia h2,html.adp-dyslexia h3{font-family:'Comic Sans MS',cursive!important;letter-spacing:.07em!important;word-spacing:.2em!important;line-height:1.9!important}
html.adp-focus-highlight *:focus{outline:3px solid #1a1a1a!important;outline-offset:3px!important;box-shadow:0 0 0 5px rgba(26,26,26,.25)!important}
html.adp-screen-reader img:not([alt]){outline:3px solid red!important}
.adp-big-cursor,.adp-big-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M8 4l24 16-10 2-6 12z' fill='%231a1a1a' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 8 4,auto!important}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── HTML injizieren ─────────────────────────────────────────
  const html = `
<div id="adp-reading-guide" role="presentation" aria-hidden="true"></div>

<button id="adp-trigger" aria-label="Barrierefreiheit-Einstellungen öffnen" aria-expanded="false" aria-controls="adp-panel">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
    <button class="adp-close" aria-label="Schließen" id="adp-close-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <div class="adp-reset-bar">
    <button class="adp-reset-btn" id="adp-reset-btn">&#8635; Alles zur&uuml;cksetzen</button>
  </div>
  <div class="adp-section">
    <div class="adp-section-label">Schnellprofile</div>
    <div class="adp-profiles">
      <button class="adp-profile-btn" data-profile="seizure" aria-pressed="false"><span class="adp-pb-icon">&#9889;</span><span class="adp-pb-label">Anfallssicher</span></button>
      <button class="adp-profile-btn" data-profile="vision" aria-pressed="false"><span class="adp-pb-icon">&#128065;</span><span class="adp-pb-label">Sehbehinderung</span></button>
      <button class="adp-profile-btn" data-profile="cognitive" aria-pressed="false"><span class="adp-pb-icon">&#129504;</span><span class="adp-pb-label">Kognitiv</span></button>
      <button class="adp-profile-btn" data-profile="adhd" aria-pressed="false"><span class="adp-pb-icon">&#127919;</span><span class="adp-pb-label">ADHS-freundlich</span></button>
      <button class="adp-profile-btn" data-profile="dyslexia" aria-pressed="false"><span class="adp-pb-icon">&#128214;</span><span class="adp-pb-label">Legasthenie</span></button>
      <button class="adp-profile-btn" data-profile="keyboard" aria-pressed="false"><span class="adp-pb-icon">&#9000;&#65039;</span><span class="adp-pb-label">Tastatur-Navigation</span></button>
    </div>
  </div>
  <div class="adp-section">
    <div class="adp-section-label">Schrift &amp; Lesen</div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Schriftgr&ouml;&szlig;e</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" id="adp-font-dec" aria-label="Schrift verkleinern">&minus;</button>
        <span class="adp-step-val" id="adp-font-val" aria-live="polite">100%</span>
        <button class="adp-step-btn" id="adp-font-inc" aria-label="Schrift vergr&ouml;&szlig;ern">+</button>
      </div>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Zeilenh&ouml;he</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" id="adp-lh-dec" aria-label="Zeilenhoehe verringern">&minus;</button>
        <span class="adp-step-val" id="adp-lh-val" aria-live="polite">1&times;</span>
        <button class="adp-step-btn" id="adp-lh-inc" aria-label="Zeilenhoehe erhoehen">+</button>
      </div>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Zeichenabstand</div>
      <div class="adp-stepper">
        <button class="adp-step-btn" id="adp-ls-dec" aria-label="Abstand verringern">&minus;</button>
        <span class="adp-step-val" id="adp-ls-val" aria-live="polite">0&times;</span>
        <button class="adp-step-btn" id="adp-ls-inc" aria-label="Abstand erhoehen">+</button>
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
      <button class="adp-color-btn" data-filter="mono"><span class="adp-cb-dot" style="background:linear-gradient(135deg,#999,#333)"></span>Graustufen</button>
      <button class="adp-color-btn" data-filter="invert"><span class="adp-cb-dot" style="background:linear-gradient(135deg,#000,#fff)"></span>Invertiert</button>
      <button class="adp-color-btn" data-filter="high-contrast"><span class="adp-cb-dot" style="background:#000;border-color:#fff"></span>Hoher Kontrast</button>
      <button class="adp-color-btn" data-filter="high-contrast-soft"><span class="adp-cb-dot" style="background:linear-gradient(135deg,#333,#ccc)"></span>Sanfter Kontrast</button>
      <button class="adp-color-btn" data-filter="desat"><span class="adp-cb-dot" style="background:linear-gradient(135deg,#c8b8a2,#9ea8c8)"></span>Desaturiert</button>
      <button class="adp-color-btn" data-filter="sat"><span class="adp-cb-dot" style="background:linear-gradient(135deg,#ff4444,#44aaff)"></span>Ges&auml;ttigt</button>
    </div>
  </div>
  <div class="adp-section">
    <div class="adp-section-label">Visuelle Hilfsmittel</div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Leselinie<small>Hilft beim Zeilenverfolgen</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-reading-guide-toggle"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Gro&szlig;er Cursor</div>
      <label class="adp-switch"><input type="checkbox" id="adp-big-cursor"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Animationen stoppen</div>
      <label class="adp-switch"><input type="checkbox" id="adp-no-anim"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Fokus hervorheben<small>F&uuml;r Tastatur-Navigation</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-focus-highlight"><span class="adp-slider"></span></label>
    </div>
    <div class="adp-toggle-row">
      <div class="adp-toggle-label">Screenreader-Modus<small>Bilder ohne alt-Text markieren</small></div>
      <label class="adp-switch"><input type="checkbox" id="adp-screen-reader"><span class="adp-slider"></span></label>
    </div>
  </div>
  <div class="adp-panel-footer">Accessibility Tool by Adparadize</div>
</div>
`;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // ── Logik ───────────────────────────────────────────────────
  const DEFAULT={fontScale:100,lineHeight:0,letterSpacing:0,filter:null,dyslexiaFont:false,underlineLinks:false,textHighlight:false,readingGuide:false,bigCursor:false,noAnim:false,focusHighlight:false,screenReader:false,profile:null};
  let state=Object.assign({},DEFAULT);
  const KEY='adp_a11y';
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function load(){try{const r=localStorage.getItem(KEY);if(r)state=Object.assign({},DEFAULT,JSON.parse(r));}catch(e){}}

  const trigger=document.getElementById('adp-trigger');
  const panel=document.getElementById('adp-panel');
  const closeBtn=document.getElementById('adp-close-btn');
  const resetBtn=document.getElementById('adp-reset-btn');
  const guide=document.getElementById('adp-reading-guide');
  const fontVal=document.getElementById('adp-font-val');
  const lhVal=document.getElementById('adp-lh-val');
  const lsVal=document.getElementById('adp-ls-val');
  const docHtml=document.documentElement;
  const body=document.body;

  let isOpen=false;
  function openPanel(){isOpen=true;panel.classList.add('open');trigger.setAttribute('aria-expanded','true');closeBtn.focus();}
  function closePanel(){isOpen=false;panel.classList.remove('open');trigger.setAttribute('aria-expanded','false');trigger.focus();}
  trigger.addEventListener('click',()=>isOpen?closePanel():openPanel());
  closeBtn.addEventListener('click',closePanel);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)closePanel();});
  document.addEventListener('click',e=>{if(isOpen&&!panel.contains(e.target)&&e.target!==trigger)closePanel();});

  const FMAP={'mono':'adp-mono','invert':'adp-invert','high-contrast':'adp-high-contrast','high-contrast-soft':'adp-high-contrast-soft','desat':'adp-desat','sat':'adp-sat'};
  function applyFilter(f){Object.values(FMAP).forEach(c=>docHtml.classList.remove(c));if(f&&FMAP[f])docHtml.classList.add(FMAP[f]);}

  const FSTEPS=[75,87,100,112,125,150,175,200];
  function setFont(v){state.fontScale=v;body.style.fontSize=v+'%';fontVal.textContent=v+'%';}

  const LHV=[null,'1.8','2.2','2.6'],LHL=['1×','1.8×','2.2×','2.6×'];
  function setLH(s){state.lineHeight=s;lhVal.textContent=LHL[s];body.style.lineHeight=LHV[s]||'';}

  const LSV=[null,'.04em','.09em','.15em'],LSL=['0×','1×','2×','3×'];
  function setLS(s){state.letterSpacing=s;lsVal.textContent=LSL[s];document.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,a,span,td,th').forEach(el=>{el.style.letterSpacing=LSV[s]||'';});}

  function hiOn(e){e.currentTarget.style.background='rgba(255,255,100,.35)';}
  function hiOff(e){e.currentTarget.style.background='';}

  function applyToggles(){
    docHtml.classList.toggle('adp-dyslexia',state.dyslexiaFont);
    document.getElementById('adp-dyslexia-font').checked=state.dyslexiaFont;
    docHtml.classList.toggle('adp-underline-links',state.underlineLinks);
    document.getElementById('adp-underline-links').checked=state.underlineLinks;
    const els=document.querySelectorAll('p,li');
    if(state.textHighlight){els.forEach(el=>{el.addEventListener('mouseover',hiOn);el.addEventListener('mouseout',hiOff);});}
    else{els.forEach(el=>{el.removeEventListener('mouseover',hiOn);el.removeEventListener('mouseout',hiOff);el.style.background='';});}
    document.getElementById('adp-text-highlight').checked=state.textHighlight;
    guide.style.display=state.readingGuide?'block':'none';
    document.getElementById('adp-reading-guide-toggle').checked=state.readingGuide;
    body.classList.toggle('adp-big-cursor',state.bigCursor);
    document.getElementById('adp-big-cursor').checked=state.bigCursor;
    docHtml.classList.toggle('adp-no-anim',state.noAnim);
    document.getElementById('adp-no-anim').checked=state.noAnim;
    docHtml.classList.toggle('adp-focus-highlight',state.focusHighlight);
    document.getElementById('adp-focus-highlight').checked=state.focusHighlight;
    docHtml.classList.toggle('adp-screen-reader',state.screenReader);
    document.getElementById('adp-screen-reader').checked=state.screenReader;
  }

  document.querySelectorAll('.adp-color-btn').forEach(btn=>{
    btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click',()=>{
      const f=btn.dataset.filter;
      state.filter=(state.filter===f)?null:f;
      applyFilter(state.filter);
      document.querySelectorAll('.adp-color-btn').forEach(b=>{b.classList.toggle('active',b.dataset.filter===state.filter);b.setAttribute('aria-pressed',b.dataset.filter===state.filter?'true':'false');});
      save();
    });
  });

  const PROFILES={
    seizure:{noAnim:true,filter:'desat'},
    vision:{filter:'high-contrast',fontScale:125,focusHighlight:true},
    cognitive:{fontScale:112,lineHeight:1,underlineLinks:true,noAnim:true},
    adhd:{textHighlight:true,readingGuide:true,noAnim:true},
    dyslexia:{dyslexiaFont:true,lineHeight:2,letterSpacing:1},
    keyboard:{focusHighlight:true,underlineLinks:true},
  };
  document.querySelectorAll('.adp-profile-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const k=btn.dataset.profile;
      state=Object.assign({},DEFAULT,state.profile===k?{profile:null}:{...PROFILES[k],profile:k});
      applyAll();save();
    });
  });
  function syncProfiles(){document.querySelectorAll('.adp-profile-btn').forEach(btn=>{const a=btn.dataset.profile===state.profile;btn.classList.toggle('active',a);btn.setAttribute('aria-pressed',a?'true':'false');});}

  function bind(id,key){document.getElementById(id).addEventListener('change',function(){state[key]=this.checked;applyToggles();save();});}
  bind('adp-dyslexia-font','dyslexiaFont');bind('adp-underline-links','underlineLinks');bind('adp-text-highlight','textHighlight');
  bind('adp-reading-guide-toggle','readingGuide');bind('adp-big-cursor','bigCursor');bind('adp-no-anim','noAnim');
  bind('adp-focus-highlight','focusHighlight');bind('adp-screen-reader','screenReader');

  document.getElementById('adp-font-inc').addEventListener('click',()=>{const i=FSTEPS.indexOf(state.fontScale);if(i<FSTEPS.length-1){setFont(FSTEPS[i+1]);save();}});
  document.getElementById('adp-font-dec').addEventListener('click',()=>{const i=FSTEPS.indexOf(state.fontScale);if(i>0){setFont(FSTEPS[i-1]);save();}});
  document.getElementById('adp-lh-inc').addEventListener('click',()=>{if(state.lineHeight<3){setLH(state.lineHeight+1);save();}});
  document.getElementById('adp-lh-dec').addEventListener('click',()=>{if(state.lineHeight>0){setLH(state.lineHeight-1);save();}});
  document.getElementById('adp-ls-inc').addEventListener('click',()=>{if(state.letterSpacing<3){setLS(state.letterSpacing+1);save();}});
  document.getElementById('adp-ls-dec').addEventListener('click',()=>{if(state.letterSpacing>0){setLS(state.letterSpacing-1);save();}});

  document.addEventListener('mousemove',e=>{if(state.readingGuide)guide.style.top=(e.clientY-20)+'px';});
  resetBtn.addEventListener('click',()=>{state=Object.assign({},DEFAULT);applyAll();save();});

  function applyAll(){
    setFont(state.fontScale);setLH(state.lineHeight);setLS(state.letterSpacing);
    applyFilter(state.filter);applyToggles();syncProfiles();
    document.querySelectorAll('.adp-color-btn').forEach(b=>{b.classList.toggle('active',b.dataset.filter===state.filter);b.setAttribute('aria-pressed',b.dataset.filter===state.filter?'true':'false');});
  }

  load();applyAll();

})();
