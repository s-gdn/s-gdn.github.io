

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


// Get the button and sidebar
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

// Add event listener for the button to toggle sidebar visibility
sidebarToggle.addEventListener("click", () => {
    if (sidebar.style.transform === "translateX(0%)") {
        sidebar.style.transform = "translateX(-100%)";  // Hide the sidebar
    } else {
        sidebar.style.transform = "translateX(0%)";  // Show the sidebar
    }
});
