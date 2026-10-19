/* FLASH DANZE V16: still source artwork; no canvases, movement, or effects. */
(()=>{'use strict';
 const stage=document.querySelector('#game .stage');
 const backdrop=document.createElement('div');backdrop.id='stillBackdrop';stage.prepend(backdrop);
 const allowed=new Set(['club','city','garden','rooftop']);
 const cache=new Map();
 for(const name of allowed){const img=new Image();img.src='worlds/'+name+'.webp';cache.set(name,img)}
 window.FlashWorlds={setMode(name){if(!allowed.has(name))name='club';backdrop.style.backgroundImage='url("worlds/'+name+'.webp")'},pulse(){}};
 window.FlashWorlds.setMode('club');
})();
