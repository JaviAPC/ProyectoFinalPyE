import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CultivoService } from '../../services/cultivo.service';
import { Cultivo } from '../../models/cultivo.model';
import { ListaCultivosSeleccionados, CultivoSeleccionado, Tarea } from '../../models/cultivo-seleccionado.model';

@Component({
    selector: 'app-seleccion-cultivo',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
        <div class="cultivos-container">
            <!-- Sección de selección de cultivos -->
            <div class="header">
                <h1>Selecciona tus Cultivos</h1>
                <p class="subtitle">Elige los cultivos que deseas gestionar</p>
            </div>

            <!-- Grid de cultivos disponibles -->
            <div class="cultivos-grid">
                <div *ngFor="let cultivo of cultivos" 
                     class="cultivo-card" 
                     (click)="seleccionarCultivo(cultivo)">
                    <div class="cultivo-image">
                        <img [src]="cultivo.imagen" [alt]="cultivo.nombre">
                    </div>
                    <div class="cultivo-info">
                        <h3>{{ cultivo.nombre }}</h3>
                        <p>{{ cultivo.descripcion }}</p>
                    </div>
                    <div class="hover-overlay">
                        <button class="select-button">Seleccionar</button>
                    </div>
                </div>
            </div>

            <!-- Lista de cultivos seleccionados -->
            <div class="cultivos-seleccionados" *ngIf="cultivosSeleccionados.length > 0">
                <h2>Tus Cultivos Seleccionados</h2>
                <div class="cultivo-seleccionado-card" *ngFor="let seleccionado of cultivosSeleccionados">
                    <div class="cultivo-header">
                        <h3>{{ seleccionado.cultivo.nombre }}</h3>
                        <button class="delete-button" (click)="eliminarCultivo(seleccionado.cultivo)">✖</button>
                    </div>
                    <div class="cultivo-details">
                        <p><strong>Temperatura óptima:</strong> {{ seleccionado.cultivo.temperaturaOptima }}</p>
                        <p><strong>Tiempo de cosecha:</strong> {{ seleccionado.cultivo.tiempoCosecha }}</p>
                        <p><strong>Fecha de siembra:</strong> {{ seleccionado.fechaSiembra | date:'dd/MM/yyyy' }}</p>
                    </div>
                    
                    <!-- Lista de tareas -->
                    <div class="tareas-list">
                        <h4>Próximas tareas</h4>
                        <div class="tarea-item" *ngFor="let tarea of obtenerProximasTareas(seleccionado)">
                            <span class="tarea-fecha">{{ tarea.fecha | date:'dd/MM/yyyy' }}</span>
                            <span class="tarea-tipo">{{ tarea.tipo === 'riego' ? '💧 Riego' : '🌱 Fertilización' }}</span>
                            <input type="checkbox" 
                                   [checked]="tarea.completada"
                                   (change)="onTareaChange($event, seleccionado.cultivo.id, tarea.fecha, tarea.tipo)">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de fecha de siembra -->
        <div class="modal" *ngIf="mostrandoFormulario">
            <div class="modal-content">
                <h3>Seleccionar fecha de siembra</h3>
                <input type="date" 
                       [(ngModel)]="nuevaFechaSiembra" 
                       [max]="fechaMaxima">
                <div class="modal-buttons">
                    <button (click)="agregarCultivo()">Confirmar</button>
                    <button (click)="cancelarAgregar()">Cancelar</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .cultivos-container {
            min-height: 100vh;
            background: linear-gradient(135deg, rgb(242, 255, 244) 0%, rgb(235, 255, 237) 100%);
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 4px 12px rgb(121, 251, 162);
        }

        h1 {
            color: #2d3748;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #718096;
            font-size: 16px;
        }

        .cultivos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .cultivo-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgb(149, 255, 179);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
            cursor: pointer;
        }

        .cultivo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(143, 255, 179, 0.2);
        }

        .cultivo-image {
            height: 200px;
            overflow: hidden;
        }

        .cultivo-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }

        .cultivo-card:hover .cultivo-image img {
            transform: scale(1.1);
        }

        .cultivo-info {
            padding: 20px;
        }

        .cultivo-info h3 {
            color: #2d3748;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .cultivo-info p {
            color: #718096;
            font-size: 14px;
            line-height: 1.5;
        }

        .hover-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(56, 66, 57, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .cultivo-card:hover .hover-overlay {
            opacity: 1;
        }

        .select-button {
            background: rgb(52, 156, 49);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }

        .select-button:hover {
            background: rgb(27, 106, 41);
            transform: scale(1.05);
        }

        @media (max-width: 768px) {
            .cultivos-grid {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }

            .header {
                margin-bottom: 30px;
            }

            h1 {
                font-size: 28px;
            }
        }

        .cultivos-seleccionados {
            margin-top: 40px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(118, 255, 162, 0.1);
        }

        .cultivo-seleccionado-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .cultivo-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .delete-button {
            background: none;
            border: none;
            color: #e53e3e;
            cursor: pointer;
            font-size: 18px;
            padding: 5px;
        }

        .cultivo-details {
            margin-bottom: 15px;
        }

        .tareas-list {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
        }

        .tarea-item {
            display: flex;
            align-items: center;
            padding: 8px 0;
            gap: 15px;
        }

        .tarea-fecha {
            min-width: 100px;
            color: #4a5568;
        }

        .tarea-tipo {
            flex: 1;
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 400px;
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .modal-buttons button {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .modal-buttons button:first-child {
            background: rgb(52, 156, 49);
            color: white;
        }

        .modal-buttons button:last-child {
            background: #e2e8f0;
        }
    `]
})
export class SeleccionCultivoComponent implements OnInit {
    cultivos: Cultivo[] = [];
    cultivoSeleccionado: Cultivo | null = null;
    mostrandoFormulario = false;
    nuevaFechaSiembra: string = '';
    fechaMaxima = new Date().toISOString().split('T')[0];
    private listaCultivosSeleccionados = new ListaCultivosSeleccionados();
    cultivosSeleccionados: CultivoSeleccionado[] = [];

    constructor(private cultivoService: CultivoService) {}

    ngOnInit() {
        this.cultivos = this.cultivoService.getCultivos();
        this.actualizarListaCultivosSeleccionados();
    }

    private actualizarListaCultivosSeleccionados() {
        this.cultivosSeleccionados = this.listaCultivosSeleccionados.obtenerTodos();
    }

    seleccionarCultivo(cultivo: Cultivo) {
        this.cultivoSeleccionado = cultivo;
        this.mostrandoFormulario = true;
        this.nuevaFechaSiembra = new Date().toISOString().split('T')[0];
    }

    agregarCultivo() {
        if (this.cultivoSeleccionado && this.nuevaFechaSiembra) {
            this.listaCultivosSeleccionados.agregar(
                this.cultivoSeleccionado,
                new Date(this.nuevaFechaSiembra)
            );
            this.actualizarListaCultivosSeleccionados();
            this.mostrandoFormulario = false;
            this.cultivoSeleccionado = null;
            this.nuevaFechaSiembra = '';
        }
    }

    eliminarCultivo(cultivo: Cultivo) {
        this.listaCultivosSeleccionados.eliminar(cultivo);
        this.actualizarListaCultivosSeleccionados();
    }

    cancelarAgregar() {
        this.mostrandoFormulario = false;
        this.cultivoSeleccionado = null;
        this.nuevaFechaSiembra = '';
    }

    obtenerProximasTareas(cultivoSeleccionado: CultivoSeleccionado): Tarea[] {
        const hoy = new Date();
        return cultivoSeleccionado.tareas
            .filter(tarea => tarea.fecha >= hoy)
            .slice(0, 5); // Mostrar solo las próximas 5 tareas
    }

    actualizarTarea(cultivoId: number, fecha: Date, tipo: 'riego' | 'fertilizacion', completada: boolean): void {
        this.listaCultivosSeleccionados.actualizarTarea(cultivoId, fecha, tipo, completada);
        this.actualizarListaCultivosSeleccionados();
    }

    onTareaChange(event: Event, cultivoId: number, fecha: Date, tipo: 'riego' | 'fertilizacion'): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        this.actualizarTarea(cultivoId, fecha, tipo, isChecked);
    }
} 