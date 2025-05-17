// Skill data - you can modify this as needed
const skillData = {
  "UX Research": {
    description:
      "I perform user interviews, surveys, and usability testing to uncover user needs and improve product experiences.",
    usedIn: "Club Activity Feedback Analysis",
    certified: "UX Fundamentals – Coursera",
    projectLink: "#", // Replace with your actual GitHub link
  },
  Wireframing: {
    description:
      "I create low-fidelity wireframes to plan structure and content layout before high-fidelity design.",
    usedIn: "Gym Website Project",
    certified: "Google UX Design",
    projectLink: "#",
  },
  "User Persona": {
    description:
      "I design detailed personas to guide product decisions based on user goals, frustrations, and motivations.",
    usedIn: "E-Book Website – PageVista",
    certified: "UX Research by LinkedIn Learning",
    projectLink: "#",
  },
  Figma: {
    description:
      "I use Figma to create responsive, modern UI designs and collaborate on real-time prototypes.",
    usedIn: "PageVista eBook Website",
    certified: "Infosys SpringBoard – HTML & CSS",
    projectLink: "#",
  },
  Collaboration: {
    description:
      "I work efficiently with design and dev teams, contributing ideas and adapting to feedback for better outcomes.",
    usedIn: "Web Development Club Events",
    certified: "Team Collaboration by LinkedIn",
    projectLink: "#",
  },
  Prototyping: {
    description:
      "I create interactive prototypes in Figma to simulate user flows and get early feedback.",
    usedIn: "Lead Management System UI",
    certified: "Figma Prototyping – Coursera",
    projectLink: "#",
  },
  HTML: {
    description:
      "I use semantic HTML to create accessible, SEO-friendly websites from scratch.",
    usedIn: "PageVista | Portfolio Website",
    certified: "Infosys SpringBoard – HTML",
    projectLink: "#",
  },
  CSS: {
    description:
      "I design responsive layouts using Flexbox, Grid, and custom styling with modern CSS techniques.",
    usedIn: "Portfolio & Gym Website",
    certified: "Infosys SpringBoard – CSS",
    projectLink: "#",
  },
  JavaScript: {
    description:
      "I implement interactivity, DOM manipulation, and basic logic in projects with vanilla JavaScript.",
    usedIn: "Chrome Extension Project",
    certified: "JavaScript Essentials – Great Learning",
    projectLink: "#",
  },
  "C Language": {
    description:
      "I use C to write structured, efficient programs for basic algorithms and data handling.",
    usedIn: "College Pattern Printing Practice",
    certified: "C Programming – NPTEL",
    projectLink: "#",
  },
  Python: {
    description:
      "I use Python for scripting, automation, and problem solving in small projects.",
    usedIn: "Face & Gender Detection",
    certified: "Python Basics – HackerRank",
    projectLink: "#",
  },
  XML: {
    description:
      "I structure and store data using XML for clean separation between content and logic.",
    usedIn: "Data Exchange Demo Project",
    certified: "XML Basics – W3Schools",
    projectLink: "#",
  },
};

function showSkillPopup(skillName) {
  const modal = document.getElementById("skillModal");
  const skillTitle = document.getElementById("modalSkillTitle");
  const skillDetails = document.getElementById("skillDetails");

  // Set the skill title
  skillTitle.textContent = `🔹 ${skillName}`;

  // Get the skill data
  const data = skillData[skillName];

  // Create the details HTML
  skillDetails.innerHTML = `
                <p>🧠 ${data.description}</p>
                <p>💼 Used in: ${data.usedIn}</p>
                <p>📜 Certified: ${data.certified}</p>
            `;
  // <a href="${data.projectLink}" class="project-link" target="_blank">🔗 View Project</a>

  // Show the modal
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("skillModal").style.display = "none";
}

// Close modal when clicking outside the content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("skillModal");
  if (event.target === modal) {
    closeModal();
  }
});
