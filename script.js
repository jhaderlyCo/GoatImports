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

// --- EFECTO MÁQUINA DE ESCRIBIR (BUCLE INFINITO) ---
const textElement = document.getElementById('typewriter');
// Aquí puedes poner todas las frases que quieras que se escriban y borren
const phrases = [
    "TU NUEVO iPHONE TE ESPERA",  
    "EL FUTURO EN TU BOLSILLO"
    
]; 

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    // Escribir o borrar letras
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Velocidades: 100ms para escribir, 50ms para borrar
    let typeSpeed = isDeleting ? 50 : 100;

    // Pausas lógicas
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pausa de 2 segundos al terminar de escribir la frase
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Pasa a la siguiente frase
        typeSpeed = 500; // Pausa de medio segundo antes de escribir la nueva
    }

    setTimeout(typeEffect, typeSpeed);
}

// Iniciar el efecto cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// --- LÓGICA DE LAS VENTANAS EMERGENTES (MÚLTIPLES MODELOS) ---
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) {
        console.error("Falta crear la ventana en el HTML para:", idModal);
        return;
    }
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10); 
}

function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); 
}