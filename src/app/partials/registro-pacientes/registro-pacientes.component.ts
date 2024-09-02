import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Location } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.scss']
})

export class RegistroPacientesComponent implements OnInit {

  //@Input() rol: string = "";
  // TODO: checar si sirve para la parte del rol
  @Input() rol: string ="Paciente";
  @Input() datos_user: any = {};
  imagePreview: string | ArrayBuffer | null = null;

  // onFileSelected(event: Event): void {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     //this.photoFileName = file.name;

  //     // Crear una vista previa de la imagen
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }



  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public paciente: any = {};
  public editar: boolean = false;
  public errors: any = {};

  constructor(
    private pacientesService: PacientesService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.paciente = this.pacientesService.esquemaPaciente();
    this.paciente.rol = this.rol;
    console.log("Paciente: ", this.paciente);

  }

  public cancelar() {
    this.location.back(); // Por el momento
  }


  public registrar() {
    // Validar
    this.errors = [];

    this.errors = this.pacientesService.validarPaciente(this.paciente, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      //return false;
    }

    // TODO: checar el return y que las contraseñas coincidan (cuando tengamos el backend)
  }

  // Metodo para la imagen
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.paciente.photoFileName = file.name; // Aquí actualizamos el nombre del archivo en el objeto paciente.

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

    this.paciente.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.paciente.fecha_nacimiento);
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
