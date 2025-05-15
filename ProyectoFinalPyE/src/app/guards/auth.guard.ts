import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.estaAutenticado()) {
            if (state.url === '/login') {
                this.router.navigate(['/seleccion-cultivo']);
                return false;
            }
            return true;
        } else {
            if (state.url !== '/login') {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
    }
} 