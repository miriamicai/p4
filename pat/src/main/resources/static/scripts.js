document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada");

    if (document.getElementById("receta-container-en")) {
        console.log("Cargando receta aleatoria en inglés...");
        obtenerRecetaAleatoria();
    }

    if (document.getElementById("ads-container-cocteles")) {
        console.log("Cargando anuncios de cócteles...");
        cargarAnunciosCocktails();
        setInterval(cargarAnunciosCocktails, 8000);
    }

    if (document.getElementById("ads-container-comidas")) {
        console.log("Cargando anuncios de comidas...");
        cargarAnunciosComidas();
        setInterval(cargarAnunciosComidas, 8000);
    }

    if (document.getElementById("ads-container-dummy")) {
        console.log("Cargando anuncios de DummyJSON...");
        cargarAnunciosDummy();
        setInterval(cargarAnunciosDummy, 8000);
    }

    if (document.getElementById("api-recetas")) {
        console.log("Cargando recetas desde la API...");
        fetchRecetasDesdeAPI();
    }

    const form = document.getElementById("form-nueva-receta");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const receta = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value
            };

            fetch("http://localhost:8080/api/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(receta)
            })
                .then(res => res.json())
                .then(() => {
                    alert("Receta añadida");
                    form.reset();
                    fetchRecetasDesdeAPI();
                })
                .catch(err => console.error("Error al añadir receta", err));
        });
    }

});


function obtenerRecetaAleatoria() {
    console.log("Obteniendo receta aleatoria...");
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            console.log("🔹 Respuesta API (Receta en inglés):", data);
            if (data.meals) {
                const receta = data.meals[0];
                document.getElementById('receta-container-en').innerHTML = `
                    <h3>${receta.strMeal}</h3>
                    <img src="${receta.strMealThumb}" alt="${receta.strMeal}" width="300">
                    <p><strong>Instructions:</strong> ${receta.strInstructions}</p>
                `;
            } else {
                document.getElementById('receta-container-en').innerText = "No recipe found.";
            }
        })
        .catch(error => {
            console.error("Error al obtener receta en inglés:", error);
        });
}


function cargarAnunciosCocktails() {
    console.log("Obteniendo anuncios de cócteles...");

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then(response => {
            console.log("🔹 Estado de la respuesta API (Cócteles):", response.status);
            return response.json();
        })
        .then(data => {
            console.log("🔹 Respuesta API (Cócteles):", data);

            const adsContainer = document.getElementById('ads-container-cocteles');
            if (!adsContainer) {
                console.error("ERROR: No se encontró el contenedor `ads-container-cocteles`. Revisa el HTML.");
                return;
            }

            adsContainer.innerHTML = "";
            if (!data.drinks || data.drinks.length === 0) {
                adsContainer.innerHTML = "<p>No cocktail ads available.</p>";
                console.warn("API devolvió una lista vacía.");
                return;
            }

            const selectedCocktails = data.drinks.sort(() => Math.random() - 0.5).slice(0, 3);

            selectedCocktails.forEach(cocktail => {
                console.log("Añadiendo cóctel:", cocktail.strDrink);

                const adHTML = `
                    <div class="ad">
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <h3>${cocktail.strDrink}</h3>
                        <p>${cocktail.strInstructions.substring(0, 80)}...</p>
                    </div>
                `;
                adsContainer.innerHTML += adHTML;
            });
        })
        .catch(error => {
            console.error("Error al obtener anuncios de cócteles:", error);
            document.getElementById('ads-container-cocteles').innerText = "Error loading ads.";
        });
}


function cargarAnunciosComidas() {
    console.log("Obteniendo anuncios de comida aleatorios...");

    fetch("https://world.openfoodfacts.org/api/v2/search?categories_tags=en:meals&page_size=10")
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta API (Comidas):", data);

            const adsContainer = document.getElementById('ads-container-comidas');
            if (!adsContainer) return;

            adsContainer.innerHTML = "";

            if (!data.products || data.products.length === 0) {
                adsContainer.innerHTML = "<p>No food product ads available.</p>";
                return;
            }

            const randomProduct = data.products[Math.floor(Math.random() * data.products.length)];

            adsContainer.innerHTML = `
                <div class="ad">
                    <img src="${randomProduct.image_url || 'https://via.placeholder.com/150'}" alt="${randomProduct.product_name}">
                    <h3>${randomProduct.product_name || 'Unknown Product'}</h3>
                    <p>${randomProduct.brands || 'No brand'}</p>
                    <p>${randomProduct.categories || 'No category'}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error al obtener anuncios de comida:", error);
            document.getElementById('ads-container-comidas').innerText = "Error loading ads.";
        });
}


function cargarAnunciosDummy() {
    console.log("Obteniendo anuncios de DummyJSON...");
    fetch("https://dummyjson.com/products/category/groceries?limit=30")
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta API (DummyJSON):", data);

            const adsContainer = document.getElementById('ads-container-dummy');
            if (!adsContainer) return;

            adsContainer.innerHTML = "";

            if (!data.products || data.products.length === 0) {
                adsContainer.innerHTML = "<p>No ads available.</p>";
                return;
            }
            const randomProduct = data.products[Math.floor(Math.random() * data.products.length)];

            adsContainer.innerHTML = `
                <div class="ad">
                    <img src="${randomProduct.thumbnail}" alt="${randomProduct.title}">
                    <h3>${randomProduct.title}</h3>
                    <p>${randomProduct.description}</p>
                </div>
            `;

            console.log(`Mostrando anuncio: ${randomProduct.title}`);
        })
        .catch(error => {
            console.error("Error al obtener anuncios de DummyJSON:", error);
        });
}


function fetchRecetasDesdeAPI() {
    fetch("http://localhost:8080/api/recipes")
        .then(res => {
            if (!res.ok) {
                throw new Error("Error al obtener recetas");
            }
            return res.json();
        })
        .then(recetas => {
            console.log("Recetas recibidas:", recetas);

            const container = document.getElementById("api-recetas");
            if (!container) {
                console.warn("No se encontró el contenedor #api-recetas");
                return;
            }

            container.innerHTML = "";

            if (recetas.length === 0) {
                container.innerHTML = "<p>No hay recetas disponibles.</p>";
                return;
            }

            recetas.forEach(r => {
                const div = document.createElement("div");
                div.classList.add("receta-item");
                div.innerHTML = `
                    <div style="border:1px solid #ccc; padding:1em; margin-bottom:1em;">
                        <h3>${r.title}</h3>
                        <p>${r.description}</p>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => console.error("Error al obtener recetas:", err));
}
