/* FLASH DANZE V24: tactile UI cues + custom scrollable option menus. */
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

 // Browser-native option popups hide individual wheel/touch steps from page JavaScript.
 // Replace only the visible selector with an accessible in-page scrolling menu;
 // retain the original <select> as the source of truth for all game logic.
 document.querySelectorAll('.option select').forEach(select=>{
   const wrap=document.createElement('div');wrap.className='fd-dropdown';
   const trigger=document.createElement('button');trigger.type='button';trigger.className='fd-trigger';
   trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
   const menu=document.createElement('div');menu.className='fd-menu';menu.setAttribute('role','listbox');menu.tabIndex=-1;
   const entries=[...select.options].map((option,index)=>{
     const entry=document.createElement('button');entry.type='button';entry.className='fd-entry';
     entry.textContent=option.textContent;entry.setAttribute('role','option');
     entry.addEventListener('click',()=>{select.selectedIndex=index;select.dispatchEvent(new Event('change',{bubbles:true}));close();trigger.focus()});
     menu.appendChild(entry);return entry;
   });
   function sync(){trigger.textContent=select.options[select.selectedIndex]?.textContent||'';entries.forEach((entry,i)=>{entry.setAttribute('aria-selected',String(i===select.selectedIndex));entry.classList.toggle('chosen',i===select.selectedIndex)})}
   function close(){wrap.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
   function open(){document.querySelectorAll('.fd-dropdown.open').forEach(w=>{if(w!==wrap){w.classList.remove('open');w.querySelector('.fd-trigger')?.setAttribute('aria-expanded','false')}});wrap.classList.add('open');trigger.setAttribute('aria-expanded','true');sync();entries[select.selectedIndex]?.scrollIntoView({block:'nearest'});}
   trigger.addEventListener('click',()=>wrap.classList.contains('open')?close():open());
   trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Enter',' '].includes(e.key)){e.preventDefault();if(!wrap.classList.contains('open'))open();else if(e.key==='ArrowDown'||e.key==='ArrowUp'){let next=(select.selectedIndex+(e.key==='ArrowDown'?1:-1)+entries.length)%entries.length;entries[next].focus();entries[next].scrollIntoView({block:'nearest'});cue('tick')}else close()}});
   menu.addEventListener('keydown',e=>{const i=entries.indexOf(document.activeElement);if(e.key==='Escape'){close();trigger.focus()}else if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const n=(i+(e.key==='ArrowDown'?1:-1)+entries.length)%entries.length;entries[n].focus();entries[n].scrollIntoView({block:'nearest'});cue('tick')}});
   // V25: touch swipes need their own audible steps. On some browsers,
   // a single-finger gesture moves the menu without generating scroll events
   // at a useful cadence (whereas a two-finger trackpad gesture does).
   // Count touch travel in option-sized increments, even during inertial scroll.
   let touchAnchor=null;
   menu.addEventListener('touchstart',e=>{
     if(e.touches.length===1)touchAnchor=e.touches[0].clientY;
   },{passive:true});
   menu.addEventListener('touchmove',e=>{
     if(touchAnchor===null||e.touches.length!==1)return;
     const y=e.touches[0].clientY;
     if(Math.abs(y-touchAnchor)>=24){
       touchAnchor=y;
       const t=performance.now();
       if(t-lastTick>65){lastTick=t;cue('tick')}
     }
   },{passive:true});
   menu.addEventListener('touchend',()=>{touchAnchor=null},{passive:true});
   menu.addEventListener('touchcancel',()=>{touchAnchor=null},{passive:true});
   let lastStep=0;
   menu.addEventListener('scroll',()=>{const step=Math.round(menu.scrollTop/30);if(step!==lastStep){lastStep=step;const t=performance.now();if(t-lastTick>65){lastTick=t;cue('tick')}}},{passive:true});
   select.addEventListener('change',sync);
   select.parentNode.insertBefore(wrap,select);wrap.append(trigger,menu);wrap.appendChild(select);select.classList.add('fd-original-select');sync();
   document.addEventListener('pointerdown',e=>{if(!wrap.contains(e.target))close()});
 });
})();
