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

class DoctorAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        doctor = Doctor.objects.filter(user__is_active = 1).order_by("id")
        lista = DoctorSerializer(doctor, many=True).data
        
        return Response(lista, 200)

class DoctorView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        doctor = get_object_or_404(Doctor, id = request.GET.get("id"))
        doctor = DoctorSerializer(doctor, many=False).data

        return Response(doctor, 200)
    
    #Registrar nuevo usuario
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            #Grab user data
            role = request.data['rol']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
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
                                        is_active = 1)


            user.save()
            user.set_password(password)
            user.save()

            group, created = Group.objects.get_or_create(name=role)
            group.user_set.add(user)
            user.save()

            #Create a profile for the user
            doctor = Doctor.objects.create(user=user,
                                            apellido_materno= request.data["apellido_materno"],
                                            fecha_nacimiento= request.data["fecha_nacimiento"],
                                            telefono= request.data["telefono"],
                                            photoFileName= request.data["photoFileName"],  # TODO:  campo para la foto
                                            especialidad= request.data["especialidad"],
                                            direccion= request.data["direccion"],
                                            cedula= request.data["cedula"],
                                            experiencia= request.data["experiencia"],
                                            referencias= request.data["referencias"],                                            
                                            )
            doctor.save()

            return Response({"doctor_created_id": doctor.id }, 201)

        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar doctor
    def put(self, request, *args, **kwargs):
        # iduser=request.data["id"]
        doctor = get_object_or_404(Doctor, id=request.data["id"])
        doctor.apellido_materno = request.data["apellido_materno"]
        doctor.fecha_nacimiento = request.data["fecha_nacimiento"]
        doctor.telefono = request.data["telefono"]
        doctor.photoFileName= request.data["photoFileName"]
        doctor.especialidad=request.data["especialidad"]
        doctor.direccion=request.data["direccion"]
        doctor.cedula=request.data["cedula"]
        doctor.experiencia=request.data["experiencia"]
        doctor.referencias = request.data["referencias"]
        doctor.save()
        temp = doctor.user
        temp.first_name = request.data["first_name"]
        temp.last_name = request.data["last_name"]
        temp.save()
        user = DoctorSerializer(doctor, many=False).data

        return Response(user,200)
    
    #Eliminar doctor
    def delete(self, request, *args, **kwargs):
        doctor = get_object_or_404(Doctor, id=request.GET.get("id"))
        try:
            doctor.user.delete()
            return Response({"details":"Doctor eliminado"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)