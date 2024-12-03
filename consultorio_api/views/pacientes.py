from django.shortcuts import render
from django.db.models import *
from django.db import transaction
from consultorio_api.serializers import *
from consultorio_api.models import *
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.utils.html import strip_tags
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from datetime import datetime
from django.conf import settings
from django.template.loader import render_to_string
import string
import random
import json

class PacientesAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        paciente = Pacientes.objects.filter(user__is_active = 1).order_by("id")
        lista = PacienteSerializer(paciente, many=True).data
        
        return Response(lista, 200)

class PacientesView(generics.CreateAPIView):
    # Obtener usuario por ID o por correo electrónico
    def get(self, request, *args, **kwargs):
        # Buscar por ID
        paciente_id = request.GET.get("id")
        email = request.GET.get("email")

        if paciente_id:
            paciente = get_object_or_404(Pacientes, id=paciente_id)
        elif email:
            paciente = get_object_or_404(Pacientes, user__email=email)
        else:
            return Response({"error": "Se requiere un parámetro de búsqueda ('id' o 'email')"}, status=400)

        paciente_serializado = PacienteSerializer(paciente, many=False).data
        return Response(paciente_serializado, status=200)

    
    #Registrar nuevo usuario
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            #Grab user data
            role = request.data['rol']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            #apellido_materno = request.data['apellido_materno']
            email = request.data['email']
            password = request.data['password']
            #Valida si existe el usuario o bien el email registrado
            existing_user = User.objects.filter(email=email).first()

            if existing_user:
                return Response({"message":"Username "+email+", is already taken"},400)

            user = User.objects.create( username = email,
                                        email = email,
                                        first_name = first_name,
                                        last_name = last_name,
                                        #apellido_materno = apellido_materno,
                                        is_active = 1)


            user.save()
            user.set_password(password)
            user.save()

            group, created = Group.objects.get_or_create(name=role)
            group.user_set.add(user)
            user.save()

            #Create a profile for the user
            paciente = Pacientes.objects.create(user=user,
                                            apellido_materno= request.data["apellido_materno"],
                                            fecha_nacimiento= request.data["fecha_nacimiento"],
                                            telefono= request.data["telefono"],
                                            alergias= request.data["alergias"],
                                            enfermedades=request.data["enfermedades"],
                                            tipo_sangre=request.data["tipo_sangre"],
                                            contacto_emergencia=request.data["contacto_emergencia"],
                                            historial=request.data["historial"],
                                            photoFileName= request.data["photoFileName"]) # TODO:  campo para la foto
            paciente.save()

            return Response({"paciente_created_id": paciente.id }, 201)

        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    

    # Obtner el total de usuarios registrados

class PacientesViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar paciente
    def put(self, request, *args, **kwargs):
        # iduser=request.data["id"]
        paciente = get_object_or_404(Pacientes, id=request.data["id"])
        paciente.apellido_materno = request.data["apellido_materno"]
        paciente.fecha_nacimiento = request.data["fecha_nacimiento"]
        paciente.telefono = request.data["telefono"]
        paciente.alergias= request.data["alergias"]
        paciente.enfermedades=request.data["enfermedades"]
        paciente.tipo_sangre=request.data["tipo_sangre"]
        paciente.contacto_emergencia=request.data["contacto_emergencia"]
        paciente.historial=request.data["historial"]
        paciente.photoFileName = request.data["photoFileName"]
        paciente.save()
        temp = paciente.user
        temp.first_name = request.data["first_name"]
        temp.last_name = request.data["last_name"]
        temp.save()
        user = PacienteSerializer(paciente, many=False).data

        return Response(user,200)
    
    #Eliminar paciente
    def delete(self, request, *args, **kwargs):
        paciente = get_object_or_404(Pacientes, id=request.GET.get("id"))
        try:
            paciente.user.delete()
            return Response({"details":"Paciente eliminado"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)