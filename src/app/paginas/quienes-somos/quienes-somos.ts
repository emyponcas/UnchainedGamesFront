import { Component } from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar';
import {FooterComponent} from '../../shared/footer/footer';

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
