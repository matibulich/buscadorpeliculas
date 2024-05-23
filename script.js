

document.getElementById("buscarBoton").addEventListener("click", () => {
  let api_key = "5d1f390b30eb9eada86a5e8b8f48b62c";
  let url_base = "https://api.themoviedb.org/3/search/movie";
  let url_img = " https://image.tmdb.org/t/p/w500/";

  const buscarPeliculas = () => {
    let buscarPelicula = document.getElementById("buscarInput").value;

    fetch(
      `${url_base}?query=${buscarPelicula}&api_key=${api_key}&language=es-AR`
    )
      .then((response) => response.json())
      .then((response) => displayMovie(response.results));
  };

  buscarPeliculas();

  function displayMovie(movies) {
    console.log(movies);
    let resultados = document.getElementById("resultados");
    resultados.innerHTML = " ";

    if (movies.length === 0) {
      resultados.innerHTML = `<p style="color:white">Introduce una pelicula válida</p>`;
      return;
    }

    movies.forEach((movie) => {
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      function cortarString(string, num) {
        if (string.length > num) {
          return string.slice(0, num) + "...";
        } else {
          return string;
        }
      }

      let titulo = document.createElement("h3");
      titulo.textContent = cortarString(movie.title, 30);
      titulo.title = movie.title;

      let fechaLanzamiento = document.createElement("p");
      fechaLanzamiento.innerHTML = `<span class="details">Lanzamiento: </span>  ${movie.release_date}`;

      let poster = document.createElement("img");

      poster.src = movie.poster_path
        ? url_img + movie.poster_path
        : "img/images.png";
      poster.classList.add("posterImg");

      let calificacion = document.createElement("p");
      calificacion.innerHTML = `<span class="details">Puntaje: </span> ${movie.vote_average}`;

      let overview = document.createElement("p");
      overview.innerHTML = `<span class="details">Resumen: </span> ${movie.overview}`;

      let iconoAgregar = document.createElement("img");
      iconoAgregar.src = "img/add.svg";
      iconoAgregar.classList.add("agregar");

      iconoAgregar.addEventListener("click", () => {

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        
        // Si el ícono es un corazón, cambiarlo a agregar
        if (iconoAgregar.classList.contains("showHeart")) {
          iconoAgregar.src = "img/add.svg";
          iconoAgregar.classList.remove("showHeart");
          iconoAgregar.classList.add("agregar");

  

        } else {
          // Si no, cambiarlo a corazón
          iconoAgregar.src = "img/heart.svg";
          iconoAgregar.classList.remove("agregar");
          iconoAgregar.classList.add("showHeart");

          favoritos.push({ titulo: movie.title, lanzamiento: movie.release_date });
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });

      movieDiv.appendChild(poster);
      movieDiv.appendChild(titulo);
      movieDiv.appendChild(fechaLanzamiento);
      movieDiv.appendChild(calificacion);
      movieDiv.appendChild(overview);
      movieDiv.appendChild(iconoAgregar);

      resultados.appendChild(movieDiv);
    });
  }
});

