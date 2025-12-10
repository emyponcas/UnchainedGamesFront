import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-datos-personales',
  imports: [
    NgIf
  ],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css',
})
export class DatosPersonales {

  inputPassword = false;

  guardarCambios(){

  }

}
