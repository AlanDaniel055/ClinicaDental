import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { RecepcionistaService } from 'src/app/services/recepcionista.service';
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
    this.cita.rol = this.rol;
    console.log("Cita: ", this.cita);

    // Definir el esquema a mi JSON
    this.paciente = this.pacientesService.esquemaPaciente();
    this.paciente.rol = this.rol;
    console.log("Paciente: ", this.paciente);
  }


  public guardar() {
    // Validar
    this.errors = [];
    this.errors = this.citasService.validarCita(this.cita, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      //return false;
    }
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
    { value: '1', viewValue: 'Consulta Dental', price: 200 },
    { value: '2', viewValue: 'Limpieza', price: 150 },
    { value: '3', viewValue: 'Ortodoncia', price: 300 },
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
    } else {
      this.total = 0; // Por si no se selecciona ningún servicio
    }
  }
}
