<div id="adp-rg" role="presentation" aria-hidden="true" style="position:fixed;left:0;right:0;height:40px;background:rgba(0,0,0,.12);pointer-events:none;z-index:2147483645;display:none;border-top:2px solid rgba(0,0,0,.4);border-bottom:2px solid rgba(0,0,0,.4);"></div>

<button id="adp-btn" type="button" aria-label="Barrierefreiheit-Einstellungen" aria-expanded="false" style="position:fixed;bottom:28px;right:28px;z-index:2147483646;width:56px;height:56px;background:#1a1a1a;color:#fff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(0,0,0,.35);padding:0;margin:0;-webkit-appearance:none;appearance:none;">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:26px;height:26px;pointer-events:none;" aria-hidden="true"><circle cx="12" cy="4" r="1.5"/><path d="M6 8h12M9 8v8M15 8v8M9 14l-3 4M15 14l3 4"/></svg>
</button>

<div id="adp-panel" role="dialog" aria-label="Barrierefreiheit-Einstellungen" style="position:fixed;bottom:96px;right:28px;z-index:2147483647;width:340px;max-height:88vh;overflow-y:auto;background:#fff;border:2px solid #1a1a1a;border-radius:4px;box-shadow:8px 8px 0 #1a1a1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;display:none;box-sizing:border-box;">

  <div style="background:#1a1a1a;color:#fff;padding:18px 20px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
    <div>
      <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.5;margin-bottom:2px;">Adparadize</div>
      <div style="font-size:16px;font-weight:700;">Accessibility Tool</div>
    </div>
    <button id="adp-close" type="button" aria-label="Schließen" style="background:none;border:none;color:#fff;cursor:pointer;opacity:.7;padding:2px;line-height:1;-webkit-appearance:none;appearance:none;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:18px;height:18px;display:block;pointer-events:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <div style="padding:10px 20px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:flex-end;">
    <button id="adp-reset" type="button" style="background:none;border:1.5px solid #1a1a1a;color:#1a1a1a;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;cursor:pointer;border-radius:2px;font-family:inherit;-webkit-appearance:none;appearance:none;">↺ Alles zurücksetzen</button>
  </div>

  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e8;">
    <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;margin-bottom:12px;font-weight:600;">Schnellprofile</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <button class="adp-prof" data-p="seizure" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">⚡</span><span style="font-size:11px;font-weight:600;">Anfallssicher</span></button>
      <button class="adp-prof" data-p="vision" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">👁</span><span style="font-size:11px;font-weight:600;">Sehbehinderung</span></button>
      <button class="adp-prof" data-p="cognitive" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">🧠</span><span style="font-size:11px;font-weight:600;">Kognitiv</span></button>
      <button class="adp-prof" data-p="adhd" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">🎯</span><span style="font-size:11px;font-weight:600;">ADHS-freundlich</span></button>
      <button class="adp-prof" data-p="dyslexia" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">📖</span><span style="font-size:11px;font-weight:600;">Legasthenie</span></button>
      <button class="adp-prof" data-p="keyboard" type="button" style="background:#fff;border:1.5px solid #d0d0d0;border-radius:3px;padding:10px;cursor:pointer;text-align:left;font-family:inherit;display:flex;flex-direction:column;gap:5px;color:#1a1a1a;-webkit-appearance:none;appearance:none;"><span style="font-size:18px;line-height:1;">⌨️</span><span style="font-size:11px;font-weight:600;">Tastatur-Nav.</span></button>
    </div>
  </div>

  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e8;">
    <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;margin-bottom:12px;font-weight:600;">Schrift &amp; Lesen</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Schriftgröße</span>
      <div style="display:flex;align-items:center;border:1.5px solid #d0d0d0;border-radius:3px;overflow:hidden;">
        <button id="adp-fd" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">−</button>
        <span id="adp-fv" style="width:36px;text-align:center;font-size:12px;font-weight:700;color:#1a1a1a;border-left:1.5px solid #d0d0d0;border-right:1.5px solid #d0d0d0;">100%</span>
        <button id="adp-fi" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">+</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Zeilenhöhe</span>
      <div style="display:flex;align-items:center;border:1.5px solid #d0d0d0;border-radius:3px;overflow:hidden;">
        <button id="adp-lhd" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">−</button>
        <span id="adp-lhv" style="width:36px;text-align:center;font-size:12px;font-weight:700;color:#1a1a1a;border-left:1.5px solid #d0d0d0;border-right:1.5px solid #d0d0d0;">1×</span>
        <button id="adp-lhi" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">+</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Zeichenabstand</span>
      <div style="display:flex;align-items:center;border:1.5px solid #d0d0d0;border-radius:3px;overflow:hidden;">
        <button id="adp-lsd" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">−</button>
        <span id="adp-lsv" style="width:36px;text-align:center;font-size:12px;font-weight:700;color:#1a1a1a;border-left:1.5px solid #d0d0d0;border-right:1.5px solid #d0d0d0;">0×</span>
        <button id="adp-lsi" type="button" style="background:#fff;border:none;cursor:pointer;width:32px;height:32px;font-size:18px;color:#1a1a1a;display:flex;align-items:center;justify-content:center;-webkit-appearance:none;appearance:none;">+</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div><span style="font-size:13px;font-weight:500;color:#1a1a1a;">Legasthenie-Schrift</span><span style="display:block;font-size:11px;color:#888;">Comic Sans Stil</span></div>
      <label id="adp-sw-dyslexia" style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-dyslexia" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Links unterstreichen</span>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-ul" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div><span style="font-size:13px;font-weight:500;color:#1a1a1a;">Leselinie</span><span style="display:block;font-size:11px;color:#888;">Hilft beim Zeilenverfolgen</span></div>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-rg-cb" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
  </div>

  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e8;">
    <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;margin-bottom:12px;font-weight:600;">Farbe &amp; Kontrast</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <button class="adp-cf" data-f="mono" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#999,#333);display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Graustufen</button>
      <button class="adp-cf" data-f="invert" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#000,#fff);display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Invertiert</button>
      <button class="adp-cf" data-f="hc" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:#000;display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Hoher Kontrast</button>
      <button class="adp-cf" data-f="hcs" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#333,#ccc);display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Sanfter Kontrast</button>
      <button class="adp-cf" data-f="desat" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#c8b8a2,#9ea8c8);display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Desaturiert</button>
      <button class="adp-cf" data-f="sat" type="button" style="border:1.5px solid #d0d0d0;border-radius:3px;padding:8px 10px;cursor:pointer;background:#fff;font-size:12px;font-weight:600;color:#1a1a1a;text-align:left;font-family:inherit;display:flex;align-items:center;gap:6px;-webkit-appearance:none;appearance:none;"><span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#ff4444,#44aaff);display:inline-block;border:1px solid rgba(0,0,0,.15);flex-shrink:0;"></span>Gesättigt</button>
    </div>
  </div>

  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e8;">
    <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;margin-bottom:12px;font-weight:600;">Visuelle Hilfsmittel</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Großer Cursor</span>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-cursor" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <span style="font-size:13px;font-weight:500;color:#1a1a1a;">Animationen stoppen</span>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-anim" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div><span style="font-size:13px;font-weight:500;color:#1a1a1a;">Fokus hervorheben</span><span style="display:block;font-size:11px;color:#888;">Für Tastatur-Navigation</span></div>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-focus" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div><span style="font-size:13px;font-weight:500;color:#1a1a1a;">Screenreader-Modus</span><span style="display:block;font-size:11px;color:#888;">Bilder ohne alt markieren</span></div>
      <label style="position:relative;width:42px;height:24px;flex-shrink:0;display:inline-block;cursor:pointer;"><input type="checkbox" id="adp-sr" style="opacity:0;width:0;height:0;position:absolute;"><span style="position:absolute;cursor:pointer;inset:0;background:#d8d8d8;border-radius:24px;transition:background .2s;"><span style="position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);display:block;"></span></span></label>
    </div>
  </div>

  <div style="padding:10px 20px;background:#f5f5f0;border-top:1px solid #e8e8e8;font-size:10px;color:#aaa;letter-spacing:.06em;text-transform:uppercase;text-align:center;">Web Tool by Adparadize</div>
</div>

<style>
.adp-sw-on{background:#1a1a1a!important;}
.adp-sw-on span{transform:translateX(18px)!important;}
html.adp-mono{filter:grayscale(1)!important;}
html.adp-invert{filter:invert(1) hue-rotate(180deg)!important;}
html.adp-hc{filter:contrast(1.6)!important;}
html.adp-hcs{filter:contrast(1.35) brightness(1.05)!important;}
html.adp-desat{filter:saturate(.4)!important;}
html.adp-sat{filter:saturate(2)!important;}
html.adp-noanim *,html.adp-noanim *::before,html.adp-noanim *::after{animation-duration:.001ms!important;transition-duration:.001ms!important;}
html.adp-ul a{text-decoration:underline!important;text-underline-offset:3px!important;}
html.adp-dyslexia body,html.adp-dyslexia p,html.adp-dyslexia li,html.adp-dyslexia h1,html.adp-dyslexia h2,html.adp-dyslexia h3{font-family:'Comic Sans MS',cursive!important;letter-spacing:.07em!important;word-spacing:.2em!important;line-height:1.9!important;}
html.adp-focus *:focus{outline:3px solid #1a1a1a!important;outline-offset:3px!important;}
html.adp-bigcursor,html.adp-bigcursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M8 4l24 16-10 2-6 12z' fill='%231a1a1a' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 8 4,auto!important;}
html.adp-sr img:not([alt]),html.adp-sr img[alt=""]{outline:3px solid red!important;}
</style>

<script>
(function(){
  var D={fs:0,lh:0,ls:0,filter:null,dyslexia:false,ul:false,rg:false,cursor:false,anim:false,focus:false,sr:false,profile:null};
  var s=Object.assign({},D);
  var K='adp2';
  function sv(){try{localStorage.setItem(K,JSON.stringify(s));}catch(e){}}
  function ld(){try{var r=localStorage.getItem(K);if(r)s=Object.assign({},D,JSON.parse(r));}catch(e){}}
  var FS=[75,87,100,112,125,150,175,200];
  var LHV=[null,'1.8','2.2','2.6'],LHL=['1×','1.8×','2.2×','2.6×'];
  var LSV=[null,'.04em','.09em','.15em'],LSL=['0×','1×','2×','3×'];
  var FM={mono:'adp-mono',invert:'adp-invert',hc:'adp-hc',hcs:'adp-hcs',desat:'adp-desat',sat:'adp-sat'};
  var PROF={seizure:{anim:true,filter:'desat'},vision:{filter:'hc',fs:3,focus:true},cognitive:{fs:2,lh:1,ul:true,anim:true},adhd:{rg:true,anim:true},dyslexia:{dyslexia:true,lh:2,ls:1},keyboard:{focus:true,ul:true}};
  var H=document.documentElement;
  function B(){return document.body||H;}
  function el(id){return document.getElementById(id);}

  function setFont(i){s.fs=i;var v=FS[i]||100;B().style.fontSize=i?v+'%':'';var e=el('adp-fv');if(e)e.textContent=(FS[i]||100)+'%';}
  function setLH(i){s.lh=i;B().style.lineHeight=LHV[i]||'';var e=el('adp-lhv');if(e)e.textContent=LHL[i];}
  function setLS(i){s.ls=i;var e=el('adp-lsv');if(e)e.textContent=LSL[i];document.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,a,span,td,th').forEach(function(x){x.style.letterSpacing=LSV[i]||'';});}
  function setFilter(f){Object.values(FM).forEach(function(c){H.classList.remove(c);});if(f&&FM[f])H.classList.add(FM[f]);}
  function syncSwitch(id,on){var lb=el(id);if(!lb)return;var sl=lb.nextElementSibling||lb.querySelector('span');if(sl){sl.style.background=on?'#1a1a1a':'#d8d8d8';var th=sl.querySelector('span');if(th)th.style.transform=on?'translateX(18px)':'';}var cb=lb.tagName==='INPUT'?lb:lb.querySelector('input');if(cb)cb.checked=on;}

  function applyAll(){
    setFont(s.fs||0);setLH(s.lh||0);setLS(s.ls||0);setFilter(s.filter);
    H.classList.toggle('adp-dyslexia',!!s.dyslexia);
    H.classList.toggle('adp-ul',!!s.ul);
    H.classList.toggle('adp-noanim',!!s.anim);
    H.classList.toggle('adp-focus',!!s.focus);
    H.classList.toggle('adp-bigcursor',!!s.cursor);
    H.classList.toggle('adp-sr',!!s.sr);
    var rge=el('adp-rg');if(rge)rge.style.display=s.rg?'block':'none';
    syncSwitches();syncFilters();syncProfiles();
  }
  function syncSwitches(){
    ['dyslexia','ul','cursor','anim','focus','sr','rg-cb'].forEach(function(k){
      var cb=el('adp-'+k);if(cb)cb.checked=!!s[k==='rg-cb'?'rg':k];
      var sw=cb?cb.parentElement:null;if(sw){var sl=sw.querySelector('span');if(sl){var on=!!s[k==='rg-cb'?'rg':k];sl.style.background=on?'#1a1a1a':'#d8d8d8';var th=sl.querySelector('span');if(th)th.style.transform=on?'translateX(18px)':'';}}}); 
  }
  function syncFilters(){
    document.querySelectorAll('.adp-cf').forEach(function(b){var on=b.dataset.f===s.filter;b.style.background=on?'#1a1a1a':'#fff';b.style.color=on?'#fff':'#1a1a1a';b.style.borderColor=on?'#1a1a1a':'#d0d0d0';});}
  function syncProfiles(){
    document.querySelectorAll('.adp-prof').forEach(function(b){var on=b.dataset.p===s.profile;b.style.background=on?'#1a1a1a':'#fff';b.style.color=on?'#fff':'#1a1a1a';b.style.borderColor=on?'#1a1a1a':'#d0d0d0';});}

  function init(){
    var btn=el('adp-btn'),panel=el('adp-panel'),closeB=el('adp-close'),resetB=el('adp-reset');
    if(!btn||!panel)return;
    var open=false;
    function show(){open=true;panel.style.display='block';btn.setAttribute('aria-expanded','true');}
    function hide(){open=false;panel.style.display='none';btn.setAttribute('aria-expanded','false');}
    btn.addEventListener('click',function(e){e.stopPropagation();open?hide():show();},true);
    if(closeB)closeB.addEventListener('click',function(e){e.stopPropagation();hide();},true);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)hide();});
    document.addEventListener('click',function(e){if(open&&!panel.contains(e.target)&&e.target!==btn)hide();});
    if(resetB)resetB.addEventListener('click',function(e){e.stopPropagation();s=Object.assign({},D);applyAll();sv();},true);

    document.querySelectorAll('.adp-cf').forEach(function(b){
      b.addEventListener('click',function(e){e.stopPropagation();var f=b.dataset.f;s.filter=s.filter===f?null:f;setFilter(s.filter);syncFilters();sv();},true);
    });
    document.querySelectorAll('.adp-prof').forEach(function(b){
      b.addEventListener('click',function(e){e.stopPropagation();var p=b.dataset.p;s=s.profile===p?Object.assign({},D):Object.assign({},D,PROF[p],{profile:p});applyAll();sv();},true);
    });

    function bindCb(id,key){var cb=el(id);if(!cb)return;cb.addEventListener('change',function(){s[key]=this.checked;var sl=this.parentElement.querySelector('span');if(sl){sl.style.background=this.checked?'#1a1a1a':'#d8d8d8';var th=sl.querySelector('span');if(th)th.style.transform=this.checked?'translateX(18px)':'';}if(key==='rg'){var rge=el('adp-rg');if(rge)rge.style.display=this.checked?'block':'none';}H.classList.toggle('adp-'+{dyslexia:'dyslexia',ul:'ul',cursor:'bigcursor',anim:'noanim',focus:'focus',sr:'sr',rg:''}[key]||key,this.checked);sv();});}
    bindCb('adp-dyslexia','dyslexia');bindCb('adp-ul','ul');bindCb('adp-rg-cb','rg');
    bindCb('adp-cursor','cursor');bindCb('adp-anim','anim');bindCb('adp-focus','focus');bindCb('adp-sr','sr');

    function stepBtn(id,fn){var e=el(id);if(e)e.addEventListener('click',function(ev){ev.stopPropagation();fn();sv();},true);}
    stepBtn('adp-fi',function(){if((s.fs||0)<FS.length-1)setFont((s.fs||0)+1);});
    stepBtn('adp-fd',function(){if((s.fs||0)>0)setFont((s.fs||0)-1);});
    stepBtn('adp-lhi',function(){if((s.lh||0)<3)setLH((s.lh||0)+1);});
    stepBtn('adp-lhd',function(){if((s.lh||0)>0)setLH((s.lh||0)-1);});
    stepBtn('adp-lsi',function(){if((s.ls||0)<3)setLS((s.ls||0)+1);});
    stepBtn('adp-lsd',function(){if((s.ls||0)>0)setLS((s.ls||0)-1);});

    document.addEventListener('mousemove',function(e){var rge=el('adp-rg');if(s.rg&&rge)rge.style.top=(e.clientY-20)+'px';});
    ld();applyAll();
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
</script>
