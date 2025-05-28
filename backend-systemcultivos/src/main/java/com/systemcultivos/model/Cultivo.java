package com.systemcultivos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.List;
import java.util.ArrayList;

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
    private Ubicacion ubicacion;
    private double area;
    private String metodoRiego;
    private String frecuenciaRiego;
    private String tipoSuelo;
    private List<String> fotos = new ArrayList<>();
    private List<Cosecha> cosechas = new ArrayList<>();
    @DBRef
    private Usuario usuario;

    public Cultivo() {}

    public Cultivo(String id, String nombre, String descripcion, String tipo, String estado, String fechaInicio, String fechaFin, Ubicacion ubicacion, double area, String metodoRiego, String frecuenciaRiego, String tipoSuelo, List<String> fotos, List<Cosecha> cosechas, Usuario usuario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.ubicacion = ubicacion;
        this.area = area;
        this.metodoRiego = metodoRiego;
        this.frecuenciaRiego = frecuenciaRiego;
        this.tipoSuelo = tipoSuelo;
        this.fotos = fotos != null ? fotos : new ArrayList<>();
        this.cosechas = cosechas != null ? cosechas : new ArrayList<>();
        this.usuario = usuario;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(String fechaInicio) { this.fechaInicio = fechaInicio; }
    public String getFechaFin() { return fechaFin; }
    public void setFechaFin(String fechaFin) { this.fechaFin = fechaFin; }
    public Ubicacion getUbicacion() { return ubicacion; }
    public void setUbicacion(Ubicacion ubicacion) { this.ubicacion = ubicacion; }
    public double getArea() { return area; }
    public void setArea(double area) { this.area = area; }
    public String getMetodoRiego() { return metodoRiego; }
    public void setMetodoRiego(String metodoRiego) { this.metodoRiego = metodoRiego; }
    public String getFrecuenciaRiego() { return frecuenciaRiego; }
    public void setFrecuenciaRiego(String frecuenciaRiego) { this.frecuenciaRiego = frecuenciaRiego; }
    public String getTipoSuelo() { return tipoSuelo; }
    public void setTipoSuelo(String tipoSuelo) { this.tipoSuelo = tipoSuelo; }
    public List<String> getFotos() { return fotos; }
    public void setFotos(List<String> fotos) { this.fotos = fotos; }
    public List<Cosecha> getCosechas() { return cosechas; }
    public void setCosechas(List<Cosecha> cosechas) { this.cosechas = cosechas; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public static class Ubicacion {
        private String direccion;
        private String coordenadas;
        private String zona;

        public Ubicacion() {}
        public Ubicacion(String direccion, String coordenadas, String zona) {
            this.direccion = direccion;
            this.coordenadas = coordenadas;
            this.zona = zona;
        }
        public String getDireccion() { return direccion; }
        public void setDireccion(String direccion) { this.direccion = direccion; }
        public String getCoordenadas() { return coordenadas; }
        public void setCoordenadas(String coordenadas) { this.coordenadas = coordenadas; }
        public String getZona() { return zona; }
        public void setZona(String zona) { this.zona = zona; }
    }

    public static class Cosecha {
        private String fecha;
        private double cantidad;
        private String calidad;
        private String notas;

        public Cosecha() {}
        public Cosecha(String fecha, double cantidad, String calidad, String notas) {
            this.fecha = fecha;
            this.cantidad = cantidad;
            this.calidad = calidad;
            this.notas = notas;
        }
        public String getFecha() { return fecha; }
        public void setFecha(String fecha) { this.fecha = fecha; }
        public double getCantidad() { return cantidad; }
        public void setCantidad(double cantidad) { this.cantidad = cantidad; }
        public String getCalidad() { return calidad; }
        public void setCalidad(String calidad) { this.calidad = calidad; }
        public String getNotas() { return notas; }
        public void setNotas(String notas) { this.notas = notas; }
    }
}
