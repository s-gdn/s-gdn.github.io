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

        animateSkillBars(); // Run animation when expanding
      } else {
        // Reset skill bars when collapsing
        card.querySelectorAll(".skill-bar .fill").forEach(fill => {
          fill.style.width = "0%";
        });
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


// === Proficeincy Bars === 
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColorHex(hex1, hex2, t) {
  const c1 = hex1.match(/\w\w/g).map(c => parseInt(c, 16));
  const c2 = hex2.match(/\w\w/g).map(c => parseInt(c, 16));
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return `rgb(${r}, ${g}, ${b})`;
}

function getProficiencyColor(percent) {
  if (percent <= 50) {
    const t = percent / 50;
    return lerpColorHex("#ff3e3e", "#ffcc00", t);
  } else {
    const t = (percent - 50) / 50;
    return lerpColorHex("#ffcc00", "#00cc66", t);
  }
}

// Animate bars when card expands
function animateSkillBars() {
  document.querySelectorAll(".skill-bar").forEach(bar => {
    const level = parseInt(bar.dataset.level);
    const color = getProficiencyColor(level);

    let fill = bar.querySelector(".fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.classList.add("fill");
      fill.style.position = "absolute";
      fill.style.top = "0";
      fill.style.left = "0";
      fill.style.bottom = "0";
      fill.style.width = `0%`;
      fill.style.background = color;
      fill.style.borderRadius = "inherit";
      fill.style.transition = "width 1s ease, background 1s ease";
      bar.appendChild(fill);
    }

    // Animate after slight delay to ensure transition
    requestAnimationFrame(() => {
      fill.style.width = `${level}%`;
      fill.style.background = getProficiencyColor(level);
    });
  });
}







// === Vanta Background Init ===
let vantaEffect = null;
let birdsVisible = true;
const vantaContainer = document.getElementById("vanta-background");

function initVanta(isNight) {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }

  if (!birdsVisible) {
    // Just set a solid background when birds are hidden
    vantaContainer.style.background = isNight ? "#000000" : "#ffd88a";
    return;
  }

  // Otherwise, show the animated background
  vantaEffect = VANTA.BIRDS({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: isNight ? 0x000000 : 0xffd88a,
    color1: isNight ? 0x00ffd5 : 0x000000,
    color2: isNight ? 0x00ffd5 : 0x000000,
    colorMode: "variance",
    birdSize: 1.70,
    wingSpan: 10.00,
    speedLimit: 1.00,
    separation: 100.00,
    alignment: 100.00,
    cohesion: 100.00,
    quantity: 3,
  });

  // Clear static background in case it was previously set
  vantaContainer.style.background = "";
}

// === Settings Toggle Logic ===
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

const birdToggle = document.getElementById("bird-toggle");
birdToggle.addEventListener("click", () => {
  birdsVisible = !birdsVisible;
  console.log("birdsVisible:", birdsVisible);
  initVanta(isNight);
});

