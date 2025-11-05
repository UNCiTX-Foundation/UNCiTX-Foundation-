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




// Mission Section Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add any mission section specific JavaScript here
  console.log('Mission section loaded');
});


// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide projects based on filter
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          // Add fade in animation
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Add hover effect to project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add click animation to "Learn More" links
  const cardLinks = document.querySelectorAll('.card-link');
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add a simple animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // In a real implementation, this would navigate to the project page
      console.log('Navigating to project details page');
    });
  });
  
  // Add scroll animation for the section
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe each project card
  projectCards.forEach(card => {
    observer.observe(card);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const programCards = document.querySelectorAll(".program-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  programCards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const valueCards = document.querySelectorAll(".value-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  valueCards.forEach((card) => observer.observe(card));
});


/* ================= GET INVOLVED SECTION - JAVASCRIPT ================= */
/* File: get-involved-section.js */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation to cards
        const cards = entry.target.querySelectorAll('.involvement-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe the Get Involved section
  const getInvolvedSection = document.getElementById('get-involved');
  if (getInvolvedSection) {
    observer.observe(getInvolvedSection);
  }

  // ===== CARD INTERACTION TRACKING =====
  const involvementCards = document.querySelectorAll('.involvement-card');
  
  involvementCards.forEach((card, index) => {
    // Track hover events
    card.addEventListener('mouseenter', function() {
      console.log(`Card ${index + 1} hovered: ${this.querySelector('h3').textContent}`);
      
      // Add ripple effect on hover
      createRipple(this);
    });

    // Track button clicks
    const button = card.querySelector('.btn-outline');
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const cardTitle = card.querySelector('h3').textContent;
        console.log(`Button clicked: ${cardTitle}`);
        
        // Show notification
        showNotification(`Interest registered for: ${cardTitle}`, 'success');
        
        // Add clicked animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);

        // Optional: Send data to backend
        // sendInterestData(cardTitle);
      });
    }
  });

  // ===== RIPPLE EFFECT FUNCTION =====
  function createRipple(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 102, 204, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -10px;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add ripple animation CSS
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(20);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </span>
        <span class="notification-message">${message}</span>
      </div>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(notification);

    // Add notification styles if not exists
    if (!document.getElementById('notification-styles')) {
      const notifStyles = document.createElement('style');
      notifStyles.id = 'notification-styles';
      notifStyles.textContent = `
        .custom-notification {
          position: fixed;
          top: 100px;
          right: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          animation: slideInRight 0.4s ease;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .notification-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .notification-success {
          border-left: 4px solid #28a745;
        }
        
        .notification-success .notification-icon {
          background: #d4edda;
          color: #28a745;
        }
        
        .notification-message {
          color: #333;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .notification-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          transition: color 0.3s ease;
        }
        
        .notification-close:hover {
          color: #333;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        
        @media (max-width: 768px) {
          .custom-notification {
            right: 20px;
            left: 20px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(notifStyles);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease';
      setTimeout(() => notification.remove(), 400);
    }, 5000);
  }

  // ===== SMOOTH SCROLL TO SECTION =====
  document.querySelectorAll('a[href="#get-involved"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.getElementById('get-involved');
      if (section) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== COUNTER ANIMATION FOR STATS (Optional Enhancement) =====
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ===== KEYBOARD NAVIGATION ENHANCEMENT =====
  involvementCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const button = this.querySelector('.btn-outline');
        if (button) {
          button.click();
        }
      }
      
      // Arrow key navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextCard = involvementCards[index + 1];
        if (nextCard) nextCard.focus();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevCard = involvementCards[index - 1];
        if (prevCard) prevCard.focus();
      }
    });
  });

  // ===== PARALLAX EFFECT ON SCROLL (Optional) =====
  window.addEventListener('scroll', function() {
    if (getInvolvedSection) {
      const scrolled = window.pageYOffset;
      const sectionTop = getInvolvedSection.offsetTop;
      const sectionHeight = getInvolvedSection.offsetHeight;
      
      if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
        const cards = getInvolvedSection.querySelectorAll('.involvement-card');
        cards.forEach((card, index) => {
          const speed = 0.5 + (index * 0.1);
          const yPos = (scrolled - sectionTop) * speed * 0.1;
          card.style.transform = `translateY(${yPos}px)`;
        });
      }
    }
  });

  // ===== TRACK SECTION VISIBILITY FOR ANALYTICS =====
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Get Involved section is visible');
        // Optional: Send analytics event
        // trackSectionView('get-involved');
      }
    });
  }, { threshold: 0.5 });

  if (getInvolvedSection) {
    sectionObserver.observe(getInvolvedSection);
  }

  // ===== FORM INTEGRATION (If you add a form later) =====
  function sendInterestData(interest) {
    // Example: Send data to backend
    /*
    fetch('/api/interest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interest: interest,
        timestamp: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  }

  // ===== DYNAMIC CONTENT LOADING (Optional) =====
  function loadInvolvementOptions() {
    // Example: Load involvement options from API
    /*
    fetch('/api/involvement-options')
      .then(response => response.json())
      .then(data => {
        // Dynamically create cards
        const grid = document.querySelector('.involvement-grid');
        data.forEach(option => {
          const card = createInvolvementCard(option);
          grid.appendChild(card);
        });
      });
    */
  }

  // ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
  window.GetInvolvedSection = {
    showNotification: showNotification,
    createRipple: createRipple,
    animateCounter: animateCounter,
    loadOptions: loadInvolvementOptions
  };

  console.log('✅ Get Involved Section - JavaScript Loaded');
});

// ===== UTILITY FUNCTIONS =====

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


// Optional: Click cards to redirect to category page or Google Form
document.querySelectorAll('.mc-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Redirect to detailed media page or Google Form.');
    // Example: window.location.href = 'media-subpage.html';
  });
});



 // Thumbnail Swiper
    const thumbsSwiper = new Swiper(".myThumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        480: { slidesPerView: 4 },
        320: { slidesPerView: 3 }
      }
    });

    // Main Swiper
    const swiper = new Swiper(".mySwiper", {
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 10000, // 10s per slide
        disableOnInteraction: false
      },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      thumbs: { swiper: thumbsSwiper },
      on: {
        autoplayTimeLeft(s, time, progress) {
          const fill = document.querySelector(".progress-fill");
          if (fill) fill.style.width = ${(1 - progress) * 100}%;
        },
        slideChangeTransitionStart() {
          const fill = document.querySelector(".progress-fill");
          if (fill) fill.style.width = "0%";
          // reset caption animation for active slide
          document.querySelectorAll(".caption").forEach(caption => {
            caption.style.opacity = 0;
            caption.style.transform = "translateY(20px)";
            caption.style.animation = "none";
          });
        },
        slideChangeTransitionEnd() {
          const activeCaption = document.querySelector(".swiper-slide-active .caption");
          if (activeCaption) {
            // re-trigger fadeInUp animation
            activeCaption.style.animation = "fadeInUp 1.2s ease forwards";
          }
        }
      }
    });

    // Play/Pause toggle
    const toggleBtn = document.getElementById("toggleAutoplay");
    let isPlaying = true;
    toggleBtn.addEventListener("click", () => {
      if (isPlaying) {
        swiper.autoplay.stop();
        toggleBtn.textContent = "▶ Play";
        toggleBtn.setAttribute("aria-pressed", "true");
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.transition = "none"; // freeze bar
      } else {
        swiper.autoplay.start();
        toggleBtn.textContent = "⏸ Pause";
        toggleBtn.setAttribute("aria-pressed", "false");
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.transition = "width linear"; // resume
      }
      isPlaying = !isPlaying;
    });

    // Parallax on scroll: shift gradient overlay and caption subtly
    window.addEventListener("scroll", () => {
      document.querySelectorAll(".swiper-slide .video-container").forEach(container => {
        const rect = container.getBoundingClientRect();
        const offset = rect.top / window.innerHeight; // -1 to 1 range approx
        const shift = (offset * 20).toFixed(2); // px shift for overlay

        // Update gradient overlay via CSS variable
        container.style.setProperty("--overlay-shift", ${shift}px);

        // Caption parallax (only active slide to avoid jank)
        const activeCaption = container.closest(".swiper-slide").classList.contains("swiper-slide-active")
          ? container.querySelector(".caption")
          : null;
        if (activeCaption) {
          activeCaption.style.transform = translateY(${Math.max(0, 20 - offset * 30)}px);
        }
      });
    });

    // Lightbox elements
    const lightbox = document.getElementById("lightbox");
    const lightboxVideo = document.getElementById("lightbox-video");
    const closeBtn = document.querySelector(".lightbox .close");

    // Open lightbox on iframe click (main slider)
    document.querySelectorAll(".mySwiper .swiper-slide iframe").forEach(iframe => {
      iframe.addEventListener("click", (e) => {
        e.preventDefault();
        const src = iframe.src.replace("mute=1", "mute=0") + "&autoplay=1";
        lightboxVideo.src = src;
        lightbox.style.display = "flex";
        // Pause slider while lightbox is open
        if (isPlaying) {
          swiper.autoplay.stop();
          document.querySelector('.progress-fill').style.transition = "none";
          isPlaying = false;
          toggleBtn.textContent = "▶ Play";
        }
      });
    });

    // Close lightbox handlers
    function closeLightbox() {
      lightbox.style.display = "none";
      lightboxVideo.src = ""; // stop video
    }
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard controls
    // - ESC closes lightbox
    // - ArrowLeft/ArrowRight navigate slides
    // - Space toggles autoplay
    document.addEventListener("keydown", (e) => {
      const isLightboxOpen = lightbox.style.display === "flex";

      if (e.key === "Escape") {
        if (isLightboxOpen) closeLightbox();
      } else if (e.key === "ArrowRight") {
        if (!isLightboxOpen) swiper.slideNext();
      } else if (e.key === "ArrowLeft") {
        if (!isLightboxOpen) swiper.slidePrev();
      } else if (e.key === " " || e.code === "Space") {
        if (!isLightboxOpen) {
          e.preventDefault();
          toggleBtn.click();
        }
      }
    });


// =====================================
// ONSNC Foundation - Events Section JS
// =====================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initEventCards();
  initScrollAnimations();
  initEventTracking();
});

// Animate event cards on page load
function initEventCards() {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 150);
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach(card => {
    observer.observe(card);
  });
}

// Track event card clicks for analytics
function initEventTracking() {
  const registerButtons = document.querySelectorAll('.btn-register');
  
  registerButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const eventCard = this.closest('.event-card');
      const eventTitle = eventCard.querySelector('h3').textContent;
      const eventId = eventCard.getAttribute('data-event-id');
      
      // Log event (you can replace this with your analytics service)
      console.log('Event Registration Clicked:', {
        id: eventId,
        title: eventTitle,
        timestamp: new Date().toISOString()
      });
      
      // Optional: Add a visual feedback
      const originalText = this.textContent;
      this.textContent = 'Opening Registration...';
      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    });
  });

  // Track explore button
  const exploreButton = document.querySelector('.btn-explore');
  if (exploreButton) {
    exploreButton.addEventListener('click', function(e) {
      console.log('Explore More Events Clicked:', {
        timestamp: new Date().toISOString()
      });
    });
  }
}

// Optional: Add countdown timer functionality
function addCountdownTimer(eventDate, elementId) {
  const countdownElement = document.getElementById(elementId);
  if (!countdownElement) return;

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      countdownElement.innerHTML = 'Event Started!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Optional: Filter events by category
function filterEventsByTag(tag) {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    const tags = Array.from(card.querySelectorAll('.event-tag')).map(t => t.textContent);
    
    if (tag === 'all' || tags.some(t => t.includes(tag))) {
      card.style.display = 'flex';
      setTimeout(() => card.classList.add('animate'), 100);
    } else {
      card.style.display = 'none';
    }
  });
}

// Export functions for use in other scripts
window.EventsSection = {
  filterByTag: filterEventsByTag,
  addCountdown: addCountdownTimer
};


       // Simple fade-in animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            const ctaCard = document.querySelector('.onsnc-cta-card');
            const donateCard = document.querySelector('.onsnc-donate-card');
            
            if (ctaCard) {
                ctaCard.style.opacity = '0';
                ctaCard.style.transform = 'translateY(30px)';
                ctaCard.style.transition = 'all 0.6s ease';
                observer.observe(ctaCard);
            }
            
            if (donateCard) {
                donateCard.style.opacity = '0';
                donateCard.style.transform = 'translateY(30px)';
                donateCard.style.transition = 'all 0.6s ease 0.2s';
                observer.observe(donateCard);
            }
        });





