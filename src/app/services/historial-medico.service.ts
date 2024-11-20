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
export class HistorialMedicoService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  public esquemaHistorial(paciente?: any) {
    return {
      'paciente': paciente ? paciente.id : '', // Aquí asignamos el ID del paciente
      'nombre_paciente': paciente ? `${paciente.user?.first_name} ${paciente.user?.last_name} ${paciente.apellido_materno}` : '', // Nombre completo del paciente
      'antecedentes_medicos': '',
      'medicamentos_historial': '',
      'vacunas': '',
      'habitos': '',
      'antecedentes_familiares': '',
      'notas_adicionales': '',
    };
  }

  // Validación para el formulario
  public validarHistorial(data: any, editar: boolean) {
    console.log("Validando historial médico... ", data);
    let error: any = [];

    // Nombre del paciente
    // if (!this.validatorService.required(data["paciente"])) {
    //   error["paciente"] = this.errorService.required;
    // }

    // Antecedentes médicos
    if (!this.validatorService.required(data["antecedentes_medicos"])) {
      error["antecedentes_medicos"] = this.errorService.required;
    }

    // Medicamentos actuales
    if (!this.validatorService.required(data["medicamentos_historial"])) {
      error["medicamentos_historial"] = this.errorService.required;
    }

    // Vacunas
    if (!this.validatorService.required(data["vacunas"])) {
      error["vacunas"] = this.errorService.required;
    }

    // Hábitos
    if (!this.validatorService.required(data["habitos"])) {
      error["habitos"] = this.errorService.required;
    }

    // Antecedentes familiarea
    if (!this.validatorService.required(data["antecedentes_familiares"])) {
      error["antecedentes_familiares"] = this.errorService.required;
    }

    // Notas adicionales
    if (!this.validatorService.required(data["notas_adicionales"])) {
      error["notas_adicionales"] = this.errorService.required;
    }

    return error;

  }

  //Aquí van los servicios HTTP
  //Servicio para registrar
  public registrarHistorial(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/historial-medico/`, data, httpOptions);
  }

  public obtenerListaHistorial(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-historial/`, { headers: headers });
  }

  // Función para obtener y filtrar por ID
  public getHistorialByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/id-historial/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar una tratamiento
  public editarHistorial(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/historial-edit/`, data, { headers: headers });
  }


}
