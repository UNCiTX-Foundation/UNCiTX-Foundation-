document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".vision-btn");
  
  if (btn) {
    // Enhanced hover effect
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-3px)";
      btn.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
    });
    
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
    });
  }
  
  // Smooth scroll animation on page load
  const visionSection = document.querySelector('.ngo-vision-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  
  if (visionSection) {
    visionSection.style.opacity = '0';
    visionSection.style.transform = 'translateY(30px)';
    visionSection.style.transition = 'all 0.8s ease';
    observer.observe(visionSection);
  }
});

