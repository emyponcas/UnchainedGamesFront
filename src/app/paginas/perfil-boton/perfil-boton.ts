import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-perfil-boton',
  imports: [
    NgStyle
  ],
  templateUrl: './perfil-boton.html',
  styleUrl: './perfil-boton.css',
})
export class PerfilBoton {

  @Input() imagen: string = '';
  @Input() texto: string = '';
  @Input() backgroundColor: string = '#ffffff';
  @Input() fontSize: string = '24px';
  @Input() imagenWidth: string = '100px';
  @Input() imagenHeight: string = '100px';

}
