package com.systemcultivos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir todas las cabeceras
        config.addAllowedHeader("*");
        
        // Permitir todos los métodos
        config.addAllowedMethod("*");
        
        // Permitir credenciales
        config.setAllowCredentials(true);
        
        // Permitir el origen específico
        config.addAllowedOrigin("http://localhost:4200");
        
        // Aplicar la configuración a todas las rutas
        source.registerCorsConfiguration("/api/**", config);
        
        return new CorsFilter(source);
    }
} 