package com.systemcultivos.service;

import com.systemcultivos.model.Cultivo;
import com.systemcultivos.model.Usuario;
import com.systemcultivos.repository.CultivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CultivoService {

    @Autowired
    private CultivoRepository cultivoRepository;

    // Guarda un cultivo
    public Cultivo guardarCultivo(Cultivo cultivo) {
        return cultivoRepository.save(cultivo);
    }

    // Obtiene todos los cultivos de un usuario
    public List<Cultivo> obtenerCultivosPorUsuario(Usuario usuario) {
        return cultivoRepository.findByUsuario(usuario);
    }

    // Elimina un cultivo por ID
    public void eliminarCultivo(Long id) {
        cultivoRepository.deleteById(id);
    }

    // Opcional: obtener cultivo por ID (por si se desea editar)
    public Optional<Cultivo> obtenerCultivoPorId(Long id) {
        return cultivoRepository.findById(id);
    }
}
