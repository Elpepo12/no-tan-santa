// Registramos el plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. Navbar: Fondo al hacer Scroll */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 2. Animación Inicial (Hero) sutil y elegante */
    const heroTl = gsap.timeline();
    
    heroTl.from(".logo", { duration: 1.5, opacity: 0, ease: "power2.inOut" })
          .from(".nav-links a", { duration: 1, opacity: 0, stagger: 0.1, ease: "power2.out" }, "-=1")
          .from(".gs-hero", { duration: 1.5, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5");

    /* 3. Revelado de Secciones generales (Fade suave hacia arriba) */
    const revealSections = document.querySelectorAll(".gs-reveal");
    
    revealSections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // Dispara cuando el 85% de la sección es visible
                toggleActions: "play none none reverse" 
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    /* 4. Aparición en cascada independiente para CADA grid de vídeos (Elixires y Bocados) */
    const videoGrids = document.querySelectorAll(".video-grid");
    
    videoGrids.forEach((grid) => {
        gsap.from(grid.querySelectorAll(".video-card"), {
            scrollTrigger: {
                trigger: grid,
                start: "top 80%", // La cascada empieza cuando el grid llega al 80% de la pantalla
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    });

    /* 5. Animación de las "Normas de la casa" */
    gsap.from(".rule-box", {
        scrollTrigger: {
            trigger: ".grid-3-cols",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
});