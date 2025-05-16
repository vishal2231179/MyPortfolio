document.addEventListener("DOMContentLoaded", function() {
    const scrollDownIcon = document.getElementById("scrollDown");
    const scrollUpIcon = document.getElementById("scrollUp");

    // Initially show the scroll down icon
    scrollDownIcon.classList.add("active");

    scrollDownIcon.addEventListener("click", function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        // Toggle icons
        scrollUpIcon.classList.add("active");
        scrollDownIcon.classList.remove("active");
    });

    scrollUpIcon.addEventListener("click", function() {
        window.scrollTo({
            top: 0.1,
            behavior: "smooth"
        });
        // Toggle icons
        scrollUpIcon.classList.remove("active");
        scrollDownIcon.classList.add("active");
    });

    // Optional: Toggle icon based on scroll position
    window.addEventListener("scroll", function() {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            scrollUpIcon.classList.add("active");
            scrollDownIcon.classList.remove("active");
        } else if (window.scrollY === 0) {
            scrollUpIcon.classList.remove("active");
            scrollDownIcon.classList.add("active");
        }
    });
});

