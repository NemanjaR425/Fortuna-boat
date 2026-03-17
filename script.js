// Wait for the website to fully load
document.addEventListener('DOMContentLoaded', () => {
const video = document.getElementById('heroVideo');
    if (video) {
        // Force the video to be muted (some browsers require this via JS)
        video.muted = true;
        // Attempt to play
        video.play().catch(error => {
            console.log("Autoplay was prevented. User needs to interact first.", error);
        });
    }
    /* ==========================================
       1. LANGUAGE SELECTOR LOGIC
    ========================================== */
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('.lang');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Toggle language
            currentLang = (currentLang === 'en') ? 'mne' : 'en';
            langToggle.innerText = (currentLang === 'en') ? 'MNE' : 'EN';

            // Update all text elements
            translatableElements.forEach(el => {
                const translation = el.getAttribute(`data-${currentLang}`);
                
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            });
        });
    }

});

/* ==========================================
   2. LIGHTBOX LOGIC
   (Keep these outside DOMContentLoaded so HTML can "see" them)
========================================== */

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}
// 1. Store all your image sources in an array
const images = [
    "https://i.postimg.cc/pVmw1c5G/boat_(10).jpg",
    "https://i.postimg.cc/L4GcdkjT/boat_(12).jpg",
    "https://i.postimg.cc/ZYXGkP6x/boat_(11).jpg",
    "https://i.postimg.cc/8k72nXfd/boat_(2).jpg"
];

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = images[currentIndex];
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    document.getElementById('lightbox-img').src = images[currentIndex];
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- SWIPE LOGIC ---
const lightboxContainer = document.getElementById('lightbox');

lightboxContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightboxContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to be considered a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        changeImage(1); // Swiped Left -> Next Image
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeImage(-1); // Swiped Right -> Prev Image
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

