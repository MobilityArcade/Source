/* FLASH DANZE V26: one tactile category-and-choice wheel. */
(()=>{'use strict';
const root=document.getElementById('setup');if(!root)return;
const original=root.querySelector('.options');const start=document.getElementById('start');
const controls=[...original.querySelectorAll('.option select')];
const labels=['DURATION','CARD PACE','BACKGROUND','FONT STYLE','WORD COLOR','SOUND','LANGUAGE'];
const C=window.AudioContext||window.webkitAudioContext;let audio=null,lastSound=0;
function soundOn(){return document.getElementById('soundMode')?.value!=='off'}
function cue(kind='tick'){
 if(!soundOn()||!C)return;
 const t=performance.now();if(kind==='tick'&&t-lastSound<40)return;lastSound=t;
 try{audio=audio||new C();if(audio.state==='suspended')audio.resume().catch(()=>{});if(audio.state!=='running')return;
 const now=audio.currentTime,osc=audio.createOscillator(),g=audio.createGain(),f=audio.createBiquadFilter();
 osc.type='triangle';let hz=kind==='tick'?900:kind==='open'?570:690,d=kind==='tick'?.034:.055;
 osc.frequency.setValueAtTime(hz,now);osc.frequency.exponentialRampToValueAtTime(hz*.57,now+d);
 f.type='lowpass';f.frequency.value=1700;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(kind==='tick'?.055:.085,now+.003);g.gain.exponentialRampToValueAtTime(.0001,now+d);
 osc.connect(f).connect(g).connect(audio.destination);osc.start(now);osc.stop(now+d+.01);
 }catch(e){}
}
let mode='categories',cat=0,choice=0;
const shell=document.createElement('div');shell.className='fd-wheel-shell';
const heading=document.createElement('div');heading.className='fd-wheel-heading';
const windowEl=document.createElement('div');windowEl.className='fd-wheel-window';windowEl.tabIndex=0;windowEl.setAttribute('role','listbox');windowEl.setAttribute('aria-label','Settings wheel');
const track=document.createElement('div');track.className='fd-wheel-track';windowEl.append(track);const arrows=document.createElement('div');arrows.className='fd-wheel-arrows';const up=document.createElement('button');up.type='button';up.className='fd-wheel-arrow';up.textContent='▲';up.setAttribute('aria-label','Previous option');const down=document.createElement('button');down.type='button';down.className='fd-wheel-arrow';down.textContent='▼';down.setAttribute('aria-label','Next option');arrows.append(up,down);windowEl.append(arrows);
const footer=document.createElement('div');footer.className='fd-wheel-footer';
const nav=document.createElement('div');nav.className='fd-wheel-nav';
const back=document.createElement('button');back.type='button';back.className='fd-wheel-back';back.textContent='← SETTINGS';
const hint=document.createElement('span');hint.className='fd-wheel-instruction';hint.textContent='SCROLL · TAP TO SELECT';nav.append(back,hint);
const smallHint=document.createElement('div');smallHint.className='fd-wheel-hint';smallHint.textContent='';shell.append(windowEl,smallHint);root.insertBefore(shell,start);
function items(){return mode==='categories'?labels:[...controls[cat].options].map(o=>o.textContent)}
function idx(){return mode==='categories'?cat:choice}
function selected(){return controls[cat].selectedIndex}
function render(){
 const a=items(),n=a.length,current=idx();track.replaceChildren();heading.textContent=mode==='categories'?'CHOOSE A SETTING':labels[cat];back.hidden=mode==='categories';
 for(let offset=0;offset<=0;offset++){
  const i=(current+offset+n)%n;const el=document.createElement('div');el.className='fd-wheel-item'+(offset===0?' active':Math.abs(offset)===1?' near':'');el.textContent=a[i];el.setAttribute('role','option');el.setAttribute('aria-selected',String(offset===0));
  el.addEventListener('click',()=>{if(offset!==0){move(offset);return}choose()});track.append(el)
 }
 footer.textContent='';
 windowEl.setAttribute('aria-label',mode==='categories'?'Choose setting':`Choose ${labels[cat].toLowerCase()}`);windowEl.classList.toggle('fd-choices',mode==='choices');
}
function move(delta){const n=items().length;if(!n)return;const next=(idx()+delta%n+n)%n;if(mode==='categories')cat=next;else choice=next;cue('tick');render()}
function choose(){cue('open');if(mode==='categories'){mode='choices';choice=selected();render()}else{const select=controls[cat];select.selectedIndex=choice;select.dispatchEvent(new Event('change',{bubbles:true}));mode='categories';render()}}
function goBack(){if(mode==='choices'){cue('open');mode='categories';render()}}
back.addEventListener('click',goBack);up.addEventListener('click',e=>{e.stopPropagation();move(-1)});down.addEventListener('click',e=>{e.stopPropagation();move(1)});
windowEl.addEventListener('click',e=>{if(e.target===windowEl||e.target===track)choose()});
let wheelDelta=0;windowEl.addEventListener('wheel',e=>{e.preventDefault();wheelDelta+=e.deltaY;while(Math.abs(wheelDelta)>=32){const direction=Math.sign(wheelDelta);wheelDelta-=direction*32;move(direction)}},{passive:false});
let y=null,travel=0;windowEl.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'){y=e.clientY;travel=0;windowEl.setPointerCapture(e.pointerId)}},{passive:true});
windowEl.addEventListener('pointermove',e=>{if(y===null)return;const dy=y-e.clientY;y=e.clientY;travel+=dy;while(Math.abs(travel)>=30){const d=Math.sign(travel);travel-=d*30;move(d)}},{passive:true});
windowEl.addEventListener('pointerup',()=>{y=null});windowEl.addEventListener('pointercancel',()=>{y=null});
windowEl.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp'].includes(e.key)){e.preventDefault();move(['ArrowDown','PageDown'].includes(e.key)?1:-1)}else if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}else if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();goBack()}});
// Keep category preview synced when background or settings are changed programmatically.
controls.forEach(select=>select.addEventListener('change',render));
// Preserve existing navigation and start logic; just collapse the detail wheel on exit.
[start,document.getElementById('back')].forEach(el=>el?.addEventListener('click',()=>{mode='categories';render()}));
// Classy, short button cues, independent of the wheel movement tick.
document.addEventListener('click',e=>{const button=e.target.closest('button');if(button&&!button.closest('.fd-wheel-shell'))cue('open')});
// Match the finish message to the actual cue's computed typography, including mix mode.
const finish=document.getElementById('finishTitle');const done=document.getElementById('done');
const finishProps=['font-family','font-style','font-weight','font-stretch','letter-spacing','color','-webkit-text-fill-color','-webkit-text-stroke','-webkit-text-stroke-color','-webkit-text-stroke-width','text-shadow','text-transform','filter','background-image','background-size','background-position','background-clip','-webkit-background-clip','paint-order'];
let cueSnapshot=null;
function snapshotCue(){const cueEl=document.getElementById('command');if(!cueEl||!finish)return;const c=getComputedStyle(cueEl);cueSnapshot={};for(const prop of finishProps)cueSnapshot[prop]=c.getPropertyValue(prop);cueSnapshot.transform=c.transform;}
function syncFinish(){
 const cueEl=document.getElementById('command');if(!finish||!cueEl)return;
 if(!cueSnapshot)snapshotCue();
 for(const [prop,value] of Object.entries(cueSnapshot||{})){if(value)finish.style.setProperty(prop,value,'important')}
 // Size to the *rendered* viewport rather than a fixed font size; keep cue styling.
 const cueTransform=cueSnapshot?.transform;
 finish.style.setProperty('transform',cueTransform&&cueTransform!=='none'?cueTransform:'none','important');
 finish.style.setProperty('transform-origin','center center','important');
 finish.style.setProperty('width','max-content','important');
 finish.style.setProperty('max-width','none','important');
 finish.style.setProperty('white-space','nowrap','important');
 finish.style.setProperty('line-height','1.04','important');
 const fit=()=>{
   if(done.classList.contains('hidden'))return;
   const maxW=window.innerWidth*.89;
   const maxH=window.innerHeight*.27;
   let low=16,high=420;
   for(let i=0;i<16;i++){
     const mid=(low+high)/2;
     finish.style.setProperty('font-size',mid+'px','important');
     const r=finish.getBoundingClientRect();
     if(r.width<=maxW&&r.height<=maxH)low=mid;else high=mid;
   }
   finish.style.setProperty('font-size',low+'px','important');
 };
 requestAnimationFrame(fit);
 if(document.fonts?.ready)document.fonts.ready.then(()=>requestAnimationFrame(fit));
}
window.addEventListener('resize',()=>{if(done&&!done.classList.contains('hidden'))syncFinish()});
window.addEventListener('orientationchange',()=>{if(done&&!done.classList.contains('hidden'))syncFinish()});
// Capture while the active gameplay cue is still visible, rather than after its screen is hidden.
const cueEl=document.getElementById('command');
if(cueEl){new MutationObserver(()=>{if(!document.getElementById('round')?.classList.contains('hidden')&&!cueEl.classList.contains('counting')&&!cueEl.classList.contains('go'))requestAnimationFrame(snapshotCue)}).observe(cueEl,{childList:true,characterData:true,subtree:true});}
if(done&&finish){new MutationObserver(()=>{if(!done.classList.contains('hidden'))syncFinish()}).observe(done,{attributes:true,attributeFilter:['class']});}
render();
})();
