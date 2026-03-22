/* ==========================================
   1. GLOBAL CONFIGURATION
========================================== */
let currentLang = 'en';
let currentIndex = 0;

// Update this array with your actual Postimg links
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

/* ==========================================
   2. INITIALIZE ON LOAD
========================================== */
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLanguageToggle();
    initLightbox();
    initBookingForm();
});

/* ==========================================
   3. MOBILE MENU LOGIC
========================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            menuToggle.classList.toggle('is-active'); 
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/* ==========================================
   4. BILINGUAL LANGUAGE SWITCHER
========================================== */
function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'mne' : 'en';
            langBtn.textContent = currentLang === 'en' ? 'MNE' : 'EN';
            updateContent();
        });
    }
}

function updateContent() {
    // 1. Translate elements with .lang class
    document.querySelectorAll('.lang').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) el.textContent = text;
    });

    // 2. Translate Form Placeholders
    document.querySelectorAll('.lang-input').forEach(input => {
        const placeholder = input.getAttribute(`data-${currentLang}-place`);
        if (placeholder) input.placeholder = placeholder;
    });
}

/* ==========================================
   5. LIGHTBOX SYSTEM (Gallery)
========================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close when clicking empty space
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "Escape") closeLightbox();
        }
    });
}

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    if (lightbox && img) {
        img.src = galleryImages[currentIndex];
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    
    document.getElementById('lightbox-img').src = galleryImages[currentIndex];
}

/* ==========================================
   6. FORMSPREE SUBMISSION (AJAX)
========================================== */
function initBookingForm() {
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalBtnText = button.textContent;
            
            // Language-aware status
            button.textContent = currentLang === 'en' ? "Sending..." : "Slanje...";
            button.disabled = true;

            const data = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    form.style.display = "none";
                    successMsg.style.display = "block";
                } else {
                    alert("Submission failed. Please try again.");
                    button.textContent = originalBtnText;
                    button.disabled = false;
                }
            }).catch(error => {
                alert("Error connecting to server.");
                button.textContent = originalBtnText;
                button.disabled = false;
            });
        });
    }
}
