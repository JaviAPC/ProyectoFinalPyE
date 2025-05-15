import { Injectable } from '@angular/core';
import { Cultivo } from '../models/cultivo.model';

@Injectable({
    providedIn: 'root'
})
export class CultivoService {
    private cultivos: Cultivo[] = [
        {
            id: 1,
            nombre: 'Papa',
            descripcion: 'Cultivo tradicional de papa, ideal para climas templados.',
            imagen: 'https://exitocol.vtexassets.com/arquivos/ids/27293480/Papa-Pastusa-A-Granel-X180gr-1544_a.jpg?v=638804050692200000',
            temperaturaOptima: '15-20°C',
            tiempoCosecha: '135 días aprox.',
            humedad: 75,
            tareas: {
                riego: 4,
                fertilizacion: 15
            }
        },
        {
            id: 2,
            nombre: 'Arveja',
            descripcion: 'Cultivo de arveja, excelente para rotación de cultivos.',
            imagen: 'https://vaquitaexpress.com.co/media/catalog/product/cache/e89ece728e3939ca368b457071d3c0be/1/2/123_33.jpg',
            temperaturaOptima: '13-18°C',
            tiempoCosecha: '50 días aprox.',
            humedad: 70,
            tareas: {
                riego: 3,
                fertilizacion: 12
            }
        },
        {
            id: 3,
            nombre: 'Choclo',
            descripcion: 'Cultivo de choclo, requiere suelos bien drenados.',
            imagen: 'https://ecommerce.surtifamiliar.com/backend/admin/backend/web/archivosDelCliente/items/images/20230210111017-Verduras-Verduras-a-Granel-Choclo-Capacho-xund-9418202302101110175041.jpg',
            temperaturaOptima: '20-25°C',
            tiempoCosecha: '115 días aprox.',
            humedad: 65,
            tareas: {
                riego: 5,
                fertilizacion: 14
            }
        }
    ];

    getCultivos(): Cultivo[] {
        return this.cultivos;
    }

    getCultivoPorId(id: number): Cultivo | undefined {
        return this.cultivos.find(c => c.id === id);
    }
} 