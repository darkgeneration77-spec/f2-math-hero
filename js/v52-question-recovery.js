(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CH1=[
{q:"Choose the pattern: 5, 20, 80, 320, …",a:["Multiply the previous number by 4","Multiply the previous number by 8","Add 4","Add 20"],c:0,e:"Each term is multiplied by 4."},
{q:"Choose the pattern: -12, -8, -4, 0, 4, …",a:["Add 6","Add 4","Subtract 4","Multiply by 2"],c:1,e:"Each term increases by 4."},
{q:"Choose the pattern: 176, 88, 44, 22, 11, …",a:["Divide by 1","Divide by 2","Subtract 44","Multiply by 2"],c:1,e:"Each term is divided by 2."},
{q:"Choose the pattern: 37, 32, 27, 22, 17, …",a:["Subtract 5","Subtract 7","Add 5","Divide by 5"],c:0,e:"Each term decreases by 5."},
{q:"Complete: 1, __, 9, 27, __, __, 729",a:["3, 81, 243","2, 54, 162","3, 54, 162","4, 81, 243"],c:0,e:"Multiply by 3: 1, 3, 9, 27, 81, 243, 729."},
{q:"Complete: 208, 104, __, __, 13",a:["52, 26","50, 25","48, 24","54, 27"],c:0,e:"Divide by 2 each time."},
{q:"Complete: 19, 15, __, 7, 3, -1, __",a:["11, -5","12, -4","10, -6","9, -7"],c:0,e:"Subtract 4 each time."},
{q:"Complete: 75, __, 55, 45, __",a:["65, 35","60, 30","70, 40","64, 34"],c:0,e:"Subtract 10 each time."},
{q:"Complete: 268, __, 342, 379, 416, __, __",a:["305, 453, 490","300, 450, 487","305, 452, 489","306, 453, 491"],c:0,e:"Add 37 each time."},
{q:"For 352, 176, 88, … find T6 and T8.",a:["11 and 2.75","22 and 5.5","11 and 5.5","5.5 and 1.375"],c:0,e:"Divide by 2: T6=11 and T8=2.75."},
{q:"For 91, 84, 77, … find T6 and T8.",a:["56 and 42","63 and 49","49 and 35","56 and 49"],c:0,e:"Subtract 7 each time."},
{q:"For 6, 17, 28, … find T6 and T8.",a:["61 and 83","50 and 72","72 and 94","61 and 72"],c:0,e:"Add 11 each time."},
{q:"For 1, 1/2, 1/4, … find T6 and T8.",a:["1/32 and 1/128","1/16 and 1/64","1/32 and 1/64","1/64 and 1/256"],c:0,e:"Divide by 2 each time."},
{q:"For -2.5, -10, -40, … find T6 and T8.",a:["-2560 and -40960","-640 and -10240","2560 and 40960","-160 and -2560"],c:0,e:"Multiply by 4 each time."},
{q:"2, 14, 98, x, 4802, y, … Find x+y.",a:["34300","33614","34986","34314"],c:0,e:"Multiply by 7. x=686, y=33614, so x+y=34300."},
{q:"80, 40, x, y, 5, … Find x+y.",a:["30","25","35","40"],c:0,e:"Divide by 2. x=20 and y=10."},
{q:"190, 235, 280, x, 370, y, … Find x+y.",a:["740","695","785","725"],c:0,e:"Add 45. x=325 and y=415."},
{q:"3, -1, -5, x, y, … Find x+y.",a:["-22","-18","-20","-24"],c:0,e:"Subtract 4. x=-9 and y=-13."},
{q:"State the next three terms: 67, 95, 123, …",a:["151, 179, 207","150, 178, 206","151, 180, 209","149, 175, 201"],c:0,e:"Add 28 each time."},
{q:"State the next three terms: 3, 6, 12, …",a:["24, 48, 96","18, 24, 30","24, 36, 48","15, 18, 21"],c:0,e:"Multiply by 2 each time."},
{q:"State the next three terms: 7920, 1584, 316.8, …",a:["63.36, 12.672, 2.5344","63.6, 12.72, 2.544","62.36, 12.472, 2.4944","64.36, 12.872, 2.5744"],c:0,e:"Divide by 5 each time."}
];
let idx=0,selected=null,answered=false;
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function active(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles();return name?all[name]||null:null}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all))}
function inject(){if(!$("#recoveryView")){const s=document.createElement("section");s.id="recoveryView";s.className="panel hidden";s.innerHTML='<div class="topbar"><div><strong>Chapter 1 · Restored Question Bank</strong><div id="recoveryNo" class="muted"></div></div><button id="recoveryBack" class="btn secondary">Back to Chapters</button></div><div class="progress"><div id="recoveryProgress"></div></div><p id="recoveryQuestion" class="question"></p><div id="recoveryAnswers" class="answers"></div><div id="recoveryFeedback" class="feedback"></div><div class="row gap-top"><button id="recoveryCheck" class="btn">Check Answer</button><button id="recoveryNext" class="btn hidden">Next Question</button></div>';document.querySelector("main.shell").insertBefore(s,$("#gameView"));$("#recoveryBack").onclick=back;$("#recoveryCheck").onclick=check;$("#recoveryNext").onclick=next}
const grid=$("#chapterGrid");grid?.addEventListener("click",e=>{const b=e.target.closest('[data-chapter="1"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true)}
function hide(){["loginView","lobbyView","heroView","petView","missionView","achievementView","teacherView","gameView","wrongBookView","shopView","chestView","masteryView","leaderboardView","adaptiveView","backupView","reportView"].forEach(id=>$("#"+id)?.classList.add("hidden"))}
function open(){idx=0;selected=null;answered=false;hide();$("#recoveryView").classList.remove("hidden");render()}
function render(){const q=CH1[idx];$("#recoveryNo").textContent=`Question ${idx+1} of ${CH1.length}`;$("#recoveryQuestion").textContent=q.q;$("#recoveryProgress").style.width=`${idx/CH1.length*100}%`;$("#recoveryAnswers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-ranswer="${i}">${x}</button>`).join("");$("#recoveryFeedback").textContent="";$("#recoveryCheck").classList.remove("hidden");$("#recoveryNext").classList.add("hidden");selected=null;answered=false;$$('[data-ranswer]').forEach(b=>b.onclick=()=>{if(answered)return;selected=Number(b.dataset.ranswer);$$('[data-ranswer]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')})}
function check(){if(selected===null||answered)return;answered=true;const q=CH1[idx],ok=selected===q.c,p=active();$$('[data-ranswer]').forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add('correct');if(i===selected&&!ok)b.classList.add('wrong')});$("#recoveryFeedback").textContent=ok?"Correct! Restored worksheet question completed.":`Not yet. ${q.e}`;if(p){p.recoveredChapterStats??={};const s=p.recoveredChapterStats[1]??={correct:0,wrong:0,attempts:0};s.attempts++;if(ok){s.correct++;p.xp=(p.xp||0)+10;p.coins=(p.coins||0)+2}else s.wrong++;p.recoveredChapterStats[1]=s;p.progress??={};p.progress[1]={index:Math.max(p.progress[1]?.index||0,idx+1)};save(p);if($("#playerXp"))$("#playerXp").textContent=p.xp||0;if($("#playerCoins"))$("#playerCoins").textContent=p.coins||0}$("#recoveryCheck").classList.add("hidden");$("#recoveryNext").classList.remove("hidden")}
function next(){if(idx>=CH1.length-1){back();return}idx++;render()}
function back(){$("#recoveryView")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function badge(){const card=document.querySelector('[data-chapter="1"] small');if(card)card.textContent=`${CH1.length} restored questions · Original worksheet bank`}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V52.0";const h=$(".hero h1");if(h)h.textContent="F2 Math Hero V52.0";inject();setTimeout(badge,300);new MutationObserver(badge).observe($("#chapterGrid"),{childList:true,subtree:true})});
})();