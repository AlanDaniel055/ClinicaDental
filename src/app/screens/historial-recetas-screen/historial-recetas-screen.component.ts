import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-historial-recetas-screen',
  templateUrl: './historial-recetas-screen.component.html',
  styleUrls: ['./historial-recetas-screen.component.scss']
})
export class HistorialRecetasScreenComponent implements OnInit {

  recetas: any[] = [];
  recetaSeleccionada: any;

  constructor(
    private recetasService: RecetasService
  ) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener recetas dinámicamente
    this.recetasService.obtenerListaRecetas().subscribe(
      (resp) => {
        this.recetas = resp; // Almacena las recetas en el array
        if (this.recetas.length > 0) {
          this.recetaSeleccionada = this.recetas[0]; // Selecciona la primera receta por defecto
        }
      },
      (error) => {
        console.error('Error al obtener la lista de recetas:', error);
      }
    );
  }

  seleccionarReceta(receta: any): void {
    this.recetaSeleccionada = receta;
  }

  imprimirReceta(): void {
    window.print();
  }
}
