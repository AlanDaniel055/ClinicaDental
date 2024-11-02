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

class RecetasAll(generics.CreateAPIView):
    #Esta linea se usa para pedir el token de autenticación de inicio de sesión
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        recetas = Receta.objects.order_by("id")
        recetas = RecetaSerializer(recetas, many=True).data
        
        return Response(recetas, 200)

class RecetasView(generics.CreateAPIView):
    #Obtener usuario por ID
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        recetas = get_object_or_404(Receta, id = request.GET.get("id"))
        recetas = RecetaSerializer(recetas, many=False).data

        return Response(recetas, 200)
    
    #Registrar nueva receta
    @transaction.atomic
    def post(self, request, *args, **kwargs):

            #Agarra los datos de la receta
            paciente = request.data['paciente']
            fecha_receta = request.data['fecha_receta']
            horario_receta = request.data['horario_receta']
            diagnostico = request.data['diagnostico']
            medicamento = request.data['medicamento']
            indicaciones = request.data['indicaciones']
            nota = request.data['nota']
            conclusiones = request.data['conclusiones']


            receta = Receta.objects.create( paciente = paciente,
                                        fecha_receta = fecha_receta,
                                        horario_receta = horario_receta,
                                        diagnostico = diagnostico,
                                        medicamento = medicamento,
                                        indicaciones = indicaciones,
                                        nota = nota,
                                        conclusiones = conclusiones)

            receta.save()

            return Response({"receta_created_id": receta.id}, status=status.HTTP_201_CREATED)
    

class RecetasViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    #Editar receta
    def put(self, request, *args, **kwargs):
        receta = get_object_or_404(Receta, id=request.data["id"])
        receta.paciente = request.data["paciente"]
        receta.fecha_receta = request.data["fecha_receta"]
        receta.horario_receta = request.data["horario_receta"]
        receta.diagnostico = request.data["diagnostico"]
        receta.medicamento = request.data["medicamento"]
        receta.indicaciones = request.data["indicaciones"]
        receta.nota = request.data["nota"]
        receta.conclusiones = request.data["conclusiones"]
        receta.save()

        receta = RecetaSerializer(receta, many=False).data

        return Response(receta,200)
    
    #Eliminar receta
    def delete(self, request, *args, **kwargs):
        receta = get_object_or_404(Receta, id=request.GET.get("id"))
        try:
            receta.delete()
            return Response({"details":"Receta eliminada"},200)
        except Exception as e:
            return Response({"details":"Algo pasó al eliminar"},400)