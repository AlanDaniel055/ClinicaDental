import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor.service';


declare var $: any;

@Component({
  selector: 'app-perfil-dentista-screen',
  templateUrl: './perfil-dentista-screen.component.html',
  styleUrls: ['./perfil-dentista-screen.component.scss']
})
export class PerfilDentistaScreenComponent implements OnInit {

  seccionActual: string = 'infoGeneral';

  // Info doc
  doctorData: any = {};

  // Arreglo que va obtener el array de los pacientes
  public lista_doctor: any[] = [];

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    this.obtenerDoctor();

    // Extraer los parámetros de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtener el id del usuario desde la URL
      if (id) {
        this.obtenerDoctorPorId(parseInt(id));
      }
    });

  }

  cambiarSeccion(seccion: string): void {
    this.seccionActual = seccion;
  }

  obtenerDoctor(): void {
    const doctorId = 1; // Puedes reemplazar esto con un ID dinámico
    this.doctorService.getDoctorByID(doctorId).subscribe({
      next: (data) => {
        this.doctorData = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del doctor:', err);
      }
    });
  }

  // Obtener un paciente por ID
  public obtenerDoctorPorId(id: number) {
    this.doctorService.getDoctorByID(id).subscribe(
      (response) => {
        this.lista_doctor = [response]; // Asumimos que el backend devuelve un solo paciente
        console.log("Datos del usuario: ", this.lista_doctor);
      }, (error) => {
        alert("No se pudo obtener la información del paciente");
      }
    );
  }

  public Editar(idUser: number) {
    this.router.navigate(["Registro/doctor/" + idUser]);
  }

  public Eliminar() {

  }

}
