'use strict';
const $=id=>document.getElementById(id);
let duration=30,sequence=[],cueIndex=0,elapsedBefore=0,startedAt=0,paused=false,halfPlayed=false,interval=null,countdownTimer=null,runId=0,audioCtx=null,lastWord='';
const lang=()=>$('language').value;const tr=(a,b)=>lang()==='es'?b:a;
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('hidden',s.id!==id))}
function fmt(s){s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function tone(freq,len=.12,type='sine',gain=.10,delay=0){if($('sound').value==='off')return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const t=audioCtx.currentTime+delay,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.014);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g).connect(audioCtx.destination);o.start(t);o.stop(t+len+.02)}catch(e){}}
function sound(which){if(which==='start'){tone(540,.12,'triangle');tone(860,.25,'triangle',.11,.14)}if(which==='half'){tone(850,.10);tone(1120,.16,'sine',.07,.11)}if(which==='coin'){tone(1100,.07,'square',.035);tone(1650,.17,'sine',.06,.07)}if(which==='end'){tone(960,.12);tone(760,.13,'triangle',.1,.15);tone(1120,.32,'triangle',.1,.31)}}
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function paceSeconds(){return {quick:2.6,steady:4,chill:6}[$('pace').value]||4}
function makeSequence(){const bank=window.MOVEMENT_WORDS.dance;const cards=[];let at=0,previous='';while(at<duration){const deck=shuffle(bank);if(deck.length>1&&deck[0][0]===previous)deck.push(deck.shift());for(const card of deck){if(at>=duration)break;cards.push({at,word:card[lang()==='es'?1:0]});previous=card[0];at+=paceSeconds()}}return cards}
function cancel(){runId++;clearInterval(interval);clearTimeout(countdownTimer);interval=null;countdownTimer=null}
function fitWord(){
 const el=$('command');
 if($('round').classList.contains('hidden')||el.classList.contains('counting'))return;
 const zone=el.parentElement;
 const word=el.textContent.trim();
 if(!word)return;
 // Reset previous word's inline font-size before measuring the new font.
 el.style.fontSize='';
 const styles=getComputedStyle(el);
 const ctx=fitWord.ctx||(fitWord.ctx=document.createElement('canvas').getContext('2d'));
 const zoneWidth=zone.clientWidth*.93, zoneHeight=zone.clientHeight*.82;
 if(!zoneWidth||!zoneHeight)return;
 // Fit to the actual selected font. Never compound a prior card's shrinking size.
 const family=styles.fontFamily,weight=styles.fontWeight,style=styles.fontStyle;
 const maxSize=Math.min(420,zoneHeight*.83,Math.max(120,window.innerWidth*.32));
 let lo=32,hi=Math.max(32,maxSize);
 for(let i=0;i<20;i++){
   const mid=(lo+hi)/2;
   ctx.font=`${style} ${weight} ${mid}px ${family}`;
   const measured=ctx.measureText(word).width;
   const spacing=parseFloat(styles.letterSpacing);
   const width=measured+(Number.isFinite(spacing)?Math.max(0,word.length-1)*spacing:0);
   if(width<=zoneWidth && mid*1.12<=zoneHeight)lo=mid;else hi=mid;
 }
 el.style.fontSize=Math.floor(lo)+'px';
}

function showCard(){const card=sequence[cueIndex];if(!card)return;const el=$('command');el.classList.remove('counting','go');el.textContent=card.word;el.classList.remove('flashEnter');void el.offsetWidth;el.classList.add('flashEnter');window.FlashVisuals?.nextColor();window.FlashVisuals?.nextFont();window.NeonBurst?.pulse('word');window.ScenicWorlds?.pulse();window.FlashArcadeAudio?.play('impact');el.dataset.effect=({SPIN:'spin',SHAKE:'shake',FLOW:'flow',JUMP:'jump',STOMP:'stomp',FREEZE:'freeze'}[card.word.toUpperCase()]||'punch');requestAnimationFrame(fitWord);document.fonts?.ready.then(()=>{if(el.textContent===card.word)fitWord()})}
function finish(){window.NeonBurst?.pulse('finish');cancel();$('progress').style.width='100%';sound('end');window.FlashArcadeAudio?.play('finish');$('finishTitle').textContent=tr('YOU DID IT!','¡LO LOGRASTE!');show('done')}
function tick(){if(paused)return;const elapsed=Math.min(duration,elapsedBefore+(performance.now()-startedAt)/1000);$('remaining').textContent=fmt(duration-elapsed);$('progress').style.width=elapsed/duration*100+'%';if(elapsed>=duration){finish();return}if(!halfPlayed&&elapsed>=duration/2){halfPlayed=true;sound('half')}while(cueIndex+1<sequence.length&&sequence[cueIndex+1].at<=elapsed){cueIndex++;showCard();if(cueIndex%5===0&&Math.random()<.45)sound('coin')}}
function startRound(){window.NeonBurst?.pulse('start');window.FlashArcadeAudio?.play('start');cancel();duration=Number($('duration').value);sequence=makeSequence();cueIndex=0;elapsedBefore=0;paused=false;halfPlayed=false;$('remaining').textContent=fmt(duration);$('progress').style.width='0%';$('pause').textContent=tr('PAUSE','PAUSA');show('round');const token=runId;let n=3;function count(){if(token!==runId)return;const el=$('command');el.classList.add('counting');if(n>0){el.classList.remove('go');el.textContent=String(n);window.NeonBurst?.pulse('count');tone(500+(3-n)*125,.10,'triangle');n--;countdownTimer=setTimeout(count,1000)}else{el.textContent='GO!';el.classList.add('go');window.NeonBurst?.pulse('go');sound('start');countdownTimer=setTimeout(()=>{if(token!==runId)return;startedAt=performance.now();showCard();interval=setInterval(tick,60)},650)}}count()}
$('getMoving').onclick=()=>show('setup');$('back').onclick=()=>show('home');$('start').onclick=startRound;
$('pause').onclick=()=>{if(!interval)return;if(!paused){elapsedBefore=Math.min(duration,elapsedBefore+(performance.now()-startedAt)/1000);paused=true;$('pause').textContent=tr('RESUME','SEGUIR');$('command').textContent=tr('PAUSED','PAUSA');fitWord()}else{paused=false;startedAt=performance.now();$('pause').textContent=tr('PAUSE','PAUSA');showCard()}};
$('next').onclick=()=>{if(!interval||paused)return;if(cueIndex+1<sequence.length){cueIndex++;showCard()}};
$('end').onclick=()=>{cancel();show('setup')};$('again').onclick=startRound;$('homeBtn').onclick=()=>{cancel();show('home')};
$('language').onchange=()=>{document.documentElement.lang=lang();$('start').innerHTML=tr('START DANZE <b>→</b>','EMPEZAR <b>→</b>');$('pause').textContent=tr('PAUSE','PAUSA');$('next').textContent=tr('NEXT →','SIGUIENTE →');$('end').textContent=tr('END','FIN');$('again').textContent=tr('PLAY AGAIN ↻','OTRA VEZ ↻')};
window.addEventListener('resize',fitWord);window.addEventListener('pagehide',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden&&interval&&!paused)$('pause').click()});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('round').classList.contains('hidden'))$('end').click();if(e.key==='ArrowRight'&&!$('round').classList.contains('hidden'))$('next').click()});

// V7 background choice: remember locally, no network or AI connection.
(function(){
 const selector=document.getElementById('backgroundStyle');
 const game=document.getElementById('game');
 if(!selector||!game)return;
 let saved='flow';
 try{const v=localStorage.getItem('flashDanzeBackground');if(['still','flow','burst','grid','chaos','dusk','prism','pulse','comet','city','garden','temple','club','studio','playground','sunset','halloween','winter'].includes(v))saved=v}catch(e){}
 const motion=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(saved==='flow'&&motion?.matches){saved='still'}
 function apply(v){if(!['still','flow','burst','grid','chaos','dusk','prism','pulse','comet','city','garden','temple','club','studio','playground','sunset','halloween','winter'].includes(v))v='flow';selector.value=v;game.dataset.background=v;window.NeonBurst?.setActive?.(v==='burst',v);window.ArcadeWorlds?.setMode?.(v);window.ScenicWorlds?.setMode?.(v);try{localStorage.setItem('flashDanzeBackground',v)}catch(e){}}
 selector.addEventListener('change',()=>apply(selector.value));
 apply(saved);
})();

// V8: independently remembered typography and neon cue colors.
(function(){
 const game=$('game'),font=$('fontStyle'),color=$('wordColor');
 const fonts=['bold','outline','graffiti','chrome','pixel','brush','futuristic'];
 const colors={white:['#ffffff','#ff149f'],pink:['#ff4cbb','#ff149f'],cyan:['#52f5ff','#00dfff'],lime:['#c5ff55','#8aff00'],yellow:['#fff066','#ffb900'],violet:['#c6a2ff','#9d5bff'],orange:['#ffad5b','#ff7828']};
 const rotation=['pink','cyan','lime','yellow','violet','orange'];
 let previous=-1;
 function read(k,fallback){try{return localStorage.getItem(k)||fallback}catch(e){return fallback}}
 function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
 let previousFont=-1;function nextFont(){if(font.value!=='mix')return;let n=Math.floor(Math.random()*fonts.length);if(n===previousFont)n=(n+1)%fonts.length;previousFont=n;game.dataset.font=fonts[n];requestAnimationFrame(fitWord)}
 function applyFont(){const v=fonts.includes(font.value)||font.value==='mix'?font.value:'bold';game.dataset.font=v==='mix'?fonts[0]:v;save('flashDanzeFont',v);if(v==='mix')nextFont();requestAnimationFrame(fitWord)}
 function applyColor(v){const [fill,glow]=colors[v]||colors.white;game.style.setProperty('--cue-fill',fill);game.style.setProperty('--cue-glow',glow);game.style.setProperty('--cue-stroke',glow)}
 function nextColor(){if(color.value!=='cycle'){applyColor(color.value);return}let index=Math.floor(Math.random()*rotation.length);if(index===previous)index=(index+1+Math.floor(Math.random()*(rotation.length-1)))%rotation.length;previous=index;applyColor(rotation[index])}
 function updateColor(){save('flashDanzeColor',color.value);nextColor()}
 const savedFont=read('flashDanzeFont','bold'),savedColor=read('flashDanzeColor','cycle');
 font.value=fonts.includes(savedFont)||savedFont==='mix'?savedFont:'bold';color.value=savedColor==='cycle'||colors[savedColor]?savedColor:'cycle';
 font.addEventListener('change',applyFont);color.addEventListener('change',updateColor);
 applyFont();updateColor();window.FlashVisuals={nextColor,nextFont};
})();
