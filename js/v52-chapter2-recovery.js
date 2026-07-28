(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CH2=[
{q:"Expand: x(3x - 4)",a:["3x² - 4x","3x² - 4","3x - 4x","x² - 4x"],c:0,e:"Multiply x by both terms: 3x² - 4x."},
{q:"Expand: (3 + x)(2x + 3)",a:["2x² + 9x + 9","2x² + 6x + 9","5x² + 9","2x² + 3x + 9"],c:0,e:"Use distributive law: 6x + 9 + 2x² + 3x."},
{q:"Expand: -2(x - 2)(x + 5)",a:["-2x² - 6x + 20","-2x² + 6x + 20","2x² + 6x - 20","-2x² - 14x + 20"],c:0,e:"(x-2)(x+5)=x²+3x-10, then multiply by -2."},
{q:"Expand: (2x - 7)²",a:["4x² - 28x + 49","4x² - 14x + 49","4x² + 28x + 49","2x² - 28x + 49"],c:0,e:"Use (a-b)²=a²-2ab+b²."},
{q:"Expand: e(2 + 5f)",a:["2e + 5ef","2e + 5f","7ef","10ef"],c:0,e:"Distribute e to both terms."},
{q:"Expand: -(r/4)(8r + 4s - 20)",a:["-2r² - rs + 5r","-2r² + rs + 5r","2r² + rs - 5r","-8r² - 4rs + 20r"],c:0,e:"Multiply -r/4 through each term."},
{q:"Expand: 2(3p - 8)(p - 2)",a:["6p² - 28p + 32","6p² - 20p + 32","3p² - 14p + 16","6p² + 28p + 32"],c:0,e:"First expand to 3p²-14p+16, then multiply by 2."},
{q:"Expand and simplify: 2u(8v-u) - (6uv-u²)",a:["10uv - u²","22uv - 3u²","10uv + u²","16uv - 2u²"],c:0,e:"16uv-2u²-6uv+u²=10uv-u²."},
{q:"Expand: (2h - 7)(2h + 7)",a:["4h² - 49","4h² + 49","2h² - 49","4h² - 28h + 49"],c:0,e:"Difference of two squares."},
{q:"Expand: (4r - s)²",a:["16r² - 8rs + s²","16r² - 4rs + s²","16r² + 8rs + s²","4r² - 8rs + s²"],c:0,e:"Use (a-b)²=a²-2ab+b²."},
{q:"Factorise: 4xy + 10x",a:["2x(2y+5)","4x(y+10)","2(2xy+5x)","x(4y+5)"],c:0,e:"Take out the HCF 2x."},
{q:"Factorise: 9x² - 6x + 1",a:["(3x-1)²","(9x-1)(x-1)","(3x+1)²","(9x+1)(x-1)"],c:0,e:"It is a perfect square trinomial."},
{q:"Factorise: 32x² - 18y²",a:["2(4x-3y)(4x+3y)","(8x-3y)(4x+6y)","2(16x²-9y²)","(4x-3y)²"],c:0,e:"Take out 2, then use difference of squares."},
{q:"Factorise: -5x² - 4x + 1",a:["-(5x-1)(x+1)","(5x+1)(1-x)","-(5x+1)(x-1)","(5x-1)(1-x)"],c:0,e:"-5x²-4x+1=-(5x²+4x-1)=-(5x-1)(x+1)."},
{q:"Factorise: 4h - 12hk",a:["4h(1-3k)","4(h-3k)","12h(1-k)","h(4-12h)"],c:0,e:"Take out 4h."},
{q:"Factorise: p² - 36",a:["(p-6)(p+6)","(p-18)(p+2)","(p-6)²","p(p-36)"],c:0,e:"Difference of two squares."},
{q:"Factorise: 25w² - 10w + 1",a:["(5w-1)²","(25w-1)(w-1)","(5w+1)²","(5w-1)(5w+1)"],c:0,e:"Perfect square trinomial."},
{q:"Factorise: 3(a+b)+x(a+b)",a:["(a+b)(3+x)","(a+b)(3x)","3x(a+b)","(a+3)(b+x)"],c:0,e:"Take out the common factor (a+b)."},
{q:"Simplify: 2/m - 3/n",a:["(2n-3m)/mn","-1/(m+n)","(2m-3n)/mn","(2n+3m)/mn"],c:0,e:"Use common denominator mn."},
{q:"Simplify: (n-4)/8 + n/4",a:["(3n-4)/8","(2n-4)/8","(3n+4)/8","(n-2)/4"],c:0,e:"n/4=2n/8, so total is (3n-4)/8."},
{q:"Simplify: 3m/[2(n+1)] + m/(n+1)",a:["5m/[2(n+1)]","4m/[2(n+1)]","3m/[3(n+1)]","2m/(n+1)"],c:0,e:"Convert the second fraction to 2m/[2(n+1)]."},
{q:"Simplify: (3d/5) - (2d/3)",a:["-d/15","d/15","d/5","-d/5"],c:0,e:"Common denominator 15: 9d/15-10d/15=-d/15."},
{q:"Factorise: 4m² + 8m - 12",a:["4(m+3)(m-1)","4(m-3)(m+1)","2(2m+3)(m-2)","(4m-4)(m+3)"],c:0,e:"Take out 4, then factor m²+2m-3."},
{q:"Factorise: 4k² - 64",a:["4(k-4)(k+4)","(2k-8)(2k+8)","4(k-8)(k+8)","(4k-8)(k+8)"],c:0,e:"Take out 4, then use difference of squares."},
{q:"A square P has side x cm. Rectangle Q has sides x cm and (2x-4) cm. Find area(P)-area(Q).",a:["4x-x²","x²-4x","3x²-4x","x²-2x+4"],c:0,e:"x²-x(2x-4)=4x-x²."},
{q:"Simplify: (4a-2b)² + 12ab",a:["16a²-4ab+4b²","16a²+4ab+4b²","16a²-16ab+4b²","(4a+2b)²"],c:0,e:"Expand first, then combine -16ab+12ab."},
{q:"Room A has width x and length 2x. Room B has 4 times its perimeter and length 9x. Find width of Room B.",a:["3x","6x","9x","12x"],c:0,e:"Perimeter A=6x, so B=24x. Then 2(9x+w)=24x, giving w=3x."},
{q:"An isosceles triangle has equal sides (6y-5) cm and base (6y+2) cm. Find its perimeter.",a:["18y-8","18y-3","12y-3","12y+2"],c:0,e:"2(6y-5)+(6y+2)=18y-8."}
];
let idx=0,selected=null,answered=false;
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function active(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles();return name?all[name]||null:null}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all))}
function inject(){if(!$("#recovery2View")){const s=document.createElement("section");s.id="recovery2View";s.className="panel hidden";s.innerHTML='<div class="topbar"><div><strong>Chapter 2 · Restored Question Bank</strong><div id="recovery2No" class="muted"></div></div><button id="recovery2Back" class="btn secondary">Back to Chapters</button></div><div class="progress"><div id="recovery2Progress"></div></div><p id="recovery2Question" class="question"></p><div id="recovery2Answers" class="answers"></div><div id="recovery2Feedback" class="feedback"></div><div class="row gap-top"><button id="recovery2Check" class="btn">Check Answer</button><button id="recovery2Next" class="btn hidden">Next Question</button></div>';document.querySelector("main.shell").insertBefore(s,$("#gameView"));$("#recovery2Back").onclick=back;$("#recovery2Check").onclick=check;$("#recovery2Next").onclick=next}
$("#chapterGrid")?.addEventListener("click",e=>{const b=e.target.closest('[data-chapter="2"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true)}
function hide(){["loginView","lobbyView","heroView","petView","missionView","achievementView","teacherView","gameView","wrongBookView","shopView","chestView","masteryView","leaderboardView","adaptiveView","backupView","reportView","recoveryView"].forEach(id=>$("#"+id)?.classList.add("hidden"))}
function open(){idx=0;selected=null;answered=false;hide();$("#recovery2View").classList.remove("hidden");render()}
function render(){const q=CH2[idx];$("#recovery2No").textContent=`Question ${idx+1} of ${CH2.length}`;$("#recovery2Question").textContent=q.q;$("#recovery2Progress").style.width=`${idx/CH2.length*100}%`;$("#recovery2Answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-r2answer="${i}">${x}</button>`).join("");$("#recovery2Feedback").textContent="";$("#recovery2Check").classList.remove("hidden");$("#recovery2Next").classList.add("hidden");selected=null;answered=false;$$('[data-r2answer]').forEach(b=>b.onclick=()=>{if(answered)return;selected=Number(b.dataset.r2answer);$$('[data-r2answer]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')})}
function check(){if(selected===null||answered)return;answered=true;const q=CH2[idx],ok=selected===q.c,p=active();$$('[data-r2answer]').forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add('correct');if(i===selected&&!ok)b.classList.add('wrong')});$("#recovery2Feedback").textContent=ok?"Correct! Chapter 2 worksheet question completed.":`Not yet. ${q.e}`;if(p){p.recoveredChapterStats??={};const s=p.recoveredChapterStats[2]??={correct:0,wrong:0,attempts:0};s.attempts++;if(ok){s.correct++;p.xp=(p.xp||0)+10;p.coins=(p.coins||0)+2}else s.wrong++;p.recoveredChapterStats[2]=s;p.progress??={};p.progress[2]={index:Math.max(p.progress[2]?.index||0,idx+1)};save(p);if($("#playerXp"))$("#playerXp").textContent=p.xp||0;if($("#playerCoins"))$("#playerCoins").textContent=p.coins||0}$("#recovery2Check").classList.add("hidden");$("#recovery2Next").classList.remove("hidden")}
function next(){if(idx>=CH2.length-1){back();return}idx++;render()}
function back(){$("#recovery2View")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function badge(){const card=document.querySelector('[data-chapter="2"] small');if(card)card.textContent=`${CH2.length} restored questions · Original worksheet bank`}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V52.1";const h=$(".hero h1");if(h)h.textContent="F2 Math Hero V52.1";inject();setTimeout(badge,300);new MutationObserver(badge).observe($("#chapterGrid"),{childList:true,subtree:true})});
})();