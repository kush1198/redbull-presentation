document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    const backBtn = document.getElementById('backBtn');
    let currentPage = 0;

    // Navigate to page
    const goToPage = (index) => {
        if (index < 0 || index >= pages.length || index === currentPage) return;

        const direction = index > currentPage ? 'forward' : 'backward';
        
        // Exit current page
        pages[currentPage].classList.add(direction === 'forward' ? 'exit-left' : '');
        pages[currentPage].classList.remove('active');
        
        // Enter new page
        setTimeout(() => {
            pages[currentPage].classList.remove('exit-left');
            currentPage = index;
            pages[currentPage].classList.add('active');
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentPage);
            });
            
            // Show/hide back button
            backBtn.classList.toggle('hidden', currentPage === 0);
        }, 100);
    };

    // CTA button clicks
    document.querySelectorAll('.cta-btn[data-next]').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextPage = parseInt(btn.dataset.next);
            goToPage(nextPage);
        });
    });

    // Progress dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const page = parseInt(dot.dataset.page);
            goToPage(page);
        });
    });

    // Back button
    backBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    });

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
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        const minSwipe = 50;

        // Only handle horizontal swipes (not vertical scrolling)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
            if (deltaX > 0 && currentPage < pages.length - 1) {
                // Swipe left - next page
                goToPage(currentPage + 1);
            } else if (deltaX < 0 && currentPage > 0) {
                // Swipe right - previous page
                goToPage(currentPage - 1);
            }
        }
    };

    // Console easter egg
    console.log('%c🪽 Go Ananya! 🪽', 'font-size: 20px; font-weight: bold; color: #ffc906;');
    console.log('%cYou\'re going to crush it tomorrow!', 'font-size: 14px; color: #db0a40;');
});
