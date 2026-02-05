document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    const backBtn = document.getElementById('backBtn');
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let currentPage = 0;
    let particles = [];

    // ========== PARTICLES ==========
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
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.color = ['#ffc906', '#db0a40', '#ffffff'][Math.floor(Math.random() * 3)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
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

    for (let i = 0; i < 60; i++) particles.push(new Particle());
    
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // ========== TYPEWRITER EFFECT ==========
    const introLabel = document.getElementById('introLabel');
    const introText = "TOMORROW, SHE TAKES THE STAGE";
    let charIndex = 0;
    
    const typeWriter = () => {
        if (charIndex < introText.length) {
            introLabel.textContent = introText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 60);
        }
    };
    setTimeout(typeWriter, 800);

    // ========== PAGE 2 TYPED TEXT ==========
    const typedWork = document.getElementById('typedWork');
    const workPhrases = ["her actual work.", "route optimization.", "supply chain magic.", "data science in action."];
    let phraseIndex = 0;
    let phraseCharIndex = 0;
    let isDeleting = false;

    const typeWorkText = () => {
        const currentPhrase = workPhrases[phraseIndex];
        
        if (isDeleting) {
            typedWork.textContent = currentPhrase.substring(0, phraseCharIndex - 1);
            phraseCharIndex--;
        } else {
            typedWork.textContent = currentPhrase.substring(0, phraseCharIndex + 1);
            phraseCharIndex++;
        }

        if (!isDeleting && phraseCharIndex === currentPhrase.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && phraseCharIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % workPhrases.length;
        }

        setTimeout(typeWorkText, isDeleting ? 30 : 80);
    };
    typeWorkText();

    // ========== STAT COUNTER ==========
    const animateStats = () => {
        document.querySelectorAll('.stat-num').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 1500;
            const start = performance.now();
            
            const updateCount = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                stat.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(updateCount);
            };
            requestAnimationFrame(updateCount);
        });
    };

    // ========== VISUALIZATION INTERACTION ==========
    const vizContainer = document.getElementById('vizContainer');
    vizContainer?.addEventListener('click', () => {
        vizContainer.classList.add('active');
        animateStats();
    });

    // ========== CONFETTI ==========
    const createConfetti = () => {
        const container = document.getElementById('confetti');
        if (!container || container.children.length > 0) return;

        const colors = ['#db0a40', '#ffc906', '#ffffff', '#ff4d6d', '#ffe066'];
        
        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            const size = 6 + Math.random() * 12;
            const isCircle = Math.random() > 0.5;
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${isCircle ? size : size * 0.4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}%;
                opacity: 0;
                border-radius: ${isCircle ? '50%' : '2px'};
                animation: confetti-fall ${2.5 + Math.random() * 2}s ease-out forwards;
                animation-delay: ${Math.random() * 1}s;
            `;
            container.appendChild(confetti);
        }
    };

    // Confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% { opacity: 1; top: -20px; transform: rotate(0deg) translateX(0); }
            100% { opacity: 0; top: 110%; transform: rotate(${720 + Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 150}px); }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ========== NAVIGATION ==========
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
            
            if (currentPage === 2) setTimeout(createConfetti, 400);
            if (currentPage === 1 && !vizContainer.classList.contains('active')) {
                setTimeout(() => vizContainer?.classList.add('active'), 1000);
                setTimeout(animateStats, 1200);
            }
        }, 200);
    };

    // Event listeners
    document.querySelectorAll('.cta-btn[data-next]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            goToPage(parseInt(btn.dataset.next));
        });
    });

    // Add ripple style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple-effect 0.6s ease-out;
        }
        @keyframes ripple-effect {
            to { width: 200px; height: 200px; opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

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
            if (deltaX > 0 && currentPage < pages.length - 1) goToPage(currentPage + 1);
            else if (deltaX < 0 && currentPage > 0) goToPage(currentPage - 1);
        }
    }, { passive: true });

    // ========== INTERACTIVE ELEMENTS ==========
    // Hero photo click
    document.getElementById('heroVisual')?.addEventListener('click', () => {
        document.getElementById('heroPhoto')?.classList.add('shake');
        setTimeout(() => document.getElementById('heroPhoto')?.classList.remove('shake'), 500);
    });

    // Final button celebration
    document.getElementById('finalBtn')?.addEventListener('click', () => {
        createConfetti();
        document.getElementById('proudHeadline').style.animation = 'headline-celebrate 0.5s ease';
    });

    // Can spin
    document.getElementById('heroCan')?.addEventListener('click', function() {
        this.style.animation = 'can-spin 0.5s ease';
        setTimeout(() => this.style.animation = 'can-hover 2s ease-in-out infinite', 500);
    });

    // Add shake and spin animations
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        .shake { animation: shake 0.5s ease !important; }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px) rotate(-5deg); }
            75% { transform: translateX(10px) rotate(5deg); }
        }
        @keyframes can-spin {
            from { transform: rotate(0deg) scale(1.2); }
            to { transform: rotate(360deg) scale(1); }
        }
        @keyframes headline-celebrate {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(extraStyles);

    // Easter egg
    console.log('%c🪽 ANANYA MODE: ACTIVATED 🪽', 'font-size: 24px; font-weight: bold; color: #ffc906; text-shadow: 2px 2px #db0a40;');
    console.log('%c2,000 people are about to witness greatness! 🚀', 'font-size: 14px; color: #db0a40;');
});
