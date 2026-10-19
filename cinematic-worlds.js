/* V12 cinematic still-image world system. Keep all art local. */
(()=>{
 const game=document.getElementById('game'),sel=document.getElementById('backgroundStyle');
 const worlds=['grid','city','garden','temple','club','studio','playground','sunset','halloween','winter'];
 const image=document.createElement('div');image.className='cinematicBackdrop';image.setAttribute('aria-hidden','true');
 game.querySelector('.stage').prepend(image);
 const apply=()=>{const v=sel.value;const active=worlds.includes(v);game.classList.toggle('cinematicMode',active);image.style.backgroundImage=active?`linear-gradient(90deg,rgba(2,2,15,.34),rgba(2,2,15,.16)),url("worlds/${v}.svg")`:'';};
 sel.addEventListener('change',apply);apply();
 // V11 changes the world on load; apply again once all startup scripts finish.
 window.addEventListener('load',apply);
})();
