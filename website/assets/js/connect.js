/**
 * Enhanced connect.js - Combines functionality from both previous files
 * with improved structure and performance optimizations
 */

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll) with optimized settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Initialize all interactive features
    createParticles();
    setupNewsletterForm();
    initTypewriterEffect();
    addSmoothScrolling();
    addInteractionEffects();
    initFormLabelAnimation();
});

/**
 * Creates floating particles in the background for visual effect
 */
function createParticles() {
    const body = document.querySelector('body');
    const particleCount = 25;
    const fragment = document.createDocumentFragment(); // Use document fragment for better performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 15 + 5; // Increased size range from second version
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10; // Longer duration from second version
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`; // Using vw for better responsiveness
        particle.style.top = `${posY}vh`;  // Using vh for better responsiveness
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add particle to fragment
        fragment.appendChild(particle);
    }
    
    // Add all particles to body in one DOM operation
    body.appendChild(fragment);
}

/**
 * Handles newsletter form submission
 * Compatible with both direct DOM forms and React components
 */
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = document.getElementById('email').value;
            
            // Normally, you would send this data to your backend/API
            console.log('Email submitted:', email);
            
            // Hide form and show success message with animation
            newsletterForm.style.opacity = '0';
            setTimeout(() => {
                newsletterForm.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                // Reset form
                newsletterForm.reset();
            }, 300);
        });
    }
    
    // Check for React-based newsletter forms
    const reactForms = document.getElementById('newsletter-react-form');
    if (reactForms) {
        console.log('React newsletter form detected. Form handling is managed by React components.');
    }
}

/**
 * Creates typewriter effect for elements with the 'typewriter' class
 */
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    if (typewriterElements.length > 0) {
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let charIndex = 0;
            const typeSpeed = 80; // milliseconds per character
            
            function type() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typeSpeed);
                } else {
                    // Remove the cursor animation once complete
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1500);
                }
            }
            
            // Start the typing animation after a short delay
            // Use different delays for multiple elements to create cascade effect
            const delay = Array.from(typewriterElements).indexOf(element) * 500 + 1000;
            setTimeout(type, delay);
        });
    }
}

/**
 * Adds smooth scrolling behavior to all anchor links
 */
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

/**
 * Adds various interaction effects for UI elements
 */
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

/**
 * Creates animation effects for form input labels
 */
function initFormLabelAnimation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // Handle initial state (if field already has value)
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.classList.add('active');
                label.style.transform = 'translateY(-25px) scale(0.8)';
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
}

/**
 * Check for legacy elements and provide warnings in the console
 * Useful during migration to React components
 */
function checkLegacyElements() {
    const oldForms = document.querySelectorAll('form:not(#newsletter-react-form)');
    if (oldForms.length > 0) {
        oldForms.forEach(form => {
            if (form.id === 'newsletter-form') {
                console.info('Legacy newsletter form detected. Consider migrating to React components.');
            }
        });
    }
}

// Run legacy check after a short delay to not block initial rendering
setTimeout(checkLegacyElements, 2000);