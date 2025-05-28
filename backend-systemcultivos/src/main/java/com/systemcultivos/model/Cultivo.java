package com.systemcultivos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cultivos")
public class Cultivo {
    @Id
    private String id;

    private String nombre;
    private String descripcion;
    private String tipo;
    private String estado;
    private String fechaInicio;
    private String fechaFin;

    // Nuevos campos
    private Ubicacion ubicacion;
    private Double area; // en metros cuadrados
    private String metodoRiego;
    private String frecuenciaRiego;
    private String tipoSuelo;
    private List<String> fotos = new ArrayList<>();
    private List<Cosecha> cosechas = new ArrayList<>();

    @DBRef
    private Usuario usuario;

    // Clase interna para la ubicación
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Ubicacion {
        private String direccion;
        private String coordenadas; // formato: "latitud,longitud"
        private String zona;
    }

    // Clase interna para las cosechas
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Cosecha {
        private String fecha;
        private Double cantidad; // en kilogramos
        private String calidad;
        private String notas;
    }
}
