(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s);
const ACHIEVEMENTS=[
{id:"first-correct",name:"First Victory",desc:"Answer 1 question correctly.",goal:p=>1,value:p=>p.stats?.correct||0,reward:5},
{id:"combo-master",name:"Combo Master",desc:"Reach a 5-answer combo.",goal:p=>5,value:p=>p.bestCombo||0,reward:15},
{id:"boss-slayer",name:"Boss Slayer",desc:"Defeat 1 chapter boss.",goal:p=>1,value:p=>Object.values(p.bossWins||{}).filter(Boolean).length,reward:20},
{id:"chapter-conqueror",name:"Chapter Conqueror",desc:"Defeat 5 chapter bosses.",goal:p=>5,value:p=>Object.values(p.bossWins||{}).filter(Boolean).length,reward:50},
{id:"wrong-cleaner",name:"Wrong Book Cleaner",desc:"Clear the wrong book after recording a mistake.",goal:p=>1,value:p=>(p.hadWrongAnswer&&(p.wrongBook?.length||0)===0)?1:0,reward:20},
{id:"hero-trainer",name:"Hero Trainer",desc:"Raise a hero to Level 3.",goal:p=>3,value:p=>p.heroLevel||1,reward:25},
{id:"pet-trainer",name:"Pet Trainer",desc:"Raise a pet to Level 3.",goal:p=>3,value:p=>p.petLevel||1,reward:25}
];
function allProfiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function activeProfile(){const name=localStorage.getItem(ACTIVE_KEY),all=allProfiles();return name?all[name]||null:null}
function saveProfile(p){const all=allProfiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all))}
function syncDerived(p){p.achievements||={};p.claimedAchievements||={};p.bestCombo=Math.max(p.bestCombo||0,Number($("#comboValue")?.textContent||0));if((p.stats?.wrong||0)>0)p.hadWrongAnswer=true;ACHIEVEMENTS.forEach(a=>{p.achievements[a.id]=Math.min(a.value(p),a.goal(p))});saveProfile(p)}
function render(){const p=activeProfile();if(!p)return;syncDerived(p);const done=ACHIEVEMENTS.filter(a=>(p.achievements[a.id]||0)>=a.goal(p)).length;$("#achievementSummary").textContent=`${done}/${ACHIEVEMENTS.length} unlocked`;$("#achievementGrid").innerHTML=ACHIEVEMENTS.map(a=>{const value=p.achievements[a.id]||0,goal=a.goal(p),unlocked=value>=goal,claimed=!!p.claimedAchievements[a.id],pct=Math.min(100,value/goal*100);return `<article class="achievement-card ${unlocked?'unlocked':''}"><div class="achievement-top"><strong>${a.name}</strong><span>${unlocked?'Unlocked':'In progress'}</span></div><p>${a.desc}</p><div class="achievement-track"><div style="width:${pct}%"></div></div><small>${Math.min(value,goal)}/${goal} · Reward ${a.reward} coins</small><button class="btn ${claimed?'secondary':''}" data-claim="${a.id}" ${!unlocked||claimed?'disabled':''}>${claimed?'Claimed':'Claim Reward'}</button></article>`}).join("");document.querySelectorAll("[data-claim]").forEach(b=>b.addEventListener("click",()=>claim(b.dataset.claim)))}
function claim(id){const p=activeProfile(),a=ACHIEVEMENTS.find(x=>x.id===id);if(!p||!a)return;syncDerived(p);if((p.achievements[id]||0)<a.goal(p)||p.claimedAchievements[id])return;p.coins=(p.coins||0)+a.reward;p.claimedAchievements[id]=true;saveProfile(p);const coins=$("#playerCoins");if(coins)coins.textContent=p.coins;render()}
function openAchievements(){render();["loginView","lobbyView","gameView","wrongBookView","heroView","petView"].forEach(id=>$("#"+id)?.classList.add("hidden"));$("#achievementView")?.classList.remove("hidden")}
function back(){$("#achievementView")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function observe(){const target=$("#comboValue");if(target)new MutationObserver(()=>{const p=activeProfile();if(p){syncDerived(p)}}).observe(target,{childList:true,characterData:true,subtree:true})}
window.addEventListener("DOMContentLoaded",()=>{$("#achievementBtn")?.addEventListener("click",openAchievements);$("#achievementBackBtn")?.addEventListener("click",back);observe();setInterval(()=>{const p=activeProfile();if(p)syncDerived(p)},1500)})
})();