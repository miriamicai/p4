package com.gitt.pat.controller;

import com.gitt.pat.model.Recipe;
import com.gitt.pat.repository.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeRepository repository;

    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }

    // Crear una receta (POST)
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Recipe created = repository.save(recipe);
        return ResponseEntity.status(201).body(created);
    }

    // Obtener todas las recetas (GET)
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    // Obtener una receta por ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar una receta por ID (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @RequestBody Recipe updated) {
        return repository.update(id, updated)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar una receta por ID (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        boolean deleted = repository.deleteById(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
