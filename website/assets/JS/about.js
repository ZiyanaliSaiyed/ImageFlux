// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "About ImageFlux",
        "Crafted by imagination",
        "Automated with Python",
        "Curated with emotion"
    ];
    
    const typingText = document.querySelector('.typing-text');
    let phraseIndex = 0;
    
    function typePhrase() {
        if (phraseIndex >= phrases.length) phraseIndex = 0;
        
        const currentPhrase = phrases[phraseIndex];
        let charIndex = 0;
        
        typingText.textContent = '';
        typingText.style.opacity = 1;
        
        const typing = setInterval(() => {
            if (charIndex < currentPhrase.length) {
                typingText.textContent += currentPhrase.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typing);
                setTimeout(erasePhrase, 2000);
            }
        }, 100);
    }
    
    function erasePhrase() {
        const currentPhrase = phrases[phraseIndex];
        let charIndex = currentPhrase.length;
        
        const erasing = setInterval(() => {
            if (charIndex > 0) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                clearInterval(erasing);
                phraseIndex++;
                setTimeout(typePhrase, 500);
            }
        }, 50);
    }
    
    // Start the typing animation
    setTimeout(typePhrase, 1000);
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
            const x = mouseX * 100 * speed;
            const y = mouseY * 100 * speed;
            
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
    
    // Scroll animations for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = 1;
                entry.target.style.transition = 'all 0.7s ease';
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});