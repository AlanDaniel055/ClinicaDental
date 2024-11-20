import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

declare var $: any;

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.scss']
})
export class NavbarUsuarioComponent implements OnInit {

  // Decoradores
  @Input() tipo: string = "";
  @Input() rol: string = "";

  public token: string = "";
  public editar: boolean = false;
  public isMenuOpen: boolean = false;
  constructor(
    private router: Router,
    private facadeService: FacadeService,
    public activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
    }

  }

  public logout() {
    this.facadeService.logout().subscribe(
      (response) => {
        console.log("Salió");
        this.facadeService.destroyUser(); // Destruye las cookies
        //Navega al login
        this.router.navigate(["Login"]);
      }, (error) => {
        console.error(error);
      }
    );
  }

  // public clickNavLink(link: string) {
  //   this.router.navigate([link]);
  //   setTimeout(() => {
  //     this.activarLink(link);
  //   }, 100);
  // }

  public clickNavLink(link: string) {
    // Asumiendo que el rol y el ID están obtenidos del servicio facadeService
    const userId = this.facadeService.getUserId();  // Aquí obtienes el id del usuario, puede ser un método que tengas en tu servicio
    const role = this.facadeService.getUserGroup(); // Aquí obtienes el rol del usuario

    // Navegar a la ruta y añadir el rol y el id a la URL
    this.router.navigate([link, role, userId]);  // Ahora incluimos rol y id
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  // TODO: no le hagan caso a esta parte luego lo modifico
  public activarLink(link: string) {

  }

  pacienteLinks = [
    { id: 'Perfil-paciente', label: 'Perfil', path: 'Perfil-paciente' },
    { id: 'Agendar-Cita', label: 'Agendar Cita', path: 'Agendar-cita' },
    { id: 'Citas-Agendadas', label: 'Citas agendadas', path: 'Citas-agendadas' },
    { id: 'Historial-Consultas', label: 'Historial de Consultas', path: 'Historial-consultas' },
    { id: 'Historial-Recetas', label: 'Historial de Recetas', path: 'Historial-recetas' }
  ];

  doctorLinks = [
    { id: 'Agenda', label: 'Agenda', path: 'Agenda' },
    { id: 'Lista-Pacientes', label: 'Lista de pacientes', path: 'Lista-pacientes' },
    { id: 'Consulta', label: 'Consulta', path: 'Info-consulta' }
  ];

  recepcionistaLinks = [
    { id: 'Agendar-Cita-Recep', label: 'Agendar cita', path: 'Agendar-cita-recep' },
    { id: 'Citas-Agendadas', label: 'Citas agendadas', path: 'Citas-agenda-recep' },
    { id: 'Perfil-dentista', label: 'Perfil dentista', path: 'Agenda' } // TODO: falta el perfil

  ];

  getNavLinkForRole() {
    if (this.rol === 'paciente') {
      return 'Paciente';
    } else if (this.rol === 'doctor') {
      return 'Doctor';
    } else if (this.rol === 'recepcionista') {
      return 'Recepcionista';
    } else {
      return '';
    }
  }


}
