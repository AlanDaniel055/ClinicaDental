import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // *** Funciones para validaciones

  // Verifica si el valor proporcionado no es nulo, indefinido, una cadena vacía o una cadena que consiste solo en espacios en blanco.
  required(input: any) {
    return (input != undefined && input != null && input != "" && input.toString().trim().length > 0);
  }

  // Verifica si la longitud es menor o igual (max) o mayor o igual (min) que un tamaño especificado.
  max(input: any, size: any) {
    return (input.length <= size);
  }

  min(input: any, size: any) {
    return (input.length >= size);
  }

  // Verifica si el valor coincide con el formato de correo
  email(input: any) {
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regEx.test(input); // Valid format
  }

  // Verifica si es una fecha válida en formato ISO (AAAA-MM-DD).
  date(input: any) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!regEx.test(input)) return false;  // Invalid format
    var d = new Date(input);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === input;
  }

  // Verifica si está dentro de un rango especificado.
  between(input: any, min: any, max: any) {
    return (max >= input && input >= min);
  }

  // Verifica si es numérico
  numeric(input: any) {
    return (!isNaN(parseFloat(input)) && isFinite(input));
  }

  // Verifican si el número de decimales en el valor proporcionado es menor o igual (maxDecimals) o mayor o igual (minDecimals) que un tamaño especificado.
  maxDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length;
    }

    return (decimals <= size);
  }

  minDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length;
    }

    return (decimals >= size);
  }

  // Verifica si la fecha proporcionada está dentro de un rango especificado.
  dateBetween(input: any, min: any, max: any) {

    input = new Date(input).getTime();
    min = new Date(min).getTime();
    max = new Date(max).getTime();

    return (max >= input && input >= min);
  }

  // Verifica si el valor proporcionado contiene solo letras y espacios.
  onlyLetters(input: any) {
    let regEx = /^[A-Za-zÑñáéíóúÁÉÍÓÚ ]+$/;
    return regEx.test(input);
  }

  // Verifica si el formato de teléfono es válido.
  phoneNumber(input: any) {
    let regEx = /^[0-9]{10}$/;
    return regEx.test(input);
  }

  // Verifica si la edad calculada a partir de la fecha de nacimiento está dentro de un rango dado.
  ageRange(input: any, minAge: number, maxAge: number) {
    const birthDate = new Date(input);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= minAge && age <= maxAge;
  }

  // Verifica la fuerza de la contraseña (debe contener mayúsculas, minúsculas, números y caracteres especiales).
  passwordStrength(input: any) {
    let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regEx.test(input);
  }

  dateNotFuture(input: any) {
    const today = new Date().toISOString().slice(0, 10);
    return input <= today;
  }

  dateNotPast(input: any) {
    const today = new Date().toISOString().slice(0, 10);
    return input >= today;
  }



}
