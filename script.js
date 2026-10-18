(() => {
  const params = new URLSearchParams(window.location.search);
  const recipient = (params.get("to") || "").trim();
  const dear = document.getElementById("dear");
  dear.textContent = recipient ? `Dear ${recipient},` : "Dear,";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;
  const layer = document.getElementById("petals");
  const flowers = ["✿", "❀", "✽", "✾"];
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--duration", `${9 + Math.random() * 12}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
    petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    layer.appendChild(petal);
  }
})();
