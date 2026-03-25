const holdVideo = document.getElementById("holdVideo");
const fragments = document.querySelectorAll(".fragment");
const photos = document.querySelectorAll(".photo");

function safePlay(video) {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

window.addEventListener("load", () => {
  holdVideo.muted = true;
  holdVideo.volume = 0;
  safePlay(holdVideo);
});

fragments.forEach((fragment) => {
  fragment.addEventListener("mouseenter", () => {
    fragments.forEach((item) => item.classList.remove("active"));
    fragment.classList.add("active");
  });
});

photos.forEach((photo) => {
  photo.addEventListener("mouseenter", () => {
    photos.forEach((item) => {
      item.style.opacity = "0.78";
    });
    photo.style.opacity = "1";
  });

  photo.addEventListener("mouseleave", () => {
    photos.forEach((item) => {
      item.style.opacity = "1";
    });
  });
});