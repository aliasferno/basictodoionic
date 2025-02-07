import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProyectoPage } from './crear-proyecto.page';

describe('CrearProyectoPage', () => {
  let component: CrearProyectoPage;
  let fixture: ComponentFixture<CrearProyectoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
