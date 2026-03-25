const bgVideo = document.getElementById("bgVideo");
const memoryVideo = document.getElementById("memoryVideo");
const quotes = document.querySelectorAll(".quote");
const pageDim = document.getElementById("pageDim");
const videoFullscreen = document.getElementById("videoFullscreen");

let fullMode = false;
let hoverHideTimer = null;
let hasStartedHoverVideo = false;

function safePlay(video) {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

function revealMemory(soundOn = false) {
  if (fullMode) return;

  if (hoverHideTimer) {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = null;
  }

  memoryVideo.muted = !soundOn;

  if (!hasStartedHoverVideo) {
    memoryVideo.currentTime = 0;
    safePlay(memoryVideo);
    hasStartedHoverVideo = true;
  } else if (memoryVideo.paused) {
    safePlay(memoryVideo);
  }

  memoryVideo.classList.add("revealed");
  pageDim.classList.add("active");
}

function hideMemorySoft() {
  if (fullMode) return;

  if (hoverHideTimer) {
    clearTimeout(hoverHideTimer);
  }

  hoverHideTimer = setTimeout(() => {
    if (fullMode) return;

    memoryVideo.classList.remove("revealed");
    pageDim.classList.remove("active");
    quotes.forEach((q) => q.classList.remove("active"));

    setTimeout(() => {
      if (!memoryVideo.classList.contains("revealed") && !fullMode) {
        memoryVideo.pause();
        hasStartedHoverVideo = false;
      }
    }, 900);
  }, 180);
}

function enterFullMode(soundOn = true, activeQuote = null) {
  fullMode = true;

  if (hoverHideTimer) {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = null;
  }

  document.body.classList.add("full-mode");
  videoFullscreen.classList.add("open");
  memoryVideo.classList.add("full");
  memoryVideo.classList.add("revealed");
  pageDim.classList.add("active");

  quotes.forEach((q) => q.classList.remove("active"));
  if (activeQuote) activeQuote.classList.add("active");

  memoryVideo.muted = !soundOn;
  memoryVideo.currentTime = 0;
  safePlay(memoryVideo);
}

function exitFullMode() {
  fullMode = false;
  document.body.classList.remove("full-mode");
  videoFullscreen.classList.remove("open");
  memoryVideo.classList.remove("full");
  memoryVideo.classList.remove("revealed");
  pageDim.classList.remove("active");
  memoryVideo.pause();
  memoryVideo.muted = true;
  quotes.forEach((q) => q.classList.remove("active"));
  hasStartedHoverVideo = false;
}

quotes.forEach((quote) => {
  const soundMode = quote.dataset.sound === "on";

  quote.addEventListener("mouseenter", () => {
    quotes.forEach((q) => q.classList.remove("active"));
    quote.classList.add("active");
    revealMemory(false);
  });

  quote.addEventListener("mouseleave", () => {
    quote.classList.remove("active");
    hideMemorySoft();
  });

  quote.addEventListener("click", () => {
    enterFullMode(soundMode, quote);
  });
});

videoFullscreen.addEventListener("click", exitFullMode);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fullMode) {
    exitFullMode();
  }
});

window.addEventListener("load", () => {
  bgVideo.play().catch(() => {});
});