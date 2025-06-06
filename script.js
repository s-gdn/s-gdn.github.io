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
let birdsVisible = true;


function initVanta(isNight, birdsVisible) {
  console.log("initVanta called with birdsVisible =", birdsVisible);
  if (vantaEffect) {
    vantaEffect.destroy();
  }
  

  vantaEffect = VANTA.BIRDS({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: isNight ? 0x000000 :0xffd88a,
    color1: isNight ? 0x411b52 : 0x000000,
    color2: isNight ? 0x00ffd5 : 0x000000,
    colorMode: "variance",
    birdSize: 1.70,
    wingSpan: 10.00,
    speedLimit: 1.00,
    separation: 100.00,
    alignment: 100.00,
    cohesion: 100.00,
    quantity: birdsVisible ? 3:-1,
  });

  console.log(vantaEffect);
}

// === Settings Toggle Logic ===
const themeToggle = document.getElementById("theme-toggle");


// Default to night mode unless stored otherwise
let isNight = true;
if (localStorage.getItem("theme") === "day") {
  isNight = false;
  document.body.classList.add("day-mode");
}
initVanta(isNight, birdsVisible);


themeToggle.addEventListener("click", () => {
  isNight = !isNight;

  document.body.classList.toggle("day-mode");
  localStorage.setItem("theme", isNight ? "night" : "day");

  initVanta(isNight, birdsVisible);
});

const birdToggle = document.getElementById("bird-toggle");

birdToggle.addEventListener("click", () => {
  birdsVisible = !birdsVisible;
  console.log("birdsVisible:", birdsVisible);
  initVanta(isNight, birdsVisible);
  initVanta(isNight, birdsVisible);
});
