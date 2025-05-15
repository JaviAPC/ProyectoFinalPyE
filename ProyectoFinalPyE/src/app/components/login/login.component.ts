import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <img src="https://media.licdn.com/dms/image/v2/C4D33AQGgA2kIGLnZUw/productpage-image_1128_635/productpage-image_1128_635/0/1627372218120/uptodate_developers_agroapp_image?e=2147483647&v=beta&t=M271evadRZ0pLpM38fEsDk5yTkLYXQgND36eOfmAxOk" 
                         alt="Logo" 
                         class="logo">
                    <h1>Bienvenido a AgroApp</h1>
                    <p class="subtitle">Inicia sesión para continuar</p>
                </div>

                <form class="login-form" (ngSubmit)="onSubmit()">
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

                    <button type="submit" class="login-button">Iniciar Sesión</button>

                    <p class="signup-link">
                        ¿No tienes una cuenta? <a routerLink="/registro">Crear cuenta</a>
                    </p>
                </form>
            </div>
            <div class="error-message" *ngIf="errorMessage">
                {{ errorMessage }}
            </div>
        </div>
    `,
    styles: [`
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgb(242, 255, 244) 0%, rgb(235, 255, 237) 100%);
            padding: 20px;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 8px 32px rgb(96, 255, 146);
        }

        .login-header {
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

        .login-button {
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

        .login-button:hover {
            background: rgb(27, 106, 41);
        }

        .signup-link {
            text-align: center;
            color: #4a5568;
            font-size: 14px;
        }

        .signup-link a {
            color: rgb(52, 156, 49);
            text-decoration: none;
            font-weight: 600;
        }

        @media (max-width: 480px) {
            .login-card {
                padding: 20px;
            }
        }

        .error-message {
            color: #e53e3e;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
        }
    `]
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    showPassword: boolean = false;
    errorMessage: string = '';

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        // Solo loguear el estado de autenticación sin redireccionar
        if (this.authService.estaAutenticado()) {
            console.log('Usuario ya autenticado');
        }
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    async onSubmit() {
        this.errorMessage = '';
        
        if (this.email && this.password) {
            console.log('Intentando iniciar sesión...');
            
            if (this.authService.login(this.email, this.password)) {
                console.log('Login exitoso, redirigiendo...');
                try {
                    await this.router.navigateByUrl('/seleccion-cultivo');
                    console.log('Redirección completada');
                } catch (error) {
                    console.error('Error en la redirección:', error);
                    this.errorMessage = 'Error al redirigir. Por favor, intenta nuevamente.';
                }
            } else {
                console.log('Credenciales inválidas');
                this.errorMessage = 'Credenciales inválidas. Por favor, verifica tus datos.';
            }
        } else {
            this.errorMessage = 'Por favor, completa todos los campos.';
        }
    }
} 