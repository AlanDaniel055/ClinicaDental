import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-info-consulta-screen',
  templateUrl: './info-consulta-screen.component.html',
  styleUrls: ['./info-consulta-screen.component.scss']
})
export class InfoConsultaScreenComponent implements OnInit {

  idPaciente!: number;
  datosPaciente: any;  // Variable para almacenar los datos del paciente

  seccionActual: string = 'infoGeneral';

  constructor(
    private route: ActivatedRoute,
    private pacientesService: PacientesService,
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      this.idPaciente = +params['idPaciente'];
      this.obtenerDatosPaciente(this.idPaciente);
    });
  }

  obtenerDatosPaciente(id: number): void {
    // Llamada al servicio para obtener datos del paciente
    this.pacientesService.getPacienteByID(id).subscribe({
      next: (data) => {
        this.datosPaciente = data;
        console.log('Datos del paciente:', this.datosPaciente);
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


}
