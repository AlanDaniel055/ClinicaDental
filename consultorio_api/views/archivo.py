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
from rest_framework.permissions import IsAuthenticated

class ArchivosAllView(generics.ListAPIView):
    # Vista para obtener todos los archivos clínicos.
    permission_classes = [IsAuthenticated]
    queryset = Archivo.objects.all().order_by("id")
    serializer_class = ArchivoSerializer

    def get(self, request, *args, **kwargs):
        archivos = self.get_queryset()
        archivos_serializados = self.serializer_class(archivos, many=True).data
        return Response(archivos_serializados, status=status.HTTP_200_OK)


class ArchivoView(generics.CreateAPIView):

    # Vista para gestionar un archivo específico.

    permission_classes = [IsAuthenticated]
    serializer_class = ArchivoSerializer

    # Obtener un archivo por su ID
    def get(self, request, *args, **kwargs):
        archivo = get_object_or_404(Archivo, id=request.GET.get("id"))
        archivo_serializado = self.serializer_class(archivo, many=False).data
        return Response(archivo_serializado, status=status.HTTP_200_OK)

    # Subir un nuevo archivo
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            paciente_id = request.data.get('paciente')  # Obtén el ID del paciente
            archivo_file = request.FILES.get('archivo')  # Obtén el archivo
            descripcion = request.data.get('descripcion', '')  # Obtén la descripción

            # Busca la instancia del paciente
            paciente = get_object_or_404(Pacientes, id=paciente_id)

            # Crea el archivo
            archivo = Archivo.objects.create(
                paciente=paciente,  # Asigna la instancia del paciente
                archivo=archivo_file,
                descripcion=descripcion
            )
            archivo.save()

            return Response({"archivo_created_id": archivo.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ArchivoEditView(generics.UpdateAPIView):
    # Vista para editar un archivo.

    permission_classes = [IsAuthenticated]
    serializer_class = ArchivoSerializer

    def put(self, request, *args, **kwargs):
        archivo = get_object_or_404(Archivo, id=request.data.get("id"))
        archivo.descripcion = request.data.get("descripcion", archivo.descripcion)
        archivo.archivo = request.FILES.get("archivo", archivo.archivo)
        archivo.save()

        archivo_serializado = self.serializer_class(archivo, many=False).data
        return Response(archivo_serializado, status=status.HTTP_200_OK)