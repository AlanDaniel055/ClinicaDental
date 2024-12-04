import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarView, setOptions, localeEs } from '@mobiscroll/angular';
import { CitasService } from 'src/app/services/citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';

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
  semanaActual = 0;

  //myEvents: MbscCalendarEvent[] = [];
  myView: MbscEventcalendarView = { agenda: { type: 'week', size: 1 } };
  myEvents: any[] = [];

  // Lista de citas para editar
  public lista_citas: any[] = [];
  public cita: any = {};

  //Editar cita
  public idCita: number = 0;
  public datos_cita: any = {};
  public editar: boolean = false;

  // Info cita
  public id_cita: string = ""; // que vamos a cachar

  constructor(
    private http: HttpClient,
    private citasService: CitasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private recepcionistaService: RecepcionistaService,
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
          paciente: cita.paciente_nombre,
          PA: cita.paciente_apellido_paterno,
          PM: cita.paciente_apellido_materno,
          id: cita.id,
          color: this.obtenerColorPorDia(this.obtenerDiaSemana(cita.fecha_cita))
        }));
      },
      (error) => {
        console.error('Error al obtener la lista de citas:', error);
      }
    );

    //Obtener de la URL del id_cita para saber cual editar
    if (this.activatedRoute.snapshot.params['id_cita'] != undefined) {
      this.id_cita = this.activatedRoute.snapshot.params['id_cita'];
      console.log("ID cita detectado: ", this.id_cita);
    }
    //El if valida si existe un parámetro (id_cita) en la URL
    if (this.activatedRoute.snapshot.params['id_cita'] != undefined) { // Si la url tiene id, activa la bandera editar
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idCita = this.activatedRoute.snapshot.params['id_cita'];
      console.log("ID Cita: ", this.idCita);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerCitaByID(); // Manda a traer la funcion para obtener el id
    }

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

  // Obtener lista de usuarios
  public obtenerCitas() {
    this.citasService.obtenerListaCitas().subscribe(
      (response) => {
        this.lista_citas = response;
        console.log("Lista citas:", this.lista_citas);
      }, (error) => {
        alert("No se puede obtener la lista de las citas");
      }
    );
  }

  public obtenerCitaByID() {
    this.citasService.getCitaByID(this.idCita).subscribe(
      (response) => {
        this.cita = response;
        // Agregamos valores faltantes
        // this.cita.paciente_nombre = response.cita.paciente_nombre;
        // this.cita.paciente_apellido_paterno = response.cita.paciente_apellido_paterno;
        // this.cita.paciente_apellido_materno = response.cita.paciente_apellido_materno;
        this.cita.paciente_email = response.cita.paciente_email;
        this.cita.fecha_cita = response.cita.fecha_cita;
        this.cita.horario_cita = response.cita.horario_cita;
        this.cita.servicios = response.cita.servicios;
        this.cita.duracion_cita = response.cita.duracion_cita;
        this.cita.forma_pago = response.cita.forma_pago;
        console.log("Datos cita: ", this.cita);
      }, (error) => {
        alert("No se pudieron obtener los datos de la cita");
      }
    );
  }

  public goEditar(idCita: number) {
    const idRecepcionista = this.facadeService.getUserId(); // Obtener el id del usuario a través del FacadeService
    this.router.navigate([`Agendar-cita-recep/recepcionista/${idRecepcionista}/citas/${idCita}`]);
  }

  public seleccionarCita(idCita: number): void {
    this.idCita = idCita; // Guarda el ID seleccionado
    this.obtenerCitaByID(); // Llama al servicio para obtener los datos
    console.log("ID Cita: ", this.idCita);

  }


  // public delete(idUser: number) {
  //   const dialogRef = this.dialog.open(EliminarUserModalComponent, {
  //     data: { id: idUser, rol: 'administrador' }, //Se transfieren/pasan valores/parametros a través del componente
  //     height: '288px',
  //     width: '328px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => { // Función que devuelve una llamada
  //     if (result.isDelete) { // Si la bandera es true, significa que el admin fue elimninado
  //       console.log("Admin eliminado");
  //       //Recargar página
  //       window.location.reload(); // Recargar la pagina
  //     } else {
  //       alert("Administrador no eliminado ");
  //       console.log("No se eliminó el admin");
  //     }
  //   });

  // }




}
