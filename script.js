/* ============================================
   GBS-CIDP Foundation JavaScript
   Interactive functionality for the website
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ============================================
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Don't prevent default for non-section links
                if (href === '#' || href === '#donate') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const initNavbarScroll = () => {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    };

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const initMobileMenu = () => {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!mobileToggle || !navMenu) return;
        
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    };

    // ============================================
    // TABS FUNCTIONALITY
    // ============================================
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const targetPane = document.getElementById(`tab-${targetTab}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    };

    // ============================================
    // ANIMATED COUNTERS FOR STATS
    // ============================================
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        const speed = 200; // Animation speed
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / speed;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer for counter animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    };

    // ============================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate elements with specific classes
        const animatedElements = document.querySelectorAll(
            '.resource-card, .mission-card, .value-item, .focus-item, .condition-content'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };

    // ============================================
    // PROGRESS BAR ANIMATIONS
    // ============================================
    const initProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    };

    // ============================================
    // DROPDOWN MENU ENHANCEMENTS
    // ============================================
    const initDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!link || !menu) return;
            
            // Prevent default click on dropdown parent
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    menu.style.display = 'none';
                }
            });
        });
    };

    // ============================================
    // FORM ENHANCEMENTS (if forms are added later)
    // ============================================
    const initForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic validation
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Form would be submitted here
                    console.log('Form is valid and ready to submit');
                    form.reset();
                    alert('Thank you for your message. We will get back to you soon!');
                }
            });
        });
    };

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const initLazyLoading = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    const initAccessibility = () => {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add aria-labels to icon-only buttons
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (button.querySelector('svg') && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Menu toggle');
            }
        });
    };

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const initBackToTop = () => {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'scale(1.1)';
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'scale(1)';
        });
    };

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    const initConsoleMessage = () => {
        console.log('%c GBS-CIDP Foundation ', 'background: #00588E; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
        console.log('%c Building hope through research, advocacy, and innovation ', 'color: #6C757D; font-size: 12px;');
    };

    // ============================================
    // INITIALIZE ALL FUNCTIONS
    // ============================================
    const init = () => {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initSmoothScrolling();
                initNavbarScroll();
                initMobileMenu();
                initTabs();
                initCounters();
                initScrollAnimations();
                initProgressBars();
                initDropdowns();
                initForms();
                initLazyLoading();
                initAccessibility();
                initBackToTop();
                initConsoleMessage();
            });
        } else {
            // DOM is already loaded
            initSmoothScrolling();
            initNavbarScroll();
            initMobileMenu();
            initTabs();
            initCounters();
            initScrollAnimations();
            initProgressBars();
            initDropdowns();
            initForms();
            initLazyLoading();
            initAccessibility();
            initBackToTop();
            initConsoleMessage();
        }
    };

    // Start the initialization
    init();

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function for performance
    window.debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle function for scroll events
    window.throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

})();

// ============================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce: window.debounce,
        throttle: window.throttle
    };
}