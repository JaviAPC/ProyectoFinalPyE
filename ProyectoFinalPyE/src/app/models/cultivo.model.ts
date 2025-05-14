export interface Cultivo {
    id: number;
    nombre: string;
    descripcion: string;
    tiempoCosecha: number;
    temperaturaOptima: number;
    humedad: number;
    imagen: string;
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
} 