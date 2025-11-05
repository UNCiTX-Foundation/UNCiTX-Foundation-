// Hero Section Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add any hero section specific JavaScript here
  console.log('Hero section loaded');
  
  // Example: Add intersection observer for hero section animations
  const heroSection = document.getElementById('ngo-hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero-visible');
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
  }
});

