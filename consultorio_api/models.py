from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import AbstractUser, User
from django.conf import settings

class BearerTokenAuthentication(TokenAuthentication):
    keyword = u"Bearer"

# TODO 1 Crear el modelo del paciente. Se esta usando ImageField

class Pacientes(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=None)
    apellido_materno = models.CharField(max_length=255, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField(null=True, blank=True)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    photoFileName = models.ImageField(upload_to='pacientes/', null=True, blank=True)  # Aquí definir el campo para la imagen
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Perfil del paciente "+self.usuario.first_name+" "+self.usuario.last_name

