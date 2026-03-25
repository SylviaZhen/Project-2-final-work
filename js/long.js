document.addEventListener("DOMContentLoaded", () => {
  const longWord = document.getElementById("longWord");
  const overlay = document.getElementById("overlay");
  const cursorGlow = document.getElementById("cursorGlow");
  const poemLines = document.querySelectorAll(".poem-line");

  let overlayOpen = false;
  let activeIndex = 0;
  let lineTimer = null;

  function setActiveLine(index) {
    poemLines.forEach((line) => line.classList.remove("active"));
    if (poemLines[index]) {
      poemLines[index].classList.add("active");
    }
  }

  function startLineCycle() {
    if (!poemLines.length) return;

    setActiveLine(0);

    lineTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % poemLines.length;
      setActiveLine(activeIndex);
    }, 2200);
  }

  function openOverlay(event) {
    if (event) event.stopPropagation();
    overlayOpen = true;
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
  }

  function closeOverlay() {
    overlayOpen = false;
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
  }

  if (longWord) {
    longWord.addEventListener("click", openOverlay);
  }

  if (overlay) {
    overlay.addEventListener("click", closeOverlay);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlayOpen) {
      closeOverlay();
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  startLineCycle();
});