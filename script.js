
(() => {
  "use strict";

  const lineEls = Array.from(document.querySelectorAll(".typed-line"));
  const petalLayer = document.getElementById("petalLayer");

  const instagramUrl =
    "https://www.instagram.com/____.dag.____/?__pwa=1#";

  const messages = [
    "Dear,",
    "— ❀ —",
    "May ma durga bless you with more than you deserve,",
    "better than you expected, and sooner than you imagined.",
    "shubho bijoya",
    "yours Aditya Das Gupta",
    "____.dag.____"
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const pause = (ms) =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

  function makeInstagramLink() {
    const lastLine = lineEls[6];
    if (!lastLine) return;

    const text = lastLine.querySelector(".typed-text");
    const cursor = lastLine.querySelector(".cursor");

    if (!text) return;

    const link = document.createElement("a");
    link.href = instagramUrl;
    link.textContent = messages[6];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Visit Instagram profile");

    text.replaceChildren(link);

    if (cursor) cursor.classList.add("hidden");
  }

  async function typeWish() {
    lineEls.forEach((line) => {
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (text) text.replaceChildren();
      if (cursor) cursor.classList.add("hidden");
    });

    if (reducedMotion) {
      lineEls.forEach((line, index) => {
        const text = line.querySelector(".typed-text");

        if (text && index < 6) {
          text.textContent = messages[index];
        }
      });

      makeInstagramLink();
      return;
    }

    for (let i = 0; i < 6; i++) {
      const line = lineEls[i];
      if (!line) continue;

      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (!text || !cursor) continue;

      cursor.classList.remove("hidden");

      for (const character of messages[i]) {
        text.textContent += character;

        const delay =
          character === "," || character === "." ? 100 :
          character === "—" ? 140 : 27;

        await pause(delay);
      }

      cursor.classList.add("hidden");

      if (i + 1 < lineEls.length) {
        const nextCursor = lineEls[i + 1].querySelector(".cursor");

        if (nextCursor) nextCursor.classList.remove("hidden");

        await pause(i === 1 ? 300 : 180);
      }
    }

    makeInstagramLink();
  }

  function createPetals() {
    if (!petalLayer || reducedMotion) return;

    const glyphs = ["❋", "✿", "❀", "❁"];
    const colors = [
      "#d94b2b",
      "#ed783a",
      "#f0a34a",
      "#b93627",
      "#f3c06c"
    ];

    const count = window.innerWidth <= 650 ? 12 : 22;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.textContent = glyphs[i % glyphs.length];
      petal.setAttribute("aria-hidden", "true");

      petal.style.left = `${Math.random() * 100}%`;
      petal.style.fontSize = `${12 + Math.random() * 14}px`;
      petal.style.setProperty(
        "--petal-color",
        colors[i % colors.length]
      );
      petal.style.setProperty(
        "--duration",
        `${9 + Math.random() * 9}s`
      );
      petal.style.setProperty(
        "--delay",
        `${-Math.random() * 18}s`
      );
      petal.style.setProperty(
        "--drift",
        `${Math.random() * 120 - 60}px`
      );
      petal.style.setProperty(
        "--petal-opacity",
        `${0.35 + Math.random() * 0.4}`
      );

      petalLayer.appendChild(petal);
    }
  }

  createPetals();
  typeWish();
})();
