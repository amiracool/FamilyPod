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
  
  gsap.registerPlugin(ScrollTrigger);

// Horizontal Scroll Animation
gsap.to(".scroll-container", {
  x: () => `-${document.querySelector(".scroll-container").scrollWidth - window.innerWidth}px`,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    start: "top top",
    end: () => `+=${document.querySelector(".scroll-container").scrollWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});
// Intro Zoom Animation
gsap.from(".intro h1", {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
  });
  
  // Panel Zoom Animation
  gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
      scale: 0.9,
      opacity: 0.5,
      duration: 1.5,
      scrollTrigger: {
        trigger: panel,
        start: "left center",
        end: "right center",
        scrub: true,
      },
    });
  });
  