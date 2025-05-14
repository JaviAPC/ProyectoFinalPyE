import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <main>
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [`
        main {
            min-height: 100vh;
            background-color: #f5f7fa;
        }
    `]
})
export class AppComponent {
    title = 'Sistema de Monitoreo y Predicción de Cosechas';
}
