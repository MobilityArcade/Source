/* FLASH DANZE V18 — Dance Hall cinemagraph. Artwork stays perfectly still.
   All SVG geometry uses the original Dance Hall image coordinate system (1662x946).
   preserveAspectRatio=slice tracks CSS background-size:cover, even on phones. */
(()=>{'use strict';
const game=document.getElementById('game'),stage=game?.querySelector('.stage');if(!stage)return;
const layer=document.createElement('div');layer.id='danceHallLights';layer.setAttribute('aria-hidden','true');
layer.innerHTML=`<svg viewBox="0 0 1662 946" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<defs>
 <filter id="v18Blur" x="-100%" y="-150%" width="300%" height="400%"><feGaussianBlur stdDeviation="13"/></filter>
 <filter id="v18Haze" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="24"/></filter>
 <filter id="v18SparkBlur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4"/></filter>
 <radialGradient id="v18Pink"><stop stop-color="#ff76e9" stop-opacity=".67"/><stop offset=".4" stop-color="#fa1fc8" stop-opacity=".28"/><stop offset="1" stop-color="#e911b8" stop-opacity="0"/></radialGradient>
 <radialGradient id="v18Cyan"><stop stop-color="#a9faff" stop-opacity=".63"/><stop offset=".4" stop-color="#00cfff" stop-opacity=".24"/><stop offset="1" stop-color="#00cfff" stop-opacity="0"/></radialGradient>
 <radialGradient id="v18Fog"><stop stop-color="#d5c6ff" stop-opacity=".31"/><stop offset=".5" stop-color="#a277d9" stop-opacity=".14"/><stop offset="1" stop-color="#8c7cbb" stop-opacity="0"/></radialGradient>
 <radialGradient id="v18White"><stop stop-color="#fff" stop-opacity=".95"/><stop offset=".25" stop-color="#fff" stop-opacity=".42"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
 <clipPath id="v18BallClip"><circle cx="831" cy="210" r="75"/></clipPath>
</defs>
<!-- Faint beams of colored light stay registered to real overhead tubes. -->
<g class="v18PinkNeon" fill="none" stroke="#ff47da" stroke-linecap="round" filter="url(#v18Blur)">
 <path d="M447 5 L498 115 M1160 3 L1120 120" stroke-width="26"/>
 <path d="M120 200 L110 462 M1550 198 L1558 460" stroke-width="18"/>
 <path d="M596 218 L622 287 M1066 218 L1037 291" stroke-width="18"/>
</g>
<g class="v18CyanNeon" fill="none" stroke="#25eaff" stroke-linecap="round" filter="url(#v18Blur)">
 <path d="M260 98 L343 166 M1400 94 L1314 169" stroke-width="28"/>
 <path d="M486 443 L486 571 M1173 441 L1173 568" stroke-width="16"/>
</g>
<!-- The ball does not move; glints travel across its existing surface. -->
<g clip-path="url(#v18BallClip)">
 <g class="v18BallGlints">
  <ellipse cx="804" cy="181" rx="28" ry="34" fill="url(#v18White)"/>
  <ellipse cx="865" cy="220" rx="21" ry="29" fill="url(#v18White)"/>
  <ellipse cx="829" cy="254" rx="16" ry="19" fill="url(#v18White)"/>
  <path d="M735 145 L754 165 M780 130 L800 150 M854 141 L874 161 M900 170 L920 190" stroke="#fce7ff" stroke-width="5" filter="url(#v18SparkBlur)"/>
 </g>
</g>
<!-- Four independent sparkle bursts near the disco ball. -->
<g class="v18Spark v18SparkA" transform="translate(783 178)"><circle r="21" fill="url(#v18White)"/><path d="M-19 0H19M0-19V19" stroke="#fff" stroke-width="2"/></g>
<g class="v18Spark v18SparkB" transform="translate(877 211)"><circle r="18" fill="url(#v18White)"/><path d="M-17 0H17M0-17V17" stroke="#fff" stroke-width="2"/></g>
<g class="v18Spark v18SparkC" transform="translate(830 259)"><circle r="14" fill="url(#v18White)"/><path d="M-14 0H14M0-14V14" stroke="#fff" stroke-width="2"/></g>
<!-- Broad reflective washes move across only the existing reflective floor. -->
<g class="v18FloorPink"><ellipse cx="430" cy="779" rx="340" ry="115" fill="url(#v18Pink)"/><ellipse cx="770" cy="874" rx="320" ry="82" fill="url(#v18Pink)"/></g>
<g class="v18FloorCyan"><ellipse cx="1190" cy="803" rx="345" ry="120" fill="url(#v18Cyan)"/><ellipse cx="846" cy="699" rx="260" ry="60" fill="url(#v18Cyan)"/></g>
<g class="v18FloorSweep"><ellipse cx="820" cy="865" rx="210" ry="85" fill="url(#v18White)"/></g>
<!-- Smoke comes from two actual rear-floor haze points, rising and dissipating. -->
<g class="v18Fog v18FogLeft" filter="url(#v18Haze)">
 <ellipse cx="590" cy="612" rx="108" ry="28" fill="url(#v18Fog)"/>
 <ellipse cx="618" cy="594" rx="94" ry="43" fill="url(#v18Fog)"/>
 <ellipse cx="555" cy="604" rx="77" ry="31" fill="url(#v18Fog)"/>
</g>
<g class="v18Fog v18FogRight" filter="url(#v18Haze)">
 <ellipse cx="1070" cy="610" rx="116" ry="32" fill="url(#v18Fog)"/>
 <ellipse cx="1035" cy="590" rx="88" ry="43" fill="url(#v18Fog)"/>
 <ellipse cx="1110" cy="603" rx="75" ry="30" fill="url(#v18Fog)"/>
</g>
<g class="v18Fog v18FogLeft v18FogLate" filter="url(#v18Haze)"><ellipse cx="600" cy="612" rx="100" ry="32" fill="url(#v18Fog)"/></g>
<g class="v18Fog v18FogRight v18FogLate" filter="url(#v18Haze)"><ellipse cx="1065" cy="610" rx="100" ry="32" fill="url(#v18Fog)"/></g>
</svg>`;
stage.append(layer);
function sync(){layer.hidden=game.dataset.background!=='club'}
new MutationObserver(sync).observe(game,{attributes:true,attributeFilter:['data-background']});sync();
})();
