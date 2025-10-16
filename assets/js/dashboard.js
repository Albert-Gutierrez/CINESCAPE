document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("cont-peliculas");
    const searchInput = document.getElementById("searchInput");
    const botonesCategoria = document.querySelectorAll(".categoria");
    const header = document.querySelector(".header");
    const modal = document.getElementById("modalPelicula");
    const cerrarModal = document.getElementById("cerrarModal");

    let peliculas = [];

    // BOTÓN DE REGRESAR
    const backButton = document.createElement("button");
    backButton.innerHTML = "Volver";
    backButton.classList.add("back-btn");
    backButton.style.display = "none";
    header.appendChild(backButton);

    backButton.addEventListener("click", () => {
        mostrarPeliculas(peliculas);
        backButton.style.display = "none";
        searchInput.value = "";
    });


    // CARGAR PELÍCULAS
    fetch("assets/data/peliculas.json")
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            mostrarPeliculas(peliculas);
        })
        .catch(error => console.error("Error cargando JSON:", error));

    // MOSTRAR PELÍCULAS
    function mostrarPeliculas(lista) {
        // 1. limpia el contenedor
        contenedor.innerHTML = "";
        // 2.Verifica: Que lista sea realmente un array y || Verifica: Que el array no esté vacío
        if (!Array.isArray(lista) || lista.length === 0) {
            // 3.muestra mensaje al usuario de no hay resultados
            contenedor.innerHTML = "<p style='color:#999;padding:16px;text-align:center'>No hay resultados.</p>";
            return;
        }

        lista.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("pelicula");

            card.innerHTML = `
                <img src="assets/${p.ruta_caratula}" alt="${p.nombre}">
                <div class="pelicula-info">
                    <h3>${p.nombre}</h3>
                    <p>${p.anio}</p>
                </div>
            `;
            card.addEventListener("click", () => abrirModal(p));
            contenedor.appendChild(card);
        });
    }

    // BÚSQUEDA (Verificar que el elemento de búsqueda existe)
    if (searchInput) {
        searchInput.addEventListener("input", e => { //Escucha cada tecla que presiona el usuario
            const texto = e.target.value.trim().toLowerCase(); //verifica el texto ingresado por el ususario
            if (!texto) {
                mostrarPeliculas(peliculas); // Muestra todas las películas
                backButton.style.display = "none";
                return;
            }
            const filtradas = peliculas.filter(p =>
                (p.nombre || "").toString().toLowerCase().includes(texto)
            );
            mostrarPeliculas(filtradas);
            backButton.style.display = "block";  
        });
    }

    // FILTRO POR CATEGORÍA
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            const categoria = boton.dataset.categoria; //Obtiene la categoría del atributo data-categoria del HTML
            const filtradas = peliculas.filter(p => (p.categoria || "").toLowerCase() === (categoria || "").toLowerCase());
            mostrarPeliculas(filtradas);
            backButton.style.display = "block"; // Muestra botón "volver"
        });
    });

    // ABRIR MODAL (usa la clase .activo el CSS)
    function abrirModal(pelicula) {
        if (!modal) return;
        modal.classList.add("activo");

        const imgEl = modal.querySelector(".modal-imagen");
        const tituloEl = modal.querySelector(".modal-body h2");
        const categoriaEl = modal.querySelector(".modal-body .categoria");
        const sinopsisEl = modal.querySelector(".modal-body .sinopsis");
        const actoresEl = modal.querySelector(".modal-body .reparto");

        if (imgEl) imgEl.src = `assets/${pelicula.ruta_caratula}`;
        if (tituloEl) tituloEl.textContent = pelicula.nombre || "";
        if (categoriaEl) categoriaEl.textContent = `${pelicula.categoria || ""} - ${pelicula.anio || ""}`;
        if (sinopsisEl) sinopsisEl.textContent = pelicula.sinopsis || "";
        if (actoresEl) actoresEl.textContent = Array.isArray(pelicula.reparto)
            ? pelicula.reparto.join(", ")
            : (pelicula.reparto || "");
    }


    // CERRAR MODAL (botón)
    if (cerrarModal) {
        cerrarModal.addEventListener("click", () => {
            modal.classList.remove("activo");
        });
    }
});
