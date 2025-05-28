package com.systemcultivos.repository;

import com.systemcultivos.model.Cultivo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CultivoRepository extends MongoRepository<Cultivo, String> {
    List<Cultivo> findByUsuarioId(String usuarioId);
}
