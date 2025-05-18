from django.urls import path
from . import views

urlpatterns = [
    path('', views.view_ppal, name='main'),
    path('directorio/', views.view_directorio, name='directorio'),
    path('user/', views.view_userpage, name='user'),
    path('user/edit/', views.update_user, name='update_user'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    # RUTAS DE CITAS
    path('appointments/', views.appointment_index, name='appointment_index'),
    path('appointments/create/', views.appointment_create, name='appointment_create'),
    path('appointments/<id:int>', views.appointment_get, name='appointment_get'),
    path('appointments/update/<id:int>', views.appointment_update, name='appointment_update'),
    path('appointments/<id:int>/delete/', views.appointment_delete, name='appointment_delete'),
    # RUTAS DE RECURSOS
    path('resources/', views.resource_index, name='resource_index'),
    path('resources/create/', views.resource_create, name='resource_create'),
    path('resources/<id:int>', views.resource_get, name='resource_get'),
    path('resources/update/<id:int>', views.resource_update, name='resource_update'),
    path('resources/<id:int>/delete/', views.resource_delete, name='resource_delete'),
]