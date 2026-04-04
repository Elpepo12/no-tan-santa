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

    /* 2. Animación Inicial (Hero) */
    const heroTl = gsap.timeline();
    
    heroTl.from(".logo", { duration: 1.5, opacity: 0, ease: "power2.inOut" })
          .from(".nav-links a", { duration: 1, opacity: 0, stagger: 0.1, ease: "power2.out" }, "-=1")
          .from(".gs-hero", { duration: 1.5, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5");

    /* 3. Revelado de Secciones generales */
    const revealSections = document.querySelectorAll(".gs-reveal");
    
    revealSections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse" 
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    /* 4. LAZY LOADING DE VÍDEOS (Solución a la carga lenta) */
    // Solo cargará los vídeos que estén a punto de entrar en pantalla
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // Movemos la ruta del archivo de data-src a src real
                video.src = video.getAttribute('data-src');
                video.load();
                
                // Cuando el vídeo tenga suficientes datos para reproducirse, le quitamos la opacidad 0
                video.addEventListener('canplay', () => {
                    video.classList.add('loaded');
                    video.play().catch(error => {
                        console.log("Autoplay bloqueado por el navegador, requiere interacción.");
                    });
                }, { once: true });
                
                // Dejamos de observar este vídeo porque ya está cargado
                observer.unobserve(video);
            }
        });
    }, { 
        rootMargin: '0px 0px 400px 0px' // Empieza a cargar el vídeo 400px antes de que aparezca en pantalla
    });

    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });

    /* 5. Aparición en cascada de los contenedores de los vídeos con GSAP */
    const videoGrids = document.querySelectorAll(".video-grid");
    videoGrids.forEach((grid) => {
        gsap.from(grid.querySelectorAll(".video-card"), {
            scrollTrigger: {
                trigger: grid,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    });

    /* 6. Animación de las "Normas de la casa" */
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