document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('modalLightbox');
    const lightboxImg = document.getElementById('modalImg');
    const lightboxTitle = document.getElementById('modalTitle');
    const lightboxDesc = document.getElementById('modalDesc');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let activeItems = Array.from(galleryItems);
    let currentIndex = 0;

    // --- FILTER SYSTEM ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Show/Hide items based on filter
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'todos' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update the list of active/visible items for the lightbox navigation
            activeItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        });
    });

    // --- LIGHTBOX SYSTEM ---
    function updateLightboxContent(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('.galeria-info h3');
        const desc = item.querySelector('.galeria-info p');

        if (img && title && desc) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Galerie';
            lightboxTitle.textContent = title.textContent;
            lightboxDesc.textContent = desc.textContent;
        }
    }

    function openLightbox(item) {
        currentIndex = activeItems.indexOf(item);
        if (currentIndex === -1) currentIndex = 0;

        updateLightboxContent(item);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling when lightbox is open
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable page scrolling
    }

    function showNext() {
        if (activeItems.length === 0) return;
        currentIndex = (currentIndex + 1) % activeItems.length;
        updateLightboxContent(activeItems[currentIndex]);
    }

    function showPrev() {
        if (activeItems.length === 0) return;
        currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
        updateLightboxContent(activeItems[currentIndex]);
    }

    // Attach click events to gallery items
    galleryItems.forEach(item => {
        // Clicking the item or the zoom button opens the lightbox
        item.addEventListener('click', (e) => {
            openLightbox(item);
        });
    });

    // Close lightbox events
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the content area (on the overlay background)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Next/Prev navigation
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        }
    });
});
