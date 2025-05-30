package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, 
    RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        logger.info("Iniciando proceso de creación de usuario con email: {}", usuario.getEmail());
        try {
            // Verificar si el email ya existe
            logger.debug("Verificando si el email ya existe: {}", usuario.getEmail());
            if (usuarioService.obtenerUsuarioPorEmail(usuario.getEmail()).isPresent()) {
                logger.warn("Intento de registro con email existente: {}", usuario.getEmail());
                Map<String, String> error = new HashMap<>();
                error.put("error", "El email ya está registrado");
                error.put("mensaje", "Por favor, utiliza otro email para el registro");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }

            logger.debug("Creando nuevo usuario...");
            Usuario usuarioCreado = usuarioService.crearUsuario(usuario);
            logger.info("Usuario creado exitosamente con ID: {}", usuarioCreado.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario creado exitosamente");
            response.put("usuario", usuarioCreado);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            logger.error("Error al crear usuario: {}", e.getMessage(), e);
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        logger.info("Intento de login para el email: {}", email);

        try {
            logger.debug("Buscando usuario por email: {}", email);
            Optional<Usuario> usuarioOpt = usuarioService.obtenerUsuarioPorEmail(email);
            
            if (usuarioOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                logger.debug("Usuario encontrado, verificando contraseña");
                if (passwordEncoder.matches(credentials.get("password"), usuario.getPassword())) {
                    logger.info("Login exitoso para el usuario: {}", email);
                    Map<String, Object> response = new HashMap<>();
                    response.put("mensaje", "Login exitoso");
                    response.put("usuario", usuario);
                    return ResponseEntity.ok(response);
                }
                logger.warn("Contraseña incorrecta para el usuario: {}", email);
            } else {
                logger.warn("Usuario no encontrado: {}", email);
            }
            
            Map<String, String> error = new HashMap<>();
            error.put("error", "Credenciales inválidas");
            error.put("mensaje", "Email o contraseña incorrectos");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            
        } catch (Exception e) {
            logger.error("Error en el proceso de login: {}", e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error en el login");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/verificar-email/{email}")
    public ResponseEntity<Boolean> verificarEmail(@PathVariable String email) {
        return ResponseEntity.ok(usuarioService.existeUsuarioPorEmail(email));
    }
}