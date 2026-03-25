const loveVideo = document.getElementById("loveVideo");
const soundToggle = document.getElementById("soundToggle");
const coreWord = document.getElementById("coreWord");
const glow = document.getElementById("glow");
const centerStage = document.querySelector(".center-stage");
const lines = document.querySelectorAll(".line");

let immersiveMode = false;
let soundOn = false;
let activeLine = 0;
let lineInterval = null;
let hasUnlockedAudio = false;

function safePlay(video) {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.log("Video play blocked or failed:", err);
    });
  }
}

function updateSoundUI() {
  soundToggle.textContent = soundOn ? "sound on" : "sound off";
}

function applySoundState() {
  loveVideo.muted = !soundOn;
  loveVideo.volume = soundOn ? 1 : 0;
  updateSoundUI();

  console.log("soundOn:", soundOn);
  console.log("video.muted:", loveVideo.muted);
  console.log("video.volume:", loveVideo.volume);

  safePlay(loveVideo);
}

function unlockAudioAndPlay() {
  hasUnlockedAudio = true;
  soundOn = true;
  applySoundState();
}

function setActiveLine(index) {
  lines.forEach((line) => line.classList.remove("active"));
  if (lines[index]) {
    lines[index].classList.add("active");
  }
}

function startLineCycle() {
  if (lineInterval) clearInterval(lineInterval);

  lineInterval = setInterval(() => {
    activeLine = (activeLine + 1) % lines.length;
    setActiveLine(activeLine);
  }, 2200);
}

function enterImmersiveMode() {
  immersiveMode = true;
  document.body.classList.add("immersive");
  safePlay(loveVideo);
}

function exitImmersiveMode() {
  immersiveMode = false;
  document.body.classList.remove("immersive");
}

function toggleImmersiveMode() {
  if (immersiveMode) {
    exitImmersiveMode();
  } else {
    enterImmersiveMode();
  }
}

window.addEventListener("load", () => {
  loveVideo.muted = true;
  loveVideo.volume = 0;
  loveVideo.currentTime = 0;
  safePlay(loveVideo);
  updateSoundUI();
  setActiveLine(0);
  startLineCycle();
});

/* 第一次用户交互时，强制解锁音频 */
document.addEventListener(
  "click",
  () => {
    if (!hasUnlockedAudio) {
      unlockAudioAndPlay();
    }
  },
  { once: true }
);

soundToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!hasUnlockedAudio) {
    hasUnlockedAudio = true;
  }

  soundOn = !soundOn;
  applySoundState();
});

coreWord.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!hasUnlockedAudio) {
    unlockAudioAndPlay();
  }

  toggleImmersiveMode();
});

document.addEventListener("click", () => {
  if (immersiveMode) {
    exitImmersiveMode();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && immersiveMode) {
    exitImmersiveMode();
  }
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const moveX = (x - centerX) / centerX;
  const moveY = (y - centerY) / centerY;

  const strength = immersiveMode ? 16 : 8;
  centerStage.style.transform = `translate(${moveX * strength}px, ${moveY * strength}px)`;
});