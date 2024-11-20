import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecetasService } from './../../services/recetas.service';

@Component({
  selector: 'app-historial-consultas-screen',
  templateUrl: './historial-consultas-screen.component.html',
  styleUrls: ['./historial-consultas-screen.component.scss']
})
export class HistorialConsultasScreenComponent implements OnInit {

  // Arreglo que va obtener el array de las recetas
  public receta: string = "";
  public lista_recetas: any[] = [];

  constructor(
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private recetasService: RecetasService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Lista de recetas
    this.obtenerRecetas();
  }

  // Obtener lista de recetas que pasaran como consultas
  public obtenerRecetas() {
    this.recetasService.obtenerListaRecetas().subscribe(
      (response) => {
        this.lista_recetas = response;
        console.log("Lista recetas: ", this.lista_recetas);
      }, (error) => {
        alert("No se pudo obtener la lista de recetas");
      }
    );
  }

  //Funcion para editar
  // TODO: para el recepcionista creo



}
