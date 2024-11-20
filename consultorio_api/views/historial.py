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

class HistorialAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        historiales = Historial.objects.order_by("id")
        historiales = HistorialSerializer(historiales, many=True).data
        
        return Response(historiales, 200)

class HistorialesView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        historiales = get_object_or_404(Historial, id = request.GET.get("id"))
        historiales = HistorialSerializer(historiales, many=False).data

        return Response(historiales, 200)
    
    #Registrar nuevo
    @transaction.atomic
    def post(self, request, *args, **kwargs):

            #Agarra los datos
            # paciente = request.data['paciente']
            antecedentes_medicos = request.data['antecedentes_medicos']
            medicamentos_historial = request.data['medicamentos_historial']
            vacunas = request.data['vacunas']
            habitos = request.data['habitos']
            antecedentes_familiares = request.data['antecedentes_familiares']
            notas_adicionales = request.data['notas_adicionales']


            historial = Historial.objects.create( # paciente = paciente,
                                        antecedentes_medicos = antecedentes_medicos,
                                        medicamentos_historial = medicamentos_historial,
                                        vacunas = vacunas,
                                        habitos = habitos,
                                        antecedentes_familiares = antecedentes_familiares,
                                        notas_adicionales = notas_adicionales)

            historial.save()

            return Response({"historial_created_id": historial.id}, status=status.HTTP_201_CREATED)
    

class HistorialViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar
    def put(self, request, *args, **kwargs):
        historial = get_object_or_404(Historial, id=request.data["id"])
        # historial.paciente = request.data["paciente"]
        historial.antecedentes_medicos = request.data["antecedentes_medicos"]
        historial.medicamentos_historial = request.data["medicamentos_historial"]
        historial.vacunas = request.data["vacunas"]
        historial.habitos = request.data["habitos"]
        historial.antecedentes_familiares = request.data["antecedentes_familiares"]
        historial.notas_adicionales = request.data["notas_adicionales"]
        historial.save()

        historial = HistorialSerializer(historial, many=False).data

        return Response(historial,200)
    
    #Eliminar Historial
    def delete(self, request, *args, **kwargs):
        historial = get_object_or_404(Historial, id=request.GET.get("id"))
        try:
            historial.delete()
            return Response({"details":"Historial eliminada"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)
        

class UltimoHistorialView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        # Obtener la más reciente ordenando por ID
        try:
            ultimo_historial = Historial.objects.order_by("-id").first()  # Ordena por ID descendente y toma la primera

            # Verificar si se encontró uno
            if not ultimo_historial:
                return Response({"error": "No se encontraron historiales medicos"}, status=status.HTTP_404_NOT_FOUND)

            # Serializar el historial encontrado
            histirial_serializado = HistorialSerializer(ultimo_historial).data
            return Response(histirial_serializado, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
