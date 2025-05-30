package com.systemcultivos.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.bson.Document;

@Component
public class MongoHealthCheck {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public MongoHealthCheck(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public boolean isHealthy() {
        try {
            Document pingCommand = new Document("ping", 1);
            mongoTemplate.getDb().runCommand(pingCommand);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getDatabaseName() {
        return mongoTemplate.getDb().getName();
    }
} 