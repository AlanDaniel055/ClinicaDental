import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-recetas-screen',
  templateUrl: './historial-recetas-screen.component.html',
  styleUrls: ['./historial-recetas-screen.component.scss']
})
export class HistorialRecetasScreenComponent implements OnInit {

  recetas = [
    {
      titulo: 'Enjuague bucal antiséptico',
      paciente: 'Nicole Denise Cucco Pérez',
      fecha: '18/08/2024',
      diagnostico: 'Gingivitis',
      medicamento: 'Clorhexidina al 0.12% en solución',
      dosis: 'Realizar enjuagues bucales con 15 ml de la solución sin diluir, dos veces al día (mañana y noche) durante 30 segundos, después del cepillado.',
      indicaciones: 'No ingerir alimentos ni bebidas durante 30 minutos después del enjuague. Usar durante 14 días.',
      nota: 'No utilizar de manera prolongada para evitar la pigmentación dental.',
      firma: 'ConsultDent'
    },
    {
      titulo: 'Manejo del dolor postoperatorio',
      paciente: 'Nicole Denise Cucco Pérez',
      fecha: '12/08/2024',
      diagnostico: 'Dolor dental postoperatorio',
      medicamento: 'Ibuprofeno 400mg',
      dosis: 'Tomar cada 8 horas durante 5 días.',
      indicaciones: 'Descansar y evitar comidas duras.',
      nota: 'No exceder la dosis recomendada.',
      firma: 'ConsultDent'
    },
    {
      titulo: 'Extracción de muelas del juicio',
      paciente: 'Nicole Denise Cucco Pérez',
      fecha: '01/08/2024',
      diagnostico: 'Extracción de terceros molares',
      medicamento: 'Amoxicilina 500mg',
      dosis: 'Tomar cada 12 horas durante 7 días.',
      indicaciones: 'Evitar alimentos duros y calientes. No fumar.',
      nota: 'Seguir las indicaciones del cirujano dental.',
      firma: 'ConsultDent'
    }
  ];

  recetaSeleccionada = this.recetas[0];

  constructor() { }

  ngOnInit(): void { }

  seleccionarReceta(receta: any): void {
    this.recetaSeleccionada = receta;
  }

  imprimirReceta(): void {
    window.print();
  }
}
