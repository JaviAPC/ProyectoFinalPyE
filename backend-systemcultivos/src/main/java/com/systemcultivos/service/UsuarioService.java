package com.systemcultivos.service;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean registrarUsuario(String correo, String contrasena) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(correo);
        if (usuarioExistente.isPresent()) {
            return false; // Ya hay un usuario registrado con ese correo
        }

        Usuario nuevoUsuario = new Usuario(correo, contrasena);
        usuarioRepository.save(nuevoUsuario);
        return true;
    }

    public boolean autenticarUsuario(String correo, String contrasena) {
        Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);
        return usuario.isPresent() && usuario.get().getContrasena().equals(contrasena);
    }
}
