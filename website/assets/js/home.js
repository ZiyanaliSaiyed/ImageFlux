document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Fix initial misalignment by updating swiper after a slight delay
    setTimeout(() => {
        swiper.update();
    }, 100);

    // Gallery modal functionality
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item .img-wrapper'));
    const viewButtons = Array.from(document.querySelectorAll('.view-btn'));
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Add this to your HTML
    let currentIdx = 0;
    let isFullScreen = false;

    function getImageSources() {
        return galleryItems.map(item => item.querySelector('img').src);
    }

    function getImageAlts() {
        return galleryItems.map(item => item.querySelector('img').alt);
    }

    function openModal(idx) {
        const imageSources = getImageSources();
        const imageAlts = getImageAlts();
        
        currentIdx = idx;
        modalImg.src = imageSources[idx];
        modalImg.alt = imageAlts[idx];
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Automatically enter fullscreen when opening modal
        enterFullScreen();
    }

    function closeModal() {
        // Exit fullscreen before closing modal
        if (isFullScreen) {
            exitFullScreen();
        }
        
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }

    function showNext() {
        const imageSources = getImageSources();
        const imageAlts = getImageAlts();
        
        currentIdx = (currentIdx + 1) % imageSources.length;
        modalImg.src = imageSources[currentIdx];
        modalImg.alt = imageAlts[currentIdx];
    }

    function showPrev() {
        const imageSources = getImageSources();
        const imageAlts = getImageAlts();
        
        currentIdx = (currentIdx - 1 + imageSources.length) % imageSources.length;
        modalImg.src = imageSources[currentIdx];
        modalImg.alt = imageAlts[currentIdx];
    }

    // Fullscreen functionality
    function enterFullScreen() {
        if (modal.requestFullscreen) {
            modal.requestFullscreen();
        } else if (modal.mozRequestFullScreen) { // Firefox
            modal.mozRequestFullScreen();
        } else if (modal.webkitRequestFullscreen) { // Chrome, Safari & Opera
            modal.webkitRequestFullscreen();
        } else if (modal.msRequestFullscreen) { // IE/Edge
            modal.msRequestFullscreen();
        }
        
        isFullScreen = true;
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }
        
        // Add a class to the modal for full-screen styling
        modal.classList.add('fullscreen-mode');
    }

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        
        isFullScreen = false;
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
        
        // Remove the fullscreen styling class
        modal.classList.remove('fullscreen-mode');
    }

    function toggleFullScreen() {
        if (isFullScreen) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    }

    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);

    function fullscreenChangeHandler() {
        // Update button state if user exits fullscreen via browser controls
        if (!(document.fullscreenElement || 
              document.webkitFullscreenElement || 
              document.mozFullScreenElement ||
              document.msFullscreenElement)) {
            isFullScreen = false;
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
            modal.classList.remove('fullscreen-mode');
        }
    }

    // Add click event to the view buttons
    viewButtons.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(idx);
        });
    });

    // Also make the images clickable
    galleryItems.forEach((item, idx) => {
        item.addEventListener('click', (e) => {
            // Only open if not clicking the button (to avoid double triggering)
            if (!e.target.closest('.view-btn')) {
                openModal(idx);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalNext.addEventListener('click', showNext);
    modalPrev.addEventListener('click', showPrev);
    
    // Add fullscreen button event listener if it exists
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullScreen);
    }
    
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') {
            // Prevent default Escape behavior which would exit fullscreen
            e.preventDefault();
            
            // If in fullscreen mode, just exit fullscreen
            // Otherwise close the modal completely
            if (isFullScreen) {
                exitFullScreen();
            } else {
                closeModal();
            }
        }
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'f') toggleFullScreen(); // Add 'f' key for fullscreen toggle
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Fixed header behavior
    const header = document.querySelector('.fixed-header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize AOS (if you're using it)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });
    }
});