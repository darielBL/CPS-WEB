from django.shortcuts import render, redirect
from django.template import loader
from . import models
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages

def view_ppal(request):
  return render(request, 'index.html')

def view_directorio(request):
  profetionals = models.UserProfile.objects.filter(is_professional=True, id=2).values()
  return render(request, 'directorio.htl', {'profetionals': profetionals})

def register(request):
  template = loader.get_template('index.html')

  if request.method == "POST":
    first_name = request.POST["first_name"]
    last_name = request.POST["last_name"]
    username = request.POST["username"]
    email = request.POST["email"]
    password = request.POST["password"]

    user = User(first_name = first_name, last_name = last_name, username = username, email = email, password = password)
    user.save()
    
    return render(request, 'index.html', { 'sucess': 'Usuario creado exitosamente.'})

  return render(request, 'index.html')
    
def login_view(request):

  if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      user = authenticate(request, username=username, password=password)
      if user is not None:
          login(request, user)
          messages.success(request, 'Has iniciado sesión exitosamente.')
          return redirect('user.html') 
      
      else:
          return render(request, 'index.html', { 'message': 'Credenciales inválidas'})

  return render(request, 'index.html')

@login_required
def logout_view(request):
  logout(request)
  return render(request, 'index.html')

@login_required
def view_userpage(request):
  return render(request, 'user.html')