(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s);
const LOOT=[
 {name:"Coin Bundle",icon:"🪙",coins:20,xp:0,weight:35},
 {name:"XP Scroll",icon:"📜",coins:0,xp:35,weight:30},
 {name:"Hero Essence",icon:"⚔️",heroXp:30,weight:15},
 {name:"Pet Treat",icon:"🐾",petXp:25,weight:15},
 {name:"Jackpot",icon:"💎",coins:50,xp:50,weight:5}
];
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function active(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles();return name?all[name]||null:null}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all));const xp=$("#playerXp"),coins=$("#playerCoins");if(xp)xp.textContent=p.xp||0;if(coins)coins.textContent=p.coins||0}
function ensure(p){p.chests??=0;p.chestBossClaims??={};p.chestHistory??=[];return p}
function syncBossChests(p){ensure(p);Object.entries(p.bossWins||{}).forEach(([chapter,won])=>{if(won&&!p.chestBossClaims[chapter]){p.chestBossClaims[chapter]=true;p.chests++}});save(p)}
function inject(){const row=$("#lobbyView .topbar .row");if(row&&!$("#chestBtn")){const b=document.createElement("button");b.id="chestBtn";b.className="btn secondary";b.innerHTML='Treasure <span id="chestCountBadge" class="badge">0</span>';row.insertBefore(b,$("#missionBtn")||row.firstChild);b.addEventListener("click",open)}if(!$("#chestView")){const main=$("main.shell"),section=document.createElement("section");section.id="chestView";section.className="panel hidden";section.innerHTML='<div class="topbar"><div><strong>Treasure Room</strong><div id="chestSummary" class="muted"></div></div><button id="chestBackBtn" class="btn secondary">Back to Chapters</button></div><div class="chest-stage"><div id="chestBox" class="chest-box">🎁</div><button id="openChestBtn" class="btn">Open Chest</button><div id="chestResult" class="feedback"></div></div><div id="chestHistory" class="chest-history"></div>';main.insertBefore(section,$("#gameView"));$("#chestBackBtn").addEventListener("click",back);$("#openChestBtn").addEventListener("click",openChest)}}
function hideViews(){["loginView","lobbyView","heroView","petView","missionView","achievementView","teacherView","shopView","rewardView","gameView","wrongBookView"].forEach(id=>$("#"+id)?.classList.add("hidden"))}
function updateBadge(p){const badge=$("#chestCountBadge");if(badge)badge.textContent=p.chests||0}
function open(){const p=active();if(!p)return;syncBossChests(p);hideViews();$("#chestView").classList.remove("hidden");render()}
function back(){$("#chestView")?.classList.add("hidden");$("#lobbyView")?.classList.remove("hidden")}
function render(){const p=ensure(active());if(!p)return;updateBadge(p);$("#chestSummary").textContent=`${p.chests} unopened chest${p.chests===1?'':'s'} · Earn 1 chest for each new Boss victory.`;$("#openChestBtn").disabled=p.chests<1;$("#chestHistory").innerHTML=p.chestHistory.length?`<strong>Recent rewards</strong>${p.chestHistory.slice(0,5).map(x=>`<div>${x.icon} ${x.name} · ${x.text}</div>`).join('')}`:'<div class="muted">No chests opened yet.</div>'}
function pick(){const total=LOOT.reduce((s,x)=>s+x.weight,0);let n=Math.random()*total;for(const item of LOOT){n-=item.weight;if(n<=0)return item}return LOOT[0]}
function openChest(){const p=ensure(active());if(!p||p.chests<1)return;const loot=pick();p.chests--;p.coins=(p.coins||0)+(loot.coins||0);p.xp=(p.xp||0)+(loot.xp||0);p.heroXp=(p.heroXp||0)+(loot.heroXp||0);p.petXp=(p.petXp||0)+(loot.petXp||0);while((p.heroXp||0)>=100){p.heroXp-=100;p.heroLevel=(p.heroLevel||1)+1}while((p.petXp||0)>=60){p.petXp-=60;p.petLevel=(p.petLevel||1)+1}const parts=[];if(loot.coins)parts.push(`+${loot.coins} coins`);if(loot.xp)parts.push(`+${loot.xp} XP`);if(loot.heroXp)parts.push(`+${loot.heroXp} Hero XP`);if(loot.petXp)parts.push(`+${loot.petXp} Pet XP`);const text=parts.join(" · ");p.chestHistory.unshift({name:loot.name,icon:loot.icon,text,time:new Date().toISOString()});p.chestHistory=p.chestHistory.slice(0,20);save(p);const box=$("#chestBox");box.classList.remove("open");void box.offsetWidth;box.classList.add("open");$("#chestResult").textContent=`${loot.icon} ${loot.name}: ${text}`;render()}
function poll(){const p=active();if(!p)return;const before=ensure(p).chests;syncBossChests(p);updateBadge(p);if(p.chests>before){const banner=$("#loginRewardBanner");if(banner){banner.innerHTML='<strong>Boss Chest Earned</strong><span>Open it in the Treasure Room.</span>';banner.classList.remove("hidden");setTimeout(()=>banner.classList.add("hidden"),5000)}}}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V51.3";const h=document.querySelector(".hero h1");if(h)h.textContent="F2 Math Hero V51.3";inject();poll();setInterval(poll,2000)});
})();