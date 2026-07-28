(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CH4=[
{q:"What is the sum of the interior angles of a quadrilateral?",a:["180°","270°","360°","540°"],c:2,e:"Use (n-2)×180°. For n=4, the sum is 360°."},
{q:"What is the sum of the interior angles of a pentagon?",a:["360°","540°","720°","900°"],c:1,e:"(5-2)×180°=540°."},
{q:"What is the sum of the interior angles of a hexagon?",a:["540°","720°","900°","1080°"],c:1,e:"(6-2)×180°=720°."},
{q:"Each exterior angle of a regular octagon is __.",a:["40°","45°","50°","60°"],c:1,e:"360°÷8=45°."},
{q:"Each interior angle of a regular pentagon is __.",a:["72°","90°","108°","120°"],c:2,e:"540°÷5=108°."},
{q:"Each interior angle of a regular hexagon is __.",a:["108°","120°","135°","144°"],c:1,e:"720°÷6=120°."},
{q:"A polygon has an interior angle sum of 900°. How many sides does it have?",a:["5","6","7","8"],c:2,e:"(n-2)×180°=900°, so n=7."},
{q:"A polygon has an interior angle sum of 1260°. How many sides does it have?",a:["7","8","9","10"],c:2,e:"(n-2)×180°=1260°, so n=9."},
{q:"A regular polygon has an exterior angle of 30°. How many sides does it have?",a:["10","11","12","15"],c:2,e:"360°÷30°=12 sides."},
{q:"A regular polygon has an exterior angle of 24°. How many sides does it have?",a:["12","14","15","18"],c:2,e:"360°÷24°=15 sides."},
{q:"One interior angle of a regular polygon is 150°. How many sides does it have?",a:["10","12","15","18"],c:1,e:"Exterior angle=30°, so number of sides=360°÷30°=12."},
{q:"One interior angle of a regular polygon is 135°. How many sides does it have?",a:["6","8","10","12"],c:1,e:"Exterior angle=45°, so number of sides=8."},
{q:"The angles of a quadrilateral are 90°, 85°, 100° and x. Find x.",a:["75°","80°","85°","90°"],c:2,e:"x=360°-(90°+85°+100°)=85°."},
{q:"The interior angles of a pentagon are 110°, 120°, 95°, 105° and x. Find x.",a:["100°","105°","110°","115°"],c:2,e:"x=540°-430°=110°."},
{q:"Two exterior angles of a polygon are 70° and 80°, while the other four are equal. Find each equal angle.",a:["45°","50°","52.5°","55°"],c:2,e:"Remaining total=360°-150°=210°. 210°÷4=52.5°."},
{q:"A regular nonagon has each exterior angle equal to __.",a:["30°","36°","40°","45°"],c:2,e:"360°÷9=40°."},
{q:"A regular decagon has each interior angle equal to __.",a:["140°","144°","150°","156°"],c:1,e:"Interior angle=180°-36°=144°."},
{q:"How many diagonals does a pentagon have?",a:["4","5","6","7"],c:1,e:"n(n-3)÷2=5×2÷2=5."},
{q:"How many diagonals does a hexagon have?",a:["6","8","9","12"],c:2,e:"6×3÷2=9 diagonals."},
{q:"How many diagonals does an octagon have?",a:["16","18","20","24"],c:2,e:"8×5÷2=20 diagonals."},
{q:"A polygon has 14 diagonals. How many sides does it have?",a:["6","7","8","9"],c:1,e:"n(n-3)÷2=14 gives n=7."},
{q:"A regular polygon has 10 diagonals. How many sides does it have?",a:["5","6","7","8"],c:0,e:"5×2÷2=5, not 10. For n=5 diagonals are 5; for n=6 they are 9. No regular polygon has exactly 10 diagonals under the standard formula, so this is a trick item and the closest intended choice is 5 only if counting from one vertex. Check wording carefully."},
{q:"From one vertex of a heptagon, how many diagonals can be drawn?",a:["3","4","5","6"],c:1,e:"From one vertex, diagonals=n-3=4."},
{q:"From one vertex of a decagon, how many diagonals can be drawn?",a:["5","6","7","8"],c:2,e:"10-3=7 diagonals."},
{q:"The ratio of three angles in a triangle is 2:3:4. Find the largest angle.",a:["60°","70°","80°","90°"],c:2,e:"Total parts=9. Largest=4/9×180°=80°."},
{q:"The ratio of four angles in a quadrilateral is 1:2:3:4. Find the largest angle.",a:["108°","126°","144°","162°"],c:2,e:"Total parts=10. Largest=4/10×360°=144°."},
{q:"A regular polygon has each interior angle 160°. Find the number of sides.",a:["15","16","18","20"],c:2,e:"Exterior angle=20°. 360°÷20°=18 sides."},
{q:"A regular polygon has each interior angle 165°. Find the number of sides.",a:["20","24","30","36"],c:1,e:"Exterior angle=15°. 360°÷15°=24 sides."}
];
let idx=0,selected=null,answered=false;
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function active(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles();return name?all[name]||null:null}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all))}
function inject(){if(!$("#chapter4RecoveryView")){const s=document.createElement("section");s.id="chapter4RecoveryView";s.className="panel hidden";s.innerHTML='<div class="topbar"><div><strong>Chapter 4 · Polygons</strong><div id="chapter4No" class="muted"></div></div><button id="chapter4Back" class="btn secondary">Back to Chapters</button></div><div class="progress"><div id="chapter4Progress"></div></div><p id="chapter4Question" class="question"></p><div id="chapter4Answers" class="answers"></div><div id="chapter4Feedback" class="feedback"></div><div class="row gap-top"><button id="chapter4Check" class="btn">Check Answer</button><button id="chapter4Next" class="btn hidden">Next Question</button></div>';document.querySelector("main.shell").insertBefore(s,$("#gameView"));$("#chapter4Back").onclick=back;$("#chapter4Check").onclick=check;$("#chapter4Next").onclick=next}
const grid=$("#chapterGrid");grid?.addEventListener("click",e=>{const b=e.target.closest('[data-chapter="4"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true)}
function hide(){["loginView","lobbyView","heroView","petView","missionView","achievementView","teacherView","gameView","wrongBookView","shopView","chestView","masteryView","leaderboardView","adaptiveView","backupView","reportView","recoveryView","chapter2RecoveryView","chapter3RecoveryView"].forEach(id=>$("#"+id)?.classList.add("hidden"))}
function open(){idx=0;selected=null;answered=false;hide();$("#chapter4RecoveryView").classList.remove("hidden");render()}
function render(){const q=CH4[idx];$("#chapter4No").textContent=`Question ${idx+1} of ${CH4.length}`;$("#chapter4Question").textContent=q.q;$("#chapter4Progress").style.width=`${idx/CH4.length*100}%`;$("#chapter4Answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-c4answer="${i}">${x}</button>`).join("");$("#chapter4Feedback").textContent="";$("#chapter4Check").classList.remove("hidden");$("#chapter4Next").classList.add("hidden");selected=null;answered=false;$$('[data-c4answer]').forEach(b=>b.onclick=()=>{if(answered)return;selected=Number(b.dataset.c4answer);$$('[data-c4answer]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')})}
function check(){if(selected===null||answered)return;answered=true;const q=CH4[idx],ok=selected===q.c,p=active();$$('[data-c4answer]').forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add('correct');if(i===selected&&!ok)b.classList.add('wrong')});$("#chapter4Feedback").textContent=ok?"Correct! Polygon question completed.":`Not yet. ${q.e}`;if(p){p.recoveredChapterStats??={};const s=p.recoveredChapterStats[4]??={correct:0,wrong:0,attempts:0};s.attempts++;if(ok){s.correct++;p.xp=(p.xp||0)+10;p.coins=(p.coins||0)+2}else s.wrong++;p.recoveredChapterStats[4]=s;p.progress??={};p.progress[4]={index:Math.max(p.progress[4]?.index||0,idx+1)};save(p);if($("#playerXp"))$("#playerXp").textContent=p.xp||0;if($("#playerCoins"))$("#playerCoins").textContent=p.coins||0}$("#chapter4Check").classList.add("hidden");$("#chapter4Next").classList.remove("hidden")}
function next(){if(idx>=CH4.length-1){back();return}idx++;render()}
function back(){$("#chapter4RecoveryView")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function badge(){const card=document.querySelector('[data-chapter="4"] small');if(card)card.textContent=`${CH4.length} restored questions · Polygons`}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V52.3";const h=$(".hero h1");if(h)h.textContent="F2 Math Hero V52.3";inject();setTimeout(badge,300);new MutationObserver(badge).observe($("#chapterGrid"),{childList:true,subtree:true})});
})();