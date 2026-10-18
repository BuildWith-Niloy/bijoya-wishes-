
(() => {
  "use strict";

  const lineEls = Array.from(
    document.querySelectorAll(".typed-line")
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const instagramUrl =
    "https://www.instagram.com/____.dag.____/?__pwa=1#";

  function wishLines() {
    return [
      "Dear,",
      "— ❀ —",
      "May ma durga bless you with more than you deserve,",
      "better than you expected, and sooner than you imagined.",
      "shubho bijoya",
      "yours Aditya Das Gupta",
      "____.dag.____"
    ];
  }

  const pause = (ms) =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

  function makeInstagramLink() {
    const lastLine = lineEls[6];

    if (!lastLine) return;

    const text = lastLine.querySelector(".typed-text");
    const cursor = lastLine.querySelector(".cursor");

    if (!text) return;

    text.replaceChildren();

    const link = document.createElement("a");
    link.href = instagramUrl;
    link.textContent = "____.dag.____";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    text.appendChild(link);

    if (cursor) cursor.classList.add("hidden");
  }

  async function typeWish() {
    const lines = wishLines();

    lineEls.forEach((line) => {
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (text) text.textContent = "";
      if (cursor) cursor.classList.add("hidden");
    });

    if (reducedMotion) {
      lineEls.forEach((line, index) => {
        const text = line.querySelector(".typed-text");
        if (text && index < 6) {
          text.textContent = lines[index];
        }
      });

      makeInstagramLink();
      return;
    }

    for (let i = 0; i < Math.min(lines.length, lineEls.length); i++) {
      const line = lineEls[i];
      const text = line.querySelector(".typed-text");
      const cursor = line.querySelector(".cursor");

      if (!text || !cursor) continue;

      // The Instagram handle becomes a clickable link after typing.
      if (i === 6) {
        makeInstagramLink();
        continue;
      }

      cursor.classList.remove("hidden");

      for (const character of lines[i]) {
        text.textContent += character;

        await pause(
          character === "," || character === "." ? 105 : 25
        );
      }

      cursor.classList.add("hidden");

      if (i + 1 < lineEls.length) {
        const nextCursor =
          lineEls[i + 1].querySelector(".cursor");

        if (nextCursor) nextCursor.classList.remove("hidden");

        await pause(i === 1 ? 220 : 160);
      }
    }
  }

  // Falling flower petals
  const petalLayer = document.getElementById("petalLayer");

  const flowerGlyphs = ["✿", "❀", "✽", "✾", "❁"];

  const petalColors = [
    "#a92e22",
    "#cd633b",
    "#d99a45",
    "#f4dfb8",
    "#ba4a31",
    "#e5b85f"
  ];

  const petalCount = reducedMotion
    ? 0
    : window.innerWidth < 650
      ? 13
      : 22;

  if (petalLayer) {
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.setAttribute("aria-hidden", "true");

      petal.textContent =
        flowerGlyphs[
          Math.floor(Math.random() * flowerGlyphs.length)
        ];

      petal.style.left = `${Math.random() * 100}%`;

      petal.style.setProperty(
        "--petal-color",
        petalColors[
          Math.floor(Math.random() * petalColors.length)
        ]
      );

      petal.style.setProperty(
        "--duration",
        `${9 + Math.random() * 12}s`
      );

      petal.style.setProperty(
        "--delay",
        `${-Math.random() * 18}s`
      );

      petal.style.setProperty(
        "--drift",
        `${-80 + Math.random() * 160}px`
      );

      petal.style.setProperty(
        "--petal-opacity",
        `${0.28 + Math.random() * 0.45}`
      );

      petal.style.fontSize =
        `${13 + Math.random() * 17}px`;

      petalLayer.appendChild(petal);
    }
  }

  typeWish();
})();
