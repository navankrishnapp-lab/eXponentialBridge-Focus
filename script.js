document.addEventListener('DOMContentLoaded', () => {
    // Enable JS styling flags
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Navigation scroll effect
    const header = document.getElementById('masthead');
    const scrollThreshold = 40;

    const handleNavbarScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // Mobile Menu Drawer Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const drawerFocusables = mobileMenu ? mobileMenu.querySelectorAll('a, button, [tabindex]') : [];

    const toggleMenu = (forceState) => {
        const isOpen = typeof forceState === 'boolean' 
            ? forceState 
            : mobileMenu.classList.contains('active');

        if (isOpen) {
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Remove focus trapping elements from tab order when closed
            drawerFocusables.forEach(el => el.setAttribute('tabindex', '-1'));
        } else {
            mobileMenu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Restore tab order when opened
            drawerFocusables.forEach(el => el.removeAttribute('tabindex'));
            if (drawerLinks.length > 0) {
                drawerLinks[0].focus();
            }
        }
    };

    if (menuToggle && mobileMenu) {
        // Initialize drawer as completely inert for screen readers when closed
        mobileMenu.setAttribute('aria-hidden', 'true');
        drawerFocusables.forEach(el => el.setAttribute('tabindex', '-1'));

        menuToggle.addEventListener('click', () => toggleMenu());

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                toggleMenu(true);
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu(true);
                menuToggle.focus();
            }
        });
    }

    // Smooth scroll handling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});