export class NodoCultivoAgregado {
    siguiente: NodoCultivoAgregado | null = null;
    anterior: NodoCultivoAgregado | null = null;

    constructor(
        public id: number,
        public nombreCultivo: string,
        public fechaSiembra: Date,
        public imagen: string
    ) {}
}

export class ListaCultivosAgregados {
    cabeza: NodoCultivoAgregado | null = null;
    cola: NodoCultivoAgregado | null = null;
    private contadorId: number = 1;

    agregar(nombreCultivo: string, fechaSiembra: Date, imagen: string): NodoCultivoAgregado {
        const nuevoNodo = new NodoCultivoAgregado(this.contadorId++, nombreCultivo, fechaSiembra, imagen);

        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.anterior = this.cola;
            this.cola!.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }

        return nuevoNodo;
    }

    eliminar(id: number): boolean {
        let actual = this.cabeza;

        while (actual) {
            if (actual.id === id) {
                if (actual.anterior) {
                    actual.anterior.siguiente = actual.siguiente;
                } else {
                    this.cabeza = actual.siguiente;
                }

                if (actual.siguiente) {
                    actual.siguiente.anterior = actual.anterior;
                } else {
                    this.cola = actual.anterior;
                }

                return true;
            }
            actual = actual.siguiente;
        }

        return false;
    }

    obtenerTodos(): NodoCultivoAgregado[] {
        const cultivos: NodoCultivoAgregado[] = [];
        let actual = this.cabeza;

        while (actual) {
            cultivos.push(actual);
            actual = actual.siguiente;
        }

        return cultivos;
    }
} 