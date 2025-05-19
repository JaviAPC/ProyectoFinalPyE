import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    precipitation: number;
    cloud_cover: number;
    pressure_msl: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
}

export interface Ciudad {
  nombre: string;
  lat: number;
  lon: number;
}

export interface RecomendacionAgricola {
  condicion: string;
  descripcion: string;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  private ciudadesColombia: Ciudad[] = [
    { nombre: 'Pasto', lat: 1.2136, lon: -77.2811 },
    { nombre: 'Bogotá', lat: 4.6097, lon: -74.0817 },
    { nombre: 'Medellín', lat: 6.2442, lon: -75.5812 },
    { nombre: 'Cali', lat: 3.4516, lon: -76.5320 },
    { nombre: 'Barranquilla', lat: 10.9685, lon: -74.7813 },
    { nombre: 'Cartagena', lat: 10.3932, lon: -75.4832 },
    { nombre: 'Tunja', lat: 5.5446, lon: -73.3572 },
    { nombre: 'Popayán', lat: 2.4448, lon: -76.6147 }
  ];

  constructor(private http: HttpClient) { }

  getCiudades(): Ciudad[] {
    return this.ciudadesColombia;
  }

  getWeather(latitude: number, longitude: number): Observable<WeatherResponse> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,cloud_cover,pressure_msl',
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
      timezone: 'auto'
    };

    return this.http.get<WeatherResponse>(this.baseUrl, { params });
  }

  getRecomendacionesAgricolas(weatherData: WeatherResponse): RecomendacionAgricola[] {
    const recomendaciones: RecomendacionAgricola[] = [];
    const current = weatherData.current;
    const precipProb = weatherData.daily.precipitation_probability_max[0];

    // Recomendaciones basadas en temperatura
    if (current.temperature_2m > 30) {
      recomendaciones.push({
        condicion: 'Temperatura alta',
        descripcion: 'Considere riego adicional y protección contra el sol para los cultivos.',
        icono: '☀️'
      });
    } else if (current.temperature_2m < 10) {
      recomendaciones.push({
        condicion: 'Temperatura baja',
        descripcion: 'Proteja los cultivos sensibles contra las bajas temperaturas.',
        icono: '❄️'
      });
    }

    // Recomendaciones basadas en humedad
    if (current.relative_humidity_2m > 80) {
      recomendaciones.push({
        condicion: 'Alta humedad',
        descripcion: 'Riesgo de enfermedades fúngicas. Considere aplicar fungicidas preventivos.',
        icono: '💧'
      });
    } else if (current.relative_humidity_2m < 30) {
      recomendaciones.push({
        condicion: 'Baja humedad',
        descripcion: 'Aumente el riego para mantener la humedad del suelo.',
        icono: '🌱'
      });
    }

    // Recomendaciones basadas en probabilidad de lluvia
    if (precipProb > 70) {
      recomendaciones.push({
        condicion: 'Alta probabilidad de lluvia',
        descripcion: 'Evite la aplicación de agroquímicos. Prepare el drenaje del terreno.',
        icono: '🌧️'
      });
    }

    // Recomendaciones basadas en viento
    if (current.wind_speed_10m > 20) {
      recomendaciones.push({
        condicion: 'Vientos fuertes',
        descripcion: 'No aplique agroquímicos. Considere soporte adicional para cultivos altos.',
        icono: '💨'
      });
    }

    return recomendaciones;
  }

  getAlertasMeteorologicas(weatherData: WeatherResponse): string[] {
    const alertas: string[] = [];
    const current = weatherData.current;
    const maxTemp = Math.max(...weatherData.daily.temperature_2m_max);
    const minTemp = Math.min(...weatherData.daily.temperature_2m_min);

    if (maxTemp > 35) {
      alertas.push('⚠️ Alerta de calor extremo en las próximas horas');
    }
    if (minTemp < 5) {
      alertas.push('⚠️ Alerta de heladas posibles');
    }
    if (current.wind_speed_10m > 30) {
      alertas.push('⚠️ Alerta de vientos fuertes');
    }
    if (weatherData.daily.precipitation_probability_max[0] > 90) {
      alertas.push('⚠️ Alta probabilidad de lluvias intensas');
    }

    return alertas;
  }

  getWindDirection(degrees: number): string {
    const directions = ['Norte', 'NorEste', 'Este', 'SurEste', 'Sur', 'SurOeste', 'Oeste', 'NorOeste'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: 'Despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna intensa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      95: 'Tormenta eléctrica',
    };
    return weatherCodes[code] || 'Desconocido';
  }

  getWeatherEmoji(code: number): string {
    const weatherEmojis: { [key: number]: string } = {
      0: '☀️',
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌫️❄️',
      51: '🌦️',
      53: '🌧️',
      55: '🌧️',
      61: '🌦️',
      63: '🌧️',
      65: '🌧️',
      71: '🌨️',
      73: '🌨️',
      75: '🌨️',
      95: '⛈️',
    };
    return weatherEmojis[code] || '❓';
  }
} 