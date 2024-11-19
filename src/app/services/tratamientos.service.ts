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
export class TratamientosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  public esquemaTratamientos(paciente?: any) {
    return {
      'paciente': paciente ? paciente.id : '', // Aquí asignamos el ID del paciente
      'nombre_paciente': paciente ? `${paciente.user?.first_name} ${paciente.user?.last_name} ${paciente.apellido_materno}` : '', // Nombre completo del paciente
      'fecha_tratamiento': '',
      'diagnostico_tratamiento': '',
      'plan': '',
      'observaciones': '',
    };
  }

  // Validación para el formulario del tratamiento que genera el doctor
  public validarTratamiento(data: any, editar: boolean) {
    console.log("Validando tratamiento... ", data);
    let error: any = [];

    // Nombre del paciente
    if (!this.validatorService.required(data["paciente"])) {
      error["paciente"] = this.errorService.required;
    }

    // Validacion para la fecha del tratamiento
    if (!this.validatorService.required(data["fecha_tratamiento"])) {
      error["fecha_tratamiento"] = this.errorService.required;
    } else if (!this.validatorService.dateNotPast(data["fecha_tratamiento"])) {
      error["fecha_tratamiento"] = this.errorService.dateNotPast;
    }

    // Diagnostico
    if (!this.validatorService.required(data["diagnostico_tratamiento"])) {
      error["diagnostico_tratamiento"] = this.errorService.required;
    }

    // Plan
    if (!this.validatorService.required(data["plan"])) {
      error["plan"] = this.errorService.required;
    }

    // Observaciones
    if (!this.validatorService.required(data["observaciones"])) {
      error["observaciones"] = this.errorService.required;
    }

    return error;

  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo tratamiento
  public registrarTratamiento(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/tratamientos/`, data, httpOptions);
  }

  public obtenerListaTratamientos(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-tratamientos/`, { headers: headers });
  }

  // Función para obtener un tratamiento y filtrar por ID
  //Obtener un solo usuario dependiendo su ID
  public getTratamientoByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/tratamiento/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar una tratamiento
  public editarTratamiento(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/tratamiento-edit/`, data, { headers: headers });
  }

  // Servicio para obtener la último tratamiento de un paciente
  public obtenerUltimoTratamiento(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/ultimo-tratamiento/`, { headers });
  }

}
