(()=>{"use strict";
const KEY="f2math_v50_profile";
const CHAPTERS=[
{id:1,title:"Chapter 1",subtitle:"Pattern and Sequences"},
{id:2,title:"Chapter 2",subtitle:"Factorisation and Algebraic Fractions"},
{id:3,title:"Chapter 3",subtitle:"Algebraic Formulae"},
{id:4,title:"Chapter 4",subtitle:"Polygons"},
{id:5,title:"Chapter 5",subtitle:"Circles"},
{id:6,title:"Chapter 6",subtitle:"Three-Dimensional Geometrical Shapes"},
{id:7,title:"Chapter 7",subtitle:"Coordinates"},
{id:8,title:"Chapter 8",subtitle:"Graphs of Functions"},
{id:9,title:"Chapter 9",subtitle:"Speed and Acceleration"},
{id:10,title:"Chapter 10",subtitle:"Gradient of a Straight Line"},
{id:11,title:"Chapter 11",subtitle:"Isometric Transformations"},
{id:12,title:"Chapter 12",subtitle:"Measures of Central Tendencies"},
{id:13,title:"Chapter 13",subtitle:"Simple Probability"}
];
const BANKS={
1:[
{q:"What is the next number? 2, 4, 6, 8, __",a:["9","10","11","12"],c:1,e:"The pattern increases by 2 each time."},
{q:"Complete the pattern: 5, 10, 15, __",a:["18","19","20","25"],c:2,e:"Add 5 each time."},
{q:"Which rule matches 3, 6, 9, 12?",a:["Add 2","Add 3","Multiply by 3","Subtract 3"],c:1,e:"Every term is 3 more than the previous term."}
],
2:[
{q:"Factorise 6x + 12.",a:["6(x+2)","3(x+4)","2(3x+12)","6(x+12)"],c:0,e:"Take out the greatest common factor, 6."},
{q:"Simplify x/3 + 2x/3.",a:["x/3","x","3x","2x/6"],c:1,e:"The denominators are the same, so add the numerators."}
],
3:[
{q:"Make x the subject of y = x + 5.",a:["x=y+5","x=y-5","x=5-y","x=5y"],c:1,e:"Subtract 5 from both sides."},
{q:"If P = 2l + 2w, find P when l=4 and w=3.",a:["7","12","14","24"],c:2,e:"P=2(4)+2(3)=14."}
],
4:[
{q:"What is the sum of interior angles of a quadrilateral?",a:["180°","270°","360°","540°"],c:2,e:"A quadrilateral can be divided into two triangles."},
{q:"A regular pentagon has how many equal sides?",a:["4","5","6","8"],c:1,e:"A pentagon has five sides."}
],
5:[
{q:"Which formula gives the circumference of a circle?",a:["πr²","2πr","πd²","r²"],c:1,e:"Circumference = 2πr or πd."},
{q:"Which formula gives the area of a circle?",a:["2πr","πr²","πd","r²/2"],c:1,e:"Area = πr²."}
],
6:[
{q:"How many faces does a cube have?",a:["4","6","8","12"],c:1,e:"A cube has 6 square faces."},
{q:"Which solid has one curved surface and two circular faces?",a:["Cone","Sphere","Cylinder","Pyramid"],c:2,e:"A cylinder has two circular faces and one curved surface."}
],
7:[
{q:"What are the coordinates of a point 3 units right and 2 units up from the origin?",a:["(2,3)","(3,2)","(-3,2)","(3,-2)"],c:1,e:"Horizontal movement gives x=3 and vertical movement gives y=2."},
{q:"Which quadrant contains the point (-2,4)?",a:["I","II","III","IV"],c:1,e:"Negative x and positive y place the point in Quadrant II."}
],
8:[
{q:"Which graph represents y = 2x + 1?",a:["A straight line","A circle","A parabola","A horizontal line only"],c:0,e:"A linear function gives a straight-line graph."},
{q:"When x=3, find y for y=2x+1.",a:["5","6","7","8"],c:2,e:"y=2(3)+1=7."}
],
9:[
{q:"Speed is calculated using __.",a:["time ÷ distance","distance ÷ time","distance × time","time - distance"],c:1,e:"Speed = distance ÷ time."},
{q:"A car travels 120 km in 2 hours. Its average speed is __.",a:["40 km/h","60 km/h","120 km/h","240 km/h"],c:1,e:"120 ÷ 2 = 60 km/h."}
],
10:[
{q:"Gradient is calculated using __.",a:["horizontal change ÷ vertical change","vertical change ÷ horizontal change","x+y","xy"],c:1,e:"Gradient = change in y ÷ change in x."},
{q:"Find the gradient between (1,2) and (3,6).",a:["1","2","3","4"],c:1,e:"(6-2) ÷ (3-1) = 4 ÷ 2 = 2."}
],
11:[
{q:"A translation changes a shape's __.",a:["size only","position only","shape and size","angle only"],c:1,e:"A translation slides a shape without changing its size or shape."},
{q:"A reflection uses a __.",a:["centre of rotation","mirror line","scale factor","gradient"],c:1,e:"A reflection is formed across a mirror line."}
],
12:[
{q:"Find the mean of 2, 4 and 6.",a:["3","4","5","6"],c:1,e:"(2+4+6) ÷ 3 = 4."},
{q:"Find the median of 3, 7, 5.",a:["3","5","7","15"],c:1,e:"Arrange the numbers: 3,5,7. The middle value is 5."}
],
13:[
{q:"A fair coin is tossed once. What is the probability of getting heads?",a:["0","1/4","1/2","1"],c:2,e:"There are two equally likely outcomes and one is heads."},
{q:"A bag contains 3 red and 2 blue balls. What is the probability of choosing a red ball?",a:["2/5","3/5","1/2","3/2"],c:1,e:"There are 3 red balls out of 5 balls in total."}
]
};
let state={profile:null,chapter:null,index:0,selected:null};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem(KEY,JSON.stringify(state.profile))}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch{return null}}
function show(id){["loginView","lobbyView","gameView"].forEach(x=>$("#"+x)?.classList.add("hidden"));$("#"+id)?.classList.remove("hidden")}
function ensureProfile(p){p.xp??=0;p.coins??=0;p.progress??={};return p}
function renderLobby(){const p=ensureProfile(state.profile);$("#playerName").textContent=p.name;$("#playerXp").textContent=p.xp||0;$("#chapterGrid").innerHTML=CHAPTERS.map(ch=>{const progress=p.progress[ch.id]?.index||0;const total=BANKS[ch.id]?.length||0;return `<button class="chapter" data-chapter="${ch.id}"><strong>${ch.title}</strong><span>${ch.subtitle}</span><small>${Math.min(progress,total)}/${total} completed</small></button>`}).join("");$$('[data-chapter]').forEach(b=>b.addEventListener('click',()=>openChapter(Number(b.dataset.chapter))))}
function login(){const name=$("#nameInput").value.trim();if(!name)return $("#nameInput").focus();state.profile=load();if(!state.profile||state.profile.name!==name)state.profile={name,xp:0,coins:0,progress:{}};ensureProfile(state.profile);save();renderLobby();show("lobbyView")}
function openChapter(id){state.chapter=id;const bank=BANKS[id]||[];state.index=Math.min(state.profile.progress[id]?.index||0,Math.max(0,bank.length-1));state.selected=null;show("gameView");renderQuestion()}
function renderQuestion(){const bank=BANKS[state.chapter]||[];if(!bank.length){$("#questionText").textContent="Questions are being migrated for this chapter.";$("#answers").innerHTML="";$("#feedback").textContent="";$("#checkBtn").classList.add("hidden");$("#nextBtn").classList.add("hidden");return}const q=bank[state.index%bank.length];$("#chapterTitle").textContent=CHAPTERS.find(x=>x.id===state.chapter)?.title||`Chapter ${state.chapter}`;$("#questionNo").textContent=`Question ${state.index+1} of ${bank.length}`;$("#questionText").textContent=q.q;$("#answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-answer="${i}">${x}</button>`).join("");$("#feedback").textContent="";$("#nextBtn").classList.add("hidden");$("#checkBtn").classList.remove("hidden");$("#progressBar").style.width=((state.index/bank.length)*100)+"%";$$('[data-answer]').forEach(b=>b.addEventListener('click',()=>{state.selected=Number(b.dataset.answer);$$('[data-answer]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}))}
function check(){if(state.selected===null)return;const bank=BANKS[state.chapter]||[];const q=bank[state.index%bank.length];const ok=state.selected===q.c;$("#feedback").textContent=ok?"Correct! +10 XP":"Not yet. "+q.e;if(ok){state.profile.xp=(state.profile.xp||0)+10;state.profile.progress[state.chapter]={index:Math.min(state.index+1,bank.length)};save()}$("#checkBtn").classList.add("hidden");$("#nextBtn").classList.remove("hidden")}
function next(){const bank=BANKS[state.chapter]||[];if(!bank.length)return;if(state.index>=bank.length-1){state.index=0;state.selected=null;renderQuestion();return}state.index++;state.selected=null;renderQuestion()}
function back(){renderLobby();show("lobbyView")}
function boot(){const p=load();if(p){state.profile=ensureProfile(p);renderLobby();show("lobbyView")}else show("loginView");$("#loginBtn").addEventListener("click",login);$("#nameInput").addEventListener("keydown",e=>{if(e.key==="Enter")login()});$("#checkBtn").addEventListener("click",check);$("#nextBtn").addEventListener("click",next);$("#backBtn").addEventListener("click",back);$("#switchBtn").addEventListener("click",()=>{localStorage.removeItem(KEY);state.profile=null;show("loginView")})}
window.addEventListener("DOMContentLoaded",boot)
})();