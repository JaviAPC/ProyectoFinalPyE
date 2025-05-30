package com.systemcultivos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestConnectionController {

    private static final Logger logger = LoggerFactory.getLogger(TestConnectionController.class);
    private final MongoTemplate mongoTemplate;

    @Autowired
    public TestConnectionController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> testConnection() {
        Map<String, Object> response = new HashMap<>();
        try {
            logger.info("Intentando hacer ping a MongoDB...");
            
            // Ejecutar comando ping
            Document result = mongoTemplate.executeCommand(new Document("ping", 1));
            
            // Obtener información de la base de datos
            String dbName = mongoTemplate.getDb().getName();
            
            // Obtener información del servidor
            Document serverStatus = mongoTemplate.executeCommand(new Document("serverStatus", 1));
            
            response.put("status", "success");
            response.put("message", "Conexión exitosa a MongoDB");
            response.put("database", dbName);
            response.put("ping_result", result);
            response.put("server_version", serverStatus.get("version"));
            response.put("uptime_seconds", serverStatus.get("uptime"));
            
            logger.info("Ping exitoso a MongoDB. Base de datos: {}", dbName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error al conectar con MongoDB: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Error de conexión: " + e.getMessage());
            response.put("error_type", e.getClass().getSimpleName());
            response.put("error_stack", e.getStackTrace());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getDatabaseInfo() {
        Map<String, Object> info = new HashMap<>();
        try {
            logger.info("Obteniendo información de la base de datos...");
            
            String dbName = mongoTemplate.getDb().getName();
            info.put("database_name", dbName);
            info.put("collections", mongoTemplate.getCollectionNames());
            
            // Obtener estadísticas de la base de datos
            Document dbStats = mongoTemplate.executeCommand(new Document("dbStats", 1));
            info.put("database_stats", dbStats);
            
            // Verificar el estado de la conexión
            Document connectionStatus = mongoTemplate.executeCommand(new Document("connectionStatus", 1));
            info.put("connection_status", connectionStatus);
            
            logger.info("Información obtenida exitosamente para la base de datos: {}", dbName);
            return ResponseEntity.ok(info);
        } catch (Exception e) {
            logger.error("Error al obtener información de la base de datos: {}", e.getMessage(), e);
            info.put("error", e.getMessage());
            info.put("error_type", e.getClass().getSimpleName());
            info.put("error_stack", e.getStackTrace());
            return ResponseEntity.status(500).body(info);
        }
    }
} 