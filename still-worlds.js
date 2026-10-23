/* FLASH DANZE V21: static artwork worlds. No animations or effects. */
(()=>{'use strict';
 const stage=document.querySelector('#game .stage');
 const backdrop=document.createElement('div');backdrop.id='stillBackdrop';stage.prepend(backdrop);
 const allowed=new Set(['club', 'city', 'garden', 'rooftop', 'warehouse', 'arcade', 'boardwalk', 'temple', 'funhouse', 'winter', 'saloon', 'stadium', 'yacht', 'helipad', 'green']);
 window.FlashWorlds={setMode(name){if(!allowed.has(name))name='club';backdrop.style.backgroundImage=name==='green'?'none':'url("worlds/'+name+'.webp")';backdrop.style.backgroundColor=name==='green'?'#00ff00':'#02020a'},pulse(){}};
 window.FlashWorlds.setMode('club');
})();
