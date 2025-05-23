package com.systemcultivos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cultivos")
public class Cultivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;  // Ejemplo: "Maíz", "Trigo"

    private String descripcion; // Opcional, por si quieres mostrar info extra

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Constructor vacío requerido por JPA
    public Cultivo() {
    }

    // Constructor con campos
    public Cultivo(String nombre, String descripcion, Usuario usuario) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
