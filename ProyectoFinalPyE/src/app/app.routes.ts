import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SeleccionCultivoComponent } from './components/seleccion-cultivo/seleccion-cultivo.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'registro', 
        component: RegistroComponent 
    },
    { 
        path: 'seleccion-cultivo', 
        component: SeleccionCultivoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clima',
        loadComponent: () => import('./components/weather/weather.component').then(m => m.WeatherComponent),
        title: 'Clima'
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    }
];
