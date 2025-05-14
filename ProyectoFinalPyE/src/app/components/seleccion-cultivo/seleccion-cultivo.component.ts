import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CultivoService } from '../../services/cultivo.service';
import { Cultivo } from '../../models/cultivo.model';
import { ListaCultivosAgregados, NodoCultivoAgregado } from '../../models/cultivo-agregado.model';

@Component({
    selector: 'app-seleccion-cultivo',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
        <div class="cultivos-container">
            <h2>Selecciona tu Cultivo</h2>
            @if (!cultivoSeleccionado) {
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
                        </div>
                    }
                </div>
            } @else {
                <div class="cultivo-detalle">
                    <button class="volver-btn" (click)="volverALista()">Volver a la lista</button>
                    <div class="cultivo-card expandido">
                        <div class="cultivo-info-container">
                            <div class="cultivo-imagen">
                                <img [src]="cultivoSeleccionado.imagen" 
                                     [alt]="cultivoSeleccionado.nombre"
                                     (error)="handleImageError($event)"
                                     [class.image-error]="imagenesConError[cultivoSeleccionado.id]">
                                @if (imagenesConError[cultivoSeleccionado.id]) {
                                    <div class="image-error-placeholder">
                                        <span>{{ cultivoSeleccionado.nombre }}</span>
                                    </div>
                                }
                            </div>
                            <div class="cultivo-info">
                                <h3>{{ cultivoSeleccionado.nombre }}</h3>
                                <p class="descripcion">{{ cultivoSeleccionado.descripcion }}</p>
                                <div class="detalles-cultivo">
                                    <p><strong>Duración de cosecha:</strong> {{ getDuracionCosecha(cultivoSeleccionado.nombre) }}</p>
                                    <p><strong>Temperatura óptima:</strong> {{ getTemperaturaOptima(cultivoSeleccionado.nombre) }}</p>
                                </div>
                            </div>
                        </div>
                        <button class="agregar-btn" (click)="mostrarFormularioAgregar()">
                            Añadir cultivo +
                        </button>
                        @if (mostrandoFormulario) {
                            <div class="formulario-agregar">
                                <h4>Agregar Nueva Siembra</h4>
                                <div class="form-group">
                                    <label for="fechaSiembra">Fecha de Siembra:</label>
                                    <input 
                                        type="date" 
                                        id="fechaSiembra" 
                                        [(ngModel)]="nuevaFechaSiembra"
                                        [max]="fechaMaxima">
                                </div>
                                <div class="form-actions">
                                    <button class="confirmar-btn" (click)="agregarCultivo()">Confirmar</button>
                                    <button class="cancelar-btn" (click)="cancelarAgregar()">Cancelar</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }

            @if (cultivosAgregados.obtenerTodos().length > 0) {
                <div class="cultivos-agregados">
                    <h3>Mis Cultivos</h3>
                    <div class="lista-cultivos">
                        @for (cultivo of cultivosAgregados.obtenerTodos(); track cultivo.id) {
                            <div class="cultivo-agregado-card">
                                <img [src]="cultivo.imagen" [alt]="cultivo.nombreCultivo">
                                <div class="cultivo-agregado-info">
                                    <h4>{{ cultivo.nombreCultivo }}</h4>
                                    <p>Fecha de siembra: {{ cultivo.fechaSiembra | date:'dd/MM/yyyy' }}</p>
                                    <button class="eliminar-btn" (click)="eliminarCultivo(cultivo.id)">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
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
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
            text-align: center;
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

        .cultivo-card.expandido {
            cursor: default;
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }

        .cultivo-card.expandido img {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }

        .cultivo-card.expandido:hover {
            transform: none;
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
            font-size: 1.5rem;
        }

        .cultivo-card p {
            color: #7f8c8d;
            margin: 1rem 0;
            line-height: 1.6;
        }

        .volver-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 2rem;
            transition: background-color 0.3s ease;
        }

        .volver-btn:hover {
            background-color: #2980b9;
        }

        .cultivo-detalle {
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cultivo-info-container {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
        }

        .cultivo-imagen {
            flex: 0 0 45%;
        }

        .cultivo-info {
            flex: 1;
            text-align: left;
        }

        .detalles-cultivo {
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .detalles-cultivo p {
            margin: 0.5rem 0;
            color: #2c3e50;
        }

        .descripcion {
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .agregar-btn {
            margin-top: 2rem;
            background-color: #2ecc71;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
        }

        .agregar-btn:hover {
            background-color: #27ae60;
        }

        .formulario-agregar {
            margin-top: 2rem;
            padding: 2rem;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #2c3e50;
        }

        .form-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .confirmar-btn, .cancelar-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .confirmar-btn {
            background-color: #3498db;
            color: white;
        }

        .confirmar-btn:hover {
            background-color: #2980b9;
        }

        .cancelar-btn {
            background-color: #e74c3c;
            color: white;
        }

        .cancelar-btn:hover {
            background-color: #c0392b;
        }

        .cultivos-agregados {
            margin-top: 3rem;
            padding: 2rem;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .lista-cultivos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 1.5rem;
        }

        .cultivo-agregado-card {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            align-items: center;
        }

        .cultivo-agregado-card img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
        }

        .cultivo-agregado-info {
            flex: 1;
        }

        .cultivo-agregado-info h4 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
        }

        .cultivo-agregado-info p {
            margin: 0 0 1rem 0;
            color: #7f8c8d;
        }

        .eliminar-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .eliminar-btn:hover {
            background-color: #c0392b;
        }
    `]
})
export class SeleccionCultivoComponent implements OnInit {
    cultivos: Cultivo[] = [];
    imagenesConError: { [key: number]: boolean } = {};
    cultivoSeleccionado: Cultivo | null = null;
    cultivosAgregados = new ListaCultivosAgregados();
    mostrandoFormulario = false;
    nuevaFechaSiembra: string = '';
    fechaMaxima = new Date().toISOString().split('T')[0];

    constructor(private cultivoService: CultivoService) {}

    ngOnInit() {
        this.cultivos = this.cultivoService.getCultivos();
        console.log('Cultivos cargados:', this.cultivos);
        
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
        this.cultivoSeleccionado = cultivo;
    }

    volverALista() {
        this.cultivoSeleccionado = null;
    }

    getDuracionCosecha(nombreCultivo: string): string {
        switch (nombreCultivo.toLowerCase()) {
            case 'papa':
                return '135 días aprox.';
            case 'arveja':
                return '50 días aprox.';
            case 'choclo':
                return '115 días aprox.';
            default:
                return 'No disponible';
        }
    }

    getTemperaturaOptima(nombreCultivo: string): string {
        switch (nombreCultivo.toLowerCase()) {
            case 'papa':
                return '18 - 20 °C';
            case 'arveja':
                return '15 - 20 °C';
            case 'choclo':
                return '20 - 30 °C';
            default:
                return 'No disponible';
        }
    }

    mostrarFormularioAgregar() {
        this.mostrandoFormulario = true;
        this.nuevaFechaSiembra = new Date().toISOString().split('T')[0];
    }

    cancelarAgregar() {
        this.mostrandoFormulario = false;
        this.nuevaFechaSiembra = '';
    }

    agregarCultivo() {
        if (this.cultivoSeleccionado && this.nuevaFechaSiembra) {
            this.cultivosAgregados.agregar(
                this.cultivoSeleccionado.nombre,
                new Date(this.nuevaFechaSiembra),
                this.cultivoSeleccionado.imagen
            );
            this.mostrandoFormulario = false;
            this.nuevaFechaSiembra = '';
        }
    }

    eliminarCultivo(id: number) {
        this.cultivosAgregados.eliminar(id);
    }
} 