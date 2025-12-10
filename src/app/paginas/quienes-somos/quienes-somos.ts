import { Component } from '@angular/core';
import {NavbarComponent} from '../../componentes/navbar/navbar';
import {FooterComponent} from '../../componentes/footer/footer';

@Component({
  selector: 'app-quienes-somos',
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuienesSomos {

}
