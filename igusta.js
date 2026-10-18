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
 const availableWidth=zone.clientWidth*.965;
 const availableHeight=zone.clientHeight*.85;
 if(!word||!availableWidth||!availableHeight)return;
 const ctx=fitWord.ctx||(fitWord.ctx=document.createElement('canvas').getContext('2d'));
 const family=getComputedStyle(el).fontFamily;
 const weight=getComputedStyle(el).fontWeight;
 let lo=24,hi=Math.max(70,Math.min(availableHeight*.95,innerWidth*.8,600));
 for(let i=0;i<18;i++){
   const mid=(lo+hi)/2;
   ctx.font=`${weight} ${mid}px ${family}`;
   const width=ctx.measureText(word).width + Math.max(0,word.length-1)*mid*.01;
   if(width<=availableWidth && mid*1.15<=availableHeight)lo=mid;else hi=mid;
 }
 el.style.fontSize=Math.floor(lo)+'px';
}
function showCard(){const card=sequence[cueIndex];if(!card)return;const el=$('command');el.classList.remove('counting','go');el.textContent=card.word;requestAnimationFrame(fitWord)}
function finish(){cancel();$('progress').style.width='100%';sound('end');$('finishTitle').textContent=tr('YOU DID IT!','¡LO LOGRASTE!');show('done')}
function tick(){if(paused)return;const elapsed=Math.min(duration,elapsedBefore+(performance.now()-startedAt)/1000);$('remaining').textContent=fmt(duration-elapsed);$('progress').style.width=elapsed/duration*100+'%';if(elapsed>=duration){finish();return}if(!halfPlayed&&elapsed>=duration/2){halfPlayed=true;sound('half')}while(cueIndex+1<sequence.length&&sequence[cueIndex+1].at<=elapsed){cueIndex++;showCard();if(cueIndex%5===0&&Math.random()<.45)sound('coin')}}
function startRound(){cancel();duration=Number($('duration').value);sequence=makeSequence();cueIndex=0;elapsedBefore=0;paused=false;halfPlayed=false;$('remaining').textContent=fmt(duration);$('progress').style.width='0%';$('pause').textContent=tr('PAUSE','PAUSA');show('round');const token=runId;let n=3;function count(){if(token!==runId)return;const el=$('command');el.classList.add('counting');if(n>0){el.classList.remove('go');el.textContent=String(n);tone(500+(3-n)*125,.10,'triangle');n--;countdownTimer=setTimeout(count,1000)}else{el.textContent='GO!';el.classList.add('go');sound('start');countdownTimer=setTimeout(()=>{if(token!==runId)return;startedAt=performance.now();showCard();interval=setInterval(tick,60)},650)}}count()}
$('getMoving').onclick=()=>show('setup');$('back').onclick=()=>show('home');$('start').onclick=startRound;
$('pause').onclick=()=>{if(!interval)return;if(!paused){elapsedBefore=Math.min(duration,elapsedBefore+(performance.now()-startedAt)/1000);paused=true;$('pause').textContent=tr('RESUME','SEGUIR');$('command').textContent=tr('PAUSED','PAUSA');fitWord()}else{paused=false;startedAt=performance.now();$('pause').textContent=tr('PAUSE','PAUSA');showCard()}};
$('next').onclick=()=>{if(!interval||paused)return;if(cueIndex+1<sequence.length){cueIndex++;showCard()}};
$('end').onclick=()=>{cancel();show('setup')};$('again').onclick=startRound;$('homeBtn').onclick=()=>{cancel();show('home')};
$('language').onchange=()=>{document.documentElement.lang=lang();$('start').innerHTML=tr('START DANZE <b>→</b>','EMPEZAR <b>→</b>');$('pause').textContent=tr('PAUSE','PAUSA');$('next').textContent=tr('NEXT →','SIGUIENTE →');$('end').textContent=tr('END','FIN');$('again').textContent=tr('PLAY AGAIN ↻','OTRA VEZ ↻')};
window.addEventListener('resize',fitWord);window.addEventListener('pagehide',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden&&interval&&!paused)$('pause').click()});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('round').classList.contains('hidden'))$('end').click();if(e.key==='ArrowRight'&&!$('round').classList.contains('hidden'))$('next').click()});
