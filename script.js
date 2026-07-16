/**
 * Spider IT - Core Client Application Script
 * Orchestrates accessible UI patterns, dark theme persistence, and responsive menus.
 */

(function initTheme() {
  // Prevent Flash of Unstyled Content (FOUC) by assessing storage layers instantly
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. PERFORMANCE UTILITIES
  // ==========================================================================
  // Throttles highly recurring layout engine events like resize or scrolling
  const debounce = (callback, delay = 100) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
  };

  // ==========================================================================
  // 2. THEME CONTROLLER
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }

  // ==========================================================================
  // 3. RESPONSIVE NAVIGATION & WCAG STATE MANAGEMENT
  // ==========================================================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinkContainer = document.getElementById('nav-link');

  // Structural Guard: Gracefully exit execution context if component elements are absent
  if (!mobileMenuBtn || !navLinkContainer) return;

  const navigationAnchors = navLinkContainer.querySelectorAll('a');

  const toggleMobileMenu = () => {
    const isMenuExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    
    // Maintain strict alignment between CSS visual presentation classes and ARIA accessibility nodes
    mobileMenuBtn.setAttribute('aria-expanded', (!isMenuExpanded).toString());
    navLinkContainer.classList.toggle('active');
    
    // Lock underlying viewport canvas layers when target canvas viewport draws over them
    document.body.style.overflow = !isMenuExpanded ? 'hidden' : '';
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Intercept click propagation pathways on active hyperlinks to collapse drawers
  navigationAnchors.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinkContainer.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ==========================================================================
  // 4. PERSISTENT VIEWPORT RECONCILIATION
  // ==========================================================================
  // Destroys dynamic mobile overlays if viewports scale past desktop thresholds
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768 && navLinkContainer.classList.contains('active')) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      navLinkContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 100));
});
