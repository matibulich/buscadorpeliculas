document.addEventListener("DOMContentLoaded", () => {
  let miListaContent = document.getElementById("miLista_content");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const actualizarLista = () => {
    miListaContent.innerHTML = ""; // Limpiar el contenido actual
    if (favoritos.length === 0) {
      miListaContent.innerHTML = `<p style="color:white">No hay películas en la lista</p>`;
    } else {
      favoritos.forEach((titulo) => {
        let tituloElemento = document.createElement("p");
        tituloElemento.innerHTML = `<span class="boton_quitar"><img src="/img/cross.svg" alt="quitar"></span>${titulo}`;
        tituloElemento.classList.add("items_lista");

        tituloElemento
          .querySelector(".boton_quitar")
          .addEventListener("click", () => {
            // Remueve item de la lista de favoritos
            favoritos = favoritos.filter((fav) => fav !== titulo);
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
        // Actualizar la lista
      });

      miListaContent.appendChild(boton_limpiar);
    }
  };

  actualizarLista();
});
