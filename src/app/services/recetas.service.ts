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
export class RecetasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  public esquemaRecetas() {
    return {
      'paciente': '',
      'fecha_receta': '',
      'horario_receta': '',
      'diagnostico': '',
      'medicamento': '',
      'indicaciones': '',
      'nota': '',
      'conclusiones': '',
    };
  }

  // Validación para el formulario de la receta que genera el doctor
  public validarReceta(data: any, editar: boolean) {
    console.log("Validando receta... ", data);
    let error: any = [];

    // Nombre del paciente
    if (!this.validatorService.required(data["paciente"])) {
      error["paciente"] = this.errorService.required;
    }

    // Validacion para la fecha de la receta
    if (!this.validatorService.required(data["fecha_receta"])) {
      error["fecha_receta"] = this.errorService.required;
    } else if (!this.validatorService.dateNotPast(data["fecha_receta"])) {
      error["fecha_receta"] = this.errorService.dateNotPast;
    }

    // Horario receta
    if (!this.validatorService.required(data["horario_receta"])) {
      error["horario_receta"] = this.errorService.required;
    }

    // Diagnostico
    if (!this.validatorService.required(data["diagnostico"])) {
      error["diagnostico"] = this.errorService.required;
    }

    // Medicamento
    if (!this.validatorService.required(data["medicamento"])) {
      error["medicamento"] = this.errorService.required;
    }

    // Indicaciones
    if (!this.validatorService.required(data["indicaciones"])) {
      error["indicaciones"] = this.errorService.required;
    }

    // Nota
    if (!this.validatorService.required(data["nota"])) {
      error["nota"] = this.errorService.required;
    }

    // Conclusiones
    if (!this.validatorService.required(data["conclusiones"])) {
      error["conclusiones"] = this.errorService.required;
    }

    return error;

  }

  //Aquí van los servicios HTTP
  //Servicio para registrar una nueva receta
  public registrarReceta(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/recetas/`, data, httpOptions);
  }

  public obtenerListaRecetas(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-recetas/`, { headers: headers });
  }

  // Función para obtener una receta y filtrar por ID
  //Obtener un solo usuario dependiendo su ID
  public getRecetaByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/receta/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar una receta
  public editarReceta(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/receta-edit/`, data, { headers: headers });
  }

  // Servicio para obtener la última receta de un paciente
  public obtenerUltimaRecetaGeneral(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/ultima-receta/`, { headers });
  }








}
