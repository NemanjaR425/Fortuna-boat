/* FORTUNA - TAXI BOAT 
   Unified Script: Language, Scrolling, and Gallery 
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. LANGUAGE SELECTOR
    ========================================== */
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('.lang');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Toggle between 'en' and 'mne'
            currentLang = (currentLang === 'en') ? 'mne' : 'en';
            langToggle.innerText = (currentLang === 'en') ? 'MNE' : 'EN';

            // Update text for all elements with the .lang class
            translatableElements.forEach(el => {
                const translation = el.getAttribute(`data-${currentLang}`);
                
                // Check if it's a form field (placeholder) or regular text
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            });
        });
    }

    /* ==========================================
       2. SMOOTH SCROLLING (With Nav Offset)
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust this number if you change your nav height
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       3. VIDEO AUTO-PLAY RECOVERY
    ========================================== */
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true; 
        video.play().catch(err => {
            console.log("Autoplay nudge handled:", err);
        });
    }
});

/* ==========================================
   4. LIGHTBOX & SWIPE GALLERY
   (Global functions for HTML onclick events)
========================================== */

// Make sure these links match the order in your Gallery HTML
const galleryImages = [
    "https://i.postimg.cc/pVmw1c5G/boat_(10).jpg",
    "https://i.postimg.cc/ZYXGkP6x/boat_(11).jpg",
    "https://i.postimg.cc/L4GcdkjT/boat_(12).jpg",
    "https://i.postimg.cc/8k72nXfd/boat_(2).jpg",
    "https://i.postimg.cc/QNF2nYKq/boat_(3).jpg",
    "https://i.postimg.cc/BZjrw7PN/boat_(4).jpg",
    "https://i.postimg.cc/Y2v5yDLR/boat_(5).jpg",
    "https://i.postimg.cc/v84JS2xK/boat_(8).jpg"
];

let currentIndex = 0;
let touchStartX = 0;

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = galleryImages[currentIndex];
        lightbox.style.display = 'flex';
        // Prevent background scrolling when open
        document.body.style.overflow = 'hidden'; 
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeImage(n) {
    currentIndex += n;
    // Loop back to start or end
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = galleryImages[currentIndex];
    }
}

/* --- MOBILE SWIPE LOGIC --- */
const lbElement = document.getElementById('lightbox');
if (lbElement) {
    lbElement.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    lbElement.addEventListener('touchend', e => {
        let touchEndX = e.changedTouches[0].screenX;
        const threshold = 50; // pixels to trigger swipe
        if (touchEndX < touchStartX - threshold) changeImage(1);  // Left swipe
        if (touchEndX > touchStartX + threshold) changeImage(-1); // Right swipe
    }, {passive: true});
}

/* --- KEYBOARD CONTROLS --- */
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});
