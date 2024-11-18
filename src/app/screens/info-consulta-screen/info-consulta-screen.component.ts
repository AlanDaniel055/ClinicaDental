import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { RecetasService } from 'src/app/services/recetas.service';

declare var $: any;

@Component({
  selector: 'app-info-consulta-screen',
  templateUrl: './info-consulta-screen.component.html',
  styleUrls: ['./info-consulta-screen.component.scss']
})
export class InfoConsultaScreenComponent implements OnInit {

  //Variables
  public receta: any = {};
  public editar: boolean = false;
  public errors: any = {};

  idPaciente!: number;
  datosPaciente: any;  // Variable para almacenar los datos del paciente

  seccionActual: string = 'infoGeneral';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private pacientesService: PacientesService,
    private recetasService: RecetasService,
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      this.idPaciente = +params['idPaciente'];
      this.obtenerDatosPaciente(this.idPaciente);
    });

    // Definir el esquema a mi JSON
    this.receta = this.recetasService.esquemaRecetas();
    console.log("Receta: ", this.receta);
  }

  // obtenerDatosPaciente(id: number): void {
  //   // Llamada al servicio para obtener datos del paciente
  //   this.pacientesService.getPacienteByID(id).subscribe({
  //     next: (data) => {
  //       this.datosPaciente = data;
  //       console.log('Datos del paciente:', this.datosPaciente);
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener los datos del paciente:', error);
  //     }
  //   });
  // }

  obtenerDatosPaciente(id: number): void {
    // Llamada al servicio para obtener datos del paciente
    this.pacientesService.getPacienteByID(id).subscribe({
      next: (data) => {
        this.datosPaciente = data;
        console.log('Datos del paciente:', this.datosPaciente);
        // Inicializar receta con los datos del paciente
        this.receta = this.recetasService.esquemaRecetas(this.datosPaciente);
      },
      error: (error) => {
        console.error('Error al obtener los datos del paciente:', error);
      }
    });
  }


  cambiarSeccion(seccion: string): void {
    this.seccionActual = seccion;
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edadDifMs = Date.now() - fechaNacimientoDate.getTime();
    const edadDate = new Date(edadDifMs);
    return Math.abs(edadDate.getUTCFullYear() - 1970);
  }

  public cancelar() {
    this.location.back(); // Por el momento
  }

  // public guardar() {
  //   // Validar
  //   this.errors = [];

  //   this.errors = this.recetasService.validarReceta(this.receta, this.editar)
  //   if (!$.isEmptyObject(this.errors)) {
  //     //return false;
  //     //TODO: checar este return
  //   }
  //   // Llamar al servicio para registrar la receta
  //   this.recetasService.registrarReceta(this.receta).subscribe(
  //     (response) => {
  //       alert("Receta registrada correctamente");
  //       console.log("Receta registrada:", response);
  //     }, (error) => {
  //       alert("No se pudo registrar la receta");
  //       console.log("Error al registrar la receta", error);
  //     }
  //   );
  // }

  public guardar() {
    // Validar
    this.errors = [];

    this.errors = this.recetasService.validarReceta(this.receta, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return;
    }

    // Asignar el ID del paciente a la receta
    this.receta.paciente = this.datosPaciente?.id;

    // Llamar al servicio para registrar la receta
    this.recetasService.registrarReceta(this.receta).subscribe({
      next: (response) => {
        alert("Receta registrada correctamente");
        console.log("Receta registrada:", response);

        // Recargar la página después de guardar exitosamente
        window.location.reload();
      },
      error: (error) => {
        alert("No se pudo registrar la receta");
        console.error("Error al registrar la receta", error);
      }
    });

  }

  // Funcion para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.receta.fecha_receta = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.receta.fecha_receta);
  }


}
