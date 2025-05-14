import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SeleccionCultivoComponent } from './components/seleccion-cultivo/seleccion-cultivo.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { 
        path: 'cultivos', 
        component: SeleccionCultivoComponent,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '' }
];
