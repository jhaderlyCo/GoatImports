document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos que queremos animar al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Configurar el Observer
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Efecto cascada (delay entre cada elemento)
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observar cada elemento
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Activar el efecto abanico en el Hero al cargar
    setTimeout(() => {
        const heroImages = document.querySelector('.hero-images');
        if (heroImages) {
            heroImages.classList.add('animate');
        }
    }, 500);


    // --- GENERADOR DE ESPACIO PROFUNDO ---
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        // Creamos 180 estrellas para poblar el espacio
        for (let i = 0; i < 180; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Variedad de tamaños para dar profundidad (pequeñas, medianas, brillantes)
            const tipo = Math.random();
            let size;
            if (tipo > 0.8) {
                size = Math.random() * 2.5 + 2; // Estrellas grandes y cercanas
                star.style.boxShadow = "0 0 6px rgba(255, 255, 255, 0.8)";
            } else if (tipo > 0.4) {
                size = Math.random() * 1.5 + 1; // Estrellas medianas
            } else {
                size = Math.random() * 1 + 0.5;  // Estrellas lejanas (polvo estelar)
            }

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Posición aleatoria por toda la pantalla
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Velocidades variadas para que parezca un espacio vivo
            const duration = Math.random() * 5 + 2; // Entre 2 y 7 segundos
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
});

// --- FUNCIONES PARA EL CATÁLOGO DINÁMICO ---
function showSeries(seriesId) {
    // 1. Ocultar el menú de series principal
    document.getElementById('series-menu').style.display = 'none';
    
    // 2. Mostrar la sección de modelos y el botón de volver
    document.getElementById('models-view').style.display = 'block';
    
    // 3. Ocultar todos los contenedores de series primero
    const allSeries = document.querySelectorAll('.series-container');
    allSeries.forEach(s => s.style.display = 'none');
    
    // 4. Mostrar ÚNICAMENTE la serie que el usuario eligió
    document.getElementById(seriesId).style.display = 'block';

    // 5. Mover la pantalla arriba del catálogo suavemente
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

function hideModels() {
    // 1. Ocultar la sección de modelos
    document.getElementById('models-view').style.display = 'none';
    
    // 2. Volver a mostrar el menú principal de series (quitamos el display para que CSS tome el control)
    document.getElementById('series-menu').style.display = '';
    
    // 3. Mover la pantalla arriba del catálogo
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}
