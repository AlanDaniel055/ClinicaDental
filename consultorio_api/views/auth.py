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

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):  # Seriañizar el respectivo json
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        serializer.is_valid(raise_exception=True) # Checar que el usaurio este activo -> existe
        user = serializer.validated_data['user'] # Obtener los roles de quien quiere iniciar sesion
        if user.is_active:
            roles = user.groups.all() # Trae todos los roles existentes en la base de datos 
            role_names = [] # Crear un arreglo de datos para almacenarlos
            for role in roles:
                role_names.append(role.name)
            #Si solo es un rol especifico asignamos el elemento 0
            role_names = role_names[0]

            token, created = Token.objects.get_or_create(user=user) # Obtiene el token de quien quiere iniciar sesión

            if role_names == 'paciente':
                paciente = Pacientes.objects.filter(user=user).first()
                paciente = PacienteSerializer(paciente).data
                paciente["token"] = token.key
                paciente["rol"] = "paciente" # Regresar el rol
                return Response(paciente,200)
            if role_names == 'doctor':
                doctor = Doctor.objects.filter(user=user).first()
                doctor = DoctorSerializer(doctor).data
                doctor["token"] = token.key
                doctor["rol"] = "doctor" # Regresar el rol
                return Response(doctor,200)
            if role_names == 'recepcionista':
                recepcionista = Recepcionista.objects.filter(user=user).first()
                recepcionista = RecepcionistaSerializer(recepcionista).data
                recepcionista["token"] = token.key
                recepcionista["rol"] = "recepcionista" # Regresar el rol
                return Response(recepcionista,200)                
            # TODO: agregar el del recepcionista
            else:
                return Response({"details":"Forbidden"},403) # En caso de que ningun rol coincida, mandar un 403
                pass

        return Response({}, status=status.HTTP_403_FORBIDDEN) # si no existe el usuario


class Logout(generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        print("logout")
        user = request.user
        print(str(user))
        if user.is_active:
            token = Token.objects.get(user=user)
            token.delete()

            return Response({'logout':True})


        return Response({'logout': False})
