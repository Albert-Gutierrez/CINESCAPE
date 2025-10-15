document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("peliculasContainer");
    const searchInput = document.getElementById("searchInput");
    const botonesCategoria = document.querySelectorAll(".categoria");
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const closeMenu = document.getElementById("closeMenu");
    const header = document.querySelector(".header");

    let peliculas = [];

    // ===== CREAR BOTÓN DE REGRESAR =====
    const backButton = document.createElement("button");
    backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    backButton.classList.add("back-btn");
    backButton.style.display = "none";
    header.appendChild(backButton);

    backButton.addEventListener("click", () => {
        mostrarPeliculas(peliculas);
        backButton.style.display = "none";
        searchInput.value = "";
    });

    // ===== MENÚ HAMBURGUESA =====
    menuToggle.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    // ===== CARGAR PELÍCULAS =====
    fetch("peliculas.json")
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            mostrarPeliculas(peliculas);
        });

    function mostrarPeliculas(lista) {
        contenedor.innerHTML = "";
        lista.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("pelicula-card");
            card.innerHTML = `
                <img src="${p.imagen}" alt="${p.titulo}">
                <div class="pelicula-info">
                    <h3>${p.titulo}</h3>
                    <p>${p.anio}</p>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    // ===== BÚSQUEDA =====
    searchInput.addEventListener("input", e => {
        const texto = e.target.value.toLowerCase();
        const filtradas = peliculas.filter(p =>
            p.titulo.toLowerCase().includes(texto)
        );
        mostrarPeliculas(filtradas);
        backButton.style.display = texto ? "block" : "none";
    });

    // ===== FILTRO POR CATEGORÍA =====
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            const categoria = boton.dataset.categoria;
            const filtradas = peliculas.filter(p => p.categoria === categoria);
            mostrarPeliculas(filtradas);
            backButton.style.display = "block";
        });
    });
});

