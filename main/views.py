from django.shortcuts import render, redirect, get_object_or_404
from django.template import loader
from . import models
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from django.http import HttpResponse

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
      
       user = User.objects.get(username=username)
       
       if (password,user.password):
           login(request,user)
           return redirect(to='main')
       else:
           return HttpResponse('Contraseña incorrecta')
    else:
        return render(request,'registration/login.html' )

@login_required
def logout_view(request):
  logout(request)
  return render(request, 'index.html')

@login_required
def view_userpage(request):
  profile = get_object_or_404(models.UserProfile, user=request.user)
  return render(request, 'user.html', {'profile': profile})

@login_required
def update_user(request):
  profile = get_object_or_404(models.UserProfile, user=request.user)

  if request.method == 'POST':
    is_professional = request.POST.get('is_professional', 'off')
    
    if is_professional == 'on':
      is_professional = True
      specialization = request.POST["specialization"]
      phone_number = request.POST["phone_number"]
      bio = request.POST["bio"]
      profile_picture = request.POST.get('profile_picture', None)
      if profile_picture:
        profile_picture = request.POST["profile_picture"]

      profile.is_professional = is_professional
      profile.specialization = specialization
      profile.phone_number = phone_number
      profile.bio = bio
      profile.profile_picture = profile_picture
      profile.save()

      return render(request, 'user.html', {'profile': profile, 'message': 'Información actualizada'})

  return render(request, 'user.html', {'profile': profile})