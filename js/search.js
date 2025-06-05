let myData; 
const API_KEY = "14c4f59ee0e2dd110e8f70b0a7d3439b";

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

function renderMovie(){
    console.log(myData)
}