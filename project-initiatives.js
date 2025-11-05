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

