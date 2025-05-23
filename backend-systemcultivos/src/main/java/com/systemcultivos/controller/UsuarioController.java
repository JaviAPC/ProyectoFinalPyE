package com.systemcultivos.controller;

import com.systemcultivos.model.Usuario;
import com.systemcultivos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")  // Permite recibir peticiones desde el frontend (localhost o donde sea)
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> registrarUsuario(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");

        boolean registrado = usuarioService.registrarUsuario(correo, contrasena);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("exito", registrado);
        respuesta.put("mensaje", registrado ? "Usuario registrado exitosamente." : "Ya existe un usuario con ese correo.");

        return ResponseEntity.ok(respuesta);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");

        boolean autenticado = usuarioService.autenticarUsuario(correo, contrasena);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("autenticado", autenticado);
        respuesta.put("mensaje", autenticado ? "Inicio de sesión exitoso." : "Correo o contraseña incorrectos.");

        return ResponseEntity.ok(respuesta);
    }
}
