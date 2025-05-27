from django.shortcuts import render, redirect, get_object_or_404
from django.template import loader
from . import models
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse
from django.core.paginator import Paginator
from datetime import date

def view_ppal(request):
  events = models.Event.objects.filter(date__gt=date.today()).order_by('date')[:3]
  if request.user.is_authenticated:
    appointment = models.Appointment.objects.filter(client=request.user)
    if appointment.count() != 0:
      appointment = models.Appointment.objects.get(client=request.user)
      return render(request, 'index.html', {'appointment': appointment, 'events': events})
  
  return render(request, 'index.html', {'events': events})


def view_directorio(request):
    # Obtén todos los usuarios
    users = User.objects.all()
    profetionals = []

    for u in users:
        p = get_object_or_404(models.UserProfile, user=u)
        if p.is_professional:
            profetionals.append({'user': u, 'profile': p})

    # Paginación
    paginator = Paginator(profetionals, 12)  # 12 profesionales por página
    page_number = request.GET.get('page')
    profetionals_page = paginator.get_page(page_number)

    specializations = models.UserProfile.objects.values('specialization').distinct()
    
    return render(request, 'directorio.html', {
        'profetionals': profetionals_page,
        'specializations': specializations,
        'paginator': paginator,
    })

def register(request):
  if request.method == "POST":
    first_name = request.POST["first_name"]
    last_name = request.POST["last_name"]
    username = request.POST["username"]
    email = request.POST["email"]
    password = request.POST["password"]

    user = User(first_name = first_name, last_name = last_name, username = username, email = email, password = password)
    user.save()

  return redirect('main')
    

def login_view(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = User.objects.filter(username=username, password=password)
    
    if user.count() != 0:
      user = User.objects.get(username=username, password=password)
      login(request, user)
      return redirect('main')
    else:
      events = models.Event.objects.filter(date__gt=date.today()).order_by('date')[:3]
      return render(request, 'index.html', {'events': events, 'error': 'Parece que tu usuario o contraseña son incorrectos, por favor revise sus credenciales.'})


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
        is_professional = request.POST.get('is_professional') == 'on'
        specialization = request.POST.get("specialization", "")
        phone_number = request.POST.get("phone_number", "")
        bio = request.POST.get("bio", "")
        profile_picture = request.FILES.get('profile_picture', None)

        profile.is_professional = is_professional
        profile.specialization = specialization
        profile.phone_number = phone_number
        profile.bio = bio
        
        if profile_picture:
            profile.profile_picture = profile_picture
        
        profile.save()
        messages.success(request, 'Información actualizada')
        return redirect('user')  # Cambia a la URL deseada

    return render(request, 'user.html', {'profile': profile})


# VISTAS REFERENTES A CITAS

@login_required
def appointment_index(request):
    # Filtrado
    status_filter = request.GET.get('status', 'all')
    if status_filter == 'all':
        appointments = models.Appointment.objects.all()
    else:
        appointments = models.Appointment.objects.filter(status=status_filter)

    # Paginación
    paginator = Paginator(appointments, 6)  # 6 citas por página
    page_number = request.GET.get('page')
    appointments_page = paginator.get_page(page_number)

    return render(request, 'citas.html', {'appointments': appointments_page, 'paginator': paginator})

@login_required
def appointment_acept_index(request):
  appointments = models.Appointment.objects.get(profesional=request.user)
  return render (request, 'citas.html', {'appointments':appointments})

@login_required
def appointment_acept(request, id):
  if request.method == 'POST':
    date = request.POST["date"]
    start_time = request.POST["start_time"]
    appointment = get_object_or_404(models.Appointment, id=id)
    appointment.status = 'confirmed'
    appointment.profetional = request.user
    appointment.date = date
    appointment.start_time = start_time
    appointment.save()

  return redirect('appointment_index')

@login_required
def appointment_create(request):
  if request.method == 'POST':
    date_start = request.POST["date_start"]
    date_end = request.POST["date_end"]

    appointment = models.Appointment(date_start=date_start,date_end=date_end,client=request.user)
    appointment.save()

    return render (request, 'index.html', {'appointment':appointment})

@login_required
def appointment_delete(request, id):
  appointment = get_object_or_404(models.Appointment, id=id)
  appointment.delete()

  appointments = models.Appointment.objects.get(status='pending')
  return render (request, 'index.html', {'appointments':appointments})

# VISTAS REFERENTES A RECURSOS

def resource_index(request):
  resources = models.Resource.objects.all()
  return render (request, 'recursos.html', {'resources': resources})

def resource_get(request, id):
  resource = get_object_or_404(models.Resource, id=id)
  return render (request, 'recursos.html', {'resource': resource})

@login_required
def resource_load(request):
  if request.method == 'POST':
    title = request.POST["title"]
    description = request.POST["description"]
    author = request.POST["author"]
    publication_date = request.POST["publication_date"]
    resource_type = request.POST["resource_type"]
    
    pdf_file = request.FILES.get('pdf_file', None)

    if 'pdf_file' in request.FILES:
        pdf_file = request.FILES['pdf_file']
    else:
        pdf_file = None

    
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

    
    return redirect('resource_index')

@login_required
def resource_update(request, id):
  if request.method == 'POST':
    title = request.POST["title"]
    description = request.POST["description"]
    author = request.POST["author"]
    publication_date = request.POST["publication_date"]
    resource_type = request.POST["resource_type"]
    
    pdf_file = request.FILES.get('pdf_file', None)
    if pdf_file:
      pdf_file = request.FILES.get('pdf_file', None)
    
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
    return render (request, 'recursos.html', {'resources': resources, 'message': 'Recurso actualizado correctamente'})

@login_required
def resource_delete(request, id):
  resource = get_object_or_404(models.Resource, id=id)
  resource.delete()
  
  resources = models.Resource.objects.all().values
  return render (request, 'recursos.html', {'resources': resources, 'message': 'Recurso eliminado correctamente'})

# VISTAS REFERENTES A EVENTOS E INSCRIPCIONES

@login_required
def event_index(request):
  evs = []
  events = models.Event.objects.filter(date__gt=date.today()).order_by('date')
  for e in events:
    users = User.objects.filter(inscription__event=e)
    evs.append({'event': e, 'members': users})
  return render (request, 'eventos.html', {'events': evs})

@login_required
def event_get(request, id):
  event = get_object_or_404(models.Event, id=id)
  return render (request, 'eventos.html', {'event': event})

@login_required
def event_create(request):
  if request.method == 'POST':
    title = request.POST["title"]
    description = request.POST["description"]
    category = request.POST["category"]
    date = request.POST["date"]

    event = models.Event(title=title,description=description,category=category,date=date,create_by=request.user)
    event.save()

  events = models.Event.objects.all().values
  return render (request, 'eventos.html', {'events': events})

@login_required
def event_inscription(request, id):
  event = get_object_or_404(models.Event, id=id)
  insciption = models.Inscription(event=event,user=request.user)
  insciption.save()
  return redirect('event_index')

@login_required
def event_delete(request, id):
  event = get_object_or_404(models.Event, id=id)
  event.delete()

  events = models.Event.objects.all().values
  return render (request, 'eventos.html', {'events': events})

