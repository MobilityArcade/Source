/* FLASH DANZE V22: tactile UI cues. No changes to race/gameplay sounds. */
(()=>{'use strict';
 let ctx=null,lastTick=0;const C=window.AudioContext||window.webkitAudioContext;
 function enabled(){return document.getElementById('soundMode')?.value!=='off'}
 function ensure(){if(!C||!enabled())return null;try{ctx=ctx||new C();if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}catch(e){return null}}
 // Short filtered percussive transients: restrained mechanical-style ticks/clicks.
 function cue(kind){const c=ensure();if(!c||c.state!=='running')return;const now=c.currentTime;
 const tick=kind==='tick',freq=tick?920:kind==='back'?480:680,duration=tick?.032:.055;
 const oscillator=c.createOscillator(),gain=c.createGain(),filter=c.createBiquadFilter();
 oscillator.type='triangle';oscillator.frequency.setValueAtTime(freq,now);oscillator.frequency.exponentialRampToValueAtTime(freq*.55,now+duration);
 filter.type='lowpass';filter.frequency.value=tick?1850:1400;
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(tick?.038:.068,now+.003);
 gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 oscillator.connect(filter).connect(gain).connect(c.destination);oscillator.start(now);oscillator.stop(now+duration+.01);
 }
 document.addEventListener('pointerdown',e=>{if(e.target.closest('button,select'))ensure()},{capture:true,passive:true});
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&enabled())cue(b.id==='back'||b.id==='homeBtn'?'back':'click')});
 document.addEventListener('change',e=>{if(e.target.matches('select')&&enabled())cue('click')});
 document.addEventListener('input',e=>{if(e.target.matches('select')&&enabled()){const t=performance.now();if(t-lastTick>55){lastTick=t;cue('tick')}}});
 document.addEventListener('keydown',e=>{if(e.target.matches('select')&&['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key)&&enabled()){const t=performance.now();if(t-lastTick>75){lastTick=t;cue('tick')}}});
 document.addEventListener('wheel',e=>{if(!e.target.closest('select,.option')||!enabled())return;const t=performance.now();if(t-lastTick>130){lastTick=t;cue('tick')}},{passive:true});
let lastTouchY=null;document.addEventListener('touchstart',e=>{if(e.target.closest('select,.option'))lastTouchY=e.touches[0]?.clientY??null},{passive:true});document.addEventListener('touchmove',e=>{if(lastTouchY===null||!e.target.closest('select,.option')||!enabled())return;const y=e.touches[0]?.clientY;if(y!==undefined&&Math.abs(y-lastTouchY)>18){lastTouchY=y;const t=performance.now();if(t-lastTick>85){lastTick=t;cue('tick')}}},{passive:true});document.addEventListener('touchend',()=>{lastTouchY=null},{passive:true});
})();
