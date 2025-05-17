from django.urls import path
from . import views

urlpatterns = [
    path('main/', views.view_ppal, name='main'),
    path('directorio/', views.view_directorio, name='directorio'),
    path('user/', views.view_userpage, name='user'),
    path('register/', views.register, name='register'),
    # path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
]