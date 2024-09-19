import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';

//Crear una constante
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaCitas(){
    return{
      'fecha_cita' : '',
      //'horario_cita' : '',
      'servicios' : '',
      'forma_pago' : '',
    }

  }

  // Validación para el formulario de la cita del paciente

  public validarCita(data: any, editar :boolean){
    console.log("Validando cita... ", data);
    let error: any = [];

    // Validacion para la fecha de la cita
    if (!this.validatorService.required(data["fecha_cita"])) {
      error["fecha_cita"] = this.errorService.required;
    } else if (!this.validatorService.dateNotPast(data["fecha_cita"])) {
      error["fecha_cita"] = this.errorService.dateNotPast;
    }

    // Horario cita


    //Servicios
    if(!this.validatorService.required(data["servicios"])){
      error["servicios"] = this.errorService.required;
    }

    //Forma Pago
    if(!this.validatorService.required(data["forma_pago"])){
      error["forma_pago"] = this.errorService.required;
    }

    return error;

  }


}
