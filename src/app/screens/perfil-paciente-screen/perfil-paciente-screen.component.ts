import { Component, OnInit } from '@angular/core';
import { PacientesScreenComponent } from '../pacientes-screen/pacientes-screen.component';
import { FacadeService } from 'src/app/services/facade.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-paciente-screen',
  templateUrl: './perfil-paciente-screen.component.html',
  styleUrls: ['./perfil-paciente-screen.component.scss']
})
export class PerfilPacienteScreenComponent implements OnInit {

  constructor(
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private pacientesServices: PacientesScreenComponent,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  //Funcion para editar
  public goEditar(idUser: number) {
    //this.router.navigate(["registro-paciente/paciente/" + idUser]);
  } // Se concatena el iduser, para obtener los datos /paciente
  // TODO: nos sirve mas adelante

}
