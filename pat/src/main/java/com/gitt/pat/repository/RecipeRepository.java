package com.gitt.pat.repository;

import com.gitt.pat.model.Recipe;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RecipeRepository {

    private final Map<Long, Recipe> recipes = new HashMap<>();
    private Long nextId = 1L;

    public Recipe save(Recipe recipe) {
        recipe.setId(nextId++);
        recipes.put(recipe.getId(), recipe);
        return recipe;
    }

    public Optional<Recipe> update(Long id, Recipe updated) {
        if (recipes.containsKey(id)) {
            updated.setId(id);
            recipes.put(id, updated);
            return Optional.of(updated);
        }
        return Optional.empty();
    }

    public List<Recipe> findAll() {
        return new ArrayList<>(recipes.values());
    }

    public Optional<Recipe> findById(Long id) {
        return Optional.ofNullable(recipes.get(id));
    }

    public boolean deleteById(Long id) {
        return recipes.remove(id) != null;
    }

    @PostConstruct
    public void initData() {
        save(new Recipe(null, "Tortitas de avena", "Una opción saludable con plátano, avena y huevo."));
        save(new Recipe(null, "Quiche de brócoli", "Rápido de preparar, ideal para el almuerzo."));
        save(new Recipe(null, "Ensalada de atún", "Ligera, rica en proteínas y perfecta para la cena."));
    }
}
