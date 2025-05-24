// // Script personalizado para la landing page

// document.addEventListener('DOMContentLoaded', function () {
//     // Smooth scrolling para enlaces de navegación
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();

//             const targetId = this.getAttribute('href');
//             if (targetId === '#') return;

//             const targetElement = document.querySelector(targetId);
//             if (targetElement) {
//                 window.scrollTo({
//                     top: targetElement.offsetTop - 56, // Ajuste para la navbar fija
//                     behavior: 'smooth'
//                 });

//                 // Cerrar el menú de navegación en móviles después de hacer clic
//                 const navbarCollapse = document.querySelector('.navbar-collapse');
//                 if (navbarCollapse.classList.contains('show')) {
//                     document.querySelector('.navbar-toggler').click();
//                 }
//             }
//         });
//     });

//     // Validación básica del formulario de login
//     const loginForm = document.querySelector('#login form');
//     if (loginForm) {
//         loginForm.addEventListener('submit', function (e) {
//             // e.preventDefault();
//             const email = document.getElementById('loginEmail').value;
//             const password = document.getElementById('loginPassword').value;

//             // Aquí normalmente enviarías los datos al servidor
//             console.log('Login con:', email, password);
//             alert('Inicio de sesión simulado exitoso!');

//             // Cerrar el modal después del envío
//             const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
//             loginModal.hide();
//         });
//     }

//     // Validación básica del formulario de registro
//     const registerForm = document.querySelector('#register form');
//     if (registerForm) {
//         registerForm.addEventListener('submit', function (e) {
//             e.preventDefault();
//             const name = document.getElementById('registerName').value;
//             const email = document.getElementById('registerEmail').value;
//             const password = document.getElementById('registerPassword').value;
//             const confirmPassword = document.getElementById('confirmPassword').value;

//             // Validación simple de contraseñas
//             if (password !== confirmPassword) {
//                 alert('Las contraseñas no coinciden');
//                 return;
//             }

//             this.submit();
//             console.log(submit)

//             // Cerrar el modal después del envío
//             const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
//             loginModal.hide();
//         });
//     }

//     // Formulario de suscripción al boletín
//     const newsletterForm = document.querySelector('footer form');
//     if (newsletterForm) {
//         newsletterForm.addEventListener('submit', function (e) {
//             e.preventDefault();
//             const email = this.querySelector('input[type="email"]').value;

//             // Aquí normalmente enviarías el correo al servidor
//             console.log('Suscripción con:', email);
//             alert('¡Gracias por suscribirte a nuestro boletín!');

//             // Limpiar el formulario
//             this.reset();
//         });
//     }

//     // Animación para mostrar elementos cuando se hace scroll
//     const animateOnScroll = function () {
//         const elements = document.querySelectorAll('.card, .section-title, .divider');

//         elements.forEach(element => {
//             const elementPosition = element.getBoundingClientRect().top;
//             const windowHeight = window.innerHeight;

//             if (elementPosition < windowHeight - 100) {
//                 element.style.opacity = 1;
//                 element.style.transform = 'translateY(0)';
//             }
//         });
//     };

//     // Inicializar estilos para animación
//     document.querySelectorAll('.card, .section-title, .divider').forEach(element => {
//         element.style.opacity = 0;
//         element.style.transform = 'translateY(20px)';
//         element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     });

//     // Ejecutar animación al cargar y al hacer scroll
//     window.addEventListener('load', animateOnScroll);
//     window.addEventListener('scroll', animateOnScroll);
// });
// //Activar o desactivar boton de registro si el check esta activado
// const termsCheck = document.getElementById('termsCheck');
// const submitButton = document.getElementById('submit-reg');

// submitButton.disabled = !termsCheck.checked;

// termsCheck.addEventListener('change', function () {
//     submitButton.disabled = !this.checked; // Activar o desactivar el botón
// });

// //Asegurarse que ambas contraseñas son iguales
// const password = document.getElementById('registerPassword');
// const confirmPassword = document.getElementById('confirmPassword');

// function validatePasswords() {
//     if (password.value === confirmPassword.value) {
//         password.style.borderColor = 'green';
//         confirmPassword.style.borderColor = 'green';
//     } else {
//         password.style.borderColor = 'red';
//         confirmPassword.style.borderColor = 'red';
//     }
// }

// // Escuchar cambios en ambos campos de contraseña
// password.addEventListener('input', validatePasswords);
// confirmPassword.addEventListener('input', validatePasswords);

// //Activar o desactivar datos opcionales si el check esta activado
// document.addEventListener('DOMContentLoaded', function() {
//     const specCheck = document.getElementById('specCheck');
//     const optionalData = document.getElementById('optional');

//     specCheck.addEventListener('change', function() {
//         if (specCheck.checked) {
//             optionalData.classList.remove('hidden'); 
//                 } else {
//             optionalData.classList.add('hidden');
//         }
//     });
// });
// // Para citas
//   document.addEventListener('DOMContentLoaded', function() {
//             // Referencias a elementos del DOM para el modal de citas
//             const appointmentForm = document.getElementById('appointmentForm');
//             const submitAppointmentBtn = document.getElementById('submitAppointment');
//             const appointmentPurpose = document.getElementById('appointmentPurpose');
//             const otherPurposeContainer = document.getElementById('otherPurposeContainer');
//             const otherPurpose = document.getElementById('otherPurpose');
//             const appointmentDateInput = document.getElementById('appointmentDate');
            
//             // Establecer la fecha mínima como hoy
//             if (appointmentDateInput) {
//                 const today = new Date();
//                 const yyyy = today.getFullYear();
//                 const mm = String(today.getMonth() + 1).padStart(2, '0');
//                 const dd = String(today.getDate()).padStart(2, '0');
//                 appointmentDateInput.min = `${yyyy}-${mm}-${dd}`;
//             }
            
//             // Mostrar/ocultar campo de "otro propósito"
//             if (appointmentPurpose) {
//                 appointmentPurpose.addEventListener('change', function() {
//                     if (this.value === 'otro') {
//                         otherPurposeContainer.style.display = 'block';
//                         otherPurpose.setAttribute('required', 'required');
//                     } else {
//                         otherPurposeContainer.style.display = 'none';
//                         otherPurpose.removeAttribute('required');
//                     }
//                 });
//             }
            
//             // Manejar envío del formulario de cita
//             if (submitAppointmentBtn) {
//                 submitAppointmentBtn.addEventListener('click', function() {
//                     // Validar el formulario
//                     if (!appointmentForm.checkValidity()) {
//                         // Crear un evento de envío para activar las validaciones nativas del navegador
//                         const event = new Event('submit', {
//                             bubbles: true,
//                             cancelable: true
//                         });
//                         appointmentForm.dispatchEvent(event);
//                         return;
//                     }
                    
                    
//                     // En un caso real, aquí enviaríamos los datos al servidor
//                     console.log('Datos de la cita:', appointmentData);
                    
//                     // Cerrar el modal de cita
//                     const appointmentModal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
//                     appointmentModal.hide();
                    
//                     // Mostrar los datos en el modal de confirmación
//                     document.getElementById('confirmDate').textContent = formatDate(appointmentData.date);
//                     document.getElementById('confirmTime').textContent = formatTime(appointmentData.start_time);
                    
//                     // Mostrar el modal de confirmación
//                     setTimeout(() => {
//                         const confirmModal = new bootstrap.Modal(document.getElementById('appointmentConfirmModal'));
//                         confirmModal.show();
                        
//                         // Resetear el formulario
//                         appointmentForm.reset();
//                         otherPurposeContainer.style.display = 'none';
//                     }, 500);
                    
//                     // Mostrar notificación
//                     showNotification('Cita agendada correctamente');
//                 });
//             }
            
//             // Función para formatear la fecha
//             function formatDate(dateString) {
//                 const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//                 return new Date(dateString).toLocaleDateString('es-ES', options);
//             }
            
//             // Función para formatear la hora
//             function formatTime(timeString) {
//                 const [hours, minutes] = timeString.split(':');
//                 return `${hours}:${minutes}`;
//             }
            
//             // Función para mostrar notificaciones
//             function showNotification(message) {
//                 // Crear elemento de notificación
//                 const notification = document.createElement('div');
//                 notification.className = 'notification';
//                 notification.innerHTML = `
//                     <div class="alert alert-success alert-dismissible fade show" role="alert">
//                         <i class="fas fa-check-circle me-2"></i> ${message}
//                         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//                     </div>
//                 `;
                
//                 // Añadir al DOM
//                 document.body.appendChild(notification);
                
//                 // Posicionar la notificación
//                 notification.style.position = 'fixed';
//                 notification.style.top = '70px';
//                 notification.style.right = '20px';
//                 notification.style.zIndex = '9999';
//                 notification.style.maxWidth = '300px';
                
//                 // Eliminar después de 3 segundos
//                 setTimeout(() => {
//                     notification.querySelector('.alert').classList.remove('show');
//                     setTimeout(() => {
//                         document.body.removeChild(notification);
//                     }, 500);
//                 }, 3000);
//             }
            
//             // Animación para las tarjetas de recursos
//             const resourceCards = document.querySelectorAll('.resource-card');
//             resourceCards.forEach((card, index) => {
//                 card.style.opacity = 0;
//                 card.style.transform = 'translateY(20px)';
                
//                 setTimeout(() => {
//                     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//                     card.style.opacity = 1;
//                     card.style.transform = 'translateY(0)';
//                 }, 100 + (index * 100));
//             });
//         });