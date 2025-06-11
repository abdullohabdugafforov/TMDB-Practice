let myData; 
let watchList = document.querySelector('.movie-list')
const API_KEY = "14c4f59ee0e2dd110e8f70b0a7d3439b";
let watchListStorage = JSON.parse(localStorage.getItem('movieList'))

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

fetchMovies()

function renderMovie() {
    watchListStorage.forEach(movieId => {
        myData.results.forEach(movie => {
            if(movieId == movie.id) {
                watchList.insertAdjacentHTML('beforeend', `
                        <div onclick="goToDetail(${movie.id})">
                            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.original_title}">
                            <div>
                                <h5>${movie.title}</h5>
                                <p class='movie-rate'><img src="./images/Star.png">${Number(movie.vote_average.toFixed(1))}</p>
                                <p><img src="./images/CalendarBlank.png">${movie.release_date}</p>
                                <p><img src="./images/Ticket.png">${movie.original_language}</p>
                            </div>
                        </div>
                    `)
            }
        });
    });
}

function goToDetail(movieId) {
      window.location.href = `detail.html?id=${movieId}`;
}