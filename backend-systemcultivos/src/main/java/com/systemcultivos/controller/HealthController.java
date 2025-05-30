package com.systemcultivos.controller;

import com.systemcultivos.config.MongoHealthCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final MongoHealthCheck mongoHealthCheck;

    @Autowired
    public HealthController(MongoHealthCheck mongoHealthCheck) {
        this.mongoHealthCheck = mongoHealthCheck;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> health = new HashMap<>();
        boolean isMongoHealthy = mongoHealthCheck.isHealthy();
        
        health.put("status", isMongoHealthy ? "UP" : "DOWN");
        health.put("mongodb", new HashMap<String, Object>() {{
            put("status", isMongoHealthy ? "UP" : "DOWN");
            if (isMongoHealthy) {
                put("database", mongoHealthCheck.getDatabaseName());
            }
        }});
        
        return ResponseEntity.ok(health);
    }
} 