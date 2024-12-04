import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-eliminar-cita',
  templateUrl: './eliminar-cita.component.html',
  styleUrls: ['./eliminar-cita.component.scss']
})
export class EliminarCitaComponent implements OnInit {

  public cita: string = "";

  constructor(
    private citasService: CitasService,
    private dialogRef: MatDialogRef<EliminarCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // json data que trae todos los valores que le pasamos anteriormente

  ) { }

  ngOnInit(): void {
    this.cita = this.data.cita;

  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public eliminarCita() {
    this.citasService.eliminarCita(this.data.id).subscribe( // Inovocamos el servicio
      (response) => {
        console.log(response);
        this.dialogRef.close({ isDelete: true });
      }, (error) => {
        this.dialogRef.close({ isDelete: false });
      }
    );
  }



}
