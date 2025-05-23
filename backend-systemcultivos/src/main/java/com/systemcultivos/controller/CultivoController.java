package com.systemcultivos.controller;

import com.systemcultivos.model.Cultivo;
import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.CultivoService;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cultivos")
@CrossOrigin(origins = "*")
public class CultivoController {

    @Autowired
    private CultivoService cultivoService;

    @Autowired
    private UsuarioService usuarioService;

    // Guardar cultivo para un usuario
    @PostMapping("/guardar")
    public ResponseEntity<Cultivo> guardarCultivo(@RequestBody Cultivo cultivo) {
        return ResponseEntity.ok(cultivoService.guardarCultivo(cultivo));
    }

    // Obtener cultivos por ID de usuario
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Cultivo>> obtenerCultivosPorUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        return ResponseEntity.ok(cultivoService.obtenerCultivosPorUsuario(usuario));
    }

    // Eliminar cultivo por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarCultivo(@PathVariable Long id) {
        cultivoService.eliminarCultivo(id);
        return ResponseEntity.ok().build();
    }
}
