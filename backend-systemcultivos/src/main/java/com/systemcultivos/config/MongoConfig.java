package com.systemcultivos.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableMongoRepositories(basePackages = "com.systemcultivos.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database}")
    private String database;

    @Override
    protected String getDatabaseName() {
        return database;
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        try {
            logger.info("Iniciando configuración de MongoDB...");
            logger.info("Conectando a la base de datos: {}", database);
            
            ConnectionString connectionString = new ConnectionString(mongoUri);
            
            MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .applyToSocketSettings(builder -> 
                    builder.connectTimeout(30000, TimeUnit.MILLISECONDS)
                           .readTimeout(60000, TimeUnit.MILLISECONDS))
                .applyToClusterSettings(builder -> 
                    builder.serverSelectionTimeout(30000, TimeUnit.MILLISECONDS))
                .build();

            logger.info("Configuración de MongoDB completada. Intentando crear cliente...");
            MongoClient client = MongoClients.create(mongoClientSettings);
            logger.info("Cliente MongoDB creado exitosamente");
            
            // Verificar conexión
            client.listDatabaseNames().first();
            logger.info("Conexión a MongoDB verificada exitosamente");
            
            return client;
        } catch (Exception e) {
            logger.error("Error al configurar MongoDB: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    protected Collection<String> getMappingBasePackages() {
        return Collections.singleton("com.systemcultivos");
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        try {
            logger.info("Creando MongoTemplate...");
            MongoTemplate template = new MongoTemplate(mongoClient(), getDatabaseName());
            logger.info("MongoTemplate creado exitosamente");
            return template;
        } catch (Exception e) {
            logger.error("Error al crear MongoTemplate: {}", e.getMessage(), e);
            throw e;
        }
    }
} 