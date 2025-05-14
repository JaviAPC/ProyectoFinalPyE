import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
        <div class="login-container">
            <div class="login-card">
                <h2>Iniciar Sesión</h2>
                <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            [(ngModel)]="email"
                            required
                            email
                            #emailInput="ngModel">
                        @if (emailInput.invalid && emailInput.touched) {
                            <span class="error">Correo electrónico inválido</span>
                        }
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            [(ngModel)]="password"
                            required
                            minlength="6"
                            #passwordInput="ngModel">
                        @if (passwordInput.invalid && passwordInput.touched) {
                            <span class="error">La contraseña debe tener al menos 6 caracteres</span>
                        }
                    </div>

                    @if (error) {
                        <div class="error-message">{{ error }}</div>
                    }

                    <button type="submit" [disabled]="loginForm.invalid">Iniciar Sesión</button>
                </form>
                <p class="register-link">
                    ¿No tienes una cuenta? <a routerLink="/registro">Regístrate aquí</a>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .login-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 1rem;
        }

        .login-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #34495e;
        }

        input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        input:focus {
            outline: none;
            border-color: #3498db;
        }

        button {
            width: 100%;
            padding: 1rem;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #2980b9;
        }

        button:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }

        .error {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }

        .error-message {
            background-color: #fdeaea;
            color: #e74c3c;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            text-align: center;
        }

        .register-link {
            text-align: center;
            margin-top: 1.5rem;
            color: #7f8c8d;
        }

        .register-link a {
            color: #3498db;
            text-decoration: none;
        }

        .register-link a:hover {
            text-decoration: underline;
        }
    `]
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit(): void {
        if (this.authService.login(this.email, this.password)) {
            this.router.navigate(['/cultivos']);
        } else {
            this.error = 'Correo electrónico o contraseña incorrectos';
        }
    }
} 