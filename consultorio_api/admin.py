from django.contrib import admin
from consultorio_api.models import *

# TODO 2 Añadir el modelo
admin.site.register(Pacientes)
admin.site.register(Doctor)
admin.site.register(Recepcionista)
admin.site.register(Cita)
admin.site.register(Receta)
admin.site.register(Tratamiento)
