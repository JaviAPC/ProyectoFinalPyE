package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bson.Document;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    private final MongoTemplate mongoTemplate;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    public TestController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/connection")
    public ResponseEntity<Map<String, Object>> testConnection() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Intenta ejecutar un comando simple
            Document pingCommand = new Document("ping", 1);
            mongoTemplate.getDb().runCommand(pingCommand);
            response.put("status", "success");
            response.put("message", "Conexión exitosa a MongoDB");
            response.put("database", mongoTemplate.getDb().getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error de conexión: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/mongodb-status")
    public ResponseEntity<?> testMongoDB() {
        logger.info("Iniciando prueba de conexión a MongoDB");
        try {
            // Intentar listar las colecciones
            var collections = mongoTemplate.getCollectionNames();
            logger.info("Colecciones encontradas: {}", collections);

            // Intentar contar usuarios
            long usuariosCount = mongoTemplate.getCollection("usuarios").countDocuments();
            logger.info("Número de usuarios en la base de datos: {}", usuariosCount);

            return ResponseEntity.ok(Map.of(
                "status", "Conexión exitosa",
                "collections", collections,
                "usuariosCount", usuariosCount
            ));
        } catch (Exception e) {
            logger.error("Error al conectar con MongoDB: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error de conexión",
                "message", e.getMessage()
            ));
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

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsers() {
        return mongoTemplate.findAll(Usuario.class, "usuarios");
    }
} 