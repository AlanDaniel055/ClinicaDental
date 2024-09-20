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
      color: '#6A5ACD' // Puedes utilizar diferentes colores para cada día
    },
    {
      dia: 'Martes',
      fecha: '20/08/2024',
      hora: '14:30 PM',
      motivo: 'Tratamiento de caries en molar izquierdo',
      duracion: '60 minutos',
      odontologo: 'Dra. Ana Martínez',
      color: '#00A572'
    },
    // Agrega más citas aquí
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
