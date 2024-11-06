import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarView, setOptions, localeEs } from '@mobiscroll/angular';

declare var $: any;

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-citas-agenda-recep-screen',
  templateUrl: './citas-agenda-recep-screen.component.html',
  styleUrls: ['./citas-agenda-recep-screen.component.scss']
})
export class CitasAgendaRecepScreenComponent implements OnInit {
  // Para la agenda

  //myEvents: MbscCalendarEvent[] = [];
  myView: MbscEventcalendarView = { agenda: { type: 'week', size: 1 } };


  myEvents: any[] = [
    {
      dia: 'Lunes',
      fecha: '19/08/2024',
      hora: '10:00 AM',
      motivo: 'Revisión y limpieza dental',
      duracion: '45 minutos',
      paciente: 'María Emilia Mernes',
      color: '#5F2FA8' // Puedes utilizar diferentes colores para cada día
    },
    {
      dia: 'Martes',
      fecha: '20/08/2024',
      hora: '14:30 PM',
      motivo: 'Tratamiento de caries en molar izquierdo',
      duracion: '60 minutos',
      paciente: 'Patricio Oward Junco',
      color: '#1AAC7E'
    },
    {
      dia: 'Miércoles',
      fecha: '21/08/2024',
      hora: '09:30 AM',
      motivo: 'Colocación de corona en diente 14',
      duracion: '90 minutos',
      paciente: 'Nicole Denise Cucco',
      color: '#A82FA4'
    },
    {
      dia: 'Jueves',
      fecha: '22/08/2024',
      hora: '11:15 AM',
      motivo: 'Consulta para implante dental',
      duracion: '30 minutos',
      paciente: 'Peter Gene Hernández',
      color: '#EE9458'
    },
    {
      dia: 'Viernes',
      fecha: '23/08/2024',
      hora: '16:00 PM',
      motivo: 'Extracción de muela del juicio',
      duracion: '75 minutos',
      paciente: 'Sergio Michel Pérez Mendoza',
      color: '#2F98A8'
    },
    {
      dia: 'Sábado',
      fecha: '24/08/2024',
      hora: '15:00 PM',
      motivo: 'Ajuste de ortodoncia',
      duracion: '45 minutos',
      paciente: 'Sebastián Obando Giraldo',
      color: '#FC6EA7'
    },
  ];

  semanaActual = 0;

  siguienteSemana() {
    this.semanaActual++;
  }

  anteriorSemana() {
    if (this.semanaActual > 0) {
      this.semanaActual--;
    }
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/agenda-events/', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

}
