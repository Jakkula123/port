// Performance optimized JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = "Data Science Student | AI Enthusiast | Web Developer";
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // Optimize scroll event listeners using requestAnimationFrame
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function onScroll(scrollPos) {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollPos > 100) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        }
    }

    document.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Enhanced smooth scroll with better easing
    function smoothScroll(target) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - 60; // Reduced offset for better positioning
        const duration = 800; // Slightly faster duration
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Improved easing function for smoother animation
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Optimized scroll event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target);
                // Update active state
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Add click handler for project links
    document.querySelectorAll('.view-project').forEach(link => {
        link.addEventListener('click', function(e) {
            // Open in new tab
            window.open(this.href, '_blank');
        });
    });

    // Mobile menu with improved performance
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Add smooth hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Optimize performance with IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.width = entry.target.dataset.progress + '%';
                }
            }
        });
    }, observerOptions);

    // Observe elements for smooth animations
    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .section-title').forEach(el => {
        observer.observe(el);
        el.classList.add('animate-on-scroll');
    });

    // Optimized intersection observer for animations
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions2 = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer2 = new IntersectionObserver(observerCallback, observerOptions2);

    // Observe elements that need animation
    document.querySelectorAll('.skill-item, .about-image').forEach(el => {
        observer2.observe(el);
    });

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Skill progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress');
                    if (progressBar && progressBar.dataset.progress) {
                        progressBar.style.width = progressBar.dataset.progress;
                    }
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => skillObserver.observe(item));
    }

    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Remove loader
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = 'none';
    }
});
