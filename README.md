# 🌱 AgroApp

**AgroApp** es una aplicación web diseñada para asistir a agricultores y usuarios del sector agropecuario en la gestión de cultivos. Proporciona herramientas para seleccionar tipos de cultivos, consultar información climática en tiempo real, gestionar usuarios y llevar control de datos importantes.

## 🧩 Características principales

- Registro e inicio de sesión de usuarios.
- Selección de cultivos (papa, arveja y choclo).
- Interfaz intuitiva con Angular.
- Consulta de clima en tiempo real a través de una API externa.
- Backend robusto con Java y Spring Boot.
- Base de datos NoSQL MongoDB para almacenar información del usuario y cultivos.

## 🛠️ Tecnologías utilizadas

### Frontend
- **Angular 19.2.13** (con TypeScript)
- **Node js 20.19.0** 
- **HTML** / **CSS**

### Backend
- **Java 21**
- **Spring Boot 3.2.3**
- **API REST** para comunicación con el frontend
- **API de clima en tiempo real** 

### Base de Datos
- **MongoDB** (Atlas)



## 🚀 Cómo ejecutar el proyecto

### Ejecutar.
```bash
Clonar repositorio.
Ingresar a la rama backend-dev
Ingresar a carpeta backend-systemcultivos(backend) y correr el backend con "mvn spring-boot:run" Esto correra el backend con springboot y esto conectara con la base de datos MongoDB Atlas.
Ingresar a la carpeta ProyectoFinalPyE(frontend) y correr el frontend con "ng serve" Esto correra el frontend y dara la el link en el puerto 4200 donde esta la interfaz para iniciar el programa.
Nota: Si existe algun error el login o no deja entrar, en el link se debe añadir el endpoint /seleccion-cultivo de la siguiente forma "http//localhost:4200/seleccion-cultivo", esto permite seguir en el programa para revisar las otras funcionalidades

