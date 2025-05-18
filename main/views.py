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
      profile_picture = request.FILE.get('profile_picture', None)
      if profile_picture:
        profile_picture = request.FILE["profile_picture"]

      profile.is_professional = is_professional
      profile.specialization = specialization
      profile.phone_number = phone_number
      profile.bio = bio
      profile.profile_picture = profile_picture
      profile.save()

      return render(request, 'user.html', {'profile': profile, 'message': 'Información actualizada'})

  return render(request, 'user.html', {'profile': profile})


# VISTAS REFERENTES A CITAS

def appointment_index(request):
  appointments = models.Appointment.objects.all().values
  return render (request, 'index.html', {'appointments':appointments})

@login_required
def appointment_get(request, id):
  appointment = get_object_or_404(models.Appointment, id=id)
  return render (request, 'index.html', {'appointment':appointment})

@login_required
def appointment_create(request):
  if request.method == 'POST':
    date = request.POST["date"]
    start_time = request.POST["start_time"]

    appointment = models.Appointment(date=date,start_time=start_time,client=request.user)
    appointment.save()

    
    appointments = models.Appointment.objects.all().values
    return render (request, 'index.html', {'appointments':appointments, 'message': 'Cita realizada correctamente'})

@login_required
def appointment_update(request, id):
  if request.method == 'POST':
    date = request.POST["date"]
    start_time = request.POST["start_time"]
    status = request.POST["status"]

    appointment = get_object_or_404(models.Appointment, id=id)
    appointment.date = date
    appointment.start_time = start_time
    appointment.status = status
    appointment.save()

    
    appointments = models.Appointment.objects.all().values
    return render (request, 'index.html', {'appointments':appointments, 'message': 'Cita actualizada correctamente'})

@login_required
def appointment_delete(request, id):
  appointment = get_object_or_404(models.Appointment, id=id)
  appointment.delete()
  
  appointments = models.Appointment.objects.all().values
  return render (request, 'index.html', {'appointments':appointments, 'message': 'Cita eliminada correctamente'})

# VISTAS REFERENTES A RECURSOS

def resource_index(request):
  resources = models.Resource.objects.all().values
  return render (request, 'index.html', {'resources': resources})

def resource_get(request, id):
  resource = get_object_or_404(models.Resource, id=id)
  return render (request, 'index.html', {'resource': resource})

@login_required
def resource_load(request):
  if request.method == 'POST':
    title = request.POST["title"]
    description = request.POST["description"]
    author = request.POST["author"]
    publication_date = request.POST["publication_date"]
    resource_type = request.POST["resource_type"]
    
    pdf_file = request.FILE.get('pdf_file', None)
    if pdf_file:
      pdf_file = request.FILE["pdf_file"]
    
    isbn = request.POST.get('isbn', None)
    if isbn:
      isbn = request.POST["isbn"]

    publisher = request.POST.get('publisher', None)
    if publisher:
      publisher = request.POST["publisher"]

    pages = request.POST.get('pages', None)
    if pages:
      pages = request.POST["pages"]

    language = request.POST.get('language', None)
    if language:
      language = request.POST["language"]

    resource = models.Resource(title=title,description=description,author=author,publication_date=publication_date,resource_type=resource_type,pdf_file=pdf_file,isbn=isbn,publisher=publisher,pages=pages,language=language,uploaded_by=request.user)
    resource.save()

    
    resources = models.Resource.objects.all().values
    return render (request, 'index.html', {'resources':resources, 'message': 'Recurso cargado correctamente'})


@login_required
def resource_update(request, id):
  if request.method == 'POST':
    title = request.POST["title"]
    description = request.POST["description"]
    author = request.POST["author"]
    publication_date = request.POST["publication_date"]
    resource_type = request.POST["resource_type"]
    
    pdf_file = request.FILE.get('pdf_file', None)
    if pdf_file:
      pdf_file = request.FILE["pdf_file"]
    
    isbn = request.POST.get('isbn', None)
    if isbn:
      isbn = request.POST["isbn"]

    publisher = request.POST.get('publisher', None)
    if publisher:
      publisher = request.POST["publisher"]

    pages = request.POST.get('pages', None)
    if pages:
      pages = request.POST["pages"]

    language = request.POST.get('language', None)
    if language:
      language = request.POST["language"]

    resource = get_object_or_404(models.Resource, id=id)
    resource.title = title
    resource.description = description
    resource.author = author
    resource.publication_date = publication_date
    resource.resource_type = resource_type
    resource.pdf_file = pdf_file
    resource.isbn = isbn
    resource.publisher = publisher
    resource.pages = pages
    resource.language = language
    resource.save()

    resources = models.Resource.objects.all().values
    return render (request, 'index.html', {'resources': resources, 'message': 'Recurso actualizado correctamente'})

@login_required
def resource_delete(request, id):
  resource = get_object_or_404(models.Resource, id=id)
  resource.delete()
  
  resources = models.Resource.objects.all().values
  return render (request, 'index.html', {'resources': resources, 'message': 'Recurso eliminado correctamente'})