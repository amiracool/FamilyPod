// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  
  // Animated Hero Text
  const heroText = document.querySelector(".hero h1");
  const text = "Welcome to FamilyPod"; // Replace with your text
  let index = 0;
  
  function typeHeroText() {
    if (index < text.length) {
      heroText.textContent += text[index];
      index++;
      setTimeout(typeHeroText, 100); // Adjust typing speed here
    }
  }
  
  typeHeroText();
  
  // Dynamic Content: Project Cards
  const projects = [
    {
      title: "FamilyPod App",
      description: "Revolutionising social work assessments.",
      link: "#familypod-app",
    },
    {
      title: "Social Work Ethics Tool",
      description: "Ensuring ethical excellence in social work.",
      link: "#ethics-tool",
    },
  ];
  
  const projectContainer = document.querySelector("#projects .project-grid");
  
  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
  
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" class="btn">Learn More</a>
    `;
  
    projectContainer.appendChild(card);
  });
  
  // Scroll-to-Top Button
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.textContent = "↑";
  scrollToTopButton.className = "scroll-to-top";
  document.body.appendChild(scrollToTopButton);
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });
  
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  