import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];
  // como lo había hecho yo
  // favoritoGenero: any = [];
  // listaPorGenero: PeliculaDetalle[] = [];
  constructor(
    private dataLocal: DataLocalService,
    private movieServices: MoviesService) { }

  async ngOnInit() { }

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.movieServices.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];
    // Yo lo hice y funciona
    // let result;
    // generos.forEach(genero => {
    //   peliculas.forEach(pelicula => {
    //     pelicula.genres.forEach(generoPelicula => {
    //       if (generoPelicula.id === genero.id) {
    //         this.listaPorGenero.push(pelicula);
    //       }
    //     });
    //   });
    //   if (this.listaPorGenero.length > 0) {
    //     result = {
    //       id: genero.id,
    //       name: genero.name,
    //       peliculas: this.listaPorGenero
    //     };
    //     this.favoritoGenero.push(result);
    //   }
    //   this.listaPorGenero = [];
    // });
    // console.log(this.favoritoGenero);

    generos.forEach(genero => {
      this.favoritoGenero.push({
        name: genero.name,
        peliculas: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id)
        })
      });
    });
  }
}
