// Script personalizado para la página de perfil de usuario

document.addEventListener('DOMContentLoaded', function() {
    // Manejar la carga de la imagen de perfil
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarImg = document.getElementById('avatarImg');
    
    if (avatarUpload && avatarImg) {
        avatarUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Verificar que sea una imagen
                if (!file.type.match('image.*')) {
                    alert('Por favor, selecciona una imagen válida.');
                    return;
                }
                
                // Verificar tamaño (máximo 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
                    return;
                }
                
                // Mostrar la imagen seleccionada
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                    
                    // Aquí normalmente enviarías la imagen al servidor
                    console.log('Nueva imagen de perfil seleccionada');
                    
                    // Mostrar notificación
                    showNotification('Imagen de perfil actualizada correctamente');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Manejar el envío del formulario de perfil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar datos del formulario
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                description: document.getElementById('description').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value
            };
            
            // Validar datos
            if (!formData.firstName || !formData.lastName) {
                alert('Por favor, completa los campos de nombre y apellidos.');
                return;
            }
            
            // Aquí normalmente enviarías los datos al servidor
            console.log('Datos del perfil actualizados:', formData);
            
            // Mostrar notificación de éxito
            showNotification('Perfil actualizado correctamente');
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Posicionar la notificación
        notification.style.position = 'fixed';
        notification.style.top = '70px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.maxWidth = '300px';
        
        // Eliminar después de 5 segundos
        setTimeout(() => {
            notification.querySelector('.alert').classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
    
    // Manejar botón de cancelar
    const cancelButton = document.querySelector('.btn-outline-secondary');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // Aquí podrías recargar los datos originales o redirigir
            if (confirm('¿Estás seguro de que deseas cancelar los cambios?')) {
                window.location.reload();
            }
        });
    }
    
    // Animación para mostrar la tarjeta de perfil
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.style.opacity = 0;
        profileCard.style.transform = 'translateY(20px)';
        profileCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            profileCard.style.opacity = 1;
            profileCard.style.transform = 'translateY(0)';
        }, 200);
    }
});