document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Setup newsletter form handling
    setupNewsletterForm();
    
    // Initialize simple globe canvas
    initSimpleGlobeCanvas();
});

// Simple globe canvas initialization
function initSimpleGlobeCanvas() {
    const canvas = document.getElementById('globeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw a simple globe with connection points
    function drawGlobe() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.35;
        
        // Draw globe
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(10, 50, 100, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 30, 60, 0.3)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
        ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let i = -4; i <= 4; i += 1) {
            const lineRadius = Math.cos(Math.abs(i) * Math.PI / 8) * radius;
            const y = centerY + i * radius / 4;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, lineRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Vertical lines
        for (let i = 0; i < 12; i++) {
            const angle = i * Math.PI / 6;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }
        
        // Add connection points
        const points = [];
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
            
            const x = centerX + Math.cos(angle) * distance * radius;
            const y = centerY + Math.sin(angle) * distance * radius;
            
            points.push({ x, y });
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 220, 255, 0.8)';
            ctx.fill();
            
            // Draw glowing effect
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 220, 255, 0.3)';
            ctx.fill();
        }
        
        // Connect some points with lines
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (Math.random() > 0.7) { // Only connect some points
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Request animation frame
        requestAnimationFrame(drawGlobe);
    }
    
    drawGlobe();
}

// Setup newsletter form with validation and submission handling
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('success-message');
    
    if (!form || !emailInput || !successMessage) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message (in a real app, you'd send this to your backend)
        emailInput.value = '';
        form.style.display = 'none';
        successMessage.style.display = 'block';
    });
}