package com.systemcultivos.repository;

import com.systemcultivos.model.Cultivo;
import com.systemcultivos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CultivoRepository extends JpaRepository<Cultivo, Long> {
    
    // Devuelve todos los cultivos de un usuario específico
    List<Cultivo> findByUsuario(Usuario usuario);
}
