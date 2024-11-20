import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../services/facade.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  public rol: string = "";
  public token: string = "";

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Validar que haya inicio de sesión
    // Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if (this.token === "") {
      this.router.navigate([""]);
    } else {
      // Obtener el rol y el ID del usuario
      this.rol = this.facadeService.getUserGroup();
      const userId = this.facadeService.getUserId(); // Supongamos que puedes obtener el ID del usuario de esta forma
      console.log("Rol: ", this.rol);

      // Redirigir dependiendo del rol del usuario
      switch (this.rol) {
        case 'paciente': // TODO: pacienteS
          this.router.navigate([`Paciente/${this.rol}/${userId}`]);
          break;
        case 'doctor':
          this.router.navigate([`Doctor/${this.rol}/${userId}`]);
          break;
        case 'recepcionista':
          this.router.navigate([`Recepcionista/${this.rol}/${userId}`]);
          break;
        default:
          console.error("Rol no reconocido");
          this.router.navigate([""]);
          break;
      }
    }
  }

}
