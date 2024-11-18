import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-lista-pacientes-screen',
  templateUrl: './lista-pacientes-screen.component.html',
  styleUrls: ['./lista-pacientes-screen.component.scss']
})
export class ListaPacientesScreenComponent implements OnInit {
  listaPacientes: any[] = []; // Arreglo para almacenar los datos de los pacientes
  loading: boolean = true; // Indicador de carga
  error: boolean = false; // Indicador de error

  constructor(
    private pacientesService: PacientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerPacientes(); // Llamamos al método para obtener los datos
  }

  obtenerPacientes() {
    this.pacientesService.obtenerListaPacientes().subscribe({
      next: (resp) => {
        // Mapeo de los datos para obtener el nombre completo
        this.listaPacientes = resp.map((paciente: any) => ({
          id: paciente.id,
          nombre: `${paciente.user.first_name} ${paciente.user.last_name} ${paciente.apellido_materno}`,
          //photoFileName: paciente.photoFileName || ''
          // TODO : checar lo de la ruta de imagen
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener la lista de pacientes:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  irAConsulta(idPaciente: number): void {
    this.router.navigate(['/Info-consulta', idPaciente]);
  }

}
