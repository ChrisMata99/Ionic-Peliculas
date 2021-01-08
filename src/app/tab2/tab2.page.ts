import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  textoBuscar = '';
  buscando = false;
  ideas: string[] = ['Spiderman', 'Avenger', 'El Señor de los anillos', 'Batman'];
  peliculas: Pelicula[] = [];

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  buscar(event) {
    const valor: string = event.detail.value;
    // console.log(valor);

    this.buscando = true;

    if (valor.length !== 0) {
      this.movieService.getPeliculas(valor)
        .subscribe(resp => {
          // console.log(resp);
          this.peliculas = resp.results;
          this.buscando = false;
        });
    } else {
      this.peliculas = [];
      this.buscando = false;
      return;
    }
  }


  async verDetalle(id: string) {

    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
