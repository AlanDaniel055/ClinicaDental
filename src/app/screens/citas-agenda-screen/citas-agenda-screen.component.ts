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
  selector: 'app-citas-agenda-screen',
  templateUrl: './citas-agenda-screen.component.html',
  styleUrls: ['./citas-agenda-screen.component.scss']
})
export class CitasAgendaScreenComponent implements OnInit {
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
      odontologo: 'Dr. Carlos Ramírez',
      color: '#5F2FA8' // Puedes utilizar diferentes colores para cada día
    },
    {
      dia: 'Martes',
      fecha: '20/08/2024',
      hora: '14:30 PM',
      motivo: 'Tratamiento de caries en molar izquierdo',
      duracion: '60 minutos',
      odontologo: 'Dra. Ana Martínez',
      color: '#1AAC7E'
    },
    {
      dia: 'Miércoles',
      fecha: '21/08/2024',
      hora: '09:30 AM',
      motivo: 'Colocación de corona en diente 14',
      duracion: '90 minutos',
      odontologo: 'Dr. Javier Torres',
      color: '#A82FA4'
    },
    {
      dia: 'Jueves',
      fecha: '22/08/2024',
      hora: '11:15 AM',
      motivo: 'Consulta para implante dental',
      duracion: '30 minutos',
      odontologo: 'Dr. Luis Fernández',
      color: '#EE9458'
    },
    {
      dia: 'Viernes',
      fecha: '23/08/2024',
      hora: '16:00 PM',
      motivo: 'Extracción de muela del juicio',
      duracion: '75 minutos',
      odontologo: 'Dra. Elena García',
      color: '#2F98A8'
    },
    {
      dia: 'Sábado',
      fecha: '24/08/2024',
      hora: '15:00 PM',
      motivo: 'Ajuste de ortodoncia',
      duracion: '45 minutos',
      odontologo: 'Dra. Patricia Sánchez',
      color: '#FC6EA7'
    },
  ];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/agenda-events/', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

}
