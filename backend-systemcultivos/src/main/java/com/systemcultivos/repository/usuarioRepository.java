package com.systemcultivos.repository;

import com.systemcultivos.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
} 