let myData; 
const API_KEY = "14c4f59ee0e2dd110e8f70b0a7d3439b";

let container = document.querySelector(".container");
let slider = document.querySelector(".slider");

async function fetchMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json(); 
    myData = data; 
    renderMovie()
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchMovies();

function renderMovie() {
  myData.results.forEach((movie) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
            <div>
            <a href="#">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title}">
                </a>
            </div>
            `
      );
    });
    myData.results.forEach((movie) => {
      slider.insertAdjacentHTML(
        "beforeend",
        `
        <div>
        <a href="#">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title}">
                    </a>
                    </div>
            `
          );
        });
      }

let homeSearch = document.querySelector(".search-input");
let movieCategories = document.querySelector(".movie-categories");
homeSearch.addEventListener("input", (e) => {
  let targetMovie = e.target.value.toLowerCase();
  container.innerHTML = ''
  
  myData.results.forEach(movie => {
    if(movie.title.toLowerCase().includes(targetMovie)){
      container.insertAdjacentHTML('beforeend', `
        <div>
        <a href="#">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title}">
                </a>
            </div>
        `)
    }
  })

});