import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUser = 'usuario';
  private readonly validPassword = 'contraseña';

  constructor() { }

  login(username: string, password: string): boolean {
    return username === this.validUser && password === this.validPassword;
  }
}
