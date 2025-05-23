import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing-container">
      <nav class="navbar">
        <div class="nav-content">
          <div class="logo-section">
            <img src="https://media.licdn.com/dms/image/v2/C4D33AQGgA2kIGLnZUw/productpage-image_1128_635/productpage-image_1128_635/0/1627372218120/uptodate_developers_agroapp_image?e=2147483647&v=beta&t=M271evadRZ0pLpM38fEsDk5yTkLYXQgND36eOfmAxOk" alt="AgroApp Logo" class="logo">
            <span class="logo-text"></span>
          </div>
          <div class="nav-links">
            <a (click)="toggleAboutUs()">Sobre Nosotros</a>
            <a routerLink="/clima">🌦️ Clima</a>
            <a (click)="toggleContacts()">Contactos</a>
            <button routerLink="/login" class="login-btn">Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="main-content">
        <div class="left-section">
          <h1>Gestión Agrícola<br>Inteligente</h1>
          <p class="subtitle">Optimiza tus cultivos con tecnología avanzada y seguimiento en tiempo real. La solución completa para agricultores modernos.</p>
          <button routerLink="/registro" class="register-btn">COMENZAR AHORA</button>
        </div>
        <div class="right-section">
          <div class="carousel">
            <div class="carousel-inner" [style.transform]="'translateX(' + (-currentSlide * 100) + '%)'">
              <img src="https://img.freepik.com/fotos-premium/granjero-admira-su-campo-maiz-al-atardecer_1040433-2154.jpg?semt=ais_hybrid&w=740" alt="Agricultura 1" class="carousel-image">
              <img src="https://img.freepik.com/foto-gratis/paisaje-soleado-pradera_1112-134.jpg?semt=ais_hybrid&w=740" alt="Agricultura 2" class="carousel-image">
              <img src="https://i0.wp.com/www.hablemosdelcampo.com/wp-content/uploads/2018/08/37121847_m.jpg?fit=2508%2C1672&ssl=1" alt="Agricultura 3" class="carousel-image">
              <img src="https://st4.depositphotos.com/1480128/38052/i/450/depositphotos_380529538-stock-photo-tractor-spraying-pesticides-soy-field.jpg" alt="Agricultura 4" class="carousel-image">
            </div>
            <button class="carousel-btn prev" (click)="prevSlide()">&lt;</button>
            <button class="carousel-btn next" (click)="nextSlide()">&gt;</button>
            <div class="carousel-dots">
              <span *ngFor="let dot of [0,1,2,3]; let i = index" 
                    class="dot" 
                    [class.active]="i === currentSlide"
                    (click)="goToSlide(i)">
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <div *ngIf="showAboutUs" class="modal">
        <div class="modal-content">
          <span class="close" (click)="toggleAboutUs()">&times;</span>
          <h2>Sobre Nosotros</h2>
          <p>Bienvenido a AgroApp, una plataforma pensada para apoyar a pequeños y medianos productores agrícolas en la gestión eficiente de sus cultivos.</p>
          <p>Nuestro objetivo es facilitar el seguimiento, planificación y toma de decisiones en los procesos agrícolas mediante una herramienta digital intuitiva, segura y accesible.</p>
          <p>En AgroApp creemos que la tecnología debe estar al servicio del campo. Por eso, desarrollamos soluciones que permiten a los agricultores:</p>
          <ul>
            <li>Registrar y consultar fácilmente sus cultivos.</li>
            <li>Llevar control de siembras, cosechas y otros procesos.</li>
            <li>Mejorar la productividad y sostenibilidad de sus tierras.</li>
          </ul>
          <p>Trabajamos junto a expertos del agro y de la tecnología para ofrecer un servicio que se adapte a tus necesidades. Ya sea que cultives papa, arveja, choclo o cualquier otro producto, estamos aquí para ayudarte.</p>
          <p>¡Únete a nosotros y transforma tu forma de trabajar el campo!</p>
        </div>
      </div>

      <div *ngIf="showContacts" class="modal">
        <div class="modal-content">
          <span class="close" (click)="toggleContacts()">&times;</span>
          <h2>Contactos</h2>
          <p>Para mayor información y para soporte comunicarse a los siguientes números:</p>
          <ul>
            <li>3147920341 - Javier Pantoja (Desarrollador frontend)</li>
            <li>3205383763 - Sergio Florez (Desarrollador frontend)</li>
            <li>3244244267 - Jose Tasco (Desarrollador backend)</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
      background-color:rgb(242, 255, 244);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* Navbar Styles */
    .navbar {
      background-color:rgb(235, 235, 235);
      padding: 1rem 2rem;
      box-shadow: 0 2px 10px rgb(118, 255, 162);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .logo-text {
      font-size: 1.5rem;
      color: #4a4a8a;
      font-weight: 600;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-links a {
      color: #4a4a8a;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: #6b4ce6;
    }

    .login-btn {
      background-color: rgb(52, 156, 49);
      color: white;
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-btn:hover {
      background-color: rgb(27, 106, 41);
    }

    /* Main Content Styles */
    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      display: flex;
      align-items: center;
      gap: 4rem;
    }

    .left-section {
      flex: 1;
    }

    h1 {
      font-size: 3.5rem;
      color: #2d2d5f;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .register-btn {
      background-color: rgb(52, 156, 49);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s, background-color 0.3s;
    }

    .register-btn:hover {
      background-color: rgb(27, 106, 41);
      transform: translateY(-2px);
    }

    .right-section {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .hero-image {
      max-width: 100%;
      height: auto;
    }

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      padding: 2rem;
      border-radius: 15px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }

    .close {
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    h2 {
      color: #2d2d5f;
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    li {
      color: #666;
      margin-bottom: 0.5rem;
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .main-content {
        flex-direction: column;
        text-align: center;
        padding: 2rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      .nav-content {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        flex-direction: column;
        gap: 1rem;
      }

      .hero-image {
        margin-top: 2rem;
      }
    }

    /* Carousel Styles */
    .carousel {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .carousel-inner {
      display: flex;
      transition: transform 0.5s ease-in-out;
      height: 100%;
    }

    .carousel-image {
      width: 100%;
      flex-shrink: 0;
      object-fit: cover;
      height: 100%;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.7);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }

    .carousel-btn:hover {
      background: rgba(255, 255, 255, 0.9);
    }

    .prev {
      left: 10px;
    }

    .next {
      right: 10px;
    }

    .carousel-dots {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(177, 177, 177, 0.5);
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .dot.active {
      background: white;
    }
  `]
})
export class LandingComponent {
  showAboutUs = false;
  showContacts = false;
  currentSlide = 0;
  totalSlides = 4;

  toggleAboutUs() {
    this.showAboutUs = !this.showAboutUs;
    this.showContacts = false;
  }

  toggleContacts() {
    this.showContacts = !this.showContacts;
    this.showAboutUs = false;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  ngOnInit() {
    // Auto-avance del carrusel cada 5 segundos
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
} 