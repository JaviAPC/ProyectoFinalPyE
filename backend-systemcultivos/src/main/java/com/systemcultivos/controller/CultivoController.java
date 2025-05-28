package com.systemcultivos.controller;

import com.systemcultivos.model.Cultivo;
import com.systemcultivos.service.CultivoService;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cultivos")
@CrossOrigin(origins = "*")
public class CultivoController {

    @Autowired
    private CultivoService cultivoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> crearCultivo(@RequestBody Cultivo cultivo) {
        try {
            if (cultivo.getUsuario() == null || cultivo.getUsuario().getId() == null) {
                return ResponseEntity.badRequest().body("El usuario es requerido");
            }

            if (!usuarioService.obtenerUsuarioPorId(cultivo.getUsuario().getId()).isPresent()) {
                return ResponseEntity.badRequest().body("El usuario no existe");
            }

            Cultivo cultivoCreado = cultivoService.crearCultivo(cultivo);
            return ResponseEntity.ok(cultivoCreado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear cultivo: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Cultivo>> obtenerTodosLosCultivos() {
        return ResponseEntity.ok(cultivoService.obtenerTodosLosCultivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCultivoPorId(@PathVariable String id) {
        return cultivoService.obtenerCultivoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Cultivo>> obtenerCultivosPorUsuario(@PathVariable String usuarioId) {
        return ResponseEntity.ok(cultivoService.obtenerCultivosPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCultivo(@PathVariable String id, @RequestBody Cultivo cultivo) {
        try {
            if (!cultivoService.obtenerCultivoPorId(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            cultivo.setId(id);
            Cultivo cultivoActualizado = cultivoService.actualizarCultivo(cultivo);
            return ResponseEntity.ok(cultivoActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar cultivo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCultivo(@PathVariable String id) {
        try {
            cultivoService.eliminarCultivo(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar cultivo: " + e.getMessage());
        }
    }

    // Nuevos endpoints para gestionar fotos
    @PostMapping("/{id}/fotos")
    public ResponseEntity<?> agregarFoto(@PathVariable String id, @RequestParam("foto") MultipartFile foto) {
        try {
            Cultivo cultivo = cultivoService.obtenerCultivoPorId(id)
                    .orElseThrow(() -> new RuntimeException("Cultivo no encontrado"));
            
            // Aquí deberías implementar la lógica para guardar la foto y obtener su URL
            String fotoUrl = "URL_DE_LA_FOTO"; // Implementar lógica de almacenamiento
            
            cultivo.getFotos().add(fotoUrl);
            cultivoService.actualizarCultivo(cultivo);
            
            return ResponseEntity.ok(cultivo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al agregar foto: " + e.getMessage());
        }
    }

    // Nuevo endpoint para agregar cosecha
    @PostMapping("/{id}/cosechas")
    public ResponseEntity<?> agregarCosecha(@PathVariable String id, @RequestBody Cultivo.Cosecha cosecha) {
        try {
            Cultivo cultivo = cultivoService.obtenerCultivoPorId(id)
                    .orElseThrow(() -> new RuntimeException("Cultivo no encontrado"));
            
            cultivo.getCosechas().add(cosecha);
            cultivoService.actualizarCultivo(cultivo);
            
            return ResponseEntity.ok(cultivo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al agregar cosecha: " + e.getMessage());
        }
    }

    // Endpoint para obtener estadísticas de cosechas
    @GetMapping("/{id}/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas(@PathVariable String id) {
        try {
            Cultivo cultivo = cultivoService.obtenerCultivoPorId(id)
                    .orElseThrow(() -> new RuntimeException("Cultivo no encontrado"));
            
            // Calcular estadísticas básicas
            double totalCosechado = cultivo.getCosechas().stream()
                    .mapToDouble(Cultivo.Cosecha::getCantidad)
                    .sum();
            
            double promedioCosecha = cultivo.getCosechas().isEmpty() ? 0 :
                    totalCosechado / cultivo.getCosechas().size();
            
            return ResponseEntity.ok(new EstadisticasCultivo(
                    totalCosechado,
                    promedioCosecha,
                    cultivo.getCosechas().size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener estadísticas: " + e.getMessage());
        }
    }

    // Clase para estadísticas
    @SuppressWarnings("unused")
    private static class EstadisticasCultivo {
        private final double totalCosechado;
        private final double promedioCosecha;
        private final int numeroCosechas;

        public EstadisticasCultivo(double totalCosechado, double promedioCosecha, int numeroCosechas) {
            this.totalCosechado = totalCosechado;
            this.promedioCosecha = promedioCosecha;
            this.numeroCosechas = numeroCosechas;
        }

        public double getTotalCosechado() { return totalCosechado; }
        public double getPromedioCosecha() { return promedioCosecha; }
        public int getNumeroCosechas() { return numeroCosechas; }
    }
}