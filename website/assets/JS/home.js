document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // Image data - this ties your names and descriptions to each artwork
    const artworks = [
        {
            id: 1,
            title: "Lake Rowing",
            description: "A serene lake with rowboats, surrounded by mountains and forests under a clear sky.",
            imageSrc: "images/art1.jpg"
        },
        {
            id: 2,
            title: "Snowy Mountains Sunset",
            description: "Snow-capped mountains glowing with soft pink hues at sunset.",
            imageSrc: "images/art2.jpg"
        },
        {
            id: 3,
            title: "Ocean Waves",
            description: "Restless ocean waves under a cloudy sky, showcasing nature's raw power.",
            imageSrc: "images/art3.jpg"
        },
        {
            id: 4,
            title: "Hot Air Balloon Night",
            description: "A vibrant hot air balloon floating over a calm sea under a starry night sky.",
            imageSrc: "images/art4.jpg"
        },
        {
            id: 5,
            title: "Lone Tree Reflection",
            description: "A solitary tree reflecting in a glassy lake under a starry night with moonlight.",
            imageSrc: "images/art5.jpg"
        },
        {
            id: 6,
            title: "Aurora Mountains",
            description: "Northern lights dancing over snow-dusted mountains, illuminating a tranquil lake.",
            imageSrc: "images/art6.jpg"
        },
        {
            id: 7,
            title: "Boat Sunset",
            description: "A small boat in still waters, reflecting a vibrant pink and purple sunset sky.",
            imageSrc: "images/art7.jpg"
        },
        {
            id: 8,
            title: "Vintage Car Stadium",
            description: "A classic Volkswagen Beetle parked near Bank of America Stadium, ready for an adventure.",
            imageSrc: "images/art8.jpg"
        },
        {
            id: 9,
            title: "Mountain Valley Fog",
            description: "A misty valley between rugged mountains, with clouds nestled among the peaks.",
            imageSrc: "images/art9.jpg"
        },
        {
            id: 10,
            title: "City Skyscrapers",
            description: "Towering glass skyscrapers at Constitution Square, reflecting a cloudy urban sky.",
            imageSrc: "images/art10.jpg"
        }
    ];

    // Update image titles and descriptions in DOM
    updateArtworkDetails();
    
    // Function to update artwork details in the DOM
    function updateArtworkDetails() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            if (index < artworks.length) {
                const titleElement = item.querySelector('h3');
                const descElement = item.querySelector('p');
                const imgElement = item.querySelector('img');
                
                if (titleElement) titleElement.textContent = artworks[index].title;
                if (descElement) descElement.textContent = artworks[index].description;
                if (imgElement) {
                    imgElement.alt = artworks[index].title;
                    // Make sure the image src is up to date
                    imgElement.src = artworks[index].imageSrc;
                }
            }
        });
    }

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Current image index for modal navigation
    let currentIndex = 0;

    // Open modal when view button is clicked
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const imgSrc = this.closest('.img-wrapper').querySelector('img').src;
            openModal(imgSrc, index);
        });
    });

    // Close modal when close button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Previous image
    if (modalPrev) {
        modalPrev.addEventListener('click', showPrevImage);
    }

    // Next image
    if (modalNext) {
        modalNext.addEventListener('click', showNextImage);
    }

    // Keyboard navigation
    window.addEventListener('keydown', function(event) {
        if (modal.style.display === 'flex' || modal.classList.contains('show')) {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Open modal function
    function openModal(src, index) {
        modalImg.src = src;
        currentIndex = index;
        modal.style.display = 'flex';
        // Add 'show' class with slight delay for transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        // Set title and description for modal if needed
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Show previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        modalImg.src = artworks[currentIndex].imageSrc;
    }

    // Show next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % artworks.length;
        modalImg.src = artworks[currentIndex].imageSrc;
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
     const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    // Parallax scroll effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Only apply effect if hero section is visible
        if (scrollPosition < heroSection.offsetHeight) {
            // Move background slightly slower than scroll speed
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });
    
    // Initialize AOS (keep your existing initialization code)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false
    });
    
    // Reuse the existing Swiper initialization
    swiper.params.pagination = {
        el: '.swiper-pagination',
        clickable: true
    };
    swiper.params.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    };
    swiper.params.breakpoints = {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    };
    swiper.update();
    
    // Keep any other existing initialization code

});