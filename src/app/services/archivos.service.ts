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
export class ArchivosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  public esquemaArchivos(paciente?: any) {
    return {
      'paciente': paciente ? paciente.id : '', // Aquí asignamos el ID del paciente
      'nombre_paciente': paciente ? `${paciente.user?.first_name} ${paciente.user?.last_name} ${paciente.apellido_materno}` : '', // Nombre completo del paciente
      'archivo_pdf': '',
      'archivo_img': '',
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

    // archivo pdf
    if (!this.validatorService.required(data["horario_receta"])) {
      error["horario_receta"] = this.errorService.required;
    }

    // imagen
    if (!this.validatorService.required(data["horario_receta"])) {
      error["horario_receta"] = this.errorService.required;
    }

    return error;

  }

  //Aquí van los servicios HTTP
  //Servicio para registrar archivos
  public subirArchivo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/subir-archivos/`, data, httpOptions);
  }

  obtenerArchivos(): Observable<any[]> {
    return this.http.post<any>(`${environment.url_api}/archivos/`, httpOptions);
  }


}
