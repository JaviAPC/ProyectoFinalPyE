import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-cultivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-cultivo.component.html',
  styleUrls: ['./seleccion-cultivo.component.css']
})
export class SeleccionCultivoComponent {
  cultivos: string[] = ['Papa', 'Choclo', 'Arveja'];
  cultivoSeleccionado: string = 'Seleccione el cultivo';
  menuAbierto: boolean = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarCultivo(cultivo: string) {
    this.cultivoSeleccionado = cultivo;
    this.menuAbierto = false;
  }
}

