(()=>{"use strict";
const SETTINGS_KEY="f2math_v51_audio";
const $=s=>document.querySelector(s);
let ctx=null,musicTimer=null,musicStep=0;
let settings={music:true,sfx:true,volume:.75};
try{settings={...settings,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||"{}")}}catch{}
function save(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings))}
function audio(){if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume();return ctx}
function tone(freq,duration=.12,type="sine",gain=.16,delay=0){if(!settings.sfx&&gain>.1)return;const c=audio(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(Math.max(.0001,gain*settings.volume),t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+duration+.02)}
function correct(){tone(523,.09,"triangle",.22);tone(659,.1,"triangle",.2,.07);tone(784,.16,"triangle",.18,.14)}
function wrong(){tone(180,.18,"sawtooth",.2);tone(120,.28,"square",.13,.09)}
function click(){tone(360,.05,"sine",.1)}
function reward(){[523,659,784,1047].forEach((n,i)=>tone(n,.12,"triangle",.16,i*.06))}
function boss(){tone(110,.25,"sawtooth",.18);tone(147,.25,"sawtooth",.16,.12);tone(196,.35,"square",.12,.24)}
function floatText(text,kind="good"){const layer=$("#fxLayer");if(!layer)return;const el=document.createElement("div");el.className=`float-fx ${kind}`;el.textContent=text;el.style.left=`${35+Math.random()*30}%`;el.style.top=`${28+Math.random()*20}%`;layer.appendChild(el);setTimeout(()=>el.remove(),1100)}
function burst(){const layer=$("#fxLayer");if(!layer)return;for(let i=0;i<12;i++){const p=document.createElement("i");p.className="spark";p.style.setProperty("--x",`${(Math.random()-.5)*220}px`);p.style.setProperty("--y",`${(Math.random()-.5)*180}px`);layer.appendChild(p);setTimeout(()=>p.remove(),850)}}
function startMusic(){stopMusic();if(!settings.music)return;const melody=[220,247,294,330,294,247,196,220,262,294,349,330,294,262,220,196];musicTimer=setInterval(()=>{if(document.hidden||!settings.music)return;const c=audio(),freq=melody[musicStep++%melody.length],o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type="triangle";o.frequency.value=freq;g.gain.setValueAtTime(.035*settings.volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+.42);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.45)},430)}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
function updateControls(){const m=$("#musicToggle"),s=$("#sfxToggle"),v=$("#masterVolume");if(m)m.textContent=settings.music?"Music On":"Music Off";if(s)s.textContent=settings.sfx?"SFX On":"SFX Off";if(v)v.value=settings.volume}
function observeFeedback(){const target=$("#feedback");if(!target)return;let last="";new MutationObserver(()=>{const text=target.textContent.trim();if(!text||text===last)return;last=text;if(/attacks|Correct|Critical/i.test(text)){correct();const combo=Number($("#comboValue")?.textContent||0);floatText(combo>=5?`COMBO ×${combo}!`:"CORRECT!","good");if(combo>=5)burst()}else if(/counterattacks|Not yet|defeated/i.test(text)){wrong();floatText("TRY AGAIN","bad")}else if(/reward|Boss defeated|victory/i.test(text)){reward();floatText("REWARD!","good");burst()}}, {childList:true,subtree:true,characterData:true})}
function observeBoss(){const target=$("#enemyBattleName");if(!target)return;let wasBoss=false;new MutationObserver(()=>{const now=/Boss:/i.test(target.textContent);if(now&&!wasBoss){boss();floatText("BOSS BATTLE","boss");burst()}wasBoss=now},{childList:true,subtree:true,characterData:true})}
window.addEventListener("DOMContentLoaded",()=>{updateControls();$("#musicToggle")?.addEventListener("click",()=>{settings.music=!settings.music;save();updateControls();settings.music?startMusic():stopMusic();click()});$("#sfxToggle")?.addEventListener("click",()=>{settings.sfx=!settings.sfx;save();updateControls();if(settings.sfx)click()});$("#masterVolume")?.addEventListener("input",e=>{settings.volume=Number(e.target.value);save()});document.addEventListener("pointerdown",e=>{if(e.target.closest("button")){audio();click();if(settings.music&&!musicTimer)startMusic()}},{once:false});observeFeedback();observeBoss()});
})();