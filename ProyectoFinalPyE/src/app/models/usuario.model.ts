export interface Usuario {
    id?: string;
    email: string;
    nombre: string;
    apellido: string;
    password?: string;
    rol?: string;
    activo?: boolean;
}

// Implementación de Lista Circular Doble para Usuarios
export class NodoUsuario {
    constructor(
        public usuario: Usuario,
        public siguiente: NodoUsuario | null = null,
        public anterior: NodoUsuario | null = null
    ) {}
}

export class ListaCircularUsuarios {
    private cabeza: NodoUsuario | null = null;
    private _longitud: number = 0;

    get longitud(): number {
        return this._longitud;
    }

    agregar(usuario: Usuario): void {
        const nuevoNodo = new NodoUsuario(usuario);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            nuevoNodo.siguiente = nuevoNodo;
            nuevoNodo.anterior = nuevoNodo;
        } else {
            const ultimo = this.cabeza.anterior!;
            nuevoNodo.siguiente = this.cabeza;
            nuevoNodo.anterior = ultimo;
            ultimo.siguiente = nuevoNodo;
            this.cabeza.anterior = nuevoNodo;
        }
        this._longitud++;
    }

    buscarPorEmail(email: string): Usuario | null {
        if (!this.cabeza) return null;
        
        let actual = this.cabeza;
        do {
            if (actual.usuario.email === email) {
                return actual.usuario;
            }
            actual = actual.siguiente!;
        } while (actual !== this.cabeza);
        
        return null;
    }
} 