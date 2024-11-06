import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MatTableDataSource } from '@angular/material/table';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { MbscCalendarEvent, MbscEventcalendarOptions, localeEs } from '@mobiscroll/angular';

@Component({
  selector: 'app-recepcionista-screen',
  templateUrl: './recepcionista-screen.component.html',
  styleUrls: ['./recepcionista-screen.component.scss']
})
export class RecepcionistaScreenComponent implements OnInit {

  // Arreglo que va obtener el array del recepcionista
  public name_user: string = "";
  public lista_recepcionista: any[] = [];

  constructor(
    private http: HttpClient,
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private recepcionistaService: RecepcionistaService,
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
        this.obtenerRecepcionistaPorId(parseInt(id));
      }
    });

    // Obtener nombre completo del usuario
    this.name_user = this.facadeService.getUserCompleteName();

    // Carga de eventos de ejemplo
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });

  }

  // Obtener un recepcionista por ID
  public obtenerRecepcionistaPorId(id: number) {
    this.recepcionistaService.getRecepcionistaByID(id).subscribe(
      (response) => {
        this.lista_recepcionista = [response]; // Asumimos que el backend devuelve un solo recepcionista
        console.log("Datos del usuario: ", this.lista_recepcionista);
      }, (error) => {
        alert("No se pudo obtener la información del recepcionista");
      }
    );
  }

  //Obtener lista de usuarios
  public obtenerRecepcionista() {
    this.recepcionistaService.obtenerListaRecepcionista().subscribe(
      (response) => {
        this.lista_recepcionista = response;
        console.log("Lista users: ", this.lista_recepcionista);
      }, (error) => {
        alert("No se pudo obtener la lista del recepcionista");
      }
    );
  }

  //Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["Recepcionista/recepcionista/" + idUser]);
  } // Se concatena el iduser, para obtener los datos /recepcionista
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
