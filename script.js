document.addEventListener('DOMContentLoaded', () => {
    
    const entryOverlay = document.getElementById('entry-overlay');
    const mainContent = document.getElementById('main-content');
    const btnEnter = document.getElementById('btn-enter');
    const btnLeave = document.getElementById('btn-leave');

    const showContentWithAnimation = () => {
        entryOverlay.style.opacity = '0';
        setTimeout(() => {
            entryOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    };

    const showContentInstantly = () => {
        entryOverlay.style.display = 'none';
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';
    };

    if (localStorage.getItem('noTanSanta_ageVerified') === 'true') {
        showContentInstantly();
    } else {
        document.body.style.overflow = 'hidden';
    }

    btnEnter.addEventListener('click', () => {
        localStorage.setItem('noTanSanta_ageVerified', 'true');
        showContentWithAnimation();
    });

    btnLeave.addEventListener('click', () => {
        alert('Este contenido es solo para mayores de edad.');
        window.location.href = 'https://www.google.com'; 
    });

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        if (mainNav.style.display === 'block') {
            mainNav.style.display = 'none';
        } else {
            mainNav.style.display = 'block';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            mainNav.style.padding = '20px';
            mainNav.style.borderBottom = '1px solid var(--neon-red)';
            
            const navUl = mainNav.querySelector('ul');
            navUl.style.flexDirection = 'column';
            navUl.style.alignItems = 'center';
            navUl.style.gap = '20px';
        }
    });

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                mainNav.style.display = 'none';
            }
        });
    });
});