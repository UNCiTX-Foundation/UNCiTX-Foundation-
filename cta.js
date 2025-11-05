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
