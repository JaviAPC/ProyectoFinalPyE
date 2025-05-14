import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CultivoService } from '../../services/cultivo.service';
import { Cultivo } from '../../models/cultivo.model';

@Component({
    selector: 'app-seleccion-cultivo',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="cultivos-container">
            <h2>Selecciona tu Cultivo</h2>
            <div class="cultivos-grid">
                @for (cultivo of cultivos; track cultivo.id) {
                    <div class="cultivo-card" (click)="seleccionarCultivo(cultivo)">
                        <img [src]="cultivo.imagen" 
                             [alt]="cultivo.nombre"
                             (error)="handleImageError($event)"
                             [class.image-error]="imagenesConError[cultivo.id]">
                        @if (imagenesConError[cultivo.id]) {
                            <div class="image-error-placeholder">
                                <span>{{ cultivo.nombre }}</span>
                            </div>
                        }
                        <h3>{{ cultivo.nombre }}</h3>
                        <p>{{ cultivo.descripcion }}</p>
                        <div class="cultivo-info">
                            <span>Tiempo de cosecha: {{ cultivo.tiempoCosecha }} días</span>
                            <span>Temperatura óptima: {{ cultivo.temperaturaOptima }}°C</span>
                            <span>Humedad: {{ cultivo.humedad }}%</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .cultivos-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 2rem;
            font-size: 2rem;
        }

        .cultivos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .cultivo-card {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            cursor: pointer;
            position: relative;
        }

        .cultivo-card:hover {
            transform: translateY(-5px);
        }

        .cultivo-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .image-error {
            display: none;
        }

        .image-error-placeholder {
            width: 100%;
            height: 200px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px dashed #dee2e6;
        }

        .image-error-placeholder span {
            color: #6c757d;
            font-size: 1.2rem;
        }

        .cultivo-card h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }

        .cultivo-card p {
            color: #7f8c8d;
            margin-bottom: 1rem;
        }

        .cultivo-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .cultivo-info span {
            font-size: 0.9rem;
            color: #34495e;
        }
    `]
})
export class SeleccionCultivoComponent implements OnInit {
    cultivos: Cultivo[] = [];
    imagenesConError: { [key: number]: boolean } = {};

    constructor(private cultivoService: CultivoService) {}

    ngOnInit() {
        this.cultivos = this.cultivoService.getCultivos();
        console.log('Cultivos cargados:', this.cultivos);
        
        // Precarga de imágenes
        this.cultivos.forEach(cultivo => {
            const img = new Image();
            img.src = cultivo.imagen;
            img.onload = () => {
                console.log(`Imagen cargada exitosamente: ${cultivo.nombre}`);
            };
            img.onerror = () => {
                console.error(`Error al cargar la imagen: ${cultivo.imagen}`);
                this.imagenesConError[cultivo.id] = true;
            };
        });
    }

    handleImageError(event: ErrorEvent) {
        const imgElement = event.target as HTMLImageElement;
        const cultivoId = this.cultivos.find(c => c.imagen === imgElement.src)?.id;
        
        if (cultivoId) {
            console.error(`Error al cargar la imagen del cultivo ID ${cultivoId}:`, event.error);
            this.imagenesConError[cultivoId] = true;
        }
    }

    seleccionarCultivo(cultivo: Cultivo) {
        console.log('Cultivo seleccionado:', cultivo);
        // Aquí irá la lógica de selección de cultivo
    }
} 