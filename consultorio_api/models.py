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
    alergias = models.CharField(max_length=500, null=True, blank=True)
    enfermedades = models.CharField(max_length=500, null=True, blank=True)
    tipo_sangre = models.CharField(max_length=255, null=True, blank=True)
    contacto_emergencia = models.CharField(max_length=255, null=True, blank=True)
    historial = models.CharField(max_length=1000, null=True, blank=True)
    photoFileName = models.ImageField(upload_to='pacientes/', null=True, blank=True)  # Aquí definir el campo para la imagen
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Perfil del paciente "+self.first_name+" "+self.last_name # TODO le quite le .usuario

class Doctor(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=None)
    apellido_materno = models.CharField(max_length=255, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField(null=True, blank=True)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    photoFileName = models.ImageField(upload_to='doctor/', null=True, blank=True)  # Aquí definir el campo para la imagen
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Perfil del doctor "+self.first_name+" "+self.last_name
    
class Recepcionista(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=None)
    apellido_materno = models.CharField(max_length=255, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField(null=True, blank=True)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    photoFileName = models.ImageField(upload_to='recepcionista/', null=True, blank=True)  # Aquí definir el campo para la imagen
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Perfil del recepcionista "+self.first_name+" "+self.last_name

class Cita(models.Model):
    id = models.BigAutoField(primary_key=True)
    cita = models.CharField(max_length=255, null=True, blank=True)
    # paciente_nombre = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=None)
    # paciente_apellido_paterno = models.CharField(max_length=255, null=True, blank=True)
    # paciente_apellido_materno = models.CharField(max_length=255, null=True, blank=True)
    # paciente_email = models.CharField(max_length=255, null=True, blank=True)
    fecha_cita = models.DateTimeField(null=True, blank=True)
    horario_cita = models.CharField(max_length=255, null=True, blank=True)
    servicios = models.CharField(max_length=255, null=True, blank=True)
    duracion_cita = models.CharField(max_length=255, null=True, blank=True)
    forma_pago = models.CharField(max_length=255, null=True, blank=True)
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Cita: "+self.id_cita+" "+self.fecha_cita
    

class Receta(models.Model):
    id = models.BigAutoField(primary_key=True)
    paciente = models.CharField(max_length=255, null=True, blank=True)
    fecha_receta = models.DateTimeField(null=True, blank=True)
    horario_receta = models.CharField(max_length=255, null=True, blank=True)
    diagnostico = models.TextField(null=True, blank=True)  # Cambiado a TextField
    medicamento = models.TextField(null=True, blank=True)  # Cambiado a TextField
    indicaciones = models.TextField(null=True, blank=True)  # Cambiado a TextField
    nota = models.TextField(null=True, blank=True)  # Cambiado a TextField
    conclusiones = models.TextField(null=True, blank=True)  # Cambiado a TextField
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "Receta: " + str(self.id) + " " + self.paciente

