/**
 * Gallery.js - Modern gallery implementation with masonry layout, lazy loading,
 * modal viewer, filters and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const config = {
        gallerySelector: '.gallery-container',
        imageSelector: '.gallery-item',
        modalId: 'galleryModal',
        loadMoreId: 'loadMoreBtn',
        filterSelector: '.gallery-filter',
        animationDelay: 50, // ms between each item animation
        lazyLoadThreshold: 200, // px before item comes into view
        darkModeToggleId: 'darkModeToggle',
        imagesPerLoad: 12
    };

    // State
    const state = {
        currentPage: 1,
        totalPages: null,
        currentFilter: 'all',
        isLoading: false,
        currentIndex: 0,
        isDarkMode: true, // Default dark theme as per requirement
        items: []
    };

    // DOM Elements
    let gallery, modal, loadMoreBtn, filterButtons, darkModeToggle;

    // Initialize the gallery
    function init() {
        gallery = document.querySelector(config.gallerySelector);
        loadMoreBtn = document.getElementById(config.loadMoreId);
        filterButtons = document.querySelectorAll(config.filterSelector);
        darkModeToggle = document.getElementById(config.darkModeToggleId);

        if (!gallery) {
            console.error('Gallery container not found');
            return;
        }

        // Create modal if it doesn't exist
        createModal();
        
        // Initialize Masonry layout
        initMasonry();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize lazy loading
        initLazyLoading();
        
        // Initial loading animation
        animateGalleryItems();
        
        // Apply current theme
        applyTheme();
    }

    // Create modal for image viewing
    function createModal() {
        // Check if modal already exists
        if (document.getElementById(config.modalId)) return;
        
        const modalHTML = `
            <div id="${config.modalId}" class="gallery-modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <div class="modal-image-container">
                        <img src="" alt="" class="modal-image">
                    </div>
                    <div class="modal-info">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                        <div class="modal-tags"></div>
                    </div>
                    <div class="modal-nav">
                        <button class="modal-prev">Previous</button>
                        <span class="modal-counter"><span class="current-index"></span>/<span class="total-count"></span></span>
                        <button class="modal-next">Next</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById(config.modalId);
        
        // Set up modal event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        const prevBtn = modal.querySelector('.modal-prev');
        prevBtn.addEventListener('click', showPrevImage);
        
        const nextBtn = modal.querySelector('.modal-next');
        nextBtn.addEventListener('click', showNextImage);
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);
    }

    // Initialize Masonry layout
    function initMasonry() {
        // Use CSS Grid for masonry layout by default, fallback to JS library if needed
        if (typeof Masonry !== 'undefined') {
            new Masonry(gallery, {
                itemSelector: config.imageSelector,
                columnWidth: '.gallery-sizer',
                percentPosition: true,
                transitionDuration: '0.3s'
            });
        } else {
            // Apply CSS Grid masonry layout (native solution)
            gallery.style.display = 'grid';
            gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            gallery.style.gridAutoRows = 'minmax(50px, auto)';
            gallery.style.gridGap = '10px';
        }
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Click on gallery item
        gallery.addEventListener('click', (e) => {
            const item = e.target.closest(config.imageSelector);
            if (item) openModal(item);
        });
        
        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreItems);
        }
        
        // Filter buttons
        if (filterButtons) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    filterGallery(filter);
                });
            });
        }
        
        // Dark/Light mode toggle
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleDarkMode);
        }
        
        // Window resize - update masonry layout
        window.addEventListener('resize', debounce(() => {
            refreshMasonry();
        }, 200));
        
        // Handle mobile swipe for modal
        initSwipeSupport();
    }

    // Initialize lazy loading
    function initLazyLoading() {
        // Get all images to be lazy loaded
        const lazyImages = document.querySelectorAll(`${config.imageSelector} img[data-src]`);
        
        if ('IntersectionObserver' in window) {
            // Use Intersection Observer for lazy loading
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        
                        // Add loading animation
                        img.classList.add('loading');
                        
                        img.onload = () => {
                            // Remove placeholder and loading state
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                            
                            // Remove from observer once loaded
                            imageObserver.unobserve(img);
                            
                            // Refresh masonry layout
                            refreshMasonry();
                        };
                    }
                });
            }, {
                rootMargin: `${config.lazyLoadThreshold}px`
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // Animate gallery items on load
    function animateGalleryItems() {
        const items = document.querySelectorAll(config.imageSelector);
        state.items = Array.from(items);
        
        items.forEach((item, index) => {
            // Reset styles for animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Apply staggered animation
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * config.animationDelay);
        });
    }

    // Apply current theme (dark/light)
    function applyTheme() {
        const body = document.body;
        if (state.isDarkMode) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            
            if (darkModeToggle) {
                darkModeToggle.textContent = '☀️ Light Mode';
            }
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            
            if (darkModeToggle) {
                darkModeToggle.textContent = '🌙 Dark Mode';
            }
        }
    }

    // Open modal with selected image
    function openModal(item) {
        if (!modal) return;
        
        // Get item info
        const img = item.querySelector('img');
        const imgSrc = img.dataset.fullsize || img.src;
        const title = item.dataset.title || '';
        const description = item.dataset.description || '';
        const tags = item.dataset.tags ? item.dataset.tags.split(',') : [];
        
        // Set modal content
        const modalImg = modal.querySelector('.modal-image');
        modalImg.src = imgSrc;
        modalImg.alt = title;
        
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-description').textContent = description;
        
        // Set up tags
        const tagsContainer = modal.querySelector('.modal-tags');
        tagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.classList.add('modal-tag');
            tagEl.textContent = tag.trim();
            tagsContainer.appendChild(tagEl);
        });
        
        // Update current index
        state.currentIndex = state.items.indexOf(item);
        updateModalCounter();
        
        // Show modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    // Update modal counter
    function updateModalCounter() {
        const currentEl = modal.querySelector('.current-index');
        const totalEl = modal.querySelector('.total-count');
        
        if (currentEl && totalEl) {
            currentEl.textContent = state.currentIndex + 1;
            totalEl.textContent = state.items.length;
        }
    }

    // Show previous image in modal
    function showPrevImage() {
        state.currentIndex = (state.currentIndex - 1 + state.items.length) % state.items.length;
        openModal(state.items[state.currentIndex]);
    }

    // Show next image in modal
    function showNextImage() {
        state.currentIndex = (state.currentIndex + 1) % state.items.length;
        openModal(state.items[state.currentIndex]);
    }

    // Handle keyboard navigation in modal
    function handleKeyboardNav(e) {
        if (!modal || modal.style.display !== 'flex') return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // Load more gallery items
    function loadMoreItems() {
        if (state.isLoading) return;
        
        state.isLoading = true;
        loadMoreBtn.classList.add('loading');
        
        // Show loading spinner
        const spinner = document.createElement('div');
        spinner.classList.add('loading-spinner');
        loadMoreBtn.appendChild(spinner);
        
        // Simulate AJAX request - replace this with your actual data fetching
        setTimeout(() => {
            // This is where you would normally fetch new items from server
            // For demo, we'll duplicate existing items
            const itemsToClone = Array.from(gallery.querySelectorAll(config.imageSelector)).slice(0, config.imagesPerLoad);
            
            itemsToClone.forEach(item => {
                const clone = item.cloneNode(true);
                const img = clone.querySelector('img');
                
                // Reset loading state
                img.classList.remove('loaded');
                
                // Append to gallery
                gallery.appendChild(clone);
                
                // Add to items array
                state.items.push(clone);
            });
            
            // Initialize lazy loading for new items
            initLazyLoading();
            
            // Refresh masonry layout
            refreshMasonry();
            
            // Animate new items
            const newItems = Array.from(gallery.querySelectorAll(config.imageSelector)).slice(-itemsToClone.length);
            newItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * config.animationDelay);
            });
            
            // Update state
            state.currentPage++;
            state.isLoading = false;
            
            // Hide load more button if reached last page
            if (state.totalPages && state.currentPage >= state.totalPages) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.classList.remove('loading');
                spinner.remove();
            }
        }, 1000);
    }

    // Filter gallery by category
    function filterGallery(filter) {
        if (filter === state.currentFilter) return;
        
        // Update active filter button
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update state
        state.currentFilter = filter;
        
        // Apply filter with animation
        const items = document.querySelectorAll(config.imageSelector);
        
        // First hide all items
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // Show/hide based on filter
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
        
        // Then animate visible items
        setTimeout(() => {
            const visibleItems = Array.from(items).filter(item => 
                filter === 'all' || item.classList.contains(filter)
            );
            
            state.items = visibleItems;
            
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * config.animationDelay);
            });
            
            // Refresh masonry layout
            refreshMasonry();
        }, 350);
    }

    // Toggle between dark and light mode
    function toggleDarkMode() {
        state.isDarkMode = !state.isDarkMode;
        applyTheme();
        
        // Save preference to local storage
        localStorage.setItem('galleryDarkMode', state.isDarkMode);
    }

    // Refresh masonry layout
    function refreshMasonry() {
        if (typeof Masonry !== 'undefined' && gallery.masonry) {
            gallery.masonry.layout();
        }
    }

    // Initialize swipe support for mobile
    function initSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next image
                showNextImage();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous image
                showPrevImage();
            }
        }
    }

    // Utility: Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Initialize gallery on load
    window.addEventListener('load', () => {
        // Check for saved theme preference
        const savedDarkMode = localStorage.getItem('galleryDarkMode');
        if (savedDarkMode !== null) {
            state.isDarkMode = savedDarkMode === 'true';
        }
        
        // Initialize gallery
        init();
    });

    // Export public methods for external use
    window.galleryController = {
        refresh: refreshMasonry,
        filter: filterGallery,
        loadMore: loadMoreItems,
        toggleTheme: toggleDarkMode
    };
})();