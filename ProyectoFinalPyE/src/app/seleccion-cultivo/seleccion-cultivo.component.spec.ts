import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCultivoComponent } from './seleccion-cultivo.component';

describe('SeleccionCultivoComponent', () => {
  let component: SeleccionCultivoComponent;
  let fixture: ComponentFixture<SeleccionCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionCultivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
