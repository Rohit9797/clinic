/*
  MIT License
  Copyright (c) 2025 ScriptedWebs
*/



/**
 * MedCare Hospital - Main JavaScript
 * Handles global functionality, navigation, theme switching, and interactive components
 */

(function() {
    'use strict';

    // Global state
    let currentTheme = 'light';
    let testimonialIndex = 0;
    let testimonialInterval;

    // DOM elements
    const elements = {
        nav: null,
        navToggle: null,
        navMenu: null,
        themeToggle: null,
        statsNumbers: null,
        testimonialCards: null,
        testimonialIndicators: null,
        testimonialPrevBtn: null,
        testimonialNextBtn: null
    };

    /**
     * Initialize the application
     */
    function init() {
        cacheElements();
        setupEventListeners();
        initializeTheme();
        initializeNavigation();
        initializeStats();
        initializeTestimonials();
        initializeLazyLoading();
        initializeSmoothScrolling();
        
        // Mark as loaded
        document.body.classList.add('js-loaded');
        
        console.log('MedCare Hospital website initialized');
    }

    /**
     * Cache DOM elements for better performance
     */
    function cacheElements() {
        elements.nav = document.querySelector('.nav');
        elements.navToggle = document.querySelector('.nav__toggle');
        elements.navMenu = document.querySelector('.nav__menu');
        elements.themeToggle = document.querySelector('.theme-toggle');
        elements.statsNumbers = document.querySelectorAll('.stats__number[data-count]');
        elements.testimonialCards = document.querySelectorAll('.testimonial-card');
        elements.testimonialIndicators = document.querySelectorAll('.testimonials__indicator');
        elements.testimonialPrevBtn = document.querySelector('.testimonials__btn--prev');
        elements.testimonialNextBtn = document.querySelector('.testimonials__btn--next');
    }

    /**
     * Set up global event listeners
     */
    function setupEventListeners() {
        // Navigation toggle
        if (elements.navToggle) {
            elements.navToggle.addEventListener('click', toggleNavigation);
        }

        // Theme toggle
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }

        // Testimonial controls
        if (elements.testimonialPrevBtn) {
            elements.testimonialPrevBtn.addEventListener('click', () => changeTestimonial('prev'));
        }
        if (elements.testimonialNextBtn) {
            elements.testimonialNextBtn.addEventListener('click', () => changeTestimonial('next'));
        }

        // Testimonial indicators
        elements.testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToTestimonial(index));
        });

        // Close navigation on outside click
        document.addEventListener('click', handleOutsideClick);

        // Handle escape key
        document.addEventListener('keydown', handleKeydown);

        // Handle window resize
        window.addEventListener('resize', debounce(handleResize, 250));

        // Handle scroll for header effects
        window.addEventListener('scroll', debounce(handleScroll, 10));
    }

    /**
     * Initialize theme system
     */
    function initializeTheme() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('medcare-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        applyTheme(currentTheme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('medcare-theme')) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(currentTheme);
            }
        });
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        currentTheme = theme;
        
        // Update theme toggle button aria-label
        if (elements.themeToggle) {
            const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            elements.themeToggle.setAttribute('aria-label', label);
            elements.themeToggle.setAttribute('title', label);
        }
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('medcare-theme', newTheme);
        
        // Announce theme change to screen readers
        announceToScreenReader(`Switched to ${newTheme} mode`);
    }

    /**
     * Initialize navigation functionality
     */
    function initializeNavigation() {
        if (!elements.navToggle || !elements.navMenu) return;

        // Set initial ARIA states
        elements.navToggle.setAttribute('aria-expanded', 'false');
        elements.navMenu.setAttribute('aria-hidden', 'true');
    }

    /**
     * Toggle mobile navigation
     */
    function toggleNavigation() {
        const isOpen = elements.navToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isOpen;

        elements.navToggle.setAttribute('aria-expanded', newState.toString());
        elements.navMenu.setAttribute('aria-hidden', (!newState).toString());
        elements.navMenu.classList.toggle('nav__menu--open', newState);

        // Manage focus
        if (newState) {
            // Focus first menu item when opening
            const firstMenuItem = elements.navMenu.querySelector('.nav__link');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }

        // Announce state change to screen readers
        announceToScreenReader(`Navigation menu ${newState ? 'opened' : 'closed'}`);
    }

    /**
     * Initialize stats counter animation
     */
    function initializeStats() {
        if (elements.statsNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        elements.statsNumbers.forEach(number => observer.observe(number));
    }

    /**
     * Animate counter from 0 to target value
     */
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
                // Add percentage sign for satisfaction stat
                if (element.getAttribute('data-count') === '98') {
                    element.textContent += '%';
                }
            }
        };

        updateCounter();
    }

    /**
     * Initialize testimonials slider
     */
    function initializeTestimonials() {
        if (elements.testimonialCards.length === 0) return;

        // Start auto-rotation
        startTestimonialRotation();

        // Pause on hover
        const testimonialSlider = document.querySelector('.testimonials__slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', stopTestimonialRotation);
            testimonialSlider.addEventListener('mouseleave', startTestimonialRotation);
        }
    }

    /**
     * Change testimonial (prev/next)
     */
    function changeTestimonial(direction) {
        const totalTestimonials = elements.testimonialCards.length;
        
        if (direction === 'next') {
            testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
        } else {
            testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
        }
        
        updateTestimonialDisplay();
    }

    /**
     * Go to specific testimonial
     */
    function goToTestimonial(index) {
        testimonialIndex = index;
        updateTestimonialDisplay();
        
        // Reset auto-rotation
        stopTestimonialRotation();
        startTestimonialRotation();
    }

    /**
     * Update testimonial display
     */
    function updateTestimonialDisplay() {
        // Update cards
        elements.testimonialCards.forEach((card, index) => {
            const isActive = index === testimonialIndex;
            card.classList.toggle('testimonial-card--active', isActive);
            card.setAttribute('aria-hidden', (!isActive).toString());
        });

        // Update indicators
        elements.testimonialIndicators.forEach((indicator, index) => {
            const isActive = index === testimonialIndex;
            indicator.classList.toggle('testimonials__indicator--active', isActive);
            indicator.setAttribute('aria-selected', isActive.toString());
        });

        // Announce change to screen readers
        const currentTestimonial = elements.testimonialCards[testimonialIndex];
        if (currentTestimonial) {
            const authorName = currentTestimonial.querySelector('.testimonial-card__name')?.textContent;
            if (authorName) {
                announceToScreenReader(`Now showing testimonial from ${authorName}`);
            }
        }
    }

    /**
     * Start testimonial auto-rotation
     */
    function startTestimonialRotation() {
        stopTestimonialRotation(); // Clear any existing interval
        testimonialInterval = setInterval(() => {
            changeTestimonial('next');
        }, 5000); // Change every 5 seconds
    }

    /**
     * Stop testimonial auto-rotation
     */
    function stopTestimonialRotation() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
            testimonialInterval = null;
        }
    }

    /**
     * Initialize lazy loading for images
     */
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile navigation if open
                    if (elements.navMenu && elements.navMenu.classList.contains('nav__menu--open')) {
                        toggleNavigation();
                    }

                    // Smooth scroll to target
                    const headerHeight = elements.nav ? elements.nav.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Focus target for accessibility
                    target.focus();
                }
            });
        });
    }

    /**
     * Handle clicks outside navigation
     */
    function handleOutsideClick(event) {
        if (!elements.nav || !elements.navMenu) return;

        const isNavOpen = elements.navMenu.classList.contains('nav__menu--open');
        const clickedInsideNav = elements.nav.contains(event.target);

        if (isNavOpen && !clickedInsideNav) {
            toggleNavigation();
        }
    }

    /**
     * Handle keyboard events
     */
    function handleKeydown(event) {
        // Close navigation on Escape key
        if (event.key === 'Escape') {
            if (elements.navMenu && elements.navMenu.classList.contains('nav__menu--open')) {
                toggleNavigation();
                elements.navToggle.focus();
            }
        }

        // Handle arrow keys in testimonials
        if (event.target.classList.contains('testimonials__indicator')) {
            let newIndex = testimonialIndex;
            
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                newIndex = (testimonialIndex - 1 + elements.testimonialIndicators.length) % elements.testimonialIndicators.length;
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                newIndex = (testimonialIndex + 1) % elements.testimonialIndicators.length;
            }
            
            if (newIndex !== testimonialIndex) {
                goToTestimonial(newIndex);
                elements.testimonialIndicators[newIndex].focus();
            }
        }
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Close mobile navigation on resize to desktop
        if (window.innerWidth >= 768 && elements.navMenu && elements.navMenu.classList.contains('nav__menu--open')) {
            toggleNavigation();
        }
    }

    /**
     * Handle scroll events
     */
    function handleScroll() {
        if (!elements.nav) return;

        const scrolled = window.scrollY > 10;
        elements.nav.classList.toggle('nav--scrolled', scrolled);
    }

    /**
     * Announce message to screen readers
     */
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Debounce function to limit function calls
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility function to format phone numbers
     */
    function formatPhoneNumber(value) {
        // Remove all non-digit characters
        const phoneNumber = value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (phoneNumber.length >= 10) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        } else if (phoneNumber.length >= 6) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        } else if (phoneNumber.length >= 3) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        
        return phoneNumber;
    }

    /**
     * Utility function to validate email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Utility function to validate phone number
     */
    function isValidPhone(phone) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    // Global utility functions for other scripts
    window.MedCareUtils = {
        formatPhoneNumber,
        isValidEmail,
        isValidPhone,
        announceToScreenReader,
        debounce
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();