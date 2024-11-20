import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuOpen: boolean = false;
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,

  ){}

  ngOnInit(): void {

  }

  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  public activarLink(link: string){
    if (link == "Inicio"){
      $("#Nosotros").removeClass("active");
      $("#Servicios").removeClass("active");
      $("#Contacto").removeClass("active");
      $("#Inicio").addClass("active");
    }
    else if (link == "Nosotros"){
      $("#Inicio").removeClass("active");
      $("#Servicios").removeClass("active");
      $("#Contacto").removeClass("active");
      $("#Nosotros").addClass("active");
    }
    else if (link == "Servicios"){
      $("#Inicio").removeClass("active");
      $("#Nosotros").removeClass("active");
      $("#Contacto").removeClass("active");
      $("#Servicios").addClass("active");
    }
    else if (link == "Contacto"){
      $("#Inicio").removeClass("active");
      $("#Nosotros").removeClass("active");
      $("#Servicios").removeClass("active");
      $("#Contacto").addClass("active");
    }

  }


}
