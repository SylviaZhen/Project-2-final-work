const wordLinks = {
  "miss": "fragment.html?word=miss",
  "care": "fragment.html?word=care",
  "cherish": "fragment.html?word=cherish",
  "like": "fragment.html?word=like",
  "hold-dear": "fragment.html?word=hold-dear",
  "long-for": "fragment.html?word=long-for",
  "choose": "fragment.html?word=choose",
  "love": "fragment.html?word=love"
};

document.querySelectorAll(".kw").forEach(el => {
  el.addEventListener("click", () => {
    const key = el.dataset.target;
    const next = wordLinks[key];
    if (next) {
      window.location.href = next;
    }
  });
});