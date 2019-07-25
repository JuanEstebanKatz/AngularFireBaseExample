import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private  url ='https://crud-heroes-34dd4.firebaseio.com/';

  constructor( private http : HttpClient ) {
    }

    crearHeroe( heroe: HeroeModel) {

      return this.http.post(`${this.url}/heroes.json`,heroe)
      .pipe(
        map((resp: any) =>{
          heroe.id= resp.name;
          return heroe;
        })
      );
     }

     actualizarHeroe( heroe: HeroeModel){
       //delete heroe.id; perderiamos la refencia id del objeto heroe-.....

       const heroeTemp ={
         // operador expresst
         ...heroe
       }

       delete heroeTemp.id;

       return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
     }

   }

