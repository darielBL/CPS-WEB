// Script personalizado para la página de recursos digitales

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const filterForm = document.getElementById('filterForm');
    const quickSearch = document.getElementById('quickSearch');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const sortSelect = document.getElementById('sortSelect');
    const resourcesGrid = document.getElementById('resourcesGrid');
    const resourceCards = resourcesGrid.querySelectorAll('.col-md-6, .col-lg-4, .col-12');
    
    // Cambiar entre vista de cuadrícula y lista
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            resourcesGrid.classList.remove('resource-list-view');
            
            // Cambiar clases de columnas para vista de cuadrícula
            resourceCards.forEach(card => {
                card.className = 'col-md-6 col-lg-4 mb-4';
            });
        });
        
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            resourcesGrid.classList.add('resource-list-view');
            
            // Cambiar clases de columnas para vista de lista
            resourceCards.forEach(card => {
                card.className = 'col-12 mb-4';
            });
        });
    }
    
    // Funcionalidad de búsqueda rápida
    if (quickSearch) {
        quickSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterResources(searchTerm);
        });
    }
    
    // Funcionalidad de filtrado avanzado
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyAdvancedFilters();
        });
        
        // Limpiar filtros
        filterForm.addEventListener('reset', function() {
            setTimeout(() => {
                // Esperar a que el formulario se resetee
                showAllResources();
                
                // Mostrar mensaje de filtros limpiados
                showNotification('Filtros limpiados correctamente');
            }, 100);
        });
    }
    
    // Funcionalidad de ordenación
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortResources(this.value);
        });
    }
    
    // Función para filtrar recursos por término de búsqueda
    function filterResources(searchTerm) {
        let foundResults = false;
        
        resourceCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.resource-description').textContent.toLowerCase();
            const author = card.querySelector('.resource-meta-item:first-child').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = '';
                foundResults = true;
                
                // Animar entrada
                animateCard(card);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostrar mensaje si no hay resultados
        checkNoResults(foundResults);
    }
    
    // Función para aplicar filtros avanzados
    function applyAdvancedFilters() {
        // Obtener valores de los filtros
        const titleFilter = document.getElementById('titleSearch').value.toLowerCase();
        const authorFilter = document.getElementById('authorSearch').value.toLowerCase();
        const isbnFilter = document.getElementById('isbnSearch').value.toLowerCase();
        const publisherFilter = document.getElementById('publisherSearch').value;
        const languageFilter = document.getElementById('languageSearch').value;
        const uploaderFilter = document.getElementById('uploaderSearch').value.toLowerCase();
        
        // Obtener tipos de recursos seleccionados
        const selectedTypes = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            selectedTypes.push(checkbox.value.toLowerCase());
        });
        
        // Obtener fechas
        const pubDateFrom = document.getElementById('pubDateFrom').value;
        const pubDateTo = document.getElementById('pubDateTo').value;
        const uploadDateFrom = document.getElementById('uploadDateFrom').value;
        const uploadDateTo = document.getElementById('uploadDateTo').value;
        
        let foundResults = false;
        
        // Aplicar filtros a cada tarjeta
        resourceCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            const metaItems = card.querySelectorAll('.resource-meta-item');
            
            // Extraer información de los metadatos
            const author = metaItems[0].textContent.toLowerCase();
            const pubDate = metaItems[1].textContent.toLowerCase();
            const publisher = metaItems[2].textContent.toLowerCase();
            const language = metaItems[3].textContent.toLowerCase();
            const isbn = metaItems[4].textContent.toLowerCase();
            
            // Obtener tipo de recurso
            const typeBadge = card.querySelector('.resource-type-badge');
            const resourceType = typeBadge ? typeBadge.textContent.toLowerCase() : '';
            
            // Verificar si cumple con todos los filtros
            const matchesTitle = titleFilter === '' || title.includes(titleFilter);
            const matchesAuthor = authorFilter === '' || author.includes(authorFilter);
            const matchesISBN = isbnFilter === '' || isbn.includes(isbnFilter);
            const matchesPublisher = publisherFilter === '' || publisher.includes(publisherFilter.toLowerCase());
            const matchesLanguage = languageFilter === '' || language.includes(languageFilter.toLowerCase());
            const matchesUploader = uploaderFilter === '' || true; // Simulado, en un caso real verificaríamos contra datos reales
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resourceType);
            
            // Verificar fechas (simulado, en un caso real haríamos comparaciones de fechas)
            const matchesPubDate = true; // Simulado
            const matchesUploadDate = true; // Simulado
            
            // Mostrar u ocultar según los resultados
            if (matchesTitle && matchesAuthor && matchesISBN && matchesPublisher && 
                matchesLanguage && matchesUploader && matchesType && 
                matchesPubDate && matchesUploadDate) {
                card.style.display = '';
                foundResults = true;
                
                // Animar entrada
                animateCard(card);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostrar mensaje si no hay resultados
        checkNoResults(foundResults);
        
        // Mostrar notificación de filtros aplicados
        showNotification('Filtros aplicados correctamente');
    }
    
    // Función para ordenar recursos
    function sortResources(sortType) {
        const resources = Array.from(resourceCards);
        
        resources.sort((a, b) => {
            const titleA = a.querySelector('.card-title').textContent;
            const titleB = b.querySelector('.card-title').textContent;
            const downloadsA = parseInt(a.querySelector('.resource-stats span:first-child').textContent.match(/\d+/)[0].replace(',', ''));
            const downloadsB = parseInt(b.querySelector('.resource-stats span:first-child').textContent.match(/\d+/)[0].replace(',', ''));
            const dateA = a.querySelector('.resource-meta-item:nth-child(2)').textContent.match(/\d+/)[0];
            const dateB = b.querySelector('.resource-meta-item:nth-child(2)').textContent.match(/\d+/)[0];
            
            switch (sortType) {
                case 'az':
                    return titleA.localeCompare(titleB);
                case 'za':
                    return titleB.localeCompare(titleA);
                case 'newest':
                    return dateB - dateA;
                case 'oldest':
                    return dateA - dateB;
                case 'popular':
                    return downloadsB - downloadsA;
                default:
                    return 0;
            }
        });
        
        // Reordenar en el DOM
        resources.forEach(resource => {
            resourcesGrid.appendChild(resource);
        });
        
        // Animar todas las tarjetas
        animateAllCards();
        
        // Mostrar notificación
        showNotification('Recursos ordenados correctamente');
    }
    
    // Función para mostrar todos los recursos
    function showAllResources() {
        resourceCards.forEach(card => {
            card.style.display = '';
        });
        
        // Eliminar mensaje de no resultados si existe
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        // Animar todas las tarjetas
        animateAllCards();
    }
    
    // Función para verificar si hay resultados
    function checkNoResults(foundResults) {
        // Eliminar mensaje anterior si existe
        const existingMsg = document.getElementById('noResultsMessage');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Si no hay resultados, mostrar mensaje
        if (!foundResults) {
            const noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'col-12 text-center py-5';
            noResultsMsg.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-search me-2"></i> No se encontraron recursos que coincidan con los criterios de búsqueda.
                </div>
            `;
            resourcesGrid.appendChild(noResultsMsg);
        }
    }
    
    // Función para animar una tarjeta
    function animateCard(card) {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Función para animar todas las tarjetas
    function animateAllCards() {
        resourceCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 50 + (index * 30)); // Efecto escalonado
            }
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
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.querySelector('.alert').classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Inicializar animaciones al cargar la página
    animateAllCards();
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Manejar clics en botones de acción
    document.querySelectorAll('.btn-primary, .btn-outline-success').forEach(button => {
        button.addEventListener('click', function(e) {
            // En un caso real, aquí manejaríamos la descarga o visualización
            // Por ahora, solo incrementamos el contador visualmente
            
            if (this.querySelector('.fa-download')) {
                const statsElement = this.closest('.card-footer').querySelector('.resource-stats span:first-child');
                const currentDownloads = parseInt(statsElement.textContent.match(/\d+/)[0].replace(',', ''));
                statsElement.innerHTML = `<i class="fas fa-download me-1"></i> ${currentDownloads + 1}`;
            } else if (this.querySelector('.fa-eye')) {
                const statsElement = this.closest('.card-footer').querySelector('.resource-stats span:last-child');
                const currentViews = parseInt(statsElement.textContent.match(/\d+/)[0].replace(',', ''));
                statsElement.innerHTML = `<i class="fas fa-eye ms-2 me-1"></i> ${currentViews + 1}`;
            }
        });
    });
});