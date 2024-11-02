"""point_experts_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from consultorio_api.views import bootstrap
from consultorio_api.views import users
from consultorio_api.views import auth
from consultorio_api.views import pacientes
from consultorio_api.views import doctor
from consultorio_api.views import recepcionista

from consultorio_api.views import cita


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #Version
        path('bootstrap/version', bootstrap.VersionView.as_view()),
    #Create Paciente
         path('paciente/', pacientes.PacientesView.as_view()), # TODO: cambie de pacienteS a paciente
    #Paciente Data
        path('lista-pacientes/', pacientes.PacientesAll.as_view()),
    #Edit Paciente
        path('pacientes-edit/', pacientes.PacientesViewEdit.as_view()),
    #Create Doctor
        path('doctor/', doctor.DoctorView.as_view()),
    #Doctor Data
        path('lista-doctor/', doctor.DoctorAll.as_view()),
    #Create Recepcionista
        path('recepcionista/', recepcionista.RecepcionistaView.as_view()),
    #Recepcionista Data
        path('lista-recepcionista/', recepcionista.RecepcionistaAll.as_view()),
    #Create Cita
        path('citas/', cita.CitasView.as_view()),
    #Login
        path('token/', auth.CustomAuthToken.as_view()),
    #Logout
        path('logout/', auth.Logout.as_view())
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # TODO: imagenes

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

