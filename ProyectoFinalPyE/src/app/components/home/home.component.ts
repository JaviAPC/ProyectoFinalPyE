import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="home-container">
            <div class="logo-container">
                <img src="https://moria.aurens.com/organizations/1f23c891-c573-4b2f-b695-f8727f0b30d5/logos/8075ce-uc.jpg" alt="Logo UCC" class="logo">
            </div>
            <div class="content">
                <h1>Sistema de Monitoreo y Predicción de Cosechas</h1>
                <p>By Javier, Sergio y El Tasco</p>
                <div class="buttons">
                    <a routerLink="/login" class="btn btn-primary">Iniciar Sesión</a>
                    <a routerLink="/registro" class="btn btn-secondary">Registrarse</a>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .home-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 2rem;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .logo-container {
            position: absolute;
            top: 2rem;
            left: 2rem;
        }

        .logo {
            width: 300px;
            height: auto;
            object-fit: contain;
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-top: 4rem;
        }

        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.2rem;
            color: #34495e;
            margin-bottom: 2rem;
        }

        .buttons {
            display: flex;
            gap: 1rem;
        }

        .btn {
            padding: 0.8rem 2rem;
            border-radius: 25px;
            font-size: 1.1rem;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background-color: #3498db;
            color: white;
        }

        .btn-secondary {
            background-color: #2ecc71;
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
    `]
})
export class HomeComponent {} 