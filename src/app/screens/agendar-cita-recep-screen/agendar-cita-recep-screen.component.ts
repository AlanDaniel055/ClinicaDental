import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { PacientesService } from 'src/app/services/pacientes.service';
declare var $: any;

@Component({
  selector: 'app-agendar-cita-recep-screen',
  templateUrl: './agendar-cita-recep-screen.component.html',
  styleUrls: ['./agendar-cita-recep-screen.component.scss']
})
export class AgendarCitaRecepScreenComponent implements OnInit {
  @Input() rol: string = "Recepcionista";
  @Input() datos_user: any = {};

  public paciente: any = {};
  public cita: any = {};
  public editar: boolean = false;
  public errors: any = {};
  public total: number = 0;
  public pacientes: any[] = []; // Lista de pacientes

  constructor(
    private pacientesService: PacientesService,
    private citasService: CitasService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.cita = this.citasService.esquemaCitas();
    console.log("Cita: ", this.cita);

    // Obtener lista de pacientes
    this.cargarPacientes();
  }

  public guardar() {
    this.errors = this.citasService.validarCita(this.cita, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      console.log("Errores encontrados:", this.errors);
      alert("Por favor corrige los errores antes de continuar.");
      return;
    }

    // Registrar la cita
    this.citasService.registrarCita(this.cita).subscribe(
      (response) => {
        alert("Cita registrada correctamente");
        console.log("Cita registrada:", response);
        this.router.navigate(['/Citas-agenda-recep']);
      },
      (error) => {
        console.error("Error al registrar la cita:", error);
        alert("No se pudo registrar la cita. Por favor, intenta nuevamente.");
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

  // Método para seleccionar y almacenar la hora
  public seleccionarHora(hora: string) {
    this.cita.horario_cita = hora;
  }

  // Método para obtener pacientes del servicio
  public cargarPacientes(): void {
    this.pacientesService.obtenerListaPacientes().subscribe(
      (data: any[]) => {
        this.pacientes = data;
        console.log("Pacientes cargados: ", this.pacientes);
      },
      (error) => {
        console.error("Error al cargar pacientes: ", error);
      }
    );
  }

  public actualizarPaciente(pacienteSeleccionado: any): void {
    // Asignar los datos del paciente seleccionado a la cita
    this.cita.paciente = pacienteSeleccionado;
    console.log("Paciente seleccionado: ", this.cita.paciente);

    // Asegúrate de usar 'pacienteSeleccionado' en lugar de 'this.pacientes[0]'
    this.cita.paciente_nombre = pacienteSeleccionado.user.first_name;
    this.cita.paciente_apellido_paterno = pacienteSeleccionado.user.last_name;
    this.cita.paciente_apellido_materno = pacienteSeleccionado.apellido_materno;
    this.cita.paciente_email = pacienteSeleccionado.user.email;
  }


  public obtenerPacientePorEmail(email: string): void {
    this.pacientesService.getPacienteByEmail(email).subscribe(
      (response) => {
        if (response && response.user) {
          // Asignar datos del paciente a la lista
          this.pacientes = [response];
          console.log("Datos del paciente: ", this.pacientes);

          // Asignar datos del paciente a la cita
          const paciente = this.pacientes[0];
          this.cita.paciente_nombre = paciente.user.first_name;
          this.cita.paciente_apellido_paterno = paciente.user.last_name;
          this.cita.paciente_apellido_materno = paciente.apellido_materno;
          this.cita.paciente_email = paciente.user.email;
        } else {
          alert("No se encontraron datos del paciente.");
        }
      },
      (error) => {
        console.error("Error al obtener los datos del paciente: ", error);
        alert("No se pudo obtener la información del paciente. Por favor, verifica el correo electrónico.");
      }
    );
  }



}
