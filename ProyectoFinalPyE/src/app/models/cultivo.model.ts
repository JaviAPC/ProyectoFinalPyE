export interface Cultivo {
    id: number;
    nombre: string;
    descripcion: string;
    tiempoCosecha: string;
    temperaturaOptima: string;
    humedad: number;
    imagen: string;
    tareas: {
        riego: number; // días entre riegos
        fertilizacion: number; // días entre fertilizaciones
    };
}

// Implementación de Lista Doblemente Enlazada para Cultivos
export class NodoCultivo {
    constructor(
        public cultivo: Cultivo,
        public siguiente: NodoCultivo | null = null,
        public anterior: NodoCultivo | null = null
    ) {}
}

export class ListaCultivos {
    private cabeza: NodoCultivo | null = null;
    private cola: NodoCultivo | null = null;
    private _longitud: number = 0;
    private cultivos: Cultivo[] = [
        {
            id: 1,
            nombre: 'Papa',
            descripcion: 'Cultivo de papa',
            imagen: 'assets/papa.jpg',
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
            descripcion: 'Cultivo de arveja',
            imagen: 'assets/arveja.jpg',
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
            descripcion: 'Cultivo de choclo',
            imagen: 'assets/choclo.jpg',
            temperaturaOptima: '20-25°C',
            tiempoCosecha: '115 días aprox.',
            humedad: 65,
            tareas: {
                riego: 5,
                fertilizacion: 14
            }
        }
    ];

    get longitud(): number {
        return this._longitud;
    }

    agregar(cultivo: Cultivo): void {
        const nuevoNodo = new NodoCultivo(cultivo);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.anterior = this.cola;
            this.cola!.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this._longitud++;
    }

    obtenerTodos(): Cultivo[] {
        const cultivos: Cultivo[] = [];
        let actual = this.cabeza;
        while (actual) {
            cultivos.push(actual.cultivo);
            actual = actual.siguiente;
        }
        return cultivos;
    }

    getCultivos(): Cultivo[] {
        return this.cultivos;
    }

    getCultivoPorId(id: number): Cultivo | undefined {
        return this.cultivos.find(c => c.id === id);
    }
} 