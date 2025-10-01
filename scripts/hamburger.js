document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const navMenu = document.getElementById("navMenu");

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  document.body.appendChild(overlay);

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close menu when clicking on overlay
  overlay.addEventListener("click", function () {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    this.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // Close menu when clicking on a link (optional)
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
});
