from django.http import HttpResponse
from django.template import loader

def view_ppal(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def view_directorio(request):
  template = loader.get_template('directorio.html')
  return HttpResponse(template.render())

def view_userpage(request):
  template = loader.get_template('user.html')
  return HttpResponse(template.render())