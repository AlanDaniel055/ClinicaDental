import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacadeService } from 'src/app/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';

declare var $: any;

@Component({
  selector: 'app-perfil-paciente-screen',
  templateUrl: './perfil-paciente-screen.component.html',
  styleUrls: ['./perfil-paciente-screen.component.scss']
})
export class PerfilPacienteScreenComponent implements OnInit {

  // Arreglo que va obtener el array de los pacientes
  public lista_pacientes: any[] = [];

  constructor(
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private pacientesService: PacientesService,
    private router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Extraer los parámetros de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtener el id del usuario desde la URL
      if (id) {
        this.obtenerPacientePorId(parseInt(id));
      }
    });
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

  //Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["Registro/paciente/" + idUser]);
  } // Se concatena el iduser, para obtener los datos /paciente

}
