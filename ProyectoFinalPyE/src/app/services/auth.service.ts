import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private usuarioActual = new BehaviorSubject<Usuario | null>(null);
    private readonly STORAGE_KEY = 'usuario_actual';

    constructor(private http: HttpClient) {
        // Intentar recuperar la sesión del usuario
        const usuarioGuardado = localStorage.getItem(this.STORAGE_KEY);
        if (usuarioGuardado) {
            this.usuarioActual.next(JSON.parse(usuarioGuardado));
        }
    }

    login(credentials: {email: string, password: string}) {
        return this.http.post(`${this.apiUrl}/usuarios/login`, credentials);
    }

    register(userData: any) {
        return this.http.post(`${this.apiUrl}/usuarios`, userData);
    }

    logout(): void {
        this.usuarioActual.next(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }

    getCurrentUser() {
        return this.usuarioActual.value;
    }

    getUsuarioActual(): Observable<Usuario | null> {
        return this.usuarioActual.asObservable();
    }

    estaAutenticado(): boolean {
        return this.usuarioActual.value !== null;
    }

    verificarEmail(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/usuarios/verificar-email/${email}`);
    }
} 