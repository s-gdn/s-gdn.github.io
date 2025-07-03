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


// === Expandable Card Logic ===
document.querySelectorAll('.expandable-card').forEach(card => {
  const header = card.querySelector('.card-header');
  const content = card.querySelector('.card-content');
  const button = card.querySelector('.expand-button');

  header.addEventListener('click', () => {
    const isExpanded = content.classList.contains('show');
    content.classList.toggle('show');

      // Trigger spin animation on expand
      if (!isExpanded) {
        button.classList.add('spin');
        setTimeout(() => button.classList.remove('spin'), 500);

        setTimeout(() => {
          animateSkillBars();
        }, 50);
      } else {
        // Reset skill bars when collapsing
        card.querySelectorAll(".skill-bar .fill").forEach(fill => {
          fill.style.width = "0%";
        });
      }

    
  });
});

// Nested
document.querySelectorAll('.nested-card').forEach(card => {
  const header = card.querySelector('.nested-header');
  const content = card.querySelector('.nested-content');
  const btn     = card.querySelector('.nested-button');

  header.addEventListener('click', () => {
    const isOpen = content.classList.contains('show');
    content.classList.toggle('show');
    btn.textContent = isOpen ? '−' : '+';
  });
});

//Video fullscreen
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".project-video");

    video.addEventListener("click", () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { // Safari
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { // IE11
        video.msRequestFullscreen();
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









// === Vanta Background Init ===
let vantaEffect = null;
let birdsVisible = true;
const vantaContainer = document.getElementById("vanta-background");

function initVanta(isNight) {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
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
    backgroundColor: 0x000000,
    backgroundAlpha: 0.00,
    color1: isNight ? 0x00ffd5 : 0x0,
    color2: isNight ? 0x00ffd5 : 0xff4b00,
    colorMode: "lerp",
    birdSize: 1.70,
    wingSpan: 10.00,
    speedLimit: 1.00,
    separation: 100.00,
    alignment: 100.00,
    cohesion: 100.00,
    quantity: 3,
  });

    if (!birdsVisible) {
    vantaEffect.destroy();
    return;
  }

  // Clear static background in case it was previously set
  vantaContainer.style.background = "";
}

const videoDay = document.getElementById("video-day");
const videoNight = document.getElementById("video-night");

function transitionBG(isNight) {
  if (isNight) {
    // Show night video by removing bottom clip
    videoNight.style.transition = 'clip-path 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
    videoNight.style.clipPath = 'inset(0 0 0 0)';  // fully visible

    // Hide day video by clipping from bottom
    videoDay.style.transition = 'clip-path 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
    videoDay.style.clipPath = 'inset(0 0 0 0)';  // hidden bottom-up
  } else {
    // Show day video by removing bottom clip
    videoDay.style.transition = 'clip-path 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
    videoDay.style.clipPath = 'inset(0 0 0 0)';  // fully visible

    // Hide night video by clipping from bottom
    videoNight.style.transition = 'clip-path 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
    videoNight.style.clipPath = 'inset(0 0 100% 0)';  // hidden bottom-up
  }
}



// === Settings Toggle Logic ===
const themeToggle = document.getElementById("theme-toggle");

// Default to night mode unless stored otherwise
let isNight = true;
if (localStorage.getItem("theme") === "day") {
  isNight = false;
  document.body.classList.add("day-mode");
}
transitionBG(isNight);
initVanta(isNight);



themeToggle.addEventListener("click", () => {
  isNight = !isNight;
  document.body.classList.toggle("day-mode");
  localStorage.setItem("theme", isNight ? "night" : "day");
  transitionBG(isNight);
  initVanta(isNight);
  
});

const birdToggle = document.getElementById("bird-toggle");
birdToggle.addEventListener("click", () => {
  birdsVisible = !birdsVisible;
  console.log("birdsVisible:", birdsVisible);
  initVanta(isNight);
});

