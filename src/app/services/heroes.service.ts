import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroes-34dd4.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel) {
    //delete heroe.id; perderiamos la refencia id del objeto heroe-.....

    const heroeTemp = {
      // operador expresst
      ...heroe
    }

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1600)
    );
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObj: object) {

    const heroes: HeroeModel[] = []
    if (heroesObj === null) {
      return [];
    } else {
      Object.keys(heroesObj).forEach(key => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
        heroes.push(heroe)
      })
    }
    return heroes;
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}

