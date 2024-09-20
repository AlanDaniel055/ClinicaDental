import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar-recepcionista',
  templateUrl: './navbar-recepcionista.component.html',
  styleUrls: ['./navbar-recepcionista.component.scss']
})
export class NavbarRecepcionistaComponent implements OnInit {

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

  }

  public clickNavLink(link: string) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  public activarLink(link: string){

  }

}
