// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Create particle background effect
    createParticles();
    
    // Handle newsletter form submission
    setupNewsletterForm();
    
    // Initialize the typewriter effect
    initTypewriterEffect();
    
    // Add smooth scrolling to all links
    addSmoothScrolling();
    
    // Add hover effects for social cards and CTA links
    addInteractionEffects();
});

// Function to create floating particles in the background
function createParticles() {
    const body = document.querySelector('body');
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add particle to body
        body.appendChild(particle);
    }
}

// Handle newsletter form submission
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = document.getElementById('email').value;
            
            // Normally, you would send this data to your backend/API
            // For demo purposes, we'll just show the success message
            console.log('Email submitted:', email);
            
            // Hide form and show success message with animation
            newsletterForm.style.opacity = '0';
            setTimeout(() => {
                newsletterForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                newsletterForm.reset();
            }, 300);
        });
    }
}

// Typewriter effect for the main heading
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.width = '0';
        
        let charIndex = 0;
        const typeSpeed = 80; // milliseconds per character
        
        function type() {
            if (charIndex < text.length) {
                typewriterElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                // Remove the cursor animation once complete
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                }, 1500);
            }
        }
        
        // Start the typing animation after a short delay
        setTimeout(type, 1000);
    }
}

// Add smooth scrolling to all links
function addSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Add interaction effects
function addInteractionEffects() {
    // Add hover effects for social cards
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 0 15px rgba(157, 78, 221, 0.6), 0 0 30px rgba(157, 78, 221, 0.3)';
            
            // Animate icon
            const icon = this.querySelector('.icon-wrapper i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            // Reset icon
            const icon = this.querySelector('.icon-wrapper i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add hover effects for CTA links
    const ctaLinks = document.querySelectorAll('.cta-link');
    
    ctaLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// Form label animation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // Handle initial state (if field already has value)
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.classList.add('active');
            }
        }
        
        // Handle focus
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.classList.add('active');
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = 'var(--primary-color)';
            }
        });
        
        // Handle blur (when focus is lost)
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.classList.remove('active');
                    label.style.transform = '';
                    label.style.color = '';
                }
            }
        });
    });
});