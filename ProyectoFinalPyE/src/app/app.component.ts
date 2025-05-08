import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionCultivoComponent } from "./seleccion-cultivo/seleccion-cultivo.component";  // Asegúrate de importar CommonModule

@Component({
  selector: 'app-root',
  standalone: true,  // Si es un componente standalone
  imports: [CommonModule, SeleccionCultivoComponent],  // Asegúrate de agregar CommonModule en imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
