import { Cultivo } from './cultivo.model';

export interface Tarea {
    tipo: 'riego' | 'fertilizacion';
    fecha: Date;
    completada: boolean;
}

export interface CultivoSeleccionado {
    cultivo: Cultivo;
    fechaSiembra: Date;
    tareas: Tarea[];
}

class NodoCultivoSeleccionado {
    siguiente: NodoCultivoSeleccionado | null = null;
    anterior: NodoCultivoSeleccionado | null = null;

    constructor(public cultivoSeleccionado: CultivoSeleccionado) {}
}

export class ListaCultivosSeleccionados {
    private cabeza: NodoCultivoSeleccionado | null = null;
    private cola: NodoCultivoSeleccionado | null = null;
    private _longitud: number = 0;

    get longitud(): number {
        return this._longitud;
    }

    agregar(cultivo: Cultivo, fechaSiembra: Date): void {
        const tareas = this.generarTareas(cultivo, fechaSiembra);
        const cultivoSeleccionado: CultivoSeleccionado = {
            cultivo,
            fechaSiembra,
            tareas
        };

        const nuevoNodo = new NodoCultivoSeleccionado(cultivoSeleccionado);

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

    eliminar(cultivo: Cultivo): void {
        let actual = this.cabeza;

        while (actual) {
            if (actual.cultivoSeleccionado.cultivo.id === cultivo.id) {
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

                this._longitud--;
                break;
            }
            actual = actual.siguiente;
        }
    }

    obtenerTodos(): CultivoSeleccionado[] {
        const cultivosSeleccionados: CultivoSeleccionado[] = [];
        let actual = this.cabeza;

        while (actual) {
            cultivosSeleccionados.push(actual.cultivoSeleccionado);
            actual = actual.siguiente;
        }

        return cultivosSeleccionados;
    }

    private generarTareas(cultivo: Cultivo, fechaSiembra: Date): Tarea[] {
        const tareas: Tarea[] = [];
        const tiempoCosechaEnDias = parseInt(cultivo.tiempoCosecha);
        const fechaFinal = new Date(fechaSiembra);
        fechaFinal.setDate(fechaFinal.getDate() + tiempoCosechaEnDias);

        // Generar tareas de riego
        let fechaRiego = new Date(fechaSiembra);
        while (fechaRiego <= fechaFinal) {
            tareas.push({
                tipo: 'riego',
                fecha: new Date(fechaRiego),
                completada: false
            });
            fechaRiego.setDate(fechaRiego.getDate() + cultivo.tareas.riego);
        }

        // Generar tareas de fertilización
        let fechaFertilizacion = new Date(fechaSiembra);
        while (fechaFertilizacion <= fechaFinal) {
            tareas.push({
                tipo: 'fertilizacion',
                fecha: new Date(fechaFertilizacion),
                completada: false
            });
            fechaFertilizacion.setDate(fechaFertilizacion.getDate() + cultivo.tareas.fertilizacion);
        }

        // Ordenar tareas por fecha
        return tareas.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    }

    actualizarTarea(cultivoId: number, fecha: Date, tipo: 'riego' | 'fertilizacion', completada: boolean): void {
        let actual = this.cabeza;

        while (actual) {
            if (actual.cultivoSeleccionado.cultivo.id === cultivoId) {
                const tarea = actual.cultivoSeleccionado.tareas.find(
                    t => t.tipo === tipo && t.fecha.getTime() === fecha.getTime()
                );
                if (tarea) {
                    tarea.completada = completada;
                }
                break;
            }
            actual = actual.siguiente;
        }
    }
} 