// Configuración mejorada del efecto Matrix
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');

// Ajusta el tamaño del canvas para cubrir toda la pantalla
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Caracteres para el efecto Matrix
const chars = '◄►▲▼★○●◐◑━│┃┄┅┆┇┈┉┊┋╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿';
const charArray = chars.split('');

// Configuración de las columnas
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Inicializar las posiciones de las gotas
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -canvas.height);
}

// Variables para el efecto de resplandor
let glowIntensity = 0;
let glowIncreasing = true;

// Función principal de animación
function drawMatrix() {
    // Efecto de desvanecimiento con resplandor
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar intensidad del resplandor
    if (glowIncreasing) {
        glowIntensity += 0.01;
        if (glowIntensity >= 1) glowIncreasing = false;
    } else {
        glowIntensity -= 0.01;
        if (glowIntensity <= 0.5) glowIncreasing = true;
    }

    // Dibujar caracteres
    for (let i = 0; i < drops.length; i++) {
        // Carácter aleatorio
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Color con efecto de resplandor
        const green = Math.floor(140 + (glowIntensity * 115));
        ctx.fillStyle = `rgba(0, ${green}, 70, ${0.5 + glowIntensity * 0.5})`;
        ctx.font = `${fontSize}px monospace`;
        
        // Dibujar el carácter
        ctx.fillText(char, i * fontSize, drops[i]);

        // Añadir efecto de resplandor
        ctx.shadowBlur = 15 * glowIntensity;
        ctx.shadowColor = `rgba(0, ${green}, 70, ${glowIntensity})`;

        // Actualizar posición
        drops[i]++;

        // Reiniciar la gota cuando llegue al final
        if (drops[i] > canvas.height) {
            drops[i] = Math.random() * -100;
        }
    }

    requestAnimationFrame(drawMatrix);
}

// Iniciar la animación
drawMatrix();

// Interactividad de las habilidades
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
        const message = document.createElement('div');
        message.classList.add('message');
        message.innerText = `Habilidad seleccionada: ${skill.innerText}`;
        document.body.appendChild(message);

        // Añadir la clase de animación
        message.style.animation = 'fadeInOut 2s ease forwards';

        // Eliminar el mensaje después de la animación
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
});

// Scroll suave para la navegación
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});