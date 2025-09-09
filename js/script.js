// ===== CONFIGURACIÓN Y VARIABLES GLOBALES =====
const CONFIG = {
    company: {
        name: 'VelocityLands',
        phone: '+1 (555) 123-4567',
        email: 'hola@velocitylands.com',
        whatsapp: '5551234567'
    },
    plans: {
        basico: { name: 'Plan Básico', price: 299 },
        premium: { name: 'Plan Premium', price: 599 },
        megapack: { name: 'Plan MegaPack', price: 999 }
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializePricingCards();
    initializeCounters();
    initializeMobileMenu();
    
console.log('⚡ VelocityLands Landing Page cargada correctamente!');
    
    // Debug: Verificar que las funciones están disponibles
    console.log('📝 Funciones disponibles:', {
        scrollToSection: typeof scrollToSection,
        mostrarDemo: typeof mostrarDemo,
        seleccionarPlan: typeof seleccionarPlan
    });
});

// ===== NAVEGACIÓN Y SCROLL SUAVE =====
function initializeNavigation() {
    // Smooth scroll para enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1));
        });
    });
    
    // Destacar sección activa en la navegación
    window.addEventListener('scroll', updateActiveNavigation);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== MENÚ MÓVIL =====
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Cerrar menú al hacer click fuera del mismo
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Función para cerrar el menú
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Cerrar menú si la pantalla se redimensiona a desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// ===== ANIMACIONES DE SCROLL =====
function initializeScrollAnimations() {
    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll('.service-card, .pricing-card, .step, .testimonial-card');
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== CONTADORES ANIMADOS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (text.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (text.includes('h')) {
            element.textContent = Math.floor(current) + 'h';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== FORMULARIO DE CONTACTO =====
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Validar antes de enviar
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Por favor, completa todos los campos requeridos', 'error');
                return false;
            }
            
            // Si la validación pasa, permitir el envío y mostrar mensaje
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            showNotification('¡Formulario enviado correctamente! Te contactaremos pronto 🚀', 'success');
            
            // Tracking
            const formData = new FormData(this);
            trackEvent('form_submission', {
                plan: formData.get('plan'),
                source: 'novaclick_landing'
            });
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
    }
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validar formulario
    if (!validateForm(form)) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return false;
    }
    
    // Mostrar estado de carga
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // El formulario se enviará automáticamente a Formspree
    // Mostrar mensaje de confirmación después de un breve delay
    setTimeout(() => {
        showNotification('¡Formulario enviado! Te contactaremos pronto 🚀', 'success');
        
        // Analytics tracking
        trackEvent('form_submission', {
            plan: formData.get('plan'),
            source: 'novaclick_landing'
        });
    }, 500);
    
    return true; // Permitir que el formulario se envíe
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Ingresa un email válido');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField() {
    const field = this;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo es obligatorio');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Ingresa un email válido');
    } else {
        clearFieldError(field);
    }
}

function clearErrors() {
    clearFieldError(this);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e5e7eb';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== FUNCIONES DE PLANES =====
function seleccionarPlan(planType) {
    const plan = CONFIG.plans[planType];
    if (!plan) return;
    
    // Pre-llenar formulario con el plan seleccionado
    const planSelect = document.getElementById('plan');
    if (planSelect) {
        planSelect.value = planType;
    }
    
    // Scroll al formulario
    scrollToSection('contacto');
    
    // Mostrar notificación
    showNotification(`Has seleccionado el ${plan.name} por $${plan.price}. ¡Completa el formulario para continuar! 🚀`, 'info');
    
    // Destacar el formulario
    setTimeout(() => {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                form.style.animation = '';
            }, 1000);
        }
    }, 800);
}

// ===== DEMO Y FUNCIONALIDADES ESPECIALES =====
function mostrarDemo() {
    const demoContent = `
        <div class="demo-modal">
            <div class="demo-content">
                <div class="demo-header">
                    <h2>🚀 Ejemplos Reales de Nuestro Trabajo</h2>
                    <button class="close-demo" onclick="cerrarDemo()">&times;</button>
                </div>
                <div class="demo-body">
                    <div class="demo-preview">
                        <h3>Casos de Éxito Reales</h3>
                        
                        <!-- Ejemplo destacado - Tavolo Casa -->
                        <div class="featured-demo">
                            <div class="demo-screenshot">
                                <div class="browser-mockup">
                                    <div class="browser-bar">
                                        <div class="browser-dots"></div>
                                        <div class="browser-url">tavolocasainfo.com</div>
                                    </div>
                                    <div class="demo-content-preview">
                                        <div class="demo-header-preview">Tavolo Casa</div>
                                        <div class="demo-text">Los mejores precios en almohadas</div>
                                        <div class="demo-button">Ver Productos</div>
                                    </div>
                                </div>
                            </div>
                            <div class="demo-details">
                                <h4><i class="fas fa-bed"></i> Tavolo Casa</h4>
                                <p class="demo-description">Landing page para empresa de almohadas y productos de descanso</p>
                                <div class="demo-results">
                                    <span class="result-item">📈 +250% Ventas Online</span>
                                    <span class="result-item">📱 100% Responsive</span>
                                    <span class="result-item">⚡ Carga Ultra Rápida</span>
                                </div>
                                <a href="https://tavolocasainfo.com" target="_blank" class="demo-link">
                                    <i class="fas fa-external-link-alt"></i> Ver Sitio Web
                                </a>
                            </div>
                        </div>
                        
                        <!-- Otros ejemplos -->
                        <div class="demo-examples">
                            <div class="demo-example">
                                <div class="demo-thumbnail">
                                    <i class="fas fa-store"></i>
                                </div>
                                <h4>E-commerce Fashion</h4>
                                <p>+400% conversiones</p>
                            </div>
                            <div class="demo-example">
                                <div class="demo-thumbnail">
                                    <i class="fas fa-utensils"></i>
                                </div>
                                <h4>Restaurante Local</h4>
                                <p>+250% reservas online</p>
                            </div>
                            <div class="demo-example">
                                <div class="demo-thumbnail">
                                    <i class="fas fa-dumbbell"></i>
                                </div>
                                <h4>Gimnasio Premium</h4>
                                <p>+180% membresías</p>
                            </div>
                        </div>
                        
                        <div class="demo-cta">
                            <p>¿Quieres ver tu negocio con resultados así?</p>
                            <button class="btn btn-primary" onclick="scrollToSection('contacto'); cerrarDemo();">¡Sí, quiero mi landing page!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="demo-backdrop" onclick="cerrarDemo()"></div>
        </div>
    `;
    
    const demoElement = document.createElement('div');
    demoElement.innerHTML = demoContent;
    demoElement.id = 'demoModal';
    document.body.appendChild(demoElement);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function cerrarDemo() {
    const demo = document.getElementById('demoModal');
    if (demo) {
        demo.remove();
        document.body.style.overflow = 'auto';
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== INICIALIZACIÓN DE TARJETAS DE PRECIOS =====
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
}

// ===== EFECTOS ESPECIALES =====
function initializeCounters() {
    // Ya implementado en initializeScrollAnimations
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateStatCounter(element) {
    const text = element.textContent;
    const isPlus = text.includes('+');
    const isPercent = text.includes('%');
    const isHours = text.includes('h');
    
    let target = parseInt(text.replace(/[^0-9]/g, ''));
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPlus) displayValue += '+';
        if (isPercent) displayValue += '%';
        if (isHours) displayValue += 'h';
        
        element.textContent = displayValue;
    }, 20);
}

// ===== ANALYTICS Y TRACKING =====
function trackEvent(eventName, parameters = {}) {
    // Aquí conectarías con Google Analytics, Facebook Pixel, etc.
    console.log(`📊 Analytics: ${eventName}`, parameters);
    
    // Ejemplo con Google Analytics (descomentar si tienes GA)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, parameters);
    // }
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar scroll events
window.addEventListener('scroll', debounce(updateActiveNavigation, 100));

// ===== ESTILOS DINÁMICOS =====
// Añadir estilos para el modal de demo
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    .demo-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .demo-content {
        background: white;
        border-radius: 20px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        z-index: 3001;
        animation: modalSlideIn 0.4s ease-out;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    /* Estilos para el ejemplo destacado */
    .featured-demo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin: 2rem 0;
        padding: 2rem;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border-radius: 16px;
        border: 2px solid #e5e7eb;
    }
    
    .demo-screenshot {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .browser-mockup {
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        overflow: hidden;
        width: 100%;
        max-width: 300px;
    }
    
    .browser-bar {
        background: #f1f5f9;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .browser-dots {
        display: flex;
        gap: 6px;
    }
    
    .browser-dots::before {
        content: '';
        width: 12px;
        height: 12px;
        background: #ef4444;
        border-radius: 50%;
        display: block;
    }
    
    .browser-dots::after {
        content: '';
        width: 12px;
        height: 12px;
        background: #f59e0b;
        border-radius: 50%;
        display: block;
        margin-left: 6px;
    }
    
    .browser-url {
        background: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        color: #64748b;
        border: 1px solid #e2e8f0;
        flex: 1;
        text-align: center;
    }
    
    .demo-content-preview {
        padding: 2rem 1.5rem;
        text-align: center;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
    }
    
    .demo-header-preview {
        font-size: 1.2rem;
        font-weight: bold;
        color: #1e293b;
        margin-bottom: 8px;
    }
    
    .demo-text {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 12px;
    }
    
    .demo-button {
        background: linear-gradient(135deg, #6366f1, #764ba2);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.8rem;
        display: inline-block;
        font-weight: 600;
    }
    
    .demo-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .demo-details h4 {
        font-size: 1.5rem;
        color: #1e293b;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .demo-details h4 i {
        color: #6366f1;
    }
    
    .demo-description {
        color: #64748b;
        margin-bottom: 1.5rem;
        line-height: 1.5;
    }
    
    .demo-results {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    
    .result-item {
        background: rgba(99, 102, 241, 0.1);
        color: #4338ca;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        border-left: 3px solid #6366f1;
    }
    
    .demo-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #6366f1, #764ba2);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        align-self: flex-start;
    }
    
    .demo-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        color: white;
        text-decoration: none;
    }
    
    /* Responsive para el demo destacado */
    @media (max-width: 768px) {
        .demo-content {
            max-width: 95vw;
            margin: 0 10px;
        }
        
        .featured-demo {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
        }
        
        .browser-mockup {
            max-width: 250px;
        }
        
        .demo-results {
            align-items: center;
        }
        
        .demo-link {
            align-self: center;
        }
    }
    
    .demo-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .demo-header {
        padding: 2rem 2rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .close-demo {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.3s ease;
    }
    
    .close-demo:hover {
        color: #ef4444;
    }
    
    .demo-body {
        padding: 2rem;
    }
    
    .demo-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .demo-example {
        text-align: center;
        padding: 1.5rem;
        border-radius: 12px;
        background: #f8fafc;
        transition: all 0.3s ease;
    }
    
    .demo-example:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .demo-thumbnail {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: white;
        font-size: 1.5rem;
    }
    
    .demo-cta {
        text-align: center;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 4000;
        max-width: 400px;
        animation: slideInRight 0.4s ease-out;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    
    .notification.success .notification-content {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }
    
    .notification.error .notification-content {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
    }
    
    .notification.info .notification-content {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: currentColor;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(demoStyles);

// ===== EFECTOS DE HEADER DINÁMICO =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== PARALLAX Y EFECTOS AVANZADOS =====
function initializeParallaxEffects() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        floatingCards.forEach((card, index) => {
            const rate = scrolled * -0.5 * (index + 1) * 0.1;
            card.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Inicializar efectos parallax
initializeParallaxEffects();

// ===== EASTER EGGS Y INTERACTIVIDAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Easter egg: Konami Code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showNotification('🎉 ¡Código secreto activado! Descuento del 20% en cualquier plan 🎉', 'success');
            konamiCode = [];
        }
    });
    
    // Double click en logo para mostrar información de desarrollador
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            setTimeout(() => { clickCount = 0; }, 500);
            
            if (clickCount === 2) {
                showNotification('👨‍💻 Desarrollado con ⚡ por el equipo de VelocityLands', 'info');
            }
        });
    }
});

// ===== RENDIMIENTO Y OPTIMIZACIÓN =====
// Lazy loading para imágenes (si las hubiera)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== UTILIDADES DE RENDIMIENTO =====
// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Ejecutar optimizaciones
preloadResources();
initializeLazyLoading();

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener('error', function(e) {
    console.error('Error en VelocityLands Landing Page:', e.error);
    // En producción, enviarías esto a un servicio de monitoring
});

console.log('✨ VelocityLands - Landing pages ultrarrápidas inicializadas correctamente');
