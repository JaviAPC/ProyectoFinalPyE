import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, Ciudad, RecomendacionAgricola } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="weather-container">
      <div class="location-selector">
        <h3>Selecciona una ciudad</h3>
        <div class="selector-controls">
          <select [(ngModel)]="selectedCity" (change)="onCityChange()" class="city-select">
            <option [ngValue]="null">Selecciona una ciudad</option>
            <option *ngFor="let ciudad of ciudades" [ngValue]="ciudad">
              {{ ciudad.nombre }}
            </option>
          </select>
          <button (click)="useCurrentLocation()" class="location-btn">
            📍 Usar mi ubicación
          </button>
        </div>
      </div>

      <!-- Alertas Meteorológicas -->
      <div class="alerts-section" *ngIf="alertas.length > 0">
        <div class="alert" *ngFor="let alerta of alertas">
          {{ alerta }}
        </div>
      </div>

      <div class="weather-card" *ngIf="weatherData">
        <h2>{{ getWeatherEmoji(weatherData.current.weather_code) }} Clima en {{ currentLocation }}</h2>
        <div class="weather-info">
          <div class="weather-main">
            <div class="temperature">
              {{ weatherData.current.temperature_2m }}°C
            </div>
            <div class="description">
              {{ getWeatherDescription(weatherData.current.weather_code) }}
            </div>
          </div>

          <div class="weather-details">
            <div class="detail-item">
              <span class="label">💧 Humedad:</span>
              <span class="value">{{ weatherData.current.relative_humidity_2m }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">💨 Viento:</span>
              <span class="value">{{ weatherData.current.wind_speed_10m }} km/h {{ getWindDirection(weatherData.current.wind_direction_10m) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">🌧️ Precipitación:</span>
              <span class="value">{{ weatherData.current.precipitation }} mm</span>
            </div>
            <div class="detail-item">
              <span class="label">☁️ Nubosidad:</span>
              <span class="value">{{ weatherData.current.cloud_cover }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">🌡️ Presión:</span>
              <span class="value">{{ weatherData.current.pressure_msl }} hPa</span>
            </div>
            <div class="detail-item">
              <span class="label">🕒 Actualizado:</span>
              <span class="value">{{ weatherData.current.time | date:'shortTime' }}</span>
            </div>
          </div>

          <!-- Gráfico de temperatura por hora -->
          <div class="hourly-chart">
            <h3>Temperatura durante el día</h3>
            <div class="chart-container">
              <div class="hour-bar" *ngFor="let temp of weatherData.hourly.temperature_2m.slice(0, 24); let i = index"
                   [style.height]="getBarHeight(temp) + '%'"
                   [class.current-hour]="isCurrentHour(i)">
                <div class="temp-label">{{ temp }}°</div>
                <div class="hour-label">{{ i }}:00</div>
              </div>
            </div>
          </div>

          <!-- Pronóstico para los próximos días -->
          <div class="forecast-section">
            <h3>Pronóstico próximos días</h3>
            <div class="forecast-grid">
              <div class="forecast-day" *ngFor="let time of weatherData.daily.time; let i = index">
                <div class="forecast-date">{{ time | date:'EEE d' }}</div>
                <div class="forecast-icon">{{ getWeatherEmoji(weatherData.daily.weather_code[i]) }}</div>
                <div class="forecast-temps">
                  <span class="max-temp">{{ weatherData.daily.temperature_2m_max[i] }}°</span>
                  <span class="min-temp">{{ weatherData.daily.temperature_2m_min[i] }}°</span>
                </div>
                <div class="forecast-rain">
                  <span class="rain-prob">{{ weatherData.daily.precipitation_probability_max[i] }}%</span>
                  <span class="rain-icon">💧</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recomendaciones para agricultores -->
          <div class="recommendations-section">
            <h3>🌱 Recomendaciones para agricultores</h3>
            <div class="recommendations-grid">
              <div class="recommendation-card" *ngFor="let rec of recomendaciones">
                <div class="rec-header">
                  <span class="rec-icon">{{ rec.icono }}</span>
                  <span class="rec-condition">{{ rec.condicion }}</span>
                </div>
                <p class="rec-description">{{ rec.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="isLoading">
        Cargando información del clima...
      </div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .weather-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: linear-gradient(135deg, rgb(242, 255, 244) 0%, rgb(235, 255, 237) 100%);
      gap: 2rem;
    }

    .alerts-section {
      width: 100%;
      max-width: 500px;
    }

    .alert {
      background: rgba(255, 87, 87, 0.1);
      border-left: 4px solid #ff5757;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 0 8px 8px 0;
      color: #d32f2f;
      font-weight: 500;
    }

    .location-selector {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
      width: 100%;
      max-width: 500px;
      text-align: center;
    }

    .selector-controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }

    .city-select {
      padding: 0.5rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 1rem;
      min-width: 200px;
      background: white;
    }

    .location-btn {
      padding: 0.5rem 1rem;
      background: rgb(52, 156, 49);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .location-btn:hover {
      background: rgb(27, 106, 41);
    }

    .weather-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
      backdrop-filter: blur(10px);
      width: 100%;
      max-width: 500px;
    }

    .hourly-chart {
      margin-top: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
    }

    .chart-container {
      display: flex;
      align-items: flex-end;
      height: 200px;
      gap: 4px;
      padding: 1rem 0;
      overflow-x: auto;
    }

    .hour-bar {
      flex: 1;
      min-width: 30px;
      background: rgb(52, 156, 49);
      border-radius: 4px 4px 0 0;
      position: relative;
      transition: height 0.3s;
    }

    .hour-bar.current-hour {
      background: #3182ce;
    }

    .temp-label {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: #4a5568;
    }

    .hour-label {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: #4a5568;
    }

    .recommendations-section {
      margin-top: 2rem;
    }

    .recommendations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .recommendation-card {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      padding: 1rem;
    }

    .rec-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .rec-icon {
      font-size: 1.5rem;
    }

    .rec-condition {
      font-weight: 600;
      color: #2d3748;
    }

    .rec-description {
      color: #4a5568;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    h2, h3 {
      color: #2d3748;
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .weather-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .weather-main {
      text-align: center;
    }

    .temperature {
      font-size: 4rem;
      font-weight: bold;
      color: #2d3748;
      line-height: 1;
    }

    .description {
      font-size: 1.5rem;
      color: #4a5568;
      margin-top: 0.5rem;
    }

    .weather-details {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      padding: 1rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .label {
      color: #4a5568;
      font-weight: 500;
    }

    .value {
      color: #2d3748;
      font-weight: 600;
    }

    .forecast-section {
      margin-top: 1rem;
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      padding: 1rem;
    }

    .forecast-day {
      text-align: center;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
    }

    .forecast-date {
      font-size: 0.9rem;
      color: #4a5568;
      font-weight: 500;
    }

    .forecast-icon {
      font-size: 1.5rem;
      margin: 0.5rem 0;
    }

    .forecast-temps {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .max-temp {
      color: #e53e3e;
      font-weight: 600;
    }

    .min-temp {
      color: #3182ce;
      font-weight: 600;
    }

    .forecast-rain {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }

    .rain-prob {
      color: #4a5568;
    }

    .rain-icon {
      font-size: 0.8rem;
    }

    .loading {
      text-align: center;
      color: #4a5568;
      font-size: 1.2rem;
      padding: 2rem;
    }

    .error {
      color: #e53e3e;
      text-align: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      margin-top: 1rem;
      max-width: 500px;
    }

    @media (max-width: 640px) {
      .weather-card, .location-selector {
        padding: 1.5rem;
      }

      .selector-controls {
        flex-direction: column;
      }

      .temperature {
        font-size: 3rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .forecast-grid {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 0.5rem;
      }

      .chart-container {
        height: 150px;
      }

      .hour-bar {
        min-width: 40px;
      }

      .recommendations-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  error: string | null = null;
  isLoading = false;
  ciudades: Ciudad[] = [];
  selectedCity: Ciudad | null = null;
  currentLocation = 'Pasto';
  recomendaciones: RecomendacionAgricola[] = [];
  alertas: string[] = [];

  constructor(private weatherService: WeatherService) {
    this.ciudades = this.weatherService.getCiudades();
    // Establecer Pasto como ciudad por defecto
    this.selectedCity = this.ciudades.find(c => c.nombre === 'Pasto') || null;
  }

  ngOnInit() {
    if (this.selectedCity) {
      this.getWeatherForCity(this.selectedCity);
    }
  }

  onCityChange() {
    if (this.selectedCity) {
      this.getWeatherForCity(this.selectedCity);
    }
  }

  getWeatherForCity(ciudad: Ciudad) {
    this.isLoading = true;
    this.error = null;
    this.currentLocation = ciudad.nombre;

    this.weatherService.getWeather(ciudad.lat, ciudad.lon).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.recomendaciones = this.weatherService.getRecomendacionesAgricolas(data);
        this.alertas = this.weatherService.getAlertasMeteorologicas(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la información del clima. Por favor, intenta más tarde.';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  useCurrentLocation() {
    if (!navigator.geolocation) {
      this.error = 'Tu navegador no soporta la geolocalización.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.selectedCity = null;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentLocation = 'tu ubicación';
        this.weatherService.getWeather(
          position.coords.latitude,
          position.coords.longitude
        ).subscribe({
          next: (data) => {
            this.weatherData = data;
            this.recomendaciones = this.weatherService.getRecomendacionesAgricolas(data);
            this.alertas = this.weatherService.getAlertasMeteorologicas(data);
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Error al obtener el clima para tu ubicación.';
            this.isLoading = false;
          }
        });
      },
      (err) => {
        this.error = 'No se pudo obtener tu ubicación. Por favor, selecciona una ciudad de la lista.';
        this.isLoading = false;
      }
    );
  }

  getBarHeight(temp: number): number {
    const minTemp = Math.min(...this.weatherData.hourly.temperature_2m);
    const maxTemp = Math.max(...this.weatherData.hourly.temperature_2m);
    const range = maxTemp - minTemp;
    return ((temp - minTemp) / range) * 100;
  }

  isCurrentHour(hour: number): boolean {
    return new Date().getHours() === hour;
  }

  getWeatherDescription(code: number): string {
    return this.weatherService.getWeatherDescription(code);
  }

  getWeatherEmoji(code: number): string {
    return this.weatherService.getWeatherEmoji(code);
  }

  getWindDirection(degrees: number): string {
    return this.weatherService.getWindDirection(degrees);
  }
} 