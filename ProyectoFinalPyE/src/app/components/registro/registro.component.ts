import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="registro-container">
            <div class="registro-card">
                <h2>Registro de Usuario</h2>
                <form (ngSubmit)="onSubmit()" #registroForm="ngForm">
                    <div class="form-group">
                        <label for="nombre">Nombre Completo</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre"
                            [(ngModel)]="usuario.nombre"
                            required
                            minlength="3"
                            #nombreInput="ngModel">
                        @if (nombreInput.invalid && nombreInput.touched) {
                            <span class="error">El nombre debe tener al menos 3 caracteres</span>
                        }
                    </div>

                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            [(ngModel)]="usuario.email"
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
                            [(ngModel)]="usuario.password"
                            required
                            minlength="6"
                            #passwordInput="ngModel">
                        @if (passwordInput.invalid && passwordInput.touched) {
                            <span class="error">La contraseña debe tener al menos 6 caracteres</span>
                        }
                    </div>

                    <div class="form-group">
                        <label for="tipoAgricultor">Tipo de Agricultor</label>
                        <select 
                            id="tipoAgricultor" 
                            name="tipoAgricultor"
                            [(ngModel)]="usuario.tipoAgricultor"
                            required>
                            <option value="pequeño">Pequeño</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>

                    @if (error) {
                        <div class="error-message">{{ error }}</div>
                    }

                    <button type="submit" [disabled]="registroForm.invalid">Registrarse</button>
                </form>
                <p class="login-link">
                    ¿Ya tienes una cuenta? <a routerLink="/login">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .registro-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 1rem;
        }

        .registro-card {
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

        input, select {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #3498db;
        }

        button {
            width: 100%;
            padding: 1rem;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #27ae60;
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

        .login-link {
            text-align: center;
            margin-top: 1.5rem;
            color: #7f8c8d;
        }

        .login-link a {
            color: #3498db;
            text-decoration: none;
        }

        .login-link a:hover {
            text-decoration: underline;
        }
    `]
})
export class RegistroComponent {
    usuario: Usuario = {
        nombre: '',
        email: '',
        password: '',
        tipoAgricultor: 'pequeño'
    };
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit(): void {
        if (this.authService.registro(this.usuario)) {
            this.router.navigate(['/login']);
        } else {
            this.error = 'El correo electrónico ya está registrado';
        }
    }
} 