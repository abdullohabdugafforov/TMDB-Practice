const params = new URLSearchParams(window.location.search);
const cardId = Number(params.get("id"));

let myData;
const detailDiv = document.getElementById("card-details");
const body = document.querySelector("body");
const API_KEY = "14c4f59ee0e2dd110e8f70b0a7d3439b";

body.insertAdjacentHTML(
  "afterbegin",
  `
    <ul class="search-bar">
        <li><a href="./search.html"><</a></li>
        <li><a href="#">Detail</a></li>
        <li onclick='sendId(${cardId})'><img src="./images/Bookmark.png" alt=""></li>
    </ul>
  `
);

async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    myData = data;
    myData.results.forEach((element) => {
      if (cardId == element.id) {
        detailDiv.innerHTML = `
            <div class="movie-card">
    <div class="banner">
      <img src="https://image.tmdb.org/t/p/w200${
        element.poster_path
      }" alt="Spiderman Banner" class="banner-img" />
      <div class="rating">
      <img src='./images/Star.png'> 
      ${element.vote_average.toFixed(1)}
       </div>
    </div>

    <div class="poster-title">
      <img src="https://image.tmdb.org/t/p/w200${
        element.poster_path
      }" alt="Spiderman Poster" class="poster" />
      <div class="title-info">
        <h2>${element.title}</h2>
      </div>
    </div>

    <div class="meta">
          <span>📅 ${element.release_date} |</span>
          <span>🏁 ${element.original_language} |</span>
          <span>➿ ${element.vote_average.toFixed(1)}</span>
        </div>

    <div class="tabs">
      <button class="active">About Movie</button>
      <button>Reviews</button>
      <button>Cast</button>
    </div>

    <div class="description">
      <p>
        From DC Comics comes the Suicide Squad, an antihero team of incarcerated
        supervillains who act as deniable assets for the United States government,
        undertaking high-risk black ops missions in exchange for commuted prison
        sentences.
      </p>
    </div>
  </div>
        `;
      }
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchMovies();

function sendId(movieId) {
  let data = localStorage.getItem('movieList');
  if (!data) {
    let arr = [];
    arr.push(movieId);
    localStorage.setItem('movieList', JSON.stringify(arr));
  } else {
    data = JSON.parse(data);
    if(data.includes(movieId)){
        alert('Already added to Watch List')
    }else{
        data.push(movieId);
        localStorage.setItem('movieList', JSON.stringify(data));
        alert('Succesfully added')
    }
  }
}
