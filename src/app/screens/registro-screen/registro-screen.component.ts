import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FacadeService } from 'src/app/services/facade.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit {

  public tipo: string = "registro-usuarios"; //Cadena inicializada. le asigno la cadena registro usuarios
  // JSON para los usuarios (admin, maestros, alumnos)
  public user: any = {}; // es de tipo json, y va a regresar cualquier tipo
  public isUpdate: boolean = false;
  public errors: any = {};

  // Crear las banderas para los tipos de usuarios para el radiochange
  public isPaciente: boolean = false;
  public isDoctor: boolean = false;
  public isRecepcionista: boolean = false;
  public tipo_user: string = "";
  public editar: boolean = false;

  // Info usuario
  public rol: string = ""; // que vamos a cachar
  public idUser: Number = 0;

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private pacientesService: PacientesService,
    private doctorService: DoctorService,
    private recepcionistaService: RecepcionistaService,

  ) { }

  ngOnInit(): void {
    //Obtener de la URL el rol para saber cual editar
    if (this.activatedRoute.snapshot.params['rol'] != undefined) {
      this.rol = this.activatedRoute.snapshot.params['rol']; // Si el rol exite, lo cacha y manda a imprimir a consola
      console.log("Rol detect: ", this.rol);
    }
    //El if valida si existe un parámetro (id) en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) { // Si la url tiene id, activa la bandera editar
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID(); // Manda a traer la funcion para obtener el id
    }

  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID() {
    if (this.rol == "paciente") { // TODO: pacienteS
      this.pacientesService.getPacienteByID(this.idUser).subscribe(
        (response) => { // response, trae la respuesta del user
          this.user = response; // Trae todo el objeto JSON
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol; // llave para que obtenga el rol
          this.isPaciente = true; // Activa el formulario correspondiente de acuerdo al radiochange
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario");
        }
      );
    } else if (this.rol == "doctor") {
      this.doctorService.getDoctorByID(this.idUser).subscribe(
        (response) => { // response, trae la respuesta del user
          this.user = response; // Trae todo el objeto JSON
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          //this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol; // llave para que obtenga el rol
          this.isDoctor = true; // Activa el formulario correspondiente de acuerdo al radiochange
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario");
        }
      );

    } else if (this.rol == "recepcionista") { // TODO 02/10/2024
      this.recepcionistaService.getRecepcionistaByID(this.idUser).subscribe(
        (response) => { // response, trae la respuesta del user
          this.user = response; // Trae todo el objeto JSON
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          //this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol; // llave para que obtenga el rol
          this.isRecepcionista = true; // Activa el formulario correspondiente de acuerdo al radiochange
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario");
        }
      );

    }
  }

  // Funicion para el radioChange
  public radioChange(event: MatRadioChange) {
    if (event.value == "paciente") { // TODO: le agrege la s 29/09/2024 y en value del HTML
      this.isPaciente = true;
      this.tipo_user = "paciente"
      this.isDoctor = false;
      this.isRecepcionista = false;
    } else if (event.value == "doctor") {
      this.isPaciente = false;
      this.isDoctor = true;
      this.tipo_user = "doctor"
      this.isRecepcionista = false;
    } else if (event.value == "recepcionista") {
      this.isPaciente = false;
      this.isDoctor = false;
      this.isRecepcionista = true;
      this.tipo_user = "recepcionista"
    }
  }

}
