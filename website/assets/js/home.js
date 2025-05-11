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
    let currentIdx = 0;

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
    }

    function closeModal() {
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
    
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Fixed header behavior
    const header = document.querySelector('.fixed-header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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