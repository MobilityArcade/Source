/* V13: photographic still-world backdrops. Existing game timing and cues remain unchanged. */
(()=>{
 const game=document.getElementById('game');
 const sel=document.getElementById('backgroundStyle');
 const worlds=new Set(['grid','city','garden','temple','club','studio','playground','sunset','halloween','winter']);
 const image=document.createElement('div');
 image.className='cinematicBackdrop';image.setAttribute('aria-hidden','true');
 game.querySelector('.stage').prepend(image);
 const apply=()=>{
   const value=sel.value, active=worlds.has(value);
   game.classList.toggle('cinematicMode',active);
   image.style.backgroundImage=active?`linear-gradient(90deg,rgba(0,0,10,.26),rgba(0,0,10,.12) 50%,rgba(0,0,10,.26)),url("worlds/${value}.jpg")`:'';
 };
 sel.addEventListener('change',apply);
 window.addEventListener('load',apply);
 apply();
})();
