import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilBoton } from './perfil-boton';

describe('PerfilBoton', () => {
  let component: PerfilBoton;
  let fixture: ComponentFixture<PerfilBoton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilBoton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilBoton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
