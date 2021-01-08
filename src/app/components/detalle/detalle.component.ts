import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};

  actores: Cast[] = [];

  oculto = 150;

  slideOptsActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  estrella = 'star-outline';

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController,
    private dataLocalServices: DataLocalService
  ) { }

  async ngOnInit() {

    const existe = await this.dataLocalServices.existePelicula(this.id);
    this.marcarEstrella(existe);

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        // console.log('detalle', resp);
        this.pelicula = resp;
      });

    this.moviesService.getActoresPelicula(this.id)
      .subscribe(resp => {
        // console.log('actores', resp);
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    this.marcarEstrella(this.dataLocalServices.guardarPelicula(this.pelicula));
  }

  marcarEstrella(existe: boolean) {
    (existe) ? this.estrella = 'star' : this.estrella = 'star-outline';
  }

}
