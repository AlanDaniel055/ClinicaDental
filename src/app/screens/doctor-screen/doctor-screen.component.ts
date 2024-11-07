import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/services/doctor.service';
import { MbscCalendarEvent, MbscEventcalendarOptions, localeEs } from '@mobiscroll/angular';

@Component({
  selector: 'app-doctor-screen',
  templateUrl: './doctor-screen.component.html',
  styleUrls: ['./doctor-screen.component.scss']
})
export class DoctorScreenComponent implements OnInit {

  // Arreglo que va obtener el array del doctor
  public name_user: string = "";
  public lista_doctor: any[] = [];

  constructor(
    private http: HttpClient,
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private doctorService: DoctorService,
    private router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute

  ) { }

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
    // Extraer los parámetros de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtener el id del usuario desde la URL
      if (id) {
        this.obtenerDoctorPorId(parseInt(id));
      }
    });

    // Obtener nombre completo del usuario
    this.name_user = this.facadeService.getUserCompleteName();

    // Carga de eventos de ejemplo
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });

  }

  // Obtener un doctor por ID
  public obtenerDoctorPorId(id: number) {
    this.doctorService.getDoctorByID(id).subscribe(
      (response) => {
        this.lista_doctor = [response]; // Asumimos que el backend devuelve un solo doctor
        console.log("Datos del usuario: ", this.lista_doctor);
      }, (error) => {
        alert("No se pudo obtener la información del doctor");
      }
    );
  }

  //Obtener lista de usuarios
  public obtenerDoctor() {
    this.doctorService.obtenerListaDoctor().subscribe(
      (response) => {
        this.lista_doctor = response;
        console.log("Lista users: ", this.lista_doctor);
      }, (error) => {
        alert("No se pudo obtener la lista del doctor");
      }
    );
  }

  //Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["Doctor/doctor/" + idUser]);
  } // Se concatena el iduser, para obtener los datos /doctor
  // TODO: nos sirve mas adelante

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
