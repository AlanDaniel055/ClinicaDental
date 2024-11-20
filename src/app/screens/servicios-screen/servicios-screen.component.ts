import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-servicios-screen',
  templateUrl: './servicios-screen.component.html',
  styleUrls: ['./servicios-screen.component.scss']
})
export class ServiciosScreenComponent implements OnInit{

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
  ){}

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
