package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        try {
            // Verificar si el email ya existe
            if (usuarioService.obtenerUsuarioPorEmail(usuario.getEmail()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El email ya está registrado");
                error.put("mensaje", "Por favor, utiliza otro email para el registro");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            Usuario usuarioCreado = usuarioService.crearUsuario(usuario);
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario creado exitosamente");
            response.put("usuario", usuarioCreado);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear usuario");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<?> listarUsuarios() {
        try {
            return ResponseEntity.ok(usuarioService.obtenerTodosLosUsuarios());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al listar usuarios");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable String id) {
        try {
            var usuario = usuarioService.obtenerUsuarioPorId(id);
            if (usuario.isPresent()) {
                return ResponseEntity.ok(usuario.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Usuario no encontrado");
                error.put("mensaje", "No existe un usuario con el ID proporcionado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al obtener usuario");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> obtenerUsuarioPorEmail(@PathVariable String email) {
        try {
            var usuario = usuarioService.obtenerUsuarioPorEmail(email);
            if (usuario.isPresent()) {
                return ResponseEntity.ok(usuario.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Usuario no encontrado");
                error.put("mensaje", "No existe un usuario con el email proporcionado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al obtener usuario");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}