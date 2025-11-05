// ================= HERO SECTION JAVASCRIPT =================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Hero section loaded successfully');
  
  // Initialize hero section animations
  initHeroAnimations();
  
  // Setup smooth scroll for scroll indicator
  setupSmoothScroll();
  
  // Add lazy loading for images
  setupLazyLoading();
  
  // Add intersection observer for hero visibility
  observeHeroSection();
});

// Hero Animation Initialization
function initHeroAnimations() {
  const heroElements = {
    badge: document.querySelector('.hero-badge'),
    title: document.querySelector('.hero-title'),
    description: document.querySelector('.hero-description'),
    photos: document.querySelectorAll('.hero-photo-item'),
    buttons: document.querySelectorAll('.hero-buttons .btn')
  };
  
  // Animate hero elements on load
  if (heroElements.badge) {
    setTimeout(() => {
      heroElements.badge.style.opacity = '0';
      heroElements.badge.style.transform = 'translateY(-20px)';
      heroElements.badge.style.transition = 'all 0.6s ease';
      
      requestAnimationFrame(() => {
        heroElements.badge.style.opacity = '1';
        heroElements.badge.style.transform = 'translateY(0)';
      });
    }, 100);
  }
  
  if (heroElements.title) {
    setTimeout(() => {
      heroElements.title.style.opacity = '0';
      heroElements.title.style.transform = 'translateY(-20px)';
      heroElements.title.style.transition = 'all 0.6s ease';
      
      requestAnimationFrame(() => {
        heroElements.title.style.opacity = '1';
        heroElements.title.style.transform = 'translateY(0)';
      });
    }, 200);
  }
  
  if (heroElements.description) {
    setTimeout(() => {
      heroElements.description.style.opacity = '0';
      heroElements.description.style.transform = 'translateY(-20px)';
      heroElements.description.style.transition = 'all 0.6s ease';
      
      requestAnimationFrame(() => {
        heroElements.description.style.opacity = '1';
        heroElements.description.style.transform = 'translateY(0)';
      });
    }, 300);
  }
  
  // Animate photos with stagger effect
  heroElements.photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.style.opacity = '0';
      photo.style.transform = 'translateY(30px)';
      photo.style.transition = 'all 0.6s ease';
      
      requestAnimationFrame(() => {
        photo.style.opacity = '1';
        photo.style.transform = 'translateY(0)';
      });
    }, 400 + (index * 100));
  });
  
  // Animate buttons
  heroElements.buttons.forEach((button, index) => {
    setTimeout(() => {
      button.style.opacity = '0';
      button.style.transform = 'translateY(20px)';
      button.style.transition = 'all 0.6s ease';
      
      requestAnimationFrame(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      });
    }, 1000 + (index * 100));
  });
}

// Smooth Scroll Setup
function setupSmoothScroll() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const heroSection = document.getElementById('ngo-hero');
      const heroHeight = heroSection.offsetHeight;
      
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
    });
  }
  
  // Hide scroll indicator on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (scrollIndicator) {
      if (currentScroll > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }
    
    lastScroll = currentScroll;
  });
}

// Lazy Loading Setup
function setupLazyLoading() {
  const images = document.querySelectorAll('.hero-photo');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Add loaded class when image loads
          img.addEventListener('load', function() {
            img.classList.add('loaded');
          });
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Observe Hero Section
function observeHeroSection() {
  const heroSection = document.getElementById('ngo-hero');
  
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero-visible');
          
          // Log analytics or perform other actions
          console.log('Hero section is visible');
        } else {
          entry.target.classList.remove('hero-visible');
        }
      });
    }, { 
      threshold: 0.3 
    });
    
    observer.observe(heroSection);
  }
}

// Add hover effect enhancements
document.addEventListener('DOMContentLoaded', function() {
  const photoItems = document.querySelectorAll('.hero-photo-item');
  
  photoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
});

// Handle responsive behavior
function handleResponsive() {
  const photoGrid = document.querySelector('.hero-photo-grid');
  const windowWidth = window.innerWidth;
  
  if (photoGrid) {
    if (windowWidth < 768) {
      // Mobile: 2 columns
      photoGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      // Desktop/Tablet: 2 columns (3 photos each side)
      photoGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
  }
}

// Run on load and resize
window.addEventListener('load', handleResponsive);
window.addEventListener('resize', handleResponsive);

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initHeroAnimations,
    setupSmoothScroll,
    setupLazyLoading,
    observeHeroSection,
    handleResponsive
  };
}
