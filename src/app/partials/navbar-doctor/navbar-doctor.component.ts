import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.scss']
})
export class NavbarDoctorComponent implements OnInit {

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
