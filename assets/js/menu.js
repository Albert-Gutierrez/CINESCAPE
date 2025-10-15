document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btnMenu"); 
    const menuLateral = document.getElementById("menuLateral"); 
    const enlaces = document.querySelectorAll(".menu-opciones a"); // enlaces internos

    // esta funcion es para abrir el menu
    btnMenu.addEventListener("click", () => {
        menuLateral.classList.toggle("activo");
    });

    //CERRAR MENÚ AL HACER CLIC FUERA
    document.addEventListener("click", (e) => {
        const clickDentro = menuLateral.contains(e.target);
        const clickEnBoton = btnMenu.contains(e.target);

        if (!clickDentro && !clickEnBoton) {
            menuLateral.classList.remove("activo");
        }
    });

    //CERRAR MENÚ AL ELEGIR UNA OPCIÓN
    enlaces.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // evita recargar página
            const categoria = e.target.dataset.categoria;
            console.log(`Categoría seleccionada: ${categoria}`);

            // Aquí puedes comunicarte con Diego (dashboard.js)
            // para filtrar las películas por categoría
            // Ejemplo: filtrarPeliculasPorCategoria(categoria);

            menuLateral.classList.remove("activo");
        });
    });
});
