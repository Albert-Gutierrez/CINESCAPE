document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btnMenu"); 
    const menuLateral = document.getElementById("menuLateral"); 

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

});
