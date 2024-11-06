import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-consulta-screen',
  templateUrl: './info-consulta-screen.component.html',
  styleUrls: ['./info-consulta-screen.component.scss']

})
export class InfoConsultaScreenComponent implements OnInit {

  datos = [
    {
      titulo: 'Información General',
      linea1: 'Nombre(s): Nicole Denisse',
      linea2: 'Apellido Paterni: Cocco',
      linea3: 'Apellido Materno: Pérez',
      linea4: 'Fecha de nacimiento: 25/08/2000',
      linea5: 'Edad: 23 años',
      linea6: 'Correo Electrónico: nicole23@gmail.com',
      linea7: 'Alergias: No conocidas',
      linea8: 'Enfermedades Crónicas: Hipertensión arterial',
      linea9: 'Tipo de sangre: A positivo',
      linea10:'Contacto de emergencia: (123) 456 7890',
    },
    {
      titulo: 'Tratamiento en curso',
      linea1: 'Paciente: Nicole Denisse Cucco Pérez',
      linea2: 'Fecha: 10/08/24',
      linea3: 'Diagnóstico: Periodontitis moderada',
      linea4: 'Plan de Tratamiento:',
      linea5: 'Fase 1 - Limpieza profunda (Raspado y alisado radicular):',
      linea6: 'Sesión 1: 12/08/2024',
      linea7: ' -Tratamiento realizado en los cuadrantes superior e inferior derechos',
      linea8: '',
      linea9: 'Sesión 2: 19/08/2024',
      linea10:' -Tratamiento realizado en los cuadrantes superior e inferior izquierdos.',
    },
    {
      titulo: 'Historial Médico',
      linea1: 'Paciente: Nicoles Denisse Cucco Pérez',
      linea2: 'Fecha de nacimiento: 25/08/2000',
      linea3: 'Edad: 23 años',
      linea4: 'Telefono: (123) 456 7890',
      linea5: 'Antecedentes Médicos:',
      linea6: '-Alergías: Alergía a la penicilina (erupción cutánea)',
      linea7: '-Enfermedades crónicas: Hipotiroidismo (controlado con medicación)',
      linea8: '-Cirugías previas: Colecistectomía (2018)',
      linea9: '-Hospitalizaciones: Ninguna hospitalización',
      linea10:'',
    },

    {
      titulo: 'Notas de Consulta',
      linea1: 'Paciente: Nicole Denisse Cucco Pérez',
      linea2: 'Fecha: 20/08/2024',
      linea3: 'Motivo de la consulta: Dolor agudo en el molar inferior izquierdo',
      linea4: '-Evaluación clínica:',
      linea5: 'Examen Visual: Seobserva inflamación en la encía alrededor del molar 36',
      linea6: 'Palpación: Dolor significativo al palpar la zona afectada',
      linea7: '-Pruebas Diagnósticas:',
      linea8: 'Prueba de vitalidad pulpar: Respuesta positiva, aunque reducida',
      linea9: '-Diagnóstico:',
      linea10:'Caries dental profunda con posible pulpitis irreversibke en el molar 36',
    },

    {
      titulo: 'Generar Receta',
      linea1: 'Holis',
      linea2: '.',
      linea3: '.',
      linea4: '.',
      linea5: '.',
      linea6: '.',
      linea7: '.',
      linea8: '.',
      linea9: '.',
      linea10:'.',
    },
    {
      titulo: 'Archivos',
      linea1: 'Holis',
      linea2: '.',
      linea3: '.',
      linea4: '.',
      linea5: '.',
      linea6: '.',
      linea7: '.',
      linea8: '.',
      linea9: '.',
      linea10:'.',
    },
  ];

  datoSeleccionado = this.datos[0];

  constructor() { }

  ngOnInit(): void { }

  seleccionarDato(dato: any): void {
    this.datoSeleccionado = dato;
  }
 imprimirReceta(): void {

  }

}






