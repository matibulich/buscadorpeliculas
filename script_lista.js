//espera a que cargue todo el documento DOM CONTENT LOADED

document.addEventListener("DOMContentLoaded", () => {
  let miListaContent = document.getElementById("miLista_content");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const actualizarLista = () => {
    miListaContent.innerHTML = ""; // Limpiar el contenido actual
    if (favoritos.length === 0) {
      miListaContent.innerHTML = `<p style="color:white">No hay películas en la lista</p>`;
    } else {
      favoritos.forEach((fav) => {
        let tituloElemento = document.createElement("p");
        tituloElemento.innerHTML = `<span class="boton_quitar"><img src="/img/cross.svg" alt="quitar"></span>${fav.titulo} (${fav.lanzamiento})`;
        tituloElemento.classList.add("items_lista");

        tituloElemento
          .querySelector(".boton_quitar").addEventListener("click", () => {
            // Remueve item de la lista de favoritos
            favoritos = favoritos.filter(
              (item) => item.lanzamiento !== fav.lanzamiento);
            // Guarda lista actualizada en localStorage
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            // Actualizar la lista
            actualizarLista();
          });

        miListaContent.appendChild(tituloElemento);
      });

      let boton_limpiar = document.createElement("button");
      boton_limpiar.textContent = "Limpiar";
      boton_limpiar.addEventListener("click", () => {
        // Limpiar la lista de favoritos
        favoritos = [];
        // Actualizar el localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        actualizarLista();
      });

      miListaContent.appendChild(boton_limpiar);
    }
  };

  actualizarLista();
});
