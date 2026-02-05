document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    // Page transition function
    const goToPage = (pageIndex) => {
        if (pageIndex < 0 || pageIndex >= pages.length) return;
        
        // Exit current page
        pages[currentPage].classList.add('exit');
        
        setTimeout(() => {
            pages[currentPage].classList.remove('active', 'exit');
            currentPage = pageIndex;
            pages[currentPage].classList.add('active');
            
            // Trigger page-specific animations
            if (currentPage === 2) {
                startDeliveryAnimation();
            }
        }, 400);
    };

    // Button handlers
    document.getElementById('unlock-btn-1')?.addEventListener('click', () => goToPage(1));
    document.getElementById('unlock-btn-2')?.addEventListener('click', () => goToPage(2));
    document.getElementById('unlock-btn-3')?.addEventListener('click', () => goToPage(3));

    // Delivery animation enhancements
    const startDeliveryAnimation = () => {
        // Add extra particles or effects when animation page loads
        const container = document.querySelector('.delivery-animation');
        if (!container) return;

        // Create delivery path particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'delivery-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${Math.random() > 0.5 ? '#db0a40' : '#ffc906'};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                opacity: 0;
                animation: particle-fly ${2 + Math.random() * 2}s ease-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 600}px`);
            particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 400}px`);
            container.appendChild(particle);
        }
    };

    // Add particle animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-fly {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--tx), var(--ty)) scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentPage < pages.length - 1) {
                goToPage(currentPage + 1);
            }
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < pages.length - 1) {
                // Swipe left - next page
                goToPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 0) {
                // Swipe right - previous page
                goToPage(currentPage - 1);
            }
        }
    };

    // Confetti on final page
    const createConfetti = () => {
        const page4 = document.getElementById('page4');
        if (!page4) return;

        const colors = ['#db0a40', '#ffc906', '#ffffff', '#ff6b8a'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${5 + Math.random() * 10}px;
                height: ${5 + Math.random() * 10}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}%;
                opacity: 0;
                animation: confetti-fall ${3 + Math.random() * 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            page4.appendChild(confetti);
        }
    };

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% {
                opacity: 1;
                top: -20px;
                transform: rotate(0deg) translateX(0);
            }
            100% {
                opacity: 0;
                top: 100%;
                transform: rotate(720deg) translateX(${Math.random() > 0.5 ? '' : '-'}100px);
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Trigger confetti when reaching page 4
    const page4Observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active') && mutation.target.id === 'page4') {
                setTimeout(createConfetti, 500);
            }
        });
    });

    const page4 = document.getElementById('page4');
    if (page4) {
        page4Observer.observe(page4, { attributes: true, attributeFilter: ['class'] });
    }

    // Console message
    console.log('%c🐂 Go Ananya!', 'font-size: 24px; font-weight: bold; color: #db0a40;');
    console.log('%cYou\'re going to crush it! 💪', 'font-size: 14px; color: #ffc906;');
});
