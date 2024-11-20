import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService } from './../../services/doctor.service';

declare var $: any;

@Component({
  selector: 'app-registro-doctor',
  templateUrl: './registro-doctor.component.html',
  styleUrls: ['./registro-doctor.component.scss']
})
export class RegistroDoctorComponent implements OnInit {

  // Inputs
  @Input() rol: string = "";
  @Input() datos_user: any = {};
  imagePreview: string | ArrayBuffer | null = null;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  //Variables
  public doctor: any = {};
  public editar: boolean = false;
  public errors: any = {};

  constructor(
    private doctorService: DoctorService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.doctor = this.doctorService.esquemaDoctor();
    this.doctor.rol = this.rol; // Asigna el valor de la propiedad rol del componente (this.rol) a la propiedad rol del objeto doctor
    console.log("Doctor: ", this.doctor);
  }

  public cancelar() {
    this.location.back(); // Por el momento
  }


  public registrar() {
    // Validar
    this.errors = [];

    this.errors = this.doctorService.validarDoctor(this.doctor, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      //return false;
      //TODO: checar este return
    }
    //Validamos que las contraseñas coincidan
    //Validar la contraseña
    if (this.doctor.password == this.doctor.confirmar_password) {
      //Aquí si todo es correcto (las contraseñas coinciden) vamos a registrar - aquí se manda a consumir el servicio
      this.doctorService.registrarDoctor(this.doctor).subscribe(
        (response) => { // si todo sale correcto que nos mande al login
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response); // agregar el router al constructor
          this.router.navigate(["Login"]);
        }, (error) => {
          alert("No se pudo registrar usuario");
        }
      );
    } else {
      alert("Las contraseñas no coinciden"); // lo regresa como vacio
      this.doctor.password = "";
      this.doctor.confirmar_password = "";
    }


  }

  // Metodo para la imagen
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.doctor.photoFileName = file.name; // Aquí actualizamos el nombre del archivo en el objeto doctor.

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Funcion para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.doctor.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.doctor.fecha_nacimiento);
  }

  //Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }


}
