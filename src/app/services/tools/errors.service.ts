import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public generic: string;
  public required: string;
  public numeric: string;
  public betweenDate: string;
  public email: string;
  public areaRequired: string;
  public onlyLetters: string;
  public phoneNumber: string;
  public ageRange: string;
  public passwordStrength: string;
  public dateNotFuture: string;
  public dateNotPast: string;

  constructor() {
    this.generic = 'Favor de verificar el tipo de dato introducido no es válido';
    this.required = 'Campo requerido';
    this.numeric = 'Solo se aceptan valores numéricos';
    this.betweenDate = 'Fecha no es válida';
    this.email = 'Favor de introducir un correo con el formato correcto';
    this.areaRequired = 'Área de investigación es un campo requerido';
    this.onlyLetters = 'Solo se aceptan letras y espacios';
    this.phoneNumber = 'El número de teléfono debe tener 10 dígitos';
    this.ageRange = 'La edad no está dentro del rango permitido';
    this.passwordStrength = 'La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales';
    this.dateNotFuture = 'La fecha de nacimiento no puede ser una fecha futura';
    this.dateNotPast = 'La fecha no puede ser una fecha anterior a la actual';

  }

  between(min: any, max: any) {
    return 'El valor introducido debe de ser entre ' + min + ' y ' + max;
  }

  max(size: any) {
    return 'Se excedió la longitud del campo aceptada: ' + size;
  }

  min(size: any) {
    return 'El campo no cumple la longitud aceptada: ' + size;
  }
}
