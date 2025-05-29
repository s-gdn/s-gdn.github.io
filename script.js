

function toggleCard() {
    const content = document.getElementById("cardContent");
    content.classList.toggle("show");
}


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
