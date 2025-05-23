from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.view_ppal, name='main'), # Home
    path('directorio/', views.view_directorio, name='directorio'), # Directorio
    path('user/', views.view_userpage, name='user'), # Perfil de Usuario
    path('user/edit/', views.update_user, name='update_user'), # Actualizar Perfil
    path('register/', views.register, name='register'), # Registrarse
    path('login/', views.login_view, name='login'), # Logearse
    path('logout/', views.logout_view, name='logout'), # Desloguearse
    # RUTAS DE CITAS
    path('appointments/', views.appointment_index, name='appointment_index'), # Ver Listado de Citas
    path('appointments/create/', views.appointment_create, name='appointment_create'), # Realizar Solicitud
    path('appointments/<int:id>', views.appointment_get, name='appointment_get'), # Ver Solicitud
    path('appointments/update/<int:id>', views.appointment_update, name='appointment_update'), # Actualizar Solicitud
    path('appointments/<int:id>/delete/', views.appointment_delete, name='appointment_delete'), # Eliminar Solicitud
    # RUTAS DE RECURSOS
    path('resources/', views.resource_index, name='resource_index'), # Ver Listao de Recursos
    path('resources/create/', views.resource_load, name='resource_load'), # Subir recurso
    path('resources/<int:id>', views.resource_get, name='resource_get'), # Obtener Recurso
    path('resources/update/<int:id>', views.resource_update, name='resource_update'), # Editar Recurso
    path('resources/<int:id>/delete/', views.resource_delete, name='resource_delete'), # Eliminar Recurso
]

# Configuración para servir archivos multimedia en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)