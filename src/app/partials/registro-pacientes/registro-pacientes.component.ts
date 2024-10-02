import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.scss']
})

export class RegistroPacientesComponent implements OnInit {

  // TODO: checar si sirve para la parte del rol
  //@Input() rol: string = "Paciente";

  @Input() rol: string = "";
  @Input() datos_user: any = {};
  imagePreview: string | ArrayBuffer | null = null;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  //Variables
  public paciente: any = {};
  public editar: boolean = false;
  public errors: any = {};

  constructor(
    private pacientesService: PacientesService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.paciente = this.pacientesService.esquemaPaciente();
    this.paciente.rol = this.rol; // Asigna el valor de la propiedad rol del componente (this.rol) a la propiedad rol del objeto paciente
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
      //TODO: checar este return
    }
    //Validamos que las contraseñas coincidan
    //Validar la contraseña
    if (this.paciente.password == this.paciente.confirmar_password) {
      //Aquí si todo es correcto (las contraseñas coinciden) vamos a registrar - aquí se manda a consumir el servicio
      this.pacientesService.registrarPaciente(this.paciente).subscribe(
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
      this.paciente.password = "";
      this.paciente.confirmar_password = "";
    }


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
