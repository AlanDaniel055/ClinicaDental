import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { FacadeService } from './facade.service';

//Crear una constante
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor( // A todo lo que esta aqui adentro se le llama inyección
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    //private facadeService: FacadeService
  ) { }

  public esquemaPaciente() {
    return {
      'first_name': '',
      'last_name': '',
      'apellido_materno': '',
      'fecha_nacimiento': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'paciente.telefono': '',
      'photoFileName': '',
    }
  }

  //Validación para el formulario del paciente
  // TODO: checar que no lo puedan romper, ponerle mas restricciones
  public validarPaciente(data: any, editar: boolean) { // data: Es un objeto que contiene los datos del paciente que se van a validar.
    console.log("Validando paciente... ", data); // editar : booleando que indica si se esta editando un paciente existente o uno nuevo
    let error: any = [];

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["apellido_materno"])) {
      error["apellido_materno"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["photoFileName"])) {
      error["photoFileName"] = this.errorService.required;
    }


    //Return arreglo
    return error;  // se almacena en el objeto "error"
  }





}
