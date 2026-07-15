document.addEventListener('DOMContentLoaded', () => {
    // Theme Controller
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for existing preference on page load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Toggle and save theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile Menu Controller
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        const navItems = navLinks.querySelectorAll('a');

        // Toggle menu open/close
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Auto-close menu when a link is clicked (UX enhancement)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Form Submission Controller (Moved from HTML to JS for cleaner code)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Form submitted! (Demo only)');
            contactForm.reset(); // Optional: clears the form after sending
        });
    }
});
