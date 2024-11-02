import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';
import { Router } from '@angular/router';


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
    private facadeService: FacadeService,
    private router: Router
  ) { }

  public esquemaCitas() {
    return {
      'fecha_cita': '',
      'horario_cita': '',
      'servicios': '',
      'duracion_cita': '',
      'forma_pago': '',
      // Datos del paciente
      //'paciente_nombre': '',
      //'paciente_apellido_paterno': '',
      //'paciente_apellido_materno': '',
      //'paciente_email': '',
    };
  }

  // Validación para el formulario de la cita del paciente

  public validarCita(data: any, editar: boolean) {
    console.log("Validando cita... ", data);
    let error: any = [];

    // Validacion para la fecha de la cita
    if (!this.validatorService.required(data["fecha_cita"])) {
      error["fecha_cita"] = this.errorService.required;
    } else if (!this.validatorService.dateNotPast(data["fecha_cita"])) {
      error["fecha_cita"] = this.errorService.dateNotPast;
    }

    // Horario cita
    if (!this.validatorService.required(data["horario_cita"])) {
      error["horario_cita"] = this.errorService.required;
    }

    //Servicios
    if (!this.validatorService.required(data["servicios"])) {
      error["servicios"] = this.errorService.required;
    }

    //Forma Pago
    if (!this.validatorService.required(data["forma_pago"])) {
      error["forma_pago"] = this.errorService.required;
    }

    return error;

  }

  //Aquí van los servicios HTTP
  //Servicio para registrar una nueva cita
  public registrarCita(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/citas/`, data, httpOptions);
  }

  public obtenerListaCitas(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-citas/`, { headers: headers });
  }

  // Función para obtener una cita y filtrar por ID
  //Obtener un solo usuario dependiendo su ID
  public getCitaByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/cita/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar una cita
  public editarCita(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/cita-edit/`, data, { headers: headers });
  }


}
