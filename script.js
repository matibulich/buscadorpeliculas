document.getElementById("buscarBoton").addEventListener("click", ()=>{

    let api_key = "5d1f390b30eb9eada86a5e8b8f48b62c"
    let url_base = "https://api.themoviedb.org/3/search/movie"
    let url_img = " https://image.tmdb.org/t/p/w500/" 
   

     const buscarPeliculas = () => {
     let buscarPelicula = document.getElementById("buscarInput").value;
      
     fetch(`${url_base}?query=${buscarPelicula}&api_key=${api_key}`)
     .then(response=> response.json())
     .then(response => displayMovie(response.results)) }
    

     buscarPeliculas()

    function displayMovie(movies){
        console.log(movies)
        let resultados = document.getElementById("resultados")
        resultados.innerHTML = " "

        if (movies.length === 0 ){
            resultados.innerHTML = "<p>Introduce una pelicula válida</p>"
            return
        }
        
        movies.forEach(movie => {
            let movieDiv = document.createElement("div")
            movieDiv.classList.add("movie")

            let titulo = document.createElement("h3")
            titulo.textContent = movie.title

            let fechaLanzamiento = document.createElement("p")
            fechaLanzamiento.textContent = "Lanzamiento: " + movie.release_date

            let poster = document.createElement("img")
            
            poster.src = movie.poster_path ? url_img + movie.poster_path : "img/images.png";

            let calificacion = document.createElement("p")
            calificacion.textContent = `Puntaje: ${movie.vote_average}`

            movieDiv.appendChild(poster)
            movieDiv.appendChild(titulo)
            movieDiv.appendChild(fechaLanzamiento)
            movieDiv.appendChild(calificacion)
            resultados.appendChild(movieDiv)
            
        });
    }


} )






 


