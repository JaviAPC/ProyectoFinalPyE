import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="register-container">
            <div class="register-card">
                <div class="register-header">
                    <img src="https://media.licdn.com/dms/image/v2/C4D33AQGgA2kIGLnZUw/productpage-image_1128_635/productpage-image_1128_635/0/1627372218120/uptodate_developers_agroapp_image?e=2147483647&v=beta&t=M271evadRZ0pLpM38fEsDk5yTkLYXQgND36eOfmAxOk" 
                         alt="Logo" 
                         class="logo">
                    <h1>Crear una cuenta</h1>
                    <p class="subtitle">Únete a nuestra comunidad de agricultores</p>
                </div>

                <form class="register-form" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <div class="input-container">
                            <input type="text" id="nombre" [(ngModel)]="nombre" name="nombre" placeholder="Tu nombre" required>
                            <span class="input-icon">👤</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="apellido">Apellido</label>
                        <div class="input-container">
                            <input type="text" id="apellido" [(ngModel)]="apellido" name="apellido" placeholder="Tu apellido" required>
                            <span class="input-icon">👤</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <div class="input-container">
                            <input type="email" id="email" [(ngModel)]="email" name="email" placeholder="ejemplo@correo.com" required>
                            <span class="input-icon">✉️</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <div class="input-container">
                            <input [type]="showPassword ? 'text' : 'password'" id="password" [(ngModel)]="password" name="password" placeholder="••••••••" required>
                            <span class="input-icon clickable" (click)="togglePassword()">
                                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                            </span>
                        </div>
                    </div>

                    <button type="submit" class="register-button">Crear cuenta</button>

                    <p class="login-link">
                        ¿Ya tienes una cuenta? <a routerLink="/login">Iniciar sesión</a>
                    </p>

                    <div *ngIf="errorMessage" class="error-message">
                        {{ errorMessage }}
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .register-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgb(242, 255, 244) 0%, rgb(235, 255, 237) 100%);
            padding: 20px;
        }

        .register-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 8px 32px rgb(94, 255, 145);
        }

        .register-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo {
            width: 200px;
            height: 60px;
            margin-bottom: 20px;
        }

        h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 8px;
        }

        .subtitle {
            color: #718096;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            color: #4a5568;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .input-container {
            position: relative;
        }

        input {
            width: 87%;
            padding: 12px 40px 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 14px;
            transition: all 0.3s;
            background: rgba(255, 255, 255, 0.9);
        }

        input:focus {
            border-color: rgb(118, 255, 162);
            outline: none;
            box-shadow: 0 0 0 3px rgba(118, 255, 162, 0.2);
        }

        .input-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
        }

        .clickable {
            cursor: pointer;
        }

        .register-button {
            width: 100%;
            padding: 12px;
            background: rgb(52, 156, 49);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .register-button:hover {
            background: rgb(27, 106, 41);
        }

        .login-link {
            text-align: center;
            color: #4a5568;
            font-size: 14px;
        }

        .login-link a {
            color: rgb(52, 156, 49);
            text-decoration: none;
            font-weight: 600;
        }

        .error-message {
            color: #e53e3e;
            text-align: center;
            margin-top: 10px;
            padding: 10px;
            background-color: #fff5f5;
            border-radius: 5px;
            border: 1px solid #feb2b2;
        }

        @media (max-width: 480px) {
            .register-card {
                padding: 20px;
            }
        }
    `]
})
export class RegistroComponent {
    email: string = '';
    password: string = '';
    nombre: string = '';
    apellido: string = '';
    showPassword: boolean = false;
    errorMessage: string = '';

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.email && this.password && this.nombre && this.apellido) {
            const nuevoUsuario = {
                email: this.email,
                nombre: this.nombre,
                apellido: this.apellido,
                password: this.password,
                rol: 'USER',
                activo: true
            };

            this.authService.register(nuevoUsuario).subscribe({
                next: (response) => {
                    console.log('Registro exitoso', response);
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    console.error('Error en el registro:', error);
                    if (error.error && error.error.mensaje) {
                        this.errorMessage = error.error.mensaje;
                    } else if (error.error && error.error.message) {
                        this.errorMessage = error.error.message;
                    } else {
                        this.errorMessage = 'Error al crear la cuenta. Por favor, intenta nuevamente.';
                    }
                }
            });
        } else {
            this.errorMessage = 'Por favor, completa todos los campos requeridos.';
        }
    }
} 