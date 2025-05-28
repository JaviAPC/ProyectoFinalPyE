package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/db-connection")
    public ResponseEntity<String> testDatabaseConnection() {
        try {
            // Intenta obtener la lista de colecciones para verificar la conexión
            mongoTemplate.getCollectionNames();
            return ResponseEntity.ok("Conexión a MongoDB exitosa");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al conectar con MongoDB: " + e.getMessage());
        }
    }

    @PostMapping("/crear-usuario")
    public ResponseEntity<?> crearUsuarioPrueba() {
        try {
            Usuario usuario = new Usuario();
            usuario.setEmail("test@test.com");
            usuario.setNombre("Usuario");
            usuario.setApellido("Prueba");
            usuario.setPassword("123456");
            usuario.setRol("USER");
            usuario.setActivo(true);

            Usuario usuarioCreado = usuarioService.crearUsuario(usuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario de prueba creado exitosamente");
            response.put("usuario", usuarioCreado);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear usuario de prueba: " + e.getMessage());
        }
    }

    @GetMapping("/listar-usuarios")
    public ResponseEntity<?> listarUsuarios() {
        try {
            return ResponseEntity.ok(usuarioService.obtenerTodosLosUsuarios());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al listar usuarios: " + e.getMessage());
        }
    }
} 