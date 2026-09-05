/* ==========================================================================
    script.js — interactive layer for Benjawan's e-portfolio
    Handles: preloader, nav highlighting, scroll-reveal, language bars,
    image lightbox, back-to-top. Modal open/close stays inline in HTML.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------------------
        1. Preloader — single load-in moment
    --------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 250);
        });
        // Fallback in case 'load' already fired
        if (document.readyState === 'complete') {
            setTimeout(() => preloader.classList.add('hidden'), 250);
        }
    }

    /* ---------------------------------------------------------------------
        2. Hamburger menu
    --------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    /* ---------------------------------------------------------------------
        3. Active nav link on scroll
    --------------------------------------------------------------------- */
    const sections = document.querySelectorAll('main section[id], #contact');
    const navAnchors = document.querySelectorAll('.nav-links a');
    if (sections.length && navAnchors.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navAnchors.forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
        sections.forEach(sec => navObserver.observe(sec));
    }

    /* ---------------------------------------------------------------------
        4. Scroll reveal — fade + rise, once per element
    --------------------------------------------------------------------- */
    const revealTargets = document.querySelectorAll(
        '.section-title, .intro-card, .skill-card, .card, .contact-banner'
    );
    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.06}s`;
    });
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));

    /* ---------------------------------------------------------------------
        5. Back to top button
    --------------------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------------------
        6. Lightbox for gallery / certificate images
    --------------------------------------------------------------------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const zoomSelectors = [
        '.modal-mobile-img', '.modal-img-full', '.modal-img-main',
        '.modal-img-sub', '.modal-img-top', '.modal-img-mid',
        '.modal-img-bottom', '.modal-img-gallery-3col .modal-img', '.cert-item',
        '.hero-img-placeholder.zoomable'
    ].join(', ');

    document.querySelectorAll(zoomSelectors).forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const bg = window.getComputedStyle(el).backgroundImage;
            const url = bg && bg !== 'none' ? bg.slice(5, -2) : null;
            if (url && lightbox && lightboxImg) {
                lightboxImg.src = url;
                const caption = el.dataset.caption || '';
                if (lightboxCaption) {
                    lightboxCaption.textContent = caption;
                    lightboxCaption.style.display = caption ? 'block' : 'none';
                }
                lightbox.classList.add('active');
            }
        });
    });

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('active');
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});