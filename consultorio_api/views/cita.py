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

class CitasAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        citas = Cita.objects.order_by("id")
        citas = CitaSerializer(citas, many=True).data
        
        return Response(citas, 200)

class CitasView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        cita = get_object_or_404(Cita, id = request.GET.get("id"))
        cita = CitaSerializer(cita, many=False).data

        return Response(cita, 200)
    
    #Registrar nueva cita
    @transaction.atomic
    def post(self, request, *args, **kwargs):

            #Agarra los datos de la cita
            # paciente_nombre = request.data['paciente_nombre']
            # paciente_apellido_paterno = request.data['paciente_apellido_paterno']
            # paciente_apellido_materno = request.data['paciente_apellido_materno']
            # paciente_email = request.data['paciente_email']
            fecha_cita = request.data['fecha_cita']
            horario_cita = request.data['horario_cita']
            servicios = request.data['servicios']
            duracion_cita = request.data['duracion_cita']
            forma_pago = request.data['forma_pago']

            cita = Cita.objects.create( # paciente_nombre = paciente_nombre,
                                        # paciente_apellido_paterno = paciente_apellido_paterno,
                                        # paciente_apellido_materno = paciente_apellido_materno,
                                        # paciente_email = paciente_email,
                                        fecha_cita = fecha_cita,
                                        horario_cita = horario_cita,
                                        servicios = servicios,
                                        duracion_cita = duracion_cita,
                                        forma_pago = forma_pago )

            cita.save()

            return Response({"cita_created_id": cita.id}, status=status.HTTP_201_CREATED)
    

class CitasViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar cita
    def put(self, request, *args, **kwargs):
        cita = get_object_or_404(Cita, id=request.data["id"])
        # cita.paciente_nombre = request.data["paciente_nombre"]
        # cita.paciente_apellido_paterno = request.data["paciente_apellido_paterno"]
        # cita.paciente_apellido_materno = request.data["paciente_apellido_materno"]
        # cita.paciente_email = request.data["paciente_email"]

        cita.horario_cita = request.data["horario_cita"]
        cita.servicios = request.data["servicios"]
        cita.duracion_cita = request.data["duracion_cita"]
        cita.forma_pago = request.data["forma_pago"]
        cita.save()

        cita = CitaSerializer(cita, many=False).data

        return Response(cita,200)
    
    #Eliminar cita
    def delete(self, request, *args, **kwargs):
        cita = get_object_or_404(Cita, id=request.GET.get("id"))
        try:
            cita.delete()
            return Response({"details":"Cita eliminada"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)