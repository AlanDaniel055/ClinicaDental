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
export class PacientesService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
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
      'telefono': '',
      'photoFileName': '',
    }
  }

  //Validación para el formulario del paciente
  public validarPaciente(data: any, editar: boolean) {
    console.log("Validando paciente... ", data);
    let error: any = [];

    // Validaciones para el primer nombre
    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    } else if (!this.validatorService.onlyLetters(data["first_name"])) {
      error["first_name"] = this.errorService.onlyLetters;
    } else if (!this.validatorService.max(data["first_name"], 50)) {
      error["first_name"] = this.errorService.max(50);
    }

    // Validaciones para el apellido paterno
    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    } else if (!this.validatorService.onlyLetters(data["last_name"])) {
      error["last_name"] = this.errorService.onlyLetters;
    } else if (!this.validatorService.max(data["last_name"], 50)) {
      error["last_name"] = this.errorService.max(50);
    }

    // Validaciones para el apellido materno
    if (!this.validatorService.required(data["apellido_materno"])) {
      error["apellido_materno"] = this.errorService.required;
    } else if (!this.validatorService.onlyLetters(data["apellido_materno"])) {
      error["apellido_materno"] = this.errorService.onlyLetters;
    } else if (!this.validatorService.max(data["apellido_materno"], 50)) {
      error["apellido_materno"] = this.errorService.max(50);
    }

    // Validaciones para la fecha de nacimiento
    if (!this.validatorService.required(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.required;
    } else if (!this.validatorService.dateNotFuture(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.dateNotFuture;
    }

    // Validaciones para el email
    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    // Validaciones para la contraseña y su confirmación
    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    // Validaciones para el teléfono
    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    } else if (!this.validatorService.phoneNumber(data["telefono"])) {
      error["telefono"] = this.errorService.phoneNumber;
    }

    // Validaciones para el archivo de la foto
    if (!this.validatorService.required(data["photoFileName"])) {
      error["photoFileName"] = this.errorService.required;
    }

    //Return arreglo de errores
    return error;
  }
}
