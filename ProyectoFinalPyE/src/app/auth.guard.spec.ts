import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('MiComponente', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });

    router = TestBed.inject(Router);
  });

  it('debería navegar a la ruta correcta', () => {
    spyOn(router, 'navigate');

    // Navegar a la ruta '/home'
    router.navigate(['/home']);

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
