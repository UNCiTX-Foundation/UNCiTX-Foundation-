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

