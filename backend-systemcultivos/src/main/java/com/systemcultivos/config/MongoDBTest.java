package com.systemcultivos.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mongodb.connection.ClusterDescription;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import java.util.concurrent.TimeUnit;

@Component
public class MongoDBTest implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MongoDBTest.class);

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        logger.info("******************************************");
        logger.info("INICIANDO PRUEBA DE CONEXIÓN A MONGODB ATLAS");
        logger.info("******************************************");

        try {
            // Configuración del cliente MongoDB con timeouts
            ConnectionString connectionString = new ConnectionString(mongoUri);
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .applyToSocketSettings(builder -> 
                    builder.connectTimeout(30000, TimeUnit.MILLISECONDS)
                           .readTimeout(60000, TimeUnit.MILLISECONDS))
                .applyToClusterSettings(builder -> 
                    builder.serverSelectionTimeout(30000, TimeUnit.MILLISECONDS))
                .build();

            try (MongoClient mongoClient = MongoClients.create(settings)) {
                // Información del cluster
                ClusterDescription clusterDescription = mongoClient.getClusterDescription();
                logger.info("Descripción del cluster: {}", clusterDescription);

                // Prueba básica de conexión
                String dbName = mongoTemplate.getDb().getName();
                logger.info("Nombre de la base de datos: {}", dbName);

                // Listar colecciones
                logger.info("Listando colecciones existentes:");
                for (String collection : mongoTemplate.getCollectionNames()) {
                    logger.info("- {}", collection);
                }

                // Intentar una operación de escritura
                Document testDoc = new Document("test", "connection")
                        .append("timestamp", System.currentTimeMillis())
                        .append("status", "testing_atlas_connection");
                
                mongoTemplate.getCollection("test_connection").insertOne(testDoc);
                logger.info("Documento de prueba insertado correctamente en MongoDB Atlas");

                // Verificar que se puede leer el documento
                Document found = mongoTemplate.getCollection("test_connection")
                        .find(new Document("test", "connection"))
                        .first();
                
                if (found != null) {
                    logger.info("Documento de prueba leído correctamente de MongoDB Atlas");
                    logger.info("Contenido del documento: {}", found.toJson());
                }

                logger.info("******************************************");
                logger.info("PRUEBA DE CONEXIÓN A MONGODB ATLAS EXITOSA");
                logger.info("******************************************");
            }

        } catch (Exception e) {
            logger.error("******************************************");
            logger.error("ERROR EN LA PRUEBA DE CONEXIÓN A MONGODB ATLAS");
            logger.error("Tipo de error: {}", e.getClass().getName());
            logger.error("Mensaje: {}", e.getMessage());
            logger.error("Causa raíz: {}", e.getCause() != null ? e.getCause().getMessage() : "No disponible");
            logger.error("******************************************");
            e.printStackTrace();
        }
    }
} 