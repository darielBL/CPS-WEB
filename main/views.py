from django.http import HttpResponse
from django.template import loader
from . import models
from django.contrib.auth.models import User

def view_ppal(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def view_directorio(request):
  profetionals = models.UserProfile.objects.filter(is_professional=True, id=2).values()
  template = loader.get_template('directorio.html')
  context = {
    'profetionals': profetionals,
  }
  return HttpResponse(template.render(context, request))

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
    
    return HttpResponse(template.render())

  return HttpResponse(template.render())
    
def login_view(request):
  template = loader.get_template('index.html')

  if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      user = authenticate(request, username=username, password=password)
      if user is not None:
          login(request, user)
          return redirect('main') 
      else:
          messages.error(request, 'Credenciales inválidas')
  
  return HttpResponse(template.render(request))

def logout_view(request):
  logout(request)
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def view_userpage(request):
  template = loader.get_template('user.html')
  return HttpResponse(template.render(request))