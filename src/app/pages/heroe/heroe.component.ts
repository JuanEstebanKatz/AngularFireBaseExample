import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("formulario invalido");
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe( this.heroe)
        .subscribe( resp =>{
          console.log(resp);
        })
    } else {

      this.heroeService.crearHeroe(this.heroe)
        .subscribe(resp => {
          console.log(resp)
          // esta de mas ya que se hace paso de objetos por referencia;;; // this.heroe = resp;
        }
        );
    }

  }

}
