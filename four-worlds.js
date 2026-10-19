/* Four distinct crisp visual worlds. Images are original native-resolution 4K vector renders. */
(()=>{'use strict';
const game=document.getElementById('game'),stage=game.querySelector('.stage');
const bg=document.createElement('div');bg.id='fourWorldBackdrop';stage.prepend(bg);
const canvas=document.createElement('canvas');canvas.id='fourWorldCanvas';stage.append(canvas);
const shade=document.createElement('div');shade.id='fourWorldShade';stage.append(shade);
const ctx=canvas.getContext('2d');const media=matchMedia('(orientation: portrait)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let mode='burst',w=1,h=1,dpr=1,frameId=0,impact=0,last=0;
const palette={burst:['#ff168e','#00e5ff','#ffad21'],rings:['#ff16aa','#05eaff','#a45bff'],club:['#ff16aa','#08e5ff','#ffa316'],temple:['#ffb03b','#ff1eaa','#28e6ff']};
const rng=(a,b)=>a+Math.random()*(b-a);let shards=[];
function reset(){shards=Array.from({length:mode==='burst'?75:mode==='club'?22:mode==='temple'?12:0},()=>({a:rng(0,Math.PI*2),p:rng(0,1),v:rng(.08,.3),size:rng(2,8),c:Math.floor(rng(0,3))}))}
function resize(){const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,2.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
function image(){const orientation=media.matches?'portrait/':'';bg.style.backgroundImage=`url("worlds/${orientation}${mode}.jpg")`}
function setMode(next){mode=['burst','rings','club','temple'].includes(next)?next:'burst';image();reset();draw(performance.now());}
function stroke(x1,y1,x2,y2,color,width,alpha,glow){ctx.globalAlpha=alpha;ctx.lineWidth=width;ctx.strokeStyle=color;ctx.lineCap='round';ctx.shadowColor=color;ctx.shadowBlur=glow;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=1}
function draw(t){ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.53;const colors=palette[mode];const time=t*.001;
 if(mode==='burst'){
  for(const s of shards){const p=s.p,r=(.06+p*p*.83)*Math.hypot(w,h),a=s.a,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.8;stroke(x,y,x+Math.cos(a)*(18+p*100),y+Math.sin(a)*(18+p*100)*.8,colors[s.c],s.size*(.5+p),.25+p*.7,s.size*3);if(!reduced.matches){s.p+=s.v*.016;if(s.p>1.04){s.p=0;s.a=rng(0,Math.PI*2)}}}
 }else if(mode==='rings'){
  const max=Math.hypot(w,h)*.65;for(let i=0;i<7;i++){const p=((i/7+time*.095)%1),r=20+p*p*max;ctx.beginPath();ctx.ellipse(cx,cy,r,r*.75,0,0,Math.PI*2);ctx.strokeStyle=colors[i%3];ctx.lineWidth=1+p*5;ctx.shadowColor=colors[i%3];ctx.shadowBlur=16;ctx.globalAlpha=.15+(1-p)*.45;ctx.stroke()}ctx.globalAlpha=1;ctx.shadowBlur=0;
 }else if(mode==='club'){
  const beam=Math.sin(time*.7)*w*.06;for(let i=0;i<5;i++){const x=(i-2)*w*.13;stroke(cx+x,0,cx+x*.28+beam,h*.62,colors[i%3],1.5,.25,12)}
 }else if(mode==='temple'){
  const r=(.4+.6*Math.sin(time*.6)**2)*Math.min(w,h)*.27;ctx.beginPath();ctx.ellipse(cx,h*.55,r,r*.2,0,0,Math.PI*2);ctx.strokeStyle=colors[0];ctx.globalAlpha=.23;ctx.lineWidth=3;ctx.shadowColor=colors[0];ctx.shadowBlur=25;ctx.stroke();ctx.globalAlpha=1;ctx.shadowBlur=0;
 }
 if(impact>0){const p=1-impact,r=(.1+p*.7)*Math.min(w,h);ctx.beginPath();ctx.ellipse(cx,cy,r,r*.7,0,0,Math.PI*2);ctx.lineWidth=2+impact*5;ctx.strokeStyle=colors[0];ctx.globalAlpha=impact*.55;ctx.shadowColor=colors[0];ctx.shadowBlur=22;ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=1;impact=Math.max(0,impact-.025)}
}
function tick(t){frameId=requestAnimationFrame(tick);if(document.hidden)return;if(reduced.matches){if(impact>0)draw(t);return}if(t-last<28)return;last=t;draw(t)}
window.FlashWorlds={setMode,pulse(){impact=1}};
// Keep existing cue callbacks but route their visual pulse into this renderer.
const prior=window.NeonBurst?.pulse;window.NeonBurst={...(window.NeonBurst||{}),pulse(kind){window.FlashWorlds.pulse(kind);},setActive(){}};
new ResizeObserver(resize).observe(stage);media.addEventListener?.('change',image);window.addEventListener('resize',resize);resize();setMode('burst');frameId=requestAnimationFrame(tick);
})();
