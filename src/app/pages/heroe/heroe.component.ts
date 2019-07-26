import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swl from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    //console.log(id)

    if( id !=='nuevo'){
      this.heroeService.getHeroe(id)
           .subscribe( (resp: HeroeModel)=>{
            this.heroe = resp;
            this.heroe.id=id;
           })
    }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("formulario invalido");
      return;
    }

    Swl.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutsideClick: false
    });
    Swl.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
      /* .subscribe( resp =>{
        console.log(resp);
      }) */
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
      // esta de mas ya que se hace paso de objetos por referencia;;; // this.heroe = resp;
    }
    peticion.subscribe( resp=>{
      Swl.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        type: 'success'
      })
    })

  }

}
