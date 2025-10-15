// ======== ELEMENTOS DOM ========
const menuBtn = document.getElementById("btnMenu");
const menuLateral = document.getElementById("menuLateral");
const userInfo = document.querySelector(".user-info");
const contenido = document.querySelector(".contenido");

// Modal
const modal = document.getElementById("modalPelicula");
const cerrarModal = document.getElementById("cerrarModal");
const modalImg = modal.querySelector(".modal-imagen");
const modalTitulo = modal.querySelector(".modal-body h2");
const modalCategoria = modal.querySelector(".modal-body .categoria");
const modalSinopsis = modal.querySelector(".modal-body .sinopsis");
const modalReparto = modal.querySelector(".modal-body .reparto");

// Contenedor principal donde irán las películas
let gridPeliculas;

// Variable para almacenar las películas
let peliculas = [];

// ======== ABRIR / CERRAR MENÚ ========
menuBtn.addEventListener("click", () => {
  menuLateral.classList.toggle("activo");
});

// ======== REDIRECCIÓN AL PERFIL ========
userInfo.addEventListener("click", () => {
  window.location.href = "perfil.html"; // cambia si tu archivo se llama diferente
});

// ======== CARGAR PELÍCULAS DESDE JSON ========
fetch("assets/data/peliculas.json")
  .then((res) => res.json())
  .then((data) => {
    peliculas = data;
    mostrarPeliculas(peliculas);
  })
  .catch((err) => console.error("Error al cargar el JSON:", err));

// ======== FUNCIÓN PARA MOSTRAR PELÍCULAS ========
function mostrarPeliculas(lista) {
  if (gridPeliculas) gridPeliculas.remove();

  gridPeliculas = document.createElement("section");
  gridPeliculas.classList.add("peliculas-grid");

  lista.forEach((pelicula) => {
    const card = document.createElement("div");
    card.classList.add("pelicula-card");
    card.innerHTML = `
      <img src="assets/${pelicula.ruta_caratula}" alt="${pelicula.nombre}">
      <div class="pelicula-info">
        <h3>${pelicula.nombre}</h3>
        <p>${pelicula.anio}</p>
      </div>
    `;
    card.addEventListener("click", () => abrirModal(pelicula));
    gridPeliculas.appendChild(card);
  });

  contenido.appendChild(gridPeliculas);
  agregarBotonRegresar();
}

// ======== FUNCIÓN PARA FILTRAR POR CATEGORÍA ========
const enlacesCategorias = document.querySelectorAll(".menu-opciones li a");

enlacesCategorias.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();
    const categoria = enlace.dataset.categoria;

    if (categoria === "inicio") {
      mostrarPeliculas(peliculas);
    } else {
      const filtradas = peliculas.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
      );
      mostrarPeliculas(filtradas);
    }

    menuLateral.classList.remove("activo");
  });
});

// ======== BOTÓN DE REGRESAR ========
function agregarBotonRegresar() {
  const existeBtn = document.querySelector(".back-btn");
  if (existeBtn) existeBtn.remove();

  const backBtn = document.createElement("button");
  backBtn.classList.add("back-btn");
  backBtn.innerHTML = "← Volver";
  backBtn.addEventListener("click", () => mostrarPeliculas(peliculas));

  contenido.prepend(backBtn);
}

// ======== ABRIR MODAL CON DETALLES ========
function abrirModal(pelicula) {
  modalImg.src = `assets/${pelicula.ruta_caratula}`;
  modalTitulo.textContent = pelicula.nombre;
  modalCategoria.textContent = `${pelicula.categoria} - ${pelicula.anio}`;
  modalSinopsis.textContent = pelicula.sinopsis;
  modalReparto.innerHTML = `<strong>Reparto:</strong> ${pelicula.reparto.join(", ")}`;
  modal.classList.add("activo");
}

// ======== CERRAR MODAL ========
cerrarModal.addEventListener("click", () => {
  modal.classList.remove("activo");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("activo");
});
