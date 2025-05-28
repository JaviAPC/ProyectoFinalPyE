package com.systemcultivos.service;

import com.systemcultivos.model.Usuario;
import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario crearUsuario(Usuario usuario);
    Optional<Usuario> findByEmail(String email);
    List<Usuario> obtenerTodosLosUsuarios();
    Optional<Usuario> obtenerUsuarioPorId(String id);
    Optional<Usuario> obtenerUsuarioPorEmail(String email);
    boolean existeUsuarioPorEmail(String email);
    void eliminarUsuario(String id);
}