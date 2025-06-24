document.addEventListener('DOMContentLoaded', function() {
    // Efecto de scroll para el navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú hamburguesa para móviles
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');

    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            navButtons.classList.remove('active');
        });
    });

    // Tabs de precios
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingCards = document.querySelectorAll('.price-card');

    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            
            // Actualizar tabs activos
            pricingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar/ocultar cards según el plan
            pricingCards.forEach(card => {
                if (plan === 'individual') {
                    card.style.display = 'block';
                } else {
                    const cardType = card.classList.contains('popular') ? 'estandar' : 
                                    card.querySelector('h3').textContent.toLowerCase();
                    card.style.display = cardType.includes(plan) ? 'block' : 'none';
                }
            });
        });
    });

    // Modal de factura
    const invoiceModal = document.getElementById('invoiceModal');
    const invoiceButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    const closeModal = document.querySelector('.close-modal');

    invoiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('factura') {
                invoiceModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', function() {
        invoiceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === invoiceModal) {
            invoiceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !message) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }
        
        // Simular envío
        console.log('Formulario enviado:', { name, email, subject, message });
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
        contactForm.reset();
    });

    // Formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Por favor ingrese su correo electrónico.');
            return;
        }
        
        // Simular suscripción
        console.log('Suscripción a newsletter:', email);
        alert('¡Gracias por suscribirse!');
        this.reset();
    });

    // Efecto de hover en las cards de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling para enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Generar factura de ejemplo dinámica
    function generateSampleInvoice() {
        const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        document.querySelector('.invoice-info h3').textContent = `Factura #${invoiceNumber}`;
        
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        document.querySelector('.invoice-info p').textContent = `Fecha: ${formattedDate}`;
    }

    generateSampleInvoice();
});

// Efecto de máquina de escribir para el hero
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const speed = 50;
    
    function type() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000);
}

// Iniciar efecto después de que la página cargue
window.onload = function() {
    typeWriterEffect();
    
    // Animación de las cards al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .price-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar observadores iniciales
    document.querySelectorAll('.service-card, .price-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
};

// Contador de clientes satisfechos
function animateCounter() {
    const counterElement = document.querySelector('.section-subtitle');
    const targetNumber = 10000;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;
    
    const originalText = counterElement.textContent;
    
    const animate = () => {
        currentNumber += increment;
        if (currentNumber < targetNumber) {
            counterElement.textContent = `Más de ${Math.floor(currentNumber)} usuarios satisfechos`;
            requestAnimationFrame(animate);
        } else {
            counterElement.textContent = originalText;
        }
    };
    
    // Iniciar animación cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animate();
            observer.unobserve(counterElement);
        }
    });
    
    observer.observe(counterElement);
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', animateCounter);
// WhatsApp y sistema de autenticación
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente)
    
    // Botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn a');
    whatsappBtn.addEventListener('click', function(e) {
        // Puedes agregar lógica adicional aquí si es necesario
        console.log('Redirigiendo a WhatsApp');
    });
    
    // Modal de registro
    const registerModal = document.getElementById('registerModal');
    const registerBtn = document.querySelector('.btn-signup');
    const registerForm = document.getElementById('registerForm');
    
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        invoiceModal.style.display = 'none';
        registerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Validaciones
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        // Guardar usuario en localStorage (simulación)
        const user = {
            name,
            email,
            phone,
            password
        };
        
        let users = JSON.parse(localStorage.getItem('substream_users')) || [];
        users.push(user);
        localStorage.setItem('substream_users', JSON.stringify(users));
        
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        registerModal.style.display = 'none';
        registerForm.reset();
    });
    
    // Sistema de administración
    const adminModal = document.getElementById('adminModal');
    const adminForm = document.getElementById('adminForm');
    const adminPanel = document.getElementById('adminPanel');
    const createUserBtn = document.getElementById('createUserBtn');
    const usersList = document.getElementById('usersList');
    
    // Credenciales de administrador (en un sistema real esto estaría en el backend)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'Admin1234' // En producción usaría hash y salting
    };
    
    // Acceso al panel de admin (podrías agregar un botón oculto o acceso especial)
    function showAdminModal() {
        // En un sistema real esto tendría más seguridad
        adminModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Para propósitos de demostración, agregamos un acceso secreto
    // (doble clic en el logo)
    document.querySelector('.logo').addEventListener('dblclick', showAdminModal);
    
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUser').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            adminPanel.style.display = 'block';
            loadUsersList();
        } else {
            alert('Credenciales incorrectas');
        }
    });
    
    // Cargar lista de usuarios
    function loadUsersList() {
        const users = JSON.parse(localStorage.getItem('substream_users')) || [];
        usersList.innerHTML = '';
        
        if (users.length === 0) {
            usersList.innerHTML = '<p>No hay usuarios registrados</p>';
            return;
        }
        
        users.forEach((user, index) => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <span>${user.name} (${user.email})</span>
                <span class="delete-user" data-index="${index}">Eliminar</span>
            `;
            usersList.appendChild(userItem);
        });
        
        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteUser(index);
            });
        });
    }
    
    // Eliminar usuario
    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem('substream_users')) || [];
        users.splice(index, 1);
        localStorage.setItem('substream_users', JSON.stringify(users));
        loadUsersList();
    }
    
    // Crear nuevo usuario desde el panel de admin
    createUserBtn.addEventListener('click', function() {
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        
        if (!username || !password) {
            alert('Complete todos los campos');
            return;
        }
        
        // En un sistema real, esto se haría en el backend con hash
        const user = {
            name: 'Usuario Admin',
            email: username + '@substream.com',
            phone: '',
            password: password,
            isAdminCreated: true
        };
        
        let users = JSON.parse(localStorage.getItem('substream_users')) || [];
        users.push(user);
        localStorage.setItem('substream_users', JSON.stringify(users));
        
        alert('Usuario creado exitosamente');
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        loadUsersList();
    });
    
    // Cerrar modales al hacer clic en la X
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });
});
// Sistema de autenticación mejorado
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente previo)
    
    // Elementos del login
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.btn-login');
    const registerLink = document.querySelector('.switch-to-register');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberMe = document.getElementById('rememberMe');
    
    // Elementos de exportación
    const exportModal = document.getElementById('exportModal');
    const exportUsersBtn = document.getElementById('exportUsers');
    const exportSubscriptionsBtn = document.getElementById('exportSubscriptions');
    const exportInvoicesBtn = document.getElementById('exportInvoices');
    const exportResult = document.getElementById('exportResult');
    
    // Estado de autenticación
    let currentUser = null;
    
    // Mostrar modal de login
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Alternar entre login y registro
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('loginPassword');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
    
    // Login de usuario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Verificar credenciales
        const users = JSON.parse(localStorage.getItem('substream_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            
            // Recordar sesión
            if (rememberMe.checked) {
                localStorage.setItem('substream_remembered', email);
            } else {
                localStorage.removeItem('substream_remembered');
            }
            
            // Mostrar indicador de usuario
            showUserIndicator(user);
            
            // Cerrar modal
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Mostrar mensaje de bienvenida
            alert(`Bienvenido ${user.name}!`);
        } else {
            alert('Credenciales incorrectas. Por favor intente nuevamente.');
        }
    });
    
    // Mostrar indicador de usuario
    function showUserIndicator(user) {
        // Eliminar indicador existente si hay uno
        const existingIndicator = document.querySelector('.user-indicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicator = document.createElement('div');
        indicator.className = 'user-indicator';
        indicator.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>${user.name}</span>
            <i class="fas fa-sign-out-alt logout-btn"></i>
            <i class="fas fa-file-export export-btn" title="Exportar datos"></i>
        `;
        document.body.appendChild(indicator);
        
        // Logout
        indicator.querySelector('.logout-btn').addEventListener('click', function() {
            currentUser = null;
            indicator.remove();
            localStorage.removeItem('substream_remembered');
        });
        
        // Exportar datos
        indicator.querySelector('.export-btn').addEventListener('click', function() {
            exportModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Verificar sesión recordada al cargar la página
    const rememberedEmail = localStorage.getItem('substream_remembered');
    if (rememberedEmail) {
        const users = JSON.parse(localStorage.getItem('substream_users')) || [];
        const user = users.find(u => u.email === rememberedEmail);
        if (user) {
            currentUser = user;
            showUserIndicator(user);
        }
    }
    
    // Exportar datos a formato TXT (simulado)
    exportUsersBtn.addEventListener('click', function() {
        const users = JSON.parse(localStorage.getItem('substream_users')) || [];
        let txtContent = "LISTA DE USUARIOS\n\n";
        txtContent += "Fecha: " + new Date().toLocaleString() + "\n";
        txtContent += "Total usuarios: " + users.length + "\n\n";
        
        users.forEach((user, index) => {
            txtContent += `Usuario #${index + 1}:\n`;
            txtContent += `Nombre: ${user.name}\n`;
            txtContent += `Email: ${user.email}\n`;
            txtContent += `Teléfono: ${user.phone || 'N/A'}\n`;
            txtContent += `Registrado: ${user.isAdminCreated ? 'Por administrador' : 'Auto-registro'}\n`;
            txtContent += "------------------------\n";
        });
        
        exportResult.textContent = txtContent;
        downloadTXT(txtContent, 'usuarios_substream.txt');
    });
    
    exportSubscriptionsBtn.addEventListener('click', function() {
        // Simular datos de suscripciones (en una app real vendrían de una base de datos)
        const subscriptions = [
            { platform: 'Netflix', plan: 'Premium', price: 15.99, user: currentUser?.email || 'guest' },
            { platform: 'Spotify', plan: 'Familiar', price: 14.99, user: currentUser?.email || 'guest' },
            { platform: 'Prime Video', plan: 'Estándar', price: 8.99, user: currentUser?.email || 'guest' }
        ];
        
        let txtContent = "SUSCRIPCIONES ACTIVAS\n\n";
        txtContent += "Fecha: " + new Date().toLocaleString() + "\n";
        txtContent += "Total suscripciones: " + subscriptions.length + "\n\n";
        
        subscriptions.forEach((sub, index) => {
            txtContent += `Suscripción #${index + 1}:\n`;
            txtContent += `Plataforma: ${sub.platform}\n`;
            txtContent += `Plan: ${sub.plan}\n`;
            txtContent += `Precio: $${sub.price.toFixed(2)}\n`;
            txtContent += `Usuario: ${sub.user}\n`;
            txtContent += "------------------------\n";
        });
        
        exportResult.textContent = txtContent;
        downloadTXT(txtContent, 'suscripciones_substream.txt');
    });
    
    exportInvoicesBtn.addEventListener('click', function() {
        // Simular datos de facturas (en una app real vendrían de una base de datos)
        const invoices = [
            { id: 'INV-2023-001', date: '15/06/2023', amount: 32.34, user: currentUser?.email || 'guest' },
            { id: 'INV-2023-002', date: '15/07/2023', amount: 30.98, user: currentUser?.email || 'guest' }
        ];
        
        let txtContent = "HISTORIAL DE FACTURAS\n\n";
        txtContent += "Fecha: " + new Date().toLocaleString() + "\n";
        txtContent += "Total facturas: " + invoices.length + "\n\n";
        
        invoices.forEach((inv, index) => {
            txtContent += `Factura #${index + 1}:\n`;
            txtContent += `Número: ${inv.id}\n`;
            txtContent += `Fecha: ${inv.date}\n`;
            txtContent += `Monto: $${inv.amount.toFixed(2)}\n`;
            txtContent += `Usuario: ${inv.user}\n`;
            txtContent += "------------------------\n";
        });
        
        exportResult.textContent = txtContent;
        downloadTXT(txtContent, 'facturas_substream.txt');
    });
    
    // Función para descargar TXT
    function downloadTXT(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Mostrar mensaje de éxito
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Descarga iniciada!';
        successMsg.style.position = 'fixed';
        successMsg.style.bottom = '20px';
        successMsg.style.right = '20px';
        successMsg.style.backgroundColor = '#4CAF50';
        successMsg.style.color = 'white';
        successMsg.style.padding = '10px 20px';
        successMsg.style.borderRadius = '5px';
        successMsg.style.zIndex = '1000';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 3000);
    }
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
});