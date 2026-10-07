document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Toggle hamburger icon
            if (navLinks.classList.contains('nav-active')) {
                hamburger.innerHTML = '✕';
            } else {
                hamburger.innerHTML = '☰';
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.innerHTML = '☰';
            }
        });
    });

    // 2. Sticky Navbar & Active Link Update on Scroll
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky header styling (optional transparency changes can be added here)
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
