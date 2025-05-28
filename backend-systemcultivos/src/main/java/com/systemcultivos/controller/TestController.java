package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
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
            return ResponseEntity.internalServerError().body("Error al conectar con MongoDB: " + e.getMessage());
        }
    }

    @PostMapping("/crear-usuario-prueba")
    public ResponseEntity<?> crearUsuarioPrueba() {
        try {
            Usuario usuario = new Usuario();
            usuario.setEmail("prueba@test.com");
            usuario.setNombre("Usuario");
            usuario.setApellido("Prueba");
            usuario.setPassword("123456");
            usuario.setRol("ADMIN");
            usuario.setActivo(true);

            Usuario usuarioCreado = usuarioService.crearUsuario(usuario);
            return ResponseEntity.ok(usuarioCreado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear usuario de prueba: " + e.getMessage());
        }
    }
} 