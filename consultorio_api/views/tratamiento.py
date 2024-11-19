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

class TratamientosAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        tratamientos = Tratamiento.objects.order_by("id")
        tratamientos = TratamientoSerializer(tratamientos, many=True).data
        
        return Response(tratamientos, 200)

class TratamientosView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        tratamientos = get_object_or_404(Tratamiento, id = request.GET.get("id"))
        tratamientos = TratamientoSerializer(tratamientos, many=False).data

        return Response(tratamientos, 200)
    
    #Registrar nuevo tratamiento
    @transaction.atomic
    def post(self, request, *args, **kwargs):

            #Agarra los datos del tratamiento
            paciente = request.data['paciente']
            fecha_tratamiento = request.data['fecha_tratamiento']
            diagnostico_tratamiento = request.data['diagnostico_tratamiento']
            plan = request.data['plan']
            observaciones = request.data['observaciones']

            tratamiento = Tratamiento.objects.create( paciente = paciente,
                                        fecha_tratamiento = fecha_tratamiento,                                        
                                        diagnostico_tratamiento = diagnostico_tratamiento,
                                        plan = plan,
                                        observaciones = observaciones)

            tratamiento.save()

            return Response({"tratamiento_created_id": tratamiento.id}, status=status.HTTP_201_CREATED)
    

class TratamientosViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar tratamiento
    def put(self, request, *args, **kwargs):
        tratamiento = get_object_or_404(Tratamiento, id=request.data["id"])
        tratamiento.paciente = request.data["paciente"]
        tratamiento.fecha_tratamiento = request.data["fecha_tratamiento"]
        tratamiento.diagnostico_tratamiento = request.data["diagnostico_tratamiento"]
        tratamiento.plan = request.data["plan"]
        tratamiento.observaciones = request.data["observaciones"]
        tratamiento.save()

        tratamiento = TratamientoSerializer(tratamiento, many=False).data

        return Response(tratamiento,200)
    
    #Eliminar tratamiento
    def delete(self, request, *args, **kwargs):
        tratamiento = get_object_or_404(Tratamiento, id=request.GET.get("id"))
        try:
            tratamiento.delete()
            return Response({"details":"Tratamiento eliminada"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)
        

class UltimoTratamientoView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        # Obtener el tratamiento más reciente ordenando por ID (o fecha_tratamiento)
        try:
            ultimo_tratamiento = Tratamiento.objects.order_by("-id").first()  # Ordena por ID descendente y toma la primera

            # Verificar si se encontró
            if not ultimo_tratamiento:
                return Response({"error": "No se encontraron tratamientos"}, status=status.HTTP_404_NOT_FOUND)

            # Serializar el tratamiento encontrada
            tratamiento_serializado = TratamientoSerializer(ultimo_tratamiento).data
            return Response(tratamiento_serializado, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
