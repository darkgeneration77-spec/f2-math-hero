(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CH=3;
const BANK=[
{q:"Make x the subject of y = x + 7.",a:["x=y+7","x=y-7","x=7-y","x=7y"],c:1,e:"Subtract 7 from both sides."},
{q:"Make a the subject of b = 3a.",a:["a=3b","a=b/3","a=b-3","a=3/b"],c:1,e:"Divide both sides by 3."},
{q:"Make m the subject of P = 2m + 5.",a:["m=(P-5)/2","m=(P+5)/2","m=2P-5","m=P/2+5"],c:0,e:"Subtract 5, then divide by 2."},
{q:"Make h the subject of A = 1/2 bh.",a:["h=2A/b","h=A/2b","h=b/2A","h=Ab/2"],c:0,e:"Multiply by 2 and divide by b."},
{q:"Make r the subject of C = 2πr.",a:["r=C/2π","r=2π/C","r=Cπ/2","r=C-2π"],c:0,e:"Divide both sides by 2π."},
{q:"If y = 4x - 3, find y when x = 5.",a:["13","17","20","23"],c:1,e:"y=4(5)-3=17."},
{q:"If P = 2l + 2w, find P when l=8 and w=3.",a:["11","16","22","48"],c:2,e:"P=2(8)+2(3)=22."},
{q:"If V = lwh, find V when l=4, w=3, h=5.",a:["12","20","60","120"],c:2,e:"V=4×3×5=60."},
{q:"If s = ut + 1/2 at², find s when u=2, t=3 and a=4.",a:["18","20","24","30"],c:2,e:"s=2(3)+1/2(4)(9)=6+18=24."},
{q:"If F = ma, find a when F=36 and m=6.",a:["5","6","7","8"],c:1,e:"a=F/m=36/6=6."},
{q:"Make t the subject of v = u + at.",a:["t=(v-u)/a","t=(v+u)/a","t=a(v-u)","t=v-u-a"],c:0,e:"Subtract u and divide by a."},
{q:"Make y the subject of x = 3y - 4.",a:["y=(x-4)/3","y=(x+4)/3","y=3x+4","y=x/3-4"],c:1,e:"Add 4, then divide by 3."},
{q:"Make p the subject of q = (p+5)/2.",a:["p=2q-5","p=q/2-5","p=2q+5","p=q-10"],c:0,e:"Multiply by 2, then subtract 5."},
{q:"Make x the subject of z = 5/(x+1).",a:["x=5/z-1","x=5z-1","x=z/5-1","x=5/(z-1)"],c:0,e:"z(x+1)=5, so x=5/z-1."},
{q:"If a = (v-u)/t, find a when v=25, u=5, t=4.",a:["4","5","6","8"],c:1,e:"a=(25-5)/4=5."},
{q:"If d = vt, find t when d=150 and v=30.",a:["3","4","5","6"],c:2,e:"t=d/v=150/30=5."},
{q:"If A = πr², find A when r=7 and π=22/7.",a:["44","77","154","308"],c:2,e:"A=(22/7)(7²)=154."},
{q:"Make w the subject of A = lw.",a:["w=A/l","w=l/A","w=A-l","w=Al"],c:0,e:"Divide both sides by l."},
{q:"Make b the subject of y = mx + b.",a:["b=y-mx","b=mx-y","b=y+mx","b=y/mx"],c:0,e:"Subtract mx from both sides."},
{q:"Make q the subject of p = q/r.",a:["q=pr","q=p/r","q=r/p","q=p-r"],c:0,e:"Multiply both sides by r."},
{q:"If T = 2π√(l/g), which variable is already the subject?",a:["π","l","g","T"],c:3,e:"T stands alone on the left side."},
{q:"Make n the subject of S = n(a+b).",a:["n=S/(a+b)","n=S-a-b","n=S(a+b)","n=(a+b)/S"],c:0,e:"Divide by a+b."},
{q:"Make x the subject of y = (2x-1)/3.",a:["x=(3y+1)/2","x=(3y-1)/2","x=3(y+1)/2","x=(y+1)/6"],c:0,e:"3y=2x-1, so 2x=3y+1."},
{q:"If k = 3m², find k when m=4.",a:["12","24","36","48"],c:3,e:"k=3(4²)=48."},
{q:"If E = mc², find E when m=2 and c=3.",a:["6","12","18","36"],c:2,e:"E=2(3²)=18."}
];
let idx=0,selected=null,answered=false;
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function active(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles();return name?all[name]||null:null}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all))}
function hide(){["loginView","lobbyView","heroView","petView","missionView","achievementView","teacherView","gameView","wrongBookView","shopView","chestView","masteryView","leaderboardView","adaptiveView","backupView","reportView","recoveryView","chapter2RecoveryView"].forEach(id=>$("#"+id)?.classList.add("hidden"))}
function inject(){if(!$("#chapter3RecoveryView")){const s=document.createElement("section");s.id="chapter3RecoveryView";s.className="panel hidden";s.innerHTML='<div class="topbar"><div><strong>Chapter 3 · Algebraic Formulae</strong><div id="ch3No" class="muted"></div></div><button id="ch3Back" class="btn secondary">Back to Chapters</button></div><div class="progress"><div id="ch3Progress"></div></div><p id="ch3Question" class="question"></p><div id="ch3Answers" class="answers"></div><div id="ch3Feedback" class="feedback"></div><div class="row gap-top"><button id="ch3Check" class="btn">Check Answer</button><button id="ch3Next" class="btn hidden">Next Question</button></div>';document.querySelector("main.shell").insertBefore(s,$("#gameView"));$("#ch3Back").onclick=back;$("#ch3Check").onclick=check;$("#ch3Next").onclick=next}const grid=$("#chapterGrid");grid?.addEventListener("click",e=>{const b=e.target.closest('[data-chapter="3"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true)}
function open(){idx=0;selected=null;answered=false;hide();$("#chapter3RecoveryView").classList.remove("hidden");render()}
function render(){const q=BANK[idx];$("#ch3No").textContent=`Question ${idx+1} of ${BANK.length}`;$("#ch3Question").textContent=q.q;$("#ch3Progress").style.width=`${idx/BANK.length*100}%`;$("#ch3Answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-ch3answer="${i}">${x}</button>`).join("");$("#ch3Feedback").textContent="";$("#ch3Check").classList.remove("hidden");$("#ch3Next").classList.add("hidden");selected=null;answered=false;$$('[data-ch3answer]').forEach(b=>b.onclick=()=>{if(answered)return;selected=Number(b.dataset.ch3answer);$$('[data-ch3answer]').forEach(x=>x.classList.remove("selected"));b.classList.add("selected")})}
function check(){if(selected===null||answered)return;answered=true;const q=BANK[idx],ok=selected===q.c,p=active();$$('[data-ch3answer]').forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");if(i===selected&&!ok)b.classList.add("wrong")});$("#ch3Feedback").textContent=ok?"Correct! +10 XP +2 Coins":`Not yet. ${q.e}`;if(p){p.recoveredChapterStats??={};const s=p.recoveredChapterStats[CH]??={correct:0,wrong:0,attempts:0};s.attempts++;if(ok){s.correct++;p.xp=(p.xp||0)+10;p.coins=(p.coins||0)+2}else s.wrong++;p.recoveredChapterStats[CH]=s;p.progress??={};p.progress[CH]={index:Math.max(p.progress[CH]?.index||0,idx+1)};save(p);if($("#playerXp"))$("#playerXp").textContent=p.xp||0;if($("#playerCoins"))$("#playerCoins").textContent=p.coins||0}$("#ch3Check").classList.add("hidden");$("#ch3Next").classList.remove("hidden")}
function next(){if(idx>=BANK.length-1){back();return}idx++;render()}
function back(){$("#chapter3RecoveryView")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function badge(){const card=document.querySelector('[data-chapter="3"] small');if(card)card.textContent=`${BANK.length} restored questions · Algebraic Formulae`}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V52.2";const h=$(".hero h1");if(h)h.textContent="F2 Math Hero V52.2";inject();setTimeout(badge,300);new MutationObserver(badge).observe($("#chapterGrid"),{childList:true,subtree:true})});
})();