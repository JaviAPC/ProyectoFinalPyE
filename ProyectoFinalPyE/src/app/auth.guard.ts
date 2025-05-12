import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = false; // Aquí deberías verificar el estado de autenticación real

  if (!isAuthenticated) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
