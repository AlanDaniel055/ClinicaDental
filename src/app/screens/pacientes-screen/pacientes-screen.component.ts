import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarOptions, localeEs } from '@mobiscroll/angular';

@Component({
  selector: 'app-pacientes-screen',
  templateUrl: './pacientes-screen.component.html',
  styleUrls: ['./pacientes-screen.component.scss']
})
export class PacientesScreenComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) { }

  myEvents: MbscCalendarEvent[] = [];

  eventSettings: MbscEventcalendarOptions = {
    locale: localeEs,
    theme: 'ios',
    themeVariant: 'light',
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    eventDelete: false,
    responsive: {
      xsmall: {
        view: {
          calendar: {
            type: 'week',
          },
          agenda: {
            type: 'day',
          },
        },
      },
      custom: {
        // Custom breakpoint
        breakpoint: 600,
        view: {
          calendar: {
            labels: true,
          },
        },
      },
    },
  };

  ngOnInit(): void {
    // Carga de eventos de ejemplo
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

  // Método para gestionar las pestañas
  ngAfterViewInit(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Eliminar la clase 'active' de todos los botones de pestañas y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Agregar la clase 'active' al botón y contenido correspondiente
        button.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });
  }
}
