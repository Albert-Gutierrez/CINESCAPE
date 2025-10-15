/* Funciones globales: openModal(peliculaObj) y closeModal() */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalPelicula");
    const cerrarBtn = document.getElementById("cerrarModal");

    // Cerrar botón
    if (cerrarBtn) {
        cerrarBtn.addEventListener("click", closeModal);
    }

    // Cerrar al presionar ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // Cerrar si el usuario clickea fuera del contenido (overlay)
    modal.addEventListener("click", (e) => {
        const contenido = modal.querySelector(".modal-contenido");
        if (!contenido.contains(e.target)) {
            closeModal();
        }
    });
});

/**Abre el modal con datos de la película: nombre, categoria, año, sinopsis, reparto, caratula }*/
function openModal(peliculaObj) {
    const modal = document.getElementById("modalPelicula");
    if (!modal) return;

    // Rellenar contenido (asegúrate de que los selectores coincidan con tu HTML)
    const img = modal.querySelector(".modal-imagen");
    const titulo = modal.querySelector(".modal-body h2");
    const categoria = modal.querySelector(".modal-body .categoria");
    const sinopsis = modal.querySelector(".modal-body .sinopsis");
    const reparto = modal.querySelector(".modal-body .reparto");

    // Ajusta las propiedades al nombre real de tu JSON si difieren
    img.src = peliculaObj.caratula ? `assets/caratulas/${peliculaObj.caratula}` : "assets/img/home-img1.png";
    img.alt = peliculaObj.nombre || peliculaObj.title || "Película";
    titulo.textContent = peliculaObj.nombre || peliculaObj.title || "Título";
    categoria.textContent = `${peliculaObj.categoria || peliculaObj.genero || "Sin categoría"} - ${peliculaObj.año || peliculaObj.year || ""}`;
    sinopsis.textContent = peliculaObj.sinopsis || peliculaObj.description || "Sin sinopsis disponible.";
    reparto.innerHTML = `<strong>Reparto:</strong> ${peliculaObj.reparto || peliculaObj.cast || "No disponible"}`;

    // Mostrar modal
    modal.classList.add("activo");
}

/**Cierra el modal (animación inversa).*/
function closeModal() {
    const modal = document.getElementById("modalPelicula");
    if (!modal) return;
    modal.classList.remove("activo");
}
