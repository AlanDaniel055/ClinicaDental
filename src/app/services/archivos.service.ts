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
      'archivo': '',
      'paciente': paciente ? paciente.id : '', // Aquí asignamos el ID del paciente
      'descripcion': '',
    };
  }

  // Validación para el formulario de la archivo que genera el doctor
  public validarArchivo(data: any, editar: boolean) {
    console.log("Validando archivo... ", data);
    let error: any = [];

    // Nombre del archivo
    if (!this.validatorService.required(data["archivo"])) {
      error["archivo"] = this.errorService.required;
    }

    // Nombre paciente
    if (!this.validatorService.required(data["paciente"])) {
      error["paciente"] = this.errorService.required;
    }

    // Descripció del archivo
    if (!this.validatorService.required(data["descripcion"])) {
      error["descripcion"] = this.errorService.required;
    }

    return error;

  }

  // Metodos

  obtenerArchivos(): Observable<any[]> {
    return this.http.post<any>(`${environment.url_api}/lista-archivos/`, httpOptions);
  }

  subirArchivo(formData: FormData): Observable<any> {
    const token = this.facadeService.getSessionToken(); // Asegúrate de obtener el token de sesión correctamente

    // Configurar encabezados (sin especificar el Content-Type para FormData)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Cambia a 'Token' si usas DRF TokenAuthentication
    });

    // Realizar la solicitud POST con FormData
    return this.http.post<any>(`${environment.url_api}/archivo/`, formData, { headers });
  }

  obtenerArchivosPorPaciente(idUser: number): Observable<any[]> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${environment.url_api}/archivos-paciente/?id=${idUser}`, { headers });
  }


}
