import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { SeleccionCultivoComponent } from './app/seleccion-cultivo/seleccion-cultivo.component';
import { authGuard } from './app/auth.guard';

const routes = [
  { path: '', component: LoginComponent },
  {
    path: 'seleccion-cultivo',
    component: SeleccionCultivoComponent,
    canActivate: [authGuard],
  },
];

bootstrapApplication(LoginComponent, {
  providers: [provideRouter(routes)],
});
