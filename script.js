/* FORTUNA - TAXI BOAT 
   Official Unified Script 
   - Handles: Mobile Menu, Language Toggle, Smooth Scroll, and Gallery
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MOBILE HAMBURGER MENU
    ========================================== */
    // This looks for the 3-bar button and the menu list
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            // This adds/removes the "active" class which makes the menu visible
            navLinksContainer.classList.toggle('active');
            
            // This turns the hamburger into an "X" (if CSS is set up)
            menuToggle.classList.toggle('is-active');
        });
    }

    // This closes the menu automatically when you click a link (Home, Gallery, etc.)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('is-active');
        });
    });


    /* ==========================================
       2. LANGUAGE SWITCHER (EN / MNE)
    ========================================== */
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('.lang');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Switch language variable
            currentLang = (currentLang === 'en') ? 'mne' : 'en';
            
            // Update the button text
            langToggle.innerText = (currentLang === 'en') ? 'MNE' : 'EN';

            // Loop through every element with class "lang" and swap text
            translatableElements.forEach(el => {
                const translation = el.getAttribute(`data-${currentLang}`);
                
                // Use innerHTML so that bold tags (<strong>) work
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            });
        });
    }


    /* ==========================================
       3. SMOOTH SCROLLING
    ========================================== */
    // Makes the page slide smoothly instead of jumping
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                // We subtract the height of the nav so we don't land "under" the header
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

}); // End of DOMContentLoaded


/* ==========================================
   4. LIGHTBOX GALLERY LOGIC
   (These stay outside the curly brackets above)
========================================== */

// The list of images for the popup gallery
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

// Opens the big image view
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = galleryImages[currentIndex];
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop the page from scrolling behind the image
    }
}

// Closes the big image view
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Let the page scroll again
    }
}

// Moves to Next or Previous image
function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = galleryImages[currentIndex];
    }
}

/* ==========================================
   KEYBOARD NAVIGATION FOR LIGHTBOX
========================================== */
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    
    // Check if the lightbox is actually visible to the user
    if (lightbox && lightbox.style.display === 'flex') {
        
        if (e.key === "ArrowLeft") {
            changeImage(-1); // Go to previous image
        } 
        else if (e.key === "ArrowRight") {
            changeImage(1); // Go to next image
        } 
        else if (e.key === "Escape") {
            closeLightbox(); // Close on 'Esc' key
        }
    }
});

/* ==========================================
   CLOSE LIGHTBOX ON CLICK OUTSIDE
========================================== */
const lightbox = document.getElementById('lightbox');

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        // 'e.target' is what you actually clicked.
        // If the target is the background (the lightbox div) 
        // and NOT the image itself, then close it.
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}
