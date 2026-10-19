/* FLASH DANZE V19: photo-aligned cinemagraph lighting, no moving camera or scenery. */
(()=>{'use strict';
const game=document.getElementById('game'),stage=game?.querySelector('.stage');if(!game||!stage)return;
const dims={club:[1662,946],city:[1672,941],garden:[1672,941],rooftop:[1672,941]};
const defs=`<defs>
<filter id="blur19" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="17"/></filter>
<filter id="soft19" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="34"/></filter>
<radialGradient id="pink19"><stop stop-color="#ffb8fc" stop-opacity=".92"/><stop offset=".35" stop-color="#ff21dc" stop-opacity=".53"/><stop offset="1" stop-color="#ff21dc" stop-opacity="0"/></radialGradient>
<radialGradient id="cyan19"><stop stop-color="#dbffff" stop-opacity=".94"/><stop offset=".36" stop-color="#00ecff" stop-opacity=".52"/><stop offset="1" stop-color="#00ecff" stop-opacity="0"/></radialGradient>
<radialGradient id="gold19"><stop stop-color="#fff6ca" stop-opacity=".94"/><stop offset=".4" stop-color="#ffb93b" stop-opacity=".5"/><stop offset="1" stop-color="#ffb93b" stop-opacity="0"/></radialGradient>
<radialGradient id="fog19"><stop stop-color="#d8e8ff" stop-opacity=".5"/><stop offset=".45" stop-color="#8b8bc7" stop-opacity=".24"/><stop offset="1" stop-color="#9d9fcf" stop-opacity="0"/></radialGradient>
<radialGradient id="white19"><stop stop-color="#fff" stop-opacity="1"/><stop offset=".23" stop-color="#fff" stop-opacity=".65"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>`;
const glow=(x,y,rx,ry,c='pink19',cls='wash19')=>`<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${c})"/>`;
const star=(x,y,r=12,cls='star19')=>`<g class="${cls}" transform="translate(${x} ${y})"><circle r="${r*1.9}" fill="url(#white19)"/><path d="M-${r} 0H${r}M0 -${r}V${r}" stroke="#fff" stroke-width="${Math.max(1,r/7)}"/></g>`;
const fog=(x,y,cls='fog19')=>`<g class="${cls}" filter="url(#soft19)">${glow(x,y,115,45,'fog19','')}${glow(x-42,y+8,80,32,'fog19','')}${glow(x+39,y-9,90,38,'fog19','')}</g>`;
const scenes={
club:`<g class="tube19 hot19" fill="none" stroke="#ff47db" stroke-linecap="round" filter="url(#blur19)" stroke-width="35"><path d="M447 5L498 115 M1160 3L1120 120 M120 200L110 462 M1550 198L1558 460 M596 218L622 287 M1066 218L1037 291"/></g><g class="tube19 cool19" fill="none" stroke="#45f4ff" stroke-linecap="round" filter="url(#blur19)" stroke-width="33"><path d="M260 98L343 166 M1400 94L1314 169 M486 443L486 571 M1173 441L1173 568"/></g>
<g class="disco19">${star(784,170,19)}${star(866,208,23)}${star(823,250,15)}${star(852,164,13)}</g>
<g class="floorPink19">${glow(380,780,350,145)}${glow(745,887,300,110)}</g><g class="floorBlue19">${glow(1270,782,350,145,'cyan19')}${glow(885,897,300,110,'cyan19')}</g><g class="sweep19">${glow(820,840,260,95,'white19')}</g>
${fog(590,612,'fog19 left19')}${fog(1070,612,'fog19 right19')}${fog(600,610,'fog19 left19 late19')}${fog(1060,610,'fog19 right19 late19')}`,
city:`<g class="tube19 hot19">${glow(830,320,235,285)}${glow(380,245,185,270)}${glow(1395,250,160,290)}</g><g class="tube19 cool19">${glow(160,370,160,285,'cyan19')}${glow(1515,355,160,280,'cyan19')}</g>
<g class="billboard19">${glow(832,210,170,145,'pink19')}${glow(1040,275,115,190,'cyan19')}</g>
<g class="floorPink19">${glow(410,812,360,145)}${glow(900,905,340,130)}</g><g class="floorBlue19">${glow(1280,800,390,150,'cyan19')}${glow(630,868,250,110,'cyan19')}</g>
<g class="sweep19">${glow(850,795,220,85,'white19')}</g>
${fog(710,670,'fog19 left19')}${fog(1040,665,'fog19 right19')}${star(895,320,12,'star19')}`,
garden:`<g class="tube19 cool19">${glow(820,195,430,195,'cyan19')}${glow(320,350,180,255,'cyan19')}${glow(1350,330,190,265,'cyan19')}</g><g class="tube19 hot19">${glow(570,285,205,190)}${glow(1180,280,210,185)}</g>
<g class="plant19">${glow(275,470,145,190,'cyan19')}${glow(1400,470,150,195,'cyan19')}${glow(620,420,110,150,'pink19')}${glow(1100,425,120,150,'pink19')}</g>
<g class="floorBlue19">${glow(650,770,400,145,'cyan19')}${glow(1290,850,350,125,'cyan19')}</g><g class="floorPink19">${glow(370,845,340,140)}${glow(1040,900,360,120)}</g>
<g class="firefly19">${star(395,380,12)}${star(1270,390,11)}${star(600,300,10)}${star(1050,260,12)}</g>
${fog(570,630,'fog19 left19')}${fog(1150,640,'fog19 right19')}`,
rooftop:`<g class="tube19 cool19">${glow(430,335,190,170,'cyan19')}${glow(1280,320,185,180,'cyan19')}${glow(825,270,190,220,'cyan19')}</g><g class="tube19 hot19">${glow(220,485,150,185)}${glow(1450,470,160,200)}${glow(1020,385,160,170)}</g>
<g class="skyline19">${glow(845,295,95,220,'gold19')}${glow(660,310,120,180,'cyan19')}${glow(1100,325,135,190,'pink19')}</g>
<g class="floorPink19">${glow(440,795,375,155)}${glow(1030,880,340,145)}</g><g class="floorBlue19">${glow(1270,770,345,150,'cyan19')}${glow(720,845,300,140,'cyan19')}</g><g class="sweep19">${glow(840,860,225,95,'white19')}</g>
<g class="star19">${star(810,325,12)}${star(1010,300,10)}</g>
${fog(340,670,'fog19 left19')}${fog(1320,680,'fog19 right19')}`
};
const layer=document.createElement('div');layer.id='livingWorlds';layer.setAttribute('aria-hidden','true');
for(const [name,art] of Object.entries(scenes)){const [w,h]=dims[name];const holder=document.createElement('div');holder.className='livingScene';holder.dataset.scene=name;holder.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${defs}${art}</svg>`;layer.append(holder)}
stage.append(layer);
function sync(){const active=game.dataset.background||'club';for(const scene of layer.children)scene.hidden=scene.dataset.scene!==active}
new MutationObserver(sync).observe(game,{attributes:true,attributeFilter:['data-background']});sync();
})();