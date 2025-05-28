package com.systemcultivos.service;

import com.systemcultivos.model.Cultivo;
import com.systemcultivos.repository.CultivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CultivoServiceImpl implements CultivoService {

    @Autowired
    private CultivoRepository cultivoRepository;

    @Override
    public Cultivo crearCultivo(Cultivo cultivo) {
        return cultivoRepository.save(cultivo);
    }

    @Override
    public List<Cultivo> obtenerTodosLosCultivos() {
        return cultivoRepository.findAll();
    }

    @Override
    public Optional<Cultivo> obtenerCultivoPorId(String id) {
        return cultivoRepository.findById(id);
    }

    @Override
    public List<Cultivo> obtenerCultivosPorUsuario(String usuarioId) {
        return cultivoRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public Cultivo actualizarCultivo(Cultivo cultivo) {
        return cultivoRepository.save(cultivo);
    }

    @Override
    public void eliminarCultivo(String id) {
        cultivoRepository.deleteById(id);
    }
} 