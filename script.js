

document.querySelectorAll('.expandable-card').forEach(card => {
  card.addEventListener('click', (e) => {
  if (!e.target.closest('.card-content')) {
    const content = card.querySelector('.card-content');
    const button = card.querySelector('.expand-button');

    const isExpanded = content.classList.contains('show');

    content.classList.toggle('show');

    // Trigger spin animation
    if (!isExpanded) {
      button.classList.add('spin');
      setTimeout(() => button.classList.remove('spin'), 500);
    }
  }
});
});


const toggle = document.getElementById("settingsToggle");
const toolbar = document.getElementById("toolbar");

toggle.addEventListener("click", () => {
  toolbar.classList.toggle("show");
  toggle.classList.toggle("shift-left");
});
