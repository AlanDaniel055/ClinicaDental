import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
declare var $: any;

@Component({
  selector: 'app-agendar-cita-screen',
  templateUrl: './agendar-cita-screen.component.html',
  styleUrls: ['./agendar-cita-screen.component.scss']
})
export class AgendarCitaScreenComponent implements OnInit {

  // Arreglo que va obtener el array de los pacientes
  public lista_pacientes: any[] = [];

  @Input() rol: string = "Paciente";
  @Input() datos_user: any = {};

  public cita: any = {};
  public editar: boolean = false;
  public errors: any = {};
  public total: number = 0;
  public paciente: any = {};

  constructor(
    private citasService: CitasService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
    private pacientesService: PacientesService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.cita = this.citasService.esquemaCitas();
    this.cita.rol = this.rol;
    console.log("Cita: ", this.cita);

    // Extraer los parámetros de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtener el id del usuario desde la URL
      if (id) {
        this.obtenerPacientePorId(parseInt(id));
      }
    });
  }

  // // Obtener un paciente por ID
  // public obtenerPacientePorId(id: number) {
  //   this.pacientesService.getPacienteByID(id).subscribe(
  //     (response) => {
  //       this.lista_pacientes = [response]; // Asumimos que el backend devuelve un solo paciente
  //       console.log("Datos del usuario: ", this.lista_pacientes);
  //     }, (error) => {
  //       alert("No se pudo obtener la información del paciente");
  //     }
  //   );
  // }

  public obtenerPacientePorId(id: number) {
    this.pacientesService.getPacienteByID(id).subscribe(
      (response) => {
        this.lista_pacientes = [response]; // Asumimos que el backend devuelve un solo paciente
        console.log("Datos del usuario: ", this.lista_pacientes);

        // Asignar datos del paciente a la cita
        const paciente = this.lista_pacientes[0];
        this.cita.paciente_nombre = paciente.user.first_name;
        this.cita.paciente_apellido_paterno = paciente.user.last_name;
        this.cita.paciente_apellido_materno = paciente.apellido_materno;
        this.cita.paciente_email = paciente.user.email;

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

  // Método para seleccionar y almacenar la hora
  public seleccionarHora(hora: string) {
    this.cita.horario_cita = hora;
  }

  public guardar() {
    // Validar
    this.errors = [];
    this.errors = this.citasService.validarCita(this.cita, this.editar);
    if ($.isEmptyObject(this.errors)) {
      //return false;
    }
    // Llamar al servicio para registrar la cita
    this.citasService.registrarCita(this.cita).subscribe(
      (response) => {
        alert("Cita registrada correctamente");
        console.log("Cita registrada:", response);
        this.router.navigate(['/Citas-agendadas']); // Navegar a la lista de citas u otra acción
        // TODO : revisar que te lleve de acuerdo al URL
      }, (error) => {
        alert("No se pudo registrar la cita");
        console.log("Error al registrar la cita", error);
      }
    );
  }


  public cancelar() {
    this.location.back(); // Por el momento
  }

  // Funcion para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.cita.fecha_cita = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.cita.fecha_cita);
  }

  // Para el select de los servicios
  // Define precios para cada servicio
  public servicios: any[] = [
    { value: '1', viewValue: 'Consulta Dental', price: 200, duration: 60 }, // Duración en minutos
    { value: '2', viewValue: 'Limpieza', price: 150, duration: 45 },
    { value: '3', viewValue: 'Ortodoncia', price: 300, duration: 90 },
  ];


  // Para el select de la forma de pago
  public forma_pago: any[] = [
    { value: '1', viewValue: 'Efectivo' },
    { value: '2', viewValue: 'Tarjeta' },
  ];

  // Método para calcular el precio total según el servicio seleccionado
  public calcularTotal() {
    const selectedService = this.servicios.find(service => service.viewValue === this.cita.servicios);
    if (selectedService) {
      this.total = selectedService.price;
      this.cita.duracion_cita = selectedService.duration; // Almacenar la duración del servicio
    } else {
      this.total = 0;
      this.cita.duracion_cita = 0; // En caso de que no haya un servicio seleccionado
    }
  }

}
