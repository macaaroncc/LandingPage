// Función para mostrar un saludo
function saludar() {
    const nombres = ['Amigo', 'Visitante', 'Desarrollador', 'Creativo', 'Innovador'];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    
    // Crear un elemento para mostrar el mensaje
    const mensaje = document.createElement('div');
    mensaje.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 2000;
            animation: popIn 0.5s ease-out;
        ">
            <h2 style="color: #667eea; margin-bottom: 1rem;">¡Hola ${nombre}! 👋</h2>
            <p style="color: #666; margin-bottom: 1.5rem;">¡Gracias por visitar nuestra página!</p>
            <button onclick="cerrarMensaje()" style="
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
            ">Cerrar</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1999;
        " onclick="cerrarMensaje()"></div>
    `;
    
    mensaje.id = 'mensajeModal';
    document.body.appendChild(mensaje);
}

// Función para cerrar el mensaje
function cerrarMensaje() {
    const mensaje = document.getElementById('mensajeModal');
    if (mensaje) {
        mensaje.remove();
    }
}

// Smooth scroll para los enlaces de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Agregar comportamiento smooth scroll a los enlaces
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const objetivo = document.querySelector(this.getAttribute('href'));
            if (objetivo) {
                objetivo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto de aparición en scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observar elementos que queremos animar
    const elementosAnimados = document.querySelectorAll('.feature');
    elementosAnimados.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Función para el botón de contacto
document.addEventListener('DOMContentLoaded', function() {
    const botonContacto = document.querySelector('.contact-button');
    if (botonContacto) {
        botonContacto.addEventListener('click', function() {
            const mensajes = [
                '📧 ¡Gracias por tu interés! Te contactaremos pronto.',
                '🚀 ¡Mensaje enviado! Esperamos poder ayudarte.',
                '✨ ¡Excelente! Tu mensaje ha sido recibido.',
                '🌟 ¡Perfecto! Nos pondremos en contacto contigo.'
            ];
            
            const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
            
            // Cambiar temporalmente el texto del botón
            const textoOriginal = this.textContent;
            this.textContent = mensajeAleatorio;
            this.style.background = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = textoOriginal;
                this.style.background = 'white';
            }, 3000);
        });
    }
});

// Agregar estilos CSS para la animación del modal
const estiloModal = document.createElement('style');
estiloModal.textContent = `
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(estiloModal);

// Pequeño easter egg: cambiar el emoji del mundo al hacer click
document.addEventListener('DOMContentLoaded', function() {
    const emojiMundo = document.querySelector('.placeholder-image');
    const emojis = ['🌍', '🌎', '🌏', '🌟', '✨', '🚀', '💫'];
    let emojiIndex = 0;
    
    if (emojiMundo) {
        emojiMundo.addEventListener('click', function() {
            emojiIndex = (emojiIndex + 1) % emojis.length;
            this.textContent = emojis[emojiIndex];
            
            // Pequeña animación
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Tooltip
        emojiMundo.title = '¡Haz click para cambiar el emoji!';
        emojiMundo.style.cursor = 'pointer';
    }
});

console.log('🌟 ¡Landing page cargada correctamente! ¡Hola mundo!');
