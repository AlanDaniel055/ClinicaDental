import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MbscCalendarEvent, MbscEventcalendarOptions, localeEs } from '@mobiscroll/angular';
import { FacadeService } from 'src/app/services/facade.service';
import { PacientesService } from 'src/app/services/pacientes.service';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pacientes-screen',
  templateUrl: './pacientes-screen.component.html',
  styleUrls: ['./pacientes-screen.component.scss']
})
export class PacientesScreenComponent implements OnInit, AfterViewInit {

  // Arreglo que va obtener el array de los pacientes
  public name_user: string = "";
  public lista_pacientes: any[] = [];

  constructor(
    private http: HttpClient,
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private pacientesService: PacientesService,
    private router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
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
        this.obtenerPacientePorId(parseInt(id));
      }
    });

    // Cargar eventos de ejemplo
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });

    // Obtener nombre completo del usuario
    this.name_user = this.facadeService.getUserCompleteName();
  }

  // Obtener un paciente por ID
  public obtenerPacientePorId(id: number) {
    this.pacientesService.getPacienteByID(id).subscribe(
      (response) => {
        this.lista_pacientes = [response]; // Asumimos que el backend devuelve un solo paciente
        console.log("Datos del usuario: ", this.lista_pacientes);
      }, (error) => {
        alert("No se pudo obtener la información del paciente");
      }
    );
  }

  //Obtener lista de usuarios
  public obtenerPacientes() {
    this.pacientesService.obtenerListaPacientes().subscribe(
      (response) => {
        this.lista_pacientes = response;
        console.log("Lista users: ", this.lista_pacientes);
      }, (error) => {
        alert("No se pudo obtener la lista de los pacientes");
      }
    );
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

  //Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["Paciente/paciente/" + idUser]);
  } // Se concatena el iduser, para obtener los datos /paciente
  // TODO: nos sirve mas adelante


}
