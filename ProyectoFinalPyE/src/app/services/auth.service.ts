import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, ListaCircularUsuarios } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private listaUsuarios = new ListaCircularUsuarios();
    private usuarioActual = new BehaviorSubject<Usuario | null>(null);

    constructor() {
        // Inicializar con un usuario de prueba
        this.listaUsuarios.agregar({
            id: 1,
            nombre: 'Usuario Prueba',
            email: 'test@test.com',
            password: '123456',
            tipoAgricultor: 'pequeño'
        });
    }

    login(email: string, password: string): boolean {
        const usuario = this.listaUsuarios.buscarPorEmail(email);
        if (usuario && usuario.password === password) {
            this.usuarioActual.next(usuario);
            return true;
        }
        return false;
    }

    registro(usuario: Usuario): boolean {
        if (this.listaUsuarios.buscarPorEmail(usuario.email)) {
            return false; // El usuario ya existe
        }
        usuario.id = Date.now(); // Generar un ID único
        this.listaUsuarios.agregar(usuario);
        return true;
    }

    logout(): void {
        this.usuarioActual.next(null);
    }

    getUsuarioActual(): Observable<Usuario | null> {
        return this.usuarioActual.asObservable();
    }

    estaAutenticado(): boolean {
        return this.usuarioActual.value !== null;
    }
} 