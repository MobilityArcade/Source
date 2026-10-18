/* FLASH DANZE V6.2 Neon Velocity — self-contained canvas lighting, no network or audio. */
(()=>{
'use strict';
const canvas=document.getElementById('neonBurst');if(!canvas)return;
const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const palette=['#ff149f','#00e9ff','#ff9e14','#815bff','#fff0ac'];
let w=0,h=0,dpr=1,particles=[],streaks=[],burst=0,last=0,raf=0,visible=true;
const rand=(a,b)=>a+Math.random()*(b-a);
function resize(){const rect=canvas.getBoundingClientRect();w=Math.max(1,rect.width);h=Math.max(1,rect.height);dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(110,Math.max(35,Math.round(w*h/9000)))},()=>({x:rand(0,w),y:rand(0,h),r:rand(.6,2.3),speed:rand(3,17),alpha:rand(.25,.9),phase:rand(0,6.3),color:palette[Math.floor(rand(0,palette.length))]}));streaks=Array.from({length:130},(_,i)=>newStreak(i/130));draw(0)}
function newStreak(progress=Math.random()){return {angle:rand(0,Math.PI*2),p:progress,velocity:rand(.27,.78),length:rand(18,70),width:rand(3.3,11.1),color:palette[Math.floor(rand(0,palette.length))],phase:rand(0,6.28)}}
function segment(x1,y1,x2,y2,color,width,alpha){ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.shadowColor=color;ctx.shadowBlur=width*5.5;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.shadowBlur=0}
function draw(time,dt=16){if(!w||!h)return;ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.62,diag=Math.hypot(w,h)*.67;const still=reduced.matches;
// Broken light trails: moving individual bars rather than stationary spokes.
for(let i=0;i<streaks.length;i++){const s=streaks[i];const p=s.p;const a=s.angle;const r=(.045+p*p*.97)*diag;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;const len=s.length*(.35+p*2.2);const dx=Math.cos(a)*len,dy=Math.sin(a)*len;const flicker=still?1:(.72+.28*Math.sin(time*.004+s.phase));segment(x,y,x+dx,y+dy,s.color,s.width*(.6+p*.9),Math.min(1,(.22+p*.75)*flicker+burst*.18));if(!still){s.p+=s.velocity*(Math.min(dt,50)/1000);if(s.p>1.08)streaks[i]=newStreak(0)}}
// Sparse SHIFTVIX-style dust lights, drifting at different speeds.
for(const p of particles){if(!still){p.y-=p.speed*.016;p.x+=Math.sin(time*.0005+p.phase)*.06;if(p.y< -5){p.y=h+5;p.x=rand(0,w)}}const glow=still?.65:(.55+.45*Math.sin(time*.002+p.phase));ctx.globalAlpha=p.alpha*glow;ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=p.r*7;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}ctx.shadowBlur=0;
// Short radial shockwave on new movement cue; leave the middle readable.
if(burst>0){const radius=(1-burst)*Math.min(w,h)*.72+25;ctx.globalAlpha=burst*.27;ctx.lineWidth=3+burst*4;ctx.strokeStyle='#ff43c4';ctx.shadowColor='#ff43c4';ctx.shadowBlur=24;ctx.beginPath();ctx.ellipse(cx,cy,radius,radius*.67,0,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;if(!still)burst=Math.max(0,burst-.035)}ctx.globalAlpha=1;
// Dark, soft central reading zone to preserve word legibility.
const mask=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*.43);mask.addColorStop(0,'rgba(4,2,17,.38)');mask.addColorStop(.65,'rgba(4,2,17,.13)');mask.addColorStop(1,'rgba(4,2,17,0)');ctx.fillStyle=mask;ctx.fillRect(0,0,w,h)}
function frame(t){raf=0;if(!visible)return;const dt=Math.min(50,t-last||16);last=t;draw(t,dt);if(!reduced.matches)raf=requestAnimationFrame(frame)}
function run(){cancelAnimationFrame(raf);raf=0;if(visible){if(reduced.matches)draw(performance.now());else raf=requestAnimationFrame(frame)}}
function pulse(kind){burst=kind==='go'?1:kind==='finish'?.9:.72;if(reduced.matches){burst=0;draw(0)}else if(!raf)run()}
new ResizeObserver(resize).observe(canvas);document.addEventListener('visibilitychange',()=>{visible=!document.hidden;run()});reduced.addEventListener?.('change',run);window.NeonBurst={pulse};resize();run();
})();
