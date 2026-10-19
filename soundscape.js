/* FLASH DANZE V19: original warm layered percussive countdown, browser user-gesture unlocked. */
(()=>{'use strict';const names=['three','two','one','go'];let ctx=null;const buffers={};
function enabled(){return document.getElementById('soundMode')?.value!=='off'}
async function prepare(){if(!enabled())return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();await ctx.resume();await Promise.all(names.map(async name=>{if(buffers[name])return;const r=await fetch('audio/'+name+'.wav');if(!r.ok)return;buffers[name]=await ctx.decodeAudioData(await r.arrayBuffer())}))}catch(e){console.warn('Sound unavailable:',e)}}
function play(name){if(!enabled()||!ctx||ctx.state!=='running'||!buffers[name])return;const s=ctx.createBufferSource(),gain=ctx.createGain();s.buffer=buffers[name];gain.gain.value=.72;s.connect(gain).connect(ctx.destination);s.start()}
window.FlashSound={prepare,play};
})();