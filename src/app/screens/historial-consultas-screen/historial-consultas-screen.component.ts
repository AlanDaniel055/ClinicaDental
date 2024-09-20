import { Component, OnInit } from '@angular/core';
//import { FacadeService } from 'src/app/services/facade.service';
// TODO : revisar las cookies
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-historial-consultas-screen',
  templateUrl: './historial-consultas-screen.component.html',
  styleUrls: ['./historial-consultas-screen.component.scss']
})
export class HistorialConsultasScreenComponent implements OnInit {

  // Arreglo que va obtener el array de admins
  public name_user: string = "";
  public lista_citas: any[] = [];

  constructor(
    //public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private citasService : CitasService,
    private router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {

  }

  public obtenerCitas(){

  }

}
