import { Injectable } from '@angular/core';
import { Cultivo, ListaCultivos } from '../models/cultivo.model';

@Injectable({
    providedIn: 'root'
})
export class CultivoService {
    private listaCultivos: ListaCultivos = new ListaCultivos();

    constructor() {
        // Inicializar con datos de ejemplo
        this.inicializarCultivos();
    }

    private inicializarCultivos(): void {
        const cultivos: Cultivo[] = [
            {
                id: 1,
                nombre: 'Papa',
                descripcion: 'Tubérculo resistente y versátil, ideal para climas fríos y templados. Requiere suelos bien drenados y ricos en materia orgánica.',
                tiempoCosecha: 120,
                temperaturaOptima: 18,
                humedad: 75,
                imagen: 'https://exitocol.vtexassets.com/arquivos/ids/27293480/Papa-Pastusa-A-Granel-X180gr-1544_a.jpg?v=638804050692200000'
            },
            {
                id: 2,
                nombre: 'Arveja',
                descripcion: 'Leguminosa rica en proteínas, perfecta para rotación de cultivos. Mejora la calidad del suelo fijando nitrógeno.',
                tiempoCosecha: 90,
                temperaturaOptima: 16,
                humedad: 70,
                imagen: 'https://www.nutricionyentrenamiento.fit/images/alimento/246.jpg'
            },
            {
                id: 3,
                nombre: 'Choclo',
                descripcion: 'Maíz tierno y nutritivo, adaptable a diversos climas. Requiere buena exposición solar y suelos fértiles.',
                tiempoCosecha: 150,
                temperaturaOptima: 22,
                humedad: 65,
                imagen: 'https://ecommerce.surtifamiliar.com/backend/admin/backend/web/archivosDelCliente/items/images/20230210111017-Verduras-Verduras-a-Granel-Choclo-Capacho-xund-9418202302101110175041.jpg'
            }
        ];

        cultivos.forEach(cultivo => this.listaCultivos.agregar(cultivo));
    }

    getCultivos(): Cultivo[] {
        return this.listaCultivos.obtenerTodos();
    }

    getCultivoPorId(id: number): Cultivo | null {
        const cultivos = this.listaCultivos.obtenerTodos();
        return cultivos.find(c => c.id === id) || null;
    }
} 