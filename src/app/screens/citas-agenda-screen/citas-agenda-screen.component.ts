import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarView, setOptions, localeEs } from '@mobiscroll/angular';
import { CitasService } from 'src/app/services/citas.service';

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

  semanaActual = 0;

  myView: MbscEventcalendarView = { agenda: { type: 'week', size: 1 } };
  myEvents: any[] = [];

  constructor(
    private http: HttpClient,
    private citasService: CitasService
  ) { }

  ngOnInit(): void {
    this.citasService.obtenerListaCitas().subscribe(
      (resp) => {
        // Mapea los datos obtenidos para ajustarlos a las propiedades del frontend
        this.myEvents = resp.map((cita: any) => ({
          dia: this.obtenerDiaSemana(cita.fecha_cita),
          fecha: cita.fecha_cita,
          hora: cita.horario_cita,
          motivo: cita.servicios,
          duracion: cita.duracion_cita,
          // paciente: cita.paciente_nombre, TODO: Para el recepcionista
          color: this.obtenerColorPorDia(this.obtenerDiaSemana(cita.fecha_cita))
        }));
      },
      (error) => {
        console.error('Error al obtener la lista de citas:', error);
      }
    );
  }

  // Añade un método para definir el color basado en el día de la semana
  obtenerColorPorDia(dia: string): string {
    const coloresPorDia: { [key: string]: string } = {
      'Lunes': '#5F2FA8',
      'Martes': '#1AAC7E',
      'Miércoles': '#A82FA4',
      'Jueves': '#EE9458',
      'Viernes': '#2F98A8',
      'Sábado': '#FC6EA7',
      'Domingo': '#8C33FF'
    };
    return coloresPorDia[dia] || '#5F2FA8'; // Color predeterminado si no coincide el día
  }

  obtenerDiaSemana(fecha: string): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaObj = new Date(fecha);
    return dias[fechaObj.getDay()];
  }

  siguienteSemana() {
    this.semanaActual++;
  }

  anteriorSemana() {
    if (this.semanaActual > 0) {
      this.semanaActual--;
    }
  }



}
