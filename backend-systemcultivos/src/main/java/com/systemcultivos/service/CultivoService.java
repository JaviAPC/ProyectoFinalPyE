package com.systemcultivos.service;

import com.systemcultivos.model.Cultivo;
import java.util.List;
import java.util.Optional;

public interface CultivoService {
    Cultivo crearCultivo(Cultivo cultivo);
    List<Cultivo> obtenerTodosLosCultivos();
    Optional<Cultivo> obtenerCultivoPorId(String id);
    List<Cultivo> obtenerCultivosPorUsuario(String usuarioId);
    Cultivo actualizarCultivo(Cultivo cultivo);
    void eliminarCultivo(String id);
}