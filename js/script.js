// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle) {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light-theme' : 'dark-theme';

        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light-theme') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic animation for feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! Our team will get back to you soon.');
            btn.innerText = 'Message Sent ✓';
            btn.style.background = '#10b981';
            contactForm.reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.innerText = originalText;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Back to Top functionality
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Cookie Consent Banner Logic
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    if (cookieBanner && acceptBtn && declineBtn) {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem("cookie_consent");

        if (!cookieConsent) {
            // Show banner after a slight delay
            setTimeout(() => {
                cookieBanner.style.bottom = "0";
            }, 1000);
        }

        acceptBtn.addEventListener("click", function () {
            localStorage.setItem("cookie_consent", "accepted");
            cookieBanner.style.bottom = "-100%";
        });

        declineBtn.addEventListener("click", function () {
            localStorage.setItem("cookie_consent", "declined");
            cookieBanner.style.bottom = "-100%";
        });
    }
});
