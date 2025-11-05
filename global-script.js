// Mobile Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
  const navMenuBtn = document.getElementById('navMenuBtn');
  const navDropdownPanel = document.getElementById('navDropdownPanel');
  
  // Toggle mobile menu
  if (navMenuBtn && navDropdownPanel) {
    navMenuBtn.addEventListener('click', function() {
      navDropdownPanel.classList.toggle('active');
      
      // Change menu icon based on state
      const menuIcon = navMenuBtn.querySelector('i');
      if (navDropdownPanel.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenuBtn.contains(event.target) && !navDropdownPanel.contains(event.target)) {
        navDropdownPanel.classList.remove('active');
        const menuIcon = navMenuBtn.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
    
    // Close menu on window resize if it becomes larger
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navDropdownPanel.classList.remove('active');
        const menuIcon = navMenuBtn.querySelector('i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      
      // In a real application, you would send this data to a server
      // For now, we'll just show an alert
      alert(`Thank you ${name}! You've been subscribed with email: ${email}`);
      
      // Reset the form
      this.reset();
    });
  }
});

// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
});
