document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // If it's the CTA button (Get Started), scroll to the How It Works section
                const target = targetId === '#' ? document.getElementById('how-it-works') : document.querySelector(targetId);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll event listener for header background
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle (for smaller screens)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const nav = document.querySelector('nav');
            const navUl = nav.querySelector('ul');
            
            // Create mobile menu toggle button
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.innerHTML = '☰';
            mobileMenuToggle.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: none;
            `;
            
            // Insert toggle button before nav
            nav.parentNode.insertBefore(mobileMenuToggle, nav);
            
            // Style nav for mobile
            navUl.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
                display: none;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
            `;
            
            // Show mobile menu toggle
            mobileMenuToggle.style.display = 'block';
            
            // Toggle mobile menu
            mobileMenuToggle.addEventListener('click', function() {
                if (navUl.style.display === 'none' || navUl.style.display === '') {
                    navUl.style.display = 'flex';
                    mobileMenuToggle.innerHTML = '✕';
                } else {
                    navUl.style.display = 'none';
                    mobileMenuToggle.innerHTML = '☰';
                }
            });
            
            // Close mobile menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navUl.style.display = 'none';
                        mobileMenuToggle.innerHTML = '☰';
                    }
                });
            });
        } else if (window.innerWidth > 768) {
            // Remove mobile menu elements if screen is resized
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenuToggle) {
                mobileMenuToggle.remove();
            }
            
            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.cssText = '';
                navUl.style.display = 'flex';
            }
        }
    };
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Update mobile menu on window resize
    window.addEventListener('resize', createMobileMenu);
    
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    const animateOnScroll = () => {
        featureCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on initial load
    animateOnScroll();
    
    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('pulse');
            
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 1000);
        }, 3000);
        
        // Add pulse animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 10px rgba(255, 107, 0, 0.7), 0 0 20px rgba(255, 107, 0, 0.5), 0 0 30px rgba(255, 107, 0, 0.3);
                }
                50% {
                    box-shadow: 0 0 15px rgba(255, 107, 0, 0.8), 0 0 30px rgba(255, 107, 0, 0.6), 0 0 45px rgba(255, 107, 0, 0.4), 0 0 60px rgba(255, 107, 0, 0.2);
                }
                100% {
                    box-shadow: 0 0 10px rgba(255, 107, 0, 0.7), 0 0 20px rgba(255, 107, 0, 0.5), 0 0 30px rgba(255, 107, 0, 0.3);
                }
            }
            
            .pulse {
                animation: pulse 1s ease;
            }
        `;
        document.head.appendChild(style);
    }
});
