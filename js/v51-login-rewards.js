(()=>{"use strict";
const PROFILE_KEY="f2math_v50_profiles",ACTIVE_KEY="f2math_v50_active_student";
const $=s=>document.querySelector(s);
function profiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")||{}}catch{return {}}}
function save(p){const all=profiles();all[p.name]=p;localStorage.setItem(PROFILE_KEY,JSON.stringify(all));}
function malaysiaDate(offsetDays=0){const now=new Date(Date.now()+offsetDays*86400000);return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kuala_Lumpur",year:"numeric",month:"2-digit",day:"2-digit"}).format(now)}
function claim(){const name=localStorage.getItem(ACTIVE_KEY),all=profiles(),p=name?all[name]:null;if(!p)return;const today=malaysiaDate(),yesterday=malaysiaDate(-1);if(p.lastLoginRewardDate===today)return;
 p.loginStreak=p.lastLoginRewardDate===yesterday?(p.loginStreak||0)+1:1;
 const day=((p.loginStreak-1)%7)+1,rewards=[{coins:5,xp:10},{coins:8,xp:12},{coins:10,xp:15},{coins:12,xp:18},{coins:15,xp:20},{coins:18,xp:25},{coins:30,xp:50}],r=rewards[day-1];
 p.coins=(p.coins||0)+r.coins;p.xp=(p.xp||0)+r.xp;p.lastLoginRewardDate=today;p.totalLoginDays=(p.totalLoginDays||0)+1;save(p);
 const coins=$("#playerCoins"),xp=$("#playerXp"),banner=$("#loginRewardBanner");if(coins)coins.textContent=p.coins;if(xp)xp.textContent=p.xp;if(banner){banner.innerHTML=`<strong>Daily Login Day ${day}</strong><span>+${r.coins} coins · +${r.xp} XP · Streak ${p.loginStreak} day${p.loginStreak===1?"":"s"}</span>`;banner.classList.remove("hidden");setTimeout(()=>banner.classList.add("hidden"),7000)}
 const layer=$("#fxLayer");if(layer){const el=document.createElement("div");el.className="float-fx good";el.textContent=`LOGIN REWARD +${r.coins} COINS`;el.style.left="50%";el.style.top="45%";layer.appendChild(el);setTimeout(()=>el.remove(),1300)}
}
function tryClaim(){setTimeout(claim,250)}
window.addEventListener("DOMContentLoaded",()=>{document.title="F2 Math Hero V51.2";$("#loginBtn")?.addEventListener("click",tryClaim);$("#nameInput")?.addEventListener("keydown",e=>{if(e.key==="Enter")tryClaim()});if(localStorage.getItem(ACTIVE_KEY))tryClaim()});
})();