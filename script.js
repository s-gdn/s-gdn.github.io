// === Expandable Card Logic ===
document.querySelectorAll('.expandable-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.card-content')) {
      const content = card.querySelector('.card-content');
      const button = card.querySelector('.expand-button');
      const isExpanded = content.classList.contains('show');

      content.classList.toggle('show');

      // Trigger spin animation on expand
      if (!isExpanded) {
        button.classList.add('spin');
        setTimeout(() => button.classList.remove('spin'), 500);
      }
    }
  });
});

// === Toolbar Toggle Logic ===
const toggle = document.getElementById("settingsToggle");
const toolbar = document.getElementById("toolbar");

toggle.addEventListener("click", () => {
  toolbar.classList.toggle("show");
  toggle.classList.toggle("shift-left");
});

// === Vanta Background Init ===
let vantaEffect = null;

function initVanta(isNight) {
  if (vantaEffect) vantaEffect.destroy();

  vantaEffect = VANTA.BIRDS({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: isNight ? 0x000000 : 0xffffff,
    color1: isNight ? 0x411b52 : 0x2288aa,
    colorMode: "variance",
    birdSize: 1.70,
    wingSpan: 10.00,
    speedLimit: 1.00,
    separation: 100.00,
    alignment: 100.00,
    cohesion: 100.00,
    quantity: 3.00
  });
}

// === Theme Toggle Logic ===
const themeToggle = document.getElementById("theme-toggle");

// Default to night mode unless stored otherwise
let isNight = true;
if (localStorage.getItem("theme") === "day") {
  isNight = false;
  document.body.classList.add("day-mode");
}
initVanta(isNight);


themeToggle.addEventListener("click", () => {
  isNight = !isNight;

  document.body.classList.toggle("day-mode");
  localStorage.setItem("theme", isNight ? "night" : "day");

  initVanta(isNight);
});
