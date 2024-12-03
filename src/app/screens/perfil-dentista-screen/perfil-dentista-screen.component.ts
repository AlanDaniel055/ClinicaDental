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

  constructor(
    private doctorService: DoctorService,
  ){}

  ngOnInit(): void {
    this.obtenerDoctor();

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

  public Editar() {

  }

  public Eliminar() {

  }

}
