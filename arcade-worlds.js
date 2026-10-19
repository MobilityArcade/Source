/* FLASH DANZE V10.1: independent GRID and CHAOS visual worlds. */
(()=>{'use strict';
const canvas=document.getElementById('arcadeWorld');if(!canvas)return;
const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let w=1,h=1,dpr=1,mode='',raf=0,visible=!document.hidden,last=0,t=0;
const colors=['#ff149f','#00eaff','#824eff','#ffc13b','#ff497e'];
function resize(){const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
function line(x,y,X,Y,color,width=2,alpha=1,glow=12){ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.shadowColor=color;ctx.shadowBlur=glow;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(X,Y);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=1}
function grid(){const horizon=h*.53,base=h*1.08,center=w*.5;const travel=reduced.matches?0:t*.65;const glow=ctx.createLinearGradient(0,horizon,0,h);glow.addColorStop(0,'#140329');glow.addColorStop(1,'#070b35');ctx.fillStyle=glow;ctx.fillRect(0,horizon,w,h-horizon);
// perspective rails converge at the horizon
for(let i=-13;i<=13;i++){const x=center+i*w*.12;line(center,horizon,x,base,i%2?'#00cfff':'#ff1ab4',i%3===0?2.6:1.5,.35,12)}
// horizontal floor lines accelerate as they approach the viewer
for(let i=0;i<21;i++){const z=((i/21+travel*.00018)%1);const depth=z*z;const y=horizon+depth*(h-horizon)*1.18;const a=.2+depth*.6;line(0,y,w,y,i%3===0?'#00eaff':'#ff2bc0',1+depth*2,a,12)}
// columns of luminous city lights framing the grid
for(let side of [-1,1])for(let i=0;i<7;i++){const x=center+side*w*(.25+i*.065);const height=h*(.055+(i%3)*.024);const phase=Math.sin(t*.002+i*1.7);line(x,horizon-height,x,horizon,'#00dcff',2.5,.25+phase*.12,14)}
const pulse=.5+.5*Math.sin(t*.0025);line(0,horizon,w,horizon,'#f327ce',2.5,.4+pulse*.25,22)}
function chaos(){const cx=w*.5,cy=h*.53,scale=Math.min(w,h);const speed=reduced.matches?0:t*.001;
// animated layered polygons; avoid the central reading area
for(let i=0;i<30;i++){const ring=Math.floor(i/10),j=i%10;const a=j*Math.PI/5+ring*.34+speed*(ring%2?-.8:1.15);const radius=scale*(.27+ring*.135)+Math.sin(speed*1.7+j)*scale*.018;const x=cx+Math.cos(a)*radius*1.55,y=cy+Math.sin(a)*radius*.9;const sz=scale*(.018+ring*.009);ctx.save();ctx.translate(x,y);ctx.rotate(a+speed*(i%2?1:-1));ctx.globalAlpha=.28+Math.sin(speed*3+i)*.13;ctx.strokeStyle=colors[(i+ring)%colors.length];ctx.lineWidth=2.5;ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=13;ctx.beginPath();const sides=i%4===0?3:4;for(let k=0;k<sides;k++){const theta=k*Math.PI*2/sides;const px=Math.cos(theta)*sz,py=Math.sin(theta)*sz;k?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.stroke();ctx.restore()}
// diagonal kinetic bars and changing angular lattice at the periphery
for(let i=0;i<18;i++){const a=i*Math.PI*2/18+speed*.55;const radius=scale*(.35+.13*Math.sin(speed+i));const x=cx+Math.cos(a)*radius*1.7,y=cy+Math.sin(a)*radius;const len=scale*(.045+(i%4)*.014);line(x,y,x+Math.cos(a+1.2)*len,y+Math.sin(a+1.2)*len,colors[i%colors.length],2.4,.3+Math.sin(speed*3+i)*.13,16)}
// shifting outlines, intentionally faint beneath the word
for(let k=0;k<3;k++){ctx.save();ctx.translate(cx,cy);ctx.rotate(speed*(k%2?-1:1)*.28+k*.52);const size=scale*(.24+k*.15);ctx.globalAlpha=.08;ctx.strokeStyle=colors[k];ctx.lineWidth=2;ctx.strokeRect(-size,-size*.68,size*2,size*1.36);ctx.restore()}}
function draw(){ctx.clearRect(0,0,w,h);if(mode==='grid')grid();else if(mode==='chaos')chaos();if(mode){const fade=ctx.createRadialGradient(w*.5,h*.52,0,w*.5,h*.52,Math.min(w,h)*.52);fade.addColorStop(0,'rgba(5,4,22,.48)');fade.addColorStop(.6,'rgba(5,4,22,.12)');fade.addColorStop(1,'rgba(5,4,22,0)');ctx.fillStyle=fade;ctx.fillRect(0,0,w,h)}}
function frame(now){raf=0;if(!mode||!visible)return;const dt=Math.min(50,now-(last||now));last=now;t+=dt;draw();if(!reduced.matches)raf=requestAnimationFrame(frame)}
function run(){cancelAnimationFrame(raf);raf=0;last=0;if(!mode||!visible){ctx.clearRect(0,0,w,h);return}draw();if(!reduced.matches)raf=requestAnimationFrame(frame)}
window.ArcadeWorlds={setMode(value){mode=value==='grid'||value==='chaos'?value:'';run()}};
new ResizeObserver(resize).observe(canvas);document.addEventListener('visibilitychange',()=>{visible=!document.hidden;run()});reduced.addEventListener?.('change',run);resize();
})();
