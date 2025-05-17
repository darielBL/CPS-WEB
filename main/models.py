from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
import os

# Modelo de citas/reservas
class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmada'),
        ('cancelled', 'Cancelada'),
        ('completed', 'Completada'),
    )

    date = models.DateField(verbose_name="Fecha")
    start_time = models.TimeField(verbose_name="Hora de inicio")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments', verbose_name="Cliente")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Estado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    
    class Meta:
        ordering = ['date', 'start_time']
        verbose_name = "Cita"
        verbose_name_plural = "Citas"
    
    def __str__(self):
        return f"{self.title} - {self.date} {self.start_time}"

# Modelo de perfil de usuario
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_professional = models.BooleanField(default=False, verbose_name="¿Es profesional?")
    specialization = models.CharField(max_length=255, blank=True, null=True, verbose_name="Especialización")
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name="Número de teléfono")
    bio = models.TextField(blank=True, null=True, verbose_name="Biografía")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True, verbose_name="Foto de perfil")
    
    class Meta:
        verbose_name = "Perfil de Usuario"
        verbose_name_plural = "Perfiles de Usuarios"
    
    def __str__(self):
        return f"Perfil de {self.user.username}"
    
    def clean(self):
        """
        Validar que si es profesional, tenga una especialización
        """
        if self.is_professional and not self.specialization:
            raise ValidationError({"specialization": "La especialización es obligatoria para usuarios profesionales."})
    
    def save(self, *args, **kwargs):
        """
        Sobrescribir el método save para validar antes de guardar
        """
        self.clean()
        super().save(*args, **kwargs)

# Señal para crear automáticamente un perfil cuando se crea un usuario
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Modelo de recursos (publicaciones y revistas)
class Resource(models.Model):
    TYPE_CHOICES = (
        ('publication', 'Publicación'),
        ('magazine', 'Revista'),
        ('book', 'Libro'),
        ('article', 'Artículo'),
        ('other', 'Otro'),
    )
    
    title = models.CharField(max_length=255, verbose_name="Título")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")
    author = models.CharField(max_length=255, verbose_name="Autor")
    publication_date = models.DateField(verbose_name="Fecha de publicación")
    resource_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='publication', verbose_name="Tipo de recurso")
    pdf_file = models.FileField(upload_to="resources/", verbose_name="Archivo PDF", 
                               help_text="Sube un archivo PDF (máximo 20MB)")
    isbn = models.CharField(max_length=20, blank=True, null=True, verbose_name="ISBN")
    publisher = models.CharField(max_length=255, blank=True, null=True, verbose_name="Editorial")
    pages = models.PositiveIntegerField(blank=True, null=True, verbose_name="Número de páginas")
    language = models.CharField(max_length=50, blank=True, null=True, verbose_name="Idioma")
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources', verbose_name="Subido por")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    download_count = models.PositiveIntegerField(default=0, verbose_name="Número de descargas")
    view_count = models.PositiveIntegerField(default=0, verbose_name="Número de vistas")
    
    class Meta:
        ordering = ['-publication_date', 'title']
        verbose_name = "Recurso"
        verbose_name_plural = "Recursos"
    
    def __str__(self):
        return f"{self.title} ({self.get_resource_type_display()})"
    
    def get_pdf_filename(self):
        """Devuelve el nombre del archivo PDF"""
        return os.path.basename(self.pdf_file.name)
    
    def file_size(self):
        """Devuelve el tamaño del archivo en MB"""
        if self.pdf_file and hasattr(self.pdf_file, 'size'):
            return self.pdf_file.size / (1024 * 1024)  # Convertir a MB
        return 0
    
    def increment_download_count(self):
        """Incrementa el contador de descargas"""
        self.download_count += 1
        self.save(update_fields=['download_count'])
    
    def increment_view_count(self):
        """Incrementa el contador de vistas"""
        self.view_count += 1
        self.save(update_fields=['view_count'])
