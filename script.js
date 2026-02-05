document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    const backBtn = document.getElementById('backBtn');
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let currentPage = 0;
    let particles = [];

    // Particle system
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = Math.random() > 0.5 ? '#ffc906' : '#db0a40';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // Confetti on page 3
    const createConfetti = () => {
        const container = document.getElementById('confetti');
        if (!container || container.children.length > 0) return;

        const colors = ['#db0a40', '#ffc906', '#ffffff', '#ff4d6d', '#ffe066'];
        const shapes = ['square', 'circle'];
        
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = 5 + Math.random() * 10;
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}%;
                opacity: 0;
                border-radius: ${shape === 'circle' ? '50%' : '2px'};
                animation: confetti-fall ${3 + Math.random() * 3}s ease-out forwards;
                animation-delay: ${Math.random() * 1.5}s;
            `;
            container.appendChild(confetti);
        }
    };

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% { opacity: 1; top: -20px; transform: rotate(0deg) translateX(0); }
            100% { opacity: 0; top: 100%; transform: rotate(${360 + Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 200}px); }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Navigate to page
    const goToPage = (index) => {
        if (index < 0 || index >= pages.length || index === currentPage) return;

        pages[currentPage].classList.remove('active');
        pages[currentPage].classList.add('exit-left');
        
        setTimeout(() => {
            pages[currentPage].classList.remove('exit-left');
            currentPage = index;
            pages[currentPage].classList.add('active');
            
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));
            backBtn.classList.toggle('hidden', currentPage === 0);
            
            // Trigger confetti on page 3
            if (currentPage === 2) {
                setTimeout(createConfetti, 300);
            }
        }, 150);
    };

    // Event listeners
    document.querySelectorAll('.cta-btn[data-next]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(parseInt(btn.dataset.next));
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(parseInt(dot.dataset.page));
        });
    });

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 0) goToPage(currentPage - 1);
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentPage < pages.length - 1) goToPage(currentPage + 1);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentPage > 0) goToPage(currentPage - 1);
        }
    });

    // Touch swipe
    let touchStartX = 0, touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const deltaX = touchStartX - e.changedTouches[0].screenX;
        const deltaY = touchStartY - e.changedTouches[0].screenY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0 && currentPage < pages.length - 1) {
                goToPage(currentPage + 1);
            } else if (deltaX < 0 && currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }
    }, { passive: true });

    // Easter egg
    console.log('%c🪽 GO ANANYA! 🪽', 'font-size: 28px; font-weight: bold; color: #ffc906; text-shadow: 2px 2px #db0a40;');
    console.log('%cYou\'re going to absolutely crush it! 🚀', 'font-size: 16px; color: #db0a40;');
});
