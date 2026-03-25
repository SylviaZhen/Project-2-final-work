// js/main.js
const prefix = document.getElementById("prefix");
const blank  = document.getElementById("blank");
const suffix = document.getElementById("suffix");

const wordsBox = document.getElementById("words");
const words = Array.from(document.querySelectorAll(".word"));
const love = document.getElementById("love");

const INTRO_SPEED = 95;
const FILL_SPEED  = 110;
const LOVE_HOVER_TIME = 5000;
const NEXT_PAGE = "letter.html";

let typing = false;

function typeText(el, text, speed){
  return new Promise(resolve=>{
    el.textContent = "";
    let i = 0;
    const timer = setInterval(()=>{
      el.textContent += text[i];
      i++;
      if(i >= text.length){
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function intro(){
  typing = true;
  await typeText(prefix, "I (", INTRO_SPEED);
  blank.textContent = "     ";
  await typeText(suffix, ") you", INTRO_SPEED);
  typing = false;
}

async function fill(word){
  if(typing) return;
  typing = true;
  const display = word.replaceAll("-", " ");
  await typeText(blank, ` ${display} `, FILL_SPEED);
  typing = false;
}

function rand(min, max){ return Math.random() * (max - min) + min; }

function ensureLoveHoldUI(){
  if(love.querySelector(".hold")) return;
  const hold = document.createElement("span");
  hold.className = "hold";
  hold.innerHTML = "<i></i>";
  love.appendChild(hold);
}

function layoutNoOverlap(){
  const rect = wordsBox.getBoundingClientRect();
  const baseY = rect.height * 0.55;

  const order = [
    "like","miss","adore","cherish","treasure","care","choose",
    "hold-dear","long-for","stay-with","love"
  ];

  const els = words.slice().sort((a,b)=>{
    return order.indexOf(a.dataset.word) - order.indexOf(b.dataset.word);
  });

  let x = rect.width * 0.06;
  const padding = 44;

  els.forEach(el=>{
    el.style.setProperty("--r", rand(-6, 6).toFixed(1) + "deg");

    const y = baseY + rand(-52, 42);
    el.style.left = x + "px";
    el.style.top  = Math.max(10, Math.min(y, rect.height - 40)) + "px";

    x += el.offsetWidth + padding + rand(-10, 10);
  });

  const last = els[els.length - 1];
  const lastRight = last.offsetLeft + last.offsetWidth;
  if(lastRight > rect.width - 10){
    const shift = lastRight - (rect.width - 10);
    els.forEach(el=>{
      el.style.left = (el.offsetLeft - shift) + "px";
    });
  }
}

function moveLove(){
  const rect = wordsBox.getBoundingClientRect();
  const x = rand(rect.width * 0.06, rect.width * 0.82);
  const y = rand(rect.height * 0.18, rect.height * 0.80);
  love.style.left = x + "px";
  love.style.top  = y + "px";
  love.style.setProperty("--r", rand(-8, 8).toFixed(1) + "deg");
}

words.forEach(el=>{
  if(el.dataset.word !== "love"){
    el.addEventListener("click", ()=> fill(el.dataset.word));
  }
});

love.addEventListener("click", moveLove);

ensureLoveHoldUI();

let hoverTimer = null;
let progressRAF = null;
let hoverStart = 0;

love.addEventListener("mouseenter", ()=>{
  love.classList.add("is-hovering");
  hoverStart = performance.now();
  const bar = love.querySelector(".hold > i");

  const tick = (t)=>{
    const elapsed = t - hoverStart;
    const pct = Math.min(100, (elapsed / LOVE_HOVER_TIME) * 100);
    bar.style.width = pct + "%";
    progressRAF = requestAnimationFrame(tick);
  };

  progressRAF = requestAnimationFrame(tick);

  hoverTimer = setTimeout(()=>{
    window.location.href = NEXT_PAGE;
  }, LOVE_HOVER_TIME);
});

love.addEventListener("mouseleave", ()=>{
  love.classList.remove("is-hovering");
  clearTimeout(hoverTimer);
  hoverTimer = null;

  if(progressRAF) cancelAnimationFrame(progressRAF);
  progressRAF = null;

  const bar = love.querySelector(".hold > i");
  if(bar) bar.style.width = "0%";
});

window.addEventListener("resize", layoutNoOverlap);

layoutNoOverlap();
intro();
