document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. UX Básica: Menú Móvil y Navbar ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }));

    const header = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    // --- 2. Animaciones de scroll (Fade-In) ---
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // --- 3. EASTER EGG: El Speakeasy (3 Clics en el Logo) ---
    const secretLogo = document.getElementById("secret-logo");
    const speakeasyModal = document.getElementById("speakeasy-modal");
    const closeSpeakeasy = document.getElementById("close-speakeasy");
    
    let clickCount = 0;
    let clickTimer;

    secretLogo.addEventListener("click", (e) => {
        e.preventDefault();
        clickCount++;
        clearTimeout(clickTimer);

        if (clickCount === 3) {
            speakeasyModal.classList.add("active");
            clickCount = 0; // Resetear
        } else {
            // Si no hace 3 clics en menos de 1.5 segundos, se resetea
            clickTimer = setTimeout(() => { clickCount = 0; }, 1500);
        }
    });

    closeSpeakeasy.addEventListener("click", () => {
        speakeasyModal.classList.remove("active");
    });

    // --- 4. SELECTOR DE PECADOS (Ruleta/Recomendador) ---
    const vibeBtns = document.querySelectorAll(".vibe-btn");
    const comboBox = document.getElementById("combo-result");
    const comboText = document.getElementById("combo-text");

    const combos = {
        atrevido: "🍕 Pinsa La Lujuria + 🍸 Cóctel El Limbo (Fuego y pasión garantizados)",
        dulce: "🍕 Pinsa La Avaricia (Gorgonzola y Pera) + 🍹 Beso de Judas",
        hambre: "🍕 2 Pinsas a elegir + 🍺 2 Cervezas Artesanas Clandestinas"
    };

    vibeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const vibe = btn.getAttribute("data-vibe");
            
            // Ocultar primero para hacer efecto de recarga
            comboBox.classList.add("hidden-combo");
            
            setTimeout(() => {
                comboText.innerHTML = combos[vibe];
                comboBox.classList.remove("hidden-combo");
            }, 300);
            
            // Efecto visual en los botones
            vibeBtns.forEach(b => b.style.borderColor = "var(--neon-red)");
            btn.style.borderColor = "var(--neon-blue)";
        });
    });

    // --- 5. EL CONFESIONARIO (Susurros flotantes) ---
    const whispers = [
        '"Fui por la pinsa, me quedé por el Beso de Judas..."',
        '"La mejor vibra de la ciudad."',
        '"Cuidado con El Limbo, engancha."',
        '"Toqué el logo tres veces y... me explotó la cabeza."',
        '"La masa de la pinsa cruje incluso en la oscuridad."',
        '"El lugar perfecto para perderse."'
    ];
    
    const whisperContainer = document.querySelector(".whisper-container");

    function createWhisper() {
        if (!whisperContainer) return;

        const whisperEl = document.createElement("div");
        whisperEl.classList.add("whisper");
        
        whisperEl.innerText = whispers[Math.floor(Math.random() * whispers.length)];
        
        const randomTop = Math.floor(Math.random() * 70) + 10; 
        const randomLeft = Math.floor(Math.random() * 60) + 10; 
        
        whisperEl.style.top = `${randomTop}%`;
        whisperEl.style.left = `${randomLeft}%`;
        
        whisperEl.style.color = Math.random() > 0.5 ? "rgba(0, 243, 255, 0.8)" : "rgba(255, 42, 64, 0.8)";
        
        whisperContainer.appendChild(whisperEl);

        setTimeout(() => {
            whisperEl.remove();
        }, 6000);
    }

    setInterval(createWhisper, 2500);
    setTimeout(createWhisper, 500);
});