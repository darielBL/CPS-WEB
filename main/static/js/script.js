// Script personalizado para la landing page

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 56, // Ajuste para la navbar fija
                    behavior: 'smooth'
                });

                // Cerrar el menú de navegación en móviles después de hacer clic
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Validación básica del formulario de login
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Aquí normalmente enviarías los datos al servidor
            console.log('Login con:', email, password);
            alert('Inicio de sesión simulado exitoso!');

            // Cerrar el modal después del envío
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    // Validación básica del formulario de registro
    const registerForm = document.querySelector('#register form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validación simple de contraseñas
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            this.submit();
            console.log(submit)

            // Cerrar el modal después del envío
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    // Formulario de suscripción al boletín
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Aquí normalmente enviarías el correo al servidor
            console.log('Suscripción con:', email);
            alert('¡Gracias por suscribirte a nuestro boletín!');

            // Limpiar el formulario
            this.reset();
        });
    }

    // Animación para mostrar elementos cuando se hace scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.card, .section-title, .divider');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar estilos para animación
    document.querySelectorAll('.card, .section-title, .divider').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
const termsCheck = document.getElementById('termsCheck');
const submitButton = document.getElementById('submit-reg');

submitButton.disabled = !termsCheck.checked;

termsCheck.addEventListener('change', function () {
    submitButton.disabled = !this.checked; // Activar o desactivar el botón
});
const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    function validatePasswords() {
        if (password.value === confirmPassword.value) {
            password.style.borderColor = 'green';
            confirmPassword.style.borderColor = 'green';
        } else {
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
        }
    }

    // Escuchar cambios en ambos campos de contraseña
    password.addEventListener('input', validatePasswords);
    confirmPassword.addEventListener('input', validatePasswords);