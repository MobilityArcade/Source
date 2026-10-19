/* FLASH DANZE V17: art-registered, restrained light-only cinemagraph.
   Original artwork remains a static image. This overlay is aligned to the
   1662x946 Dance Hall source, using SVG's xMidYMid slice cropping behavior. */
(()=>{'use strict';
const stage=document.querySelector('#game .stage');
if(!stage)return;
const overlay=document.createElement('div');
overlay.id='danceHallLights';
overlay.setAttribute('aria-hidden','true');
overlay.innerHTML=`<svg viewBox="0 0 1662 946" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="presentation">
<defs>
  <filter id="softNeon" x="-100%" y="-150%" width="300%" height="400%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="softDisco" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="5"/></filter>
  <radialGradient id="floorPink"><stop stop-color="#ff2bd1" stop-opacity=".35"/><stop offset=".48" stop-color="#f71fb5" stop-opacity=".09"/><stop offset="1" stop-color="#f71fb5" stop-opacity="0"/></radialGradient>
  <radialGradient id="floorBlue"><stop stop-color="#00dfff" stop-opacity=".27"/><stop offset=".5" stop-color="#009dff" stop-opacity=".07"/><stop offset="1" stop-color="#009dff" stop-opacity="0"/></radialGradient>
  <radialGradient id="ballAura"><stop stop-color="#fff" stop-opacity=".17"/><stop offset=".32" stop-color="#ef6bff" stop-opacity=".10"/><stop offset="1" stop-color="#ef6bff" stop-opacity="0"/></radialGradient>
</defs>
<!-- Light-source highlights track existing ceiling and side-mounted fixtures. -->
<g class="dh-neon-pink" fill="none" stroke="#ff47d8" stroke-linecap="round" filter="url(#softNeon)">
 <path d="M447 5 L498 115 M1160 3 L1120 120" stroke-width="18"/>
 <path d="M120 200 L110 462 M1550 198 L1558 460" stroke-width="14"/>
 <path d="M596 218 L622 287 M1066 218 L1037 291" stroke-width="12"/>
</g>
<g class="dh-neon-blue" fill="none" stroke="#00d9ff" stroke-linecap="round" filter="url(#softNeon)">
 <path d="M260 98 L343 166 M1400 94 L1314 169" stroke-width="19"/>
 <path d="M486 443 L486 571 M1173 441 L1173 568" stroke-width="11"/>
</g>
<!-- Soft disco-ball highlights, restrained and confined to its actual location. -->
<g class="dh-disco">
 <ellipse cx="829" cy="212" rx="90" ry="90" fill="url(#ballAura)"/>
 <g fill="#ffffff" filter="url(#softDisco)">
  <circle cx="798" cy="188" r="8"/><circle cx="851" cy="225" r="7"/>
  <circle cx="818" cy="247" r="5"/><circle cx="863" cy="184" r="5"/>
 </g>
 <g fill="#ffffff"><circle cx="798" cy="188" r="2.3"/><circle cx="851" cy="225" r="2"/><circle cx="818" cy="247" r="1.6"/></g>
</g>
<!-- Gentle, localized reflected light on the original floor (no movement). -->
<g class="dh-reflection"><ellipse cx="510" cy="765" rx="390" ry="165" fill="url(#floorPink)"/>
 <ellipse cx="1160" cy="785" rx="390" ry="170" fill="url(#floorBlue)"/>
 <ellipse cx="834" cy="682" rx="235" ry="60" fill="url(#floorBlue)"/></g>
</svg>`;
stage.append(overlay);
const game=document.querySelector('#game');
function sync(){overlay.hidden=game?.dataset.background!=='club'}
new MutationObserver(sync).observe(game,{attributes:true,attributeFilter:['data-background']});
sync();
})();
