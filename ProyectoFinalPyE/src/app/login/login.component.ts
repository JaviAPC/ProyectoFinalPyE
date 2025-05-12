import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.username === 'usuario' && this.password === 'contraseña') {
      this.router.navigate(['/seleccion-cultivo']);
    } else {
      this.errorMessage = 'Credenciales inválidas';
    }
  }
}
