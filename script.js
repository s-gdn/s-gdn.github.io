

function toggleCard() {
    const content = document.getElementById("cardContent");
    content.classList.toggle("show");
}



// Intersection Observer logic for videos
const videos = document.querySelectorAll('.feature-video');

// Options for the Intersection Observer
const options = {
    root: null, // The root is the viewport (null means it's the default)
    threshold: 0.7, // Trigger when 10% of the video is in the viewport
};

// Callback function to execute when the video enters the viewport
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        const video = entry.target;

        // Check if the video is in the viewport
        if (entry.isIntersecting) {
            // If it's in the viewport, set opacity to 1 (fully visible)
            video.style.opacity = 1;
        } else {
            // If it's out of the viewport, set opacity to 0 (fully hidden)
            video.style.opacity = 0;
        }
    });
};

// Create the intersection observer
const observer = new IntersectionObserver(handleIntersection, options);

// Observe each video element
videos.forEach(video => {
    // Initialize videos that are in view with opacity 1 (fully visible)
    if (video.getBoundingClientRect().top <= window.innerHeight && video.getBoundingClientRect().bottom >= 0) {
        video.style.opacity = 1;
    } else {
        video.style.opacity = 0; // Set opacity to 0 for videos not in view
    }

    observer.observe(video); // Start observing the video
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
