document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    /* 1. Lenis Smooth Scroll */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0, 0);

    /* 2. Parallax de la textura de Fibra de Carbono (Body) */
    gsap.to(".carbon-bg-body", {
        backgroundPosition: "center 20%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });

    /* 3. Menú Móvil (Hamburguesa) */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            if(navMenu.classList.contains('active')) { lenis.stop(); } else { lenis.start(); }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navMenu.classList.remove('active');
            lenis.start();
        });
    });

    /* 4. Custom Cursor */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const hoverTargets = document.querySelectorAll('.hover-target');

        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0 });
        });

        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            gsap.set(follower, { x: followerX, y: followerY });
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => follower.classList.add('active'));
            target.addEventListener('mouseleave', () => follower.classList.remove('active'));
        });
    }

    /* 5. Preloader y Animación Inicial */
    const tl = gsap.timeline();

    tl.to(".preloader-logo", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
      .to(".preloader-text", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(".preloader", { yPercent: -100, duration: 1.1, delay: 0.8, ease: "expo.inOut" })
      .from(".hero .subtitle", { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.3")
      .from(".hero .title", { y: 100, duration: 1.1, stagger: 0.1, ease: "power4.out" }, "-=0.8")
      .from(".hero-img", { scale: 1.15, duration: 1.8, ease: "power2.out" }, "-=1.5");

    /* 6. Parallax Hero Img */
    gsap.to(".hero-img", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    /* 7. Animación Filosofía y Watermark */
    gsap.from(".logo-watermark", {
        scrollTrigger: { trigger: ".about", start: "top 90%" },
        opacity: 0, xPercent: -10, rotate: 0, duration: 1.5, ease: "power3.out"
    });

    gsap.from(".about-text .section-title, .about-text p", {
        scrollTrigger: { trigger: ".about", start: "top 80%" },
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });

    gsap.from(".stat", {
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
        scale: 0.9, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)"
    });

    /* 8. Catálogo y Parallax Individual de Tarjetas */
    const cards = gsap.utils.toArray('.car-card');

    cards.forEach(card => {
        const img = card.querySelector('.car-img');
        
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 85%" },
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out"
        });

        gsap.to(img, {
            yPercent: 10, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
    });
});