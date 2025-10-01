document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("c3d");

  // Check for saved preference (default to light if no preference)
  const savedMode = localStorage.getItem("darkMode");

  // Only check system preference if no saved preference exists
  if (savedMode === "true") {
    document.documentElement.classList.add("dark-mode");
    toggle.checked = true;
  } else if (savedMode === null) {
    // Default to light mode if no preference is saved
    document.documentElement.classList.remove("dark-mode");
    toggle.checked = false;
    localStorage.setItem("darkMode", "false");
  }

  // Toggle dark mode with transition
  toggle.addEventListener("change", function () {
    // Start transition
    document.documentElement.style.transition = "all 0.8s ease";

    if (this.checked) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }

    // Remove inline transition after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 800);
  });
});
