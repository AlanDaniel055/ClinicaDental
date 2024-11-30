from rest_framework import serializers
from rest_framework.authtoken.models import Token
from consultorio_api.models import *

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id','first_name','last_name', 'email')
               
# TODO 3: serializar el usuario 

class PacienteSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Pacientes
        fields = '__all__' 

class DoctorSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Doctor
        fields = '__all__' 

class RecepcionistaSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Recepcionista
        fields = '__all__' 

class CitaSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Cita
        fields = '__all__' 
  
class RecetaSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Receta
        fields = '__all__' 

class TratamientoSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Tratamiento
        fields = '__all__' 

class HistorialSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Historial
        fields = '__all__' 

class ArchivoSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Archivo
        fields = '__all__' 
  