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

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
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

// Smart navigation for all anchor links
document.querySelectorAll('a[href]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            const currentUrl = new URL(window.location.href);
            const targetUrl = new URL(this.getAttribute('href'), window.location.href);

            // Is it pointing to the same page? (Treat 'index.html' and root '/' as the same)
            let currentPath = currentUrl.pathname.endsWith('/') ? currentUrl.pathname + 'index.html' : currentUrl.pathname;
            let targetPath = targetUrl.pathname.endsWith('/') ? targetUrl.pathname + 'index.html' : targetUrl.pathname;

            if (currentPath === targetPath && currentUrl.host === targetUrl.host) {
                e.preventDefault();
                
                if (targetUrl.hash) {
                    // Scroll to specific section on the same page
                    const targetEl = document.querySelector(targetUrl.hash);
                    if (targetEl) {
                        history.pushState(null, null, targetUrl.hash);
                        window.scrollTo({
                            top: targetEl.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Scroll to top if clicking a link to the exact same page without a hash
                    history.pushState(null, null, targetUrl.pathname);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        } catch (error) {
            // Ignore invalid URLs
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


