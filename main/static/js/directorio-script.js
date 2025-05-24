// Script personalizado para la página de directorio de usuarios

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const usersGrid = document.getElementById('usersGrid');
    const userCards = usersGrid.querySelectorAll('.col-sm-6');
    
    // Función para filtrar usuarios
    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value.toLowerCase();
        
        userCards.forEach(card => {
            const userName = card.querySelector('.card-title').textContent.toLowerCase();
            const userRole = card.querySelector('.text-muted').textContent.toLowerCase();
            const userDescription = card.querySelector('.card-text').textContent.toLowerCase();
            
            // Comprobar si el usuario coincide con los criterios de búsqueda
            const matchesSearch = userName.includes(searchTerm) || 
                                 userRole.includes(searchTerm) || 
                                 userDescription.includes(searchTerm);
            
            // Comprobar si el usuario coincide con el filtro de departamento
            const matchesFilter = filterValue === '' || userRole.includes(filterValue);
            
            // Mostrar u ocultar la tarjeta según los resultados
            if (matchesSearch && matchesFilter) {
                card.style.display = '';
                // Añadir animación de entrada
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Comprobar si hay resultados
        checkNoResults();
    }
    
    // Función para comprobar si no hay resultados
    function checkNoResults() {
        const visibleCards = Array.from(userCards).filter(card => card.style.display !== 'none');
        
        // Si no hay tarjetas visibles, mostrar mensaje de "No hay resultados"
        const noResultsElement = document.getElementById('noResults');
        if (visibleCards.length === 0) {
            if (!noResultsElement) {
                const noResults = document.createElement('div');
                noResults.id = 'noResults';
                noResults.className = 'col-12 text-center py-5';
                noResults.innerHTML = `
                    <div class="alert alert-info">
                        <i class="fas fa-search me-2"></i> No se encontraron usuarios que coincidan con tu búsqueda.
                    </div>
                `;
                usersGrid.appendChild(noResults);
            }
        } else if (noResultsElement) {
            noResultsElement.remove();
        }
    }
    
    // Eventos para búsqueda y filtrado
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterUsers);
    }
    
    // Animación para mostrar las tarjetas al cargar la página
    function animateCards() {
        userCards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 50)); // Retraso escalonado para efecto cascada
        });
    }
    
    // Ejecutar animación al cargar
    animateCards();
    
    
    // // Funcionalidad para la paginación
    // const paginationLinks = document.querySelectorAll('.pagination .page-link');
    // paginationLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
            
    //         // Aquí normalmente cargarías la siguiente página de usuarios
    //         // Por ahora, solo cambiamos la clase active
    //         if (!this.parentElement.classList.contains('disabled')) {
    //             document.querySelector('.pagination .active').classList.remove('active');
                
    //             // Si es "Anterior" o "Siguiente", no añadir la clase active
    //             if (!this.textContent.includes('Anterior') && !this.textContent.includes('Siguiente')) {
    //                 this.parentElement.classList.add('active');
    //             }
                
    //             // Simular carga de nuevos usuarios
    //             simulateLoading();
    //         }
    //     });
    // });
    
    // Función para simular carga de nuevos usuarios
    function simulateLoading() {
        // Mostrar indicador de carga
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'text-center py-5';
        loadingIndicator.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando usuarios...</p>
        `;
        
        // Ocultar tarjetas actuales
        userCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
        });
        
        // Añadir indicador de carga
        setTimeout(() => {
            usersGrid.innerHTML = '';
            usersGrid.appendChild(loadingIndicator);
            
            // Simular finalización de carga después de 1.5 segundos
            setTimeout(() => {
                // Restaurar tarjetas originales (en un caso real, cargarías nuevos datos)
                usersGrid.innerHTML = '';
                userCards.forEach(card => {
                    usersGrid.appendChild(card);
                });
                
                // Animar nuevamente las tarjetas
                animateCards();
            }, 1500);
        }, 300);
    }
});