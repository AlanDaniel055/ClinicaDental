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
  
  