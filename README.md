# API REST - Práctica 4

Este proyecto es una API REST desarrollada con Spring Boot con la temática de la web de recetas creada en la práctica 2 y 3.

La API permite realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre recetas. Los datos se almacenan en memoria, sin utilizar una base de datos.


## Endpoints disponibles

| Método | Ruta                | Cuerpo requerido                                                      | Descripción                                 | Respuestas posibles    |
|--------|---------------------|------------------------------------------------------------------------|---------------------------------------------|------------------------|
| GET    | /api/recipes        | -                                                                      | Devuelve todas las recetas                  | 200 OK                 |
| GET    | /api/recipes/{id}   | -                                                                      | Devuelve una receta por su ID               | 200 OK / 404 Not Found |
| POST   | /api/recipes        | { "title": "...", "description": "..." }                               | Crea una nueva receta                       | 201 Created / 400      |
| PUT    | /api/recipes/{id}   | { "title": "...", "description": "..." }                               | Actualiza una receta existente              | 200 OK / 404 Not Found |
| DELETE | /api/recipes/{id}   | -                                                                      | Elimina una receta por su ID                | 204 No Content / 404   |

## Seguridad

La seguridad ha sido desactivada durante el desarrollo para facilitar las pruebas. No es necesario autenticarse para acceder a los endpoints.

## Ejemplo de uso de POST

- URL: `http://localhost:8080/api/recipes`
- Método: POST
- Body:

```json
{
  "title": "Tortilla de patatas",
  "description": "Huevos, patatas y cebolla opcional"
}
