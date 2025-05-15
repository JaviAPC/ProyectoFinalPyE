import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListaCultivosAgregados, NodoCultivoAgregado } from '../../models/cultivo-agregado.model';

@Component({
    selector: 'app-lista-cosechas',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="lista-cosechas-container">
            <h2>Lista de Cosechas</h2>
            
            <button class="volver-btn" (click)="volver()">Volver a Selección</button>

            @if (cultivos.length === 0) {
                <div class="no-cosechas">
                    <p>No hay cosechas seleccionadas</p>
                </div>
            } @else {
                <div class="lista-vertical">
                    @for (cultivo of cultivos; track cultivo.id) {
                        <div class="cosecha-item">
                            <div class="cosecha-info">
                                <img [src]="cultivo.imagen" 
                                     [alt]="cultivo.nombreCultivo"
                                     (error)="handleImageError($event)">
                                <div class="cosecha-detalles">
                                    <h3>{{ cultivo.nombreCultivo }}</h3>
                                    <p>Fecha de siembra: {{ cultivo.fechaSiembra | date:'dd/MM/yyyy' }}</p>
                                </div>
                            </div>
                            <button class="eliminar-btn" (click)="eliminarCultivo(cultivo.id)">
                                Eliminar
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    `,
    styles: [`
        .lista-cosechas-container {
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }

        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 2rem;
        }

        .volver-btn {
            display: block;
            margin: 0 auto 2rem;
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .volver-btn:hover {
            background-color: #2980b9;
        }

        .no-cosechas {
            text-align: center;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .lista-vertical {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .cosecha-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cosecha-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .cosecha-info img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }

        .cosecha-detalles h3 {
            margin: 0;
            color: #2c3e50;
        }

        .cosecha-detalles p {
            margin: 0.5rem 0 0;
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
export class ListaCosechasComponent implements OnInit {
    cultivos: NodoCultivoAgregado[] = [];
    private listaCultivos = new ListaCultivosAgregados();

    constructor(private router: Router) {}

    ngOnInit() {
        this.actualizarLista();
    }

    actualizarLista() {
        this.cultivos = this.listaCultivos.obtenerTodos();
    }

    handleImageError(event: ErrorEvent) {
        const imgElement = event.target as HTMLImageElement;
        imgElement.style.display = 'none';
    }

    eliminarCultivo(id: number) {
        this.listaCultivos.eliminar(id);
        this.actualizarLista();
    }

    volver() {
        this.router.navigate(['/seleccion-cultivo']);
    }
} 