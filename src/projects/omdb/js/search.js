const movieInput = document.getElementById('movieName');
const submitBtn = document.getElementById('submitBtn');
const url = 'https://www.omdbapi.com/?s=';
const apiKey = '&apikey=82ed9809';
const output = document.getElementById('output');
const singleMovie = document.getElementById('singleMovie');

let movieName = movieInput.value;

let media;

document.addEventListener('submit', (e) => {

  if (movieInput.value === ''){
    submitBtn.classList = 'btn btn-danger';
    submitBtn.innerText = `Try Again`;
  } else {
    output.innerHTML = '';
    getMovies(movieName);
  }

  e.preventDefault();
});

function getMovies(movieName){

  const getMovie = `${url}${movieInput.value}${apiKey}`


  fetch(getMovie)
    .then(res => res.json())
    .then(data => {

      let valid = data.Response.toLowerCase();
      console.log(data);

      // console.log(data.Response.toLowerCase());
      console.log(data.Search);
      console.log(data.Search[0].Title);

      movieInput.classList.remove("is-invalid");
      submitBtn.classList.add("btn-dark");
      submitBtn.classList.remove("btn-danger");
      submitBtn.innerText = "Submit";

      if(data.Search.Poster === "NA"){
        console.log('remove');
      }
  
  // NEED TO DO FOREACH ITERATION
  data.Search.forEach((x) => {
    if(x.Poster === "N/A"){
      return;
    }
    output.innerHTML += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 card-group">
            <div class="card bg-dark mb-4">
              <img class="card-img-top" src="${x.Poster}">
              <div class="card-body d-flex flex-column">
                <h4 class="card-title mt-auto">${x.Title}</h4>
                <a onclick="movieSelected('${x.imdbID}')" type="button" class="mt-auto btn btn-block btn-secondary">Details</a>
              </div>
            </div>
          </div>
        `;
  });

    })
    .catch(error => {
      console.log(error);
    }); 

};

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
};

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  let singleURL = `http://www.omdbapi.com/?i=${movieId}${apiKey}`


  fetch(singleURL)
    .then(res => res.json())
    .then(data => {

      console.log(data);

      //Format released date
      let date = data.Released;
      let date2 = date.split(' ');
      let date3 = date2.unshift(date2.splice(1, 1) [0] + '.');
      //let formattedDate = date2.join(' ');

      let formattedDate = date2.join(' ');
      // let ddate = formattedDate.split('').splice(7, 1)[0] + ',';
      // console.log(formattedDate.split('')).splice(7, 1)[0] + ',');
      // let date4 = formattedDate.split('');
      // console.log(date4.splice(7, 1) + 'tt');

      let innerHTML = `
          <div class="row text-center text-dark">
            <div class="col-md-6">
              <img src="${data.Poster}" />
            </div>
            <div class="col-md-6 text-left font-weight-bold">
              <div class="mb-4">
                <span class="display-4 font-weight-normal mr-2">${data.Title}</span>
                <span id="rating">(${data.Rated})</span>
              </div>
              <span class="lead small">${formattedDate}</span> |
              <span class="lead small">${data.Genre}</span> |
              <span class="lead small">${data.Runtime}</span> 
              
              <hr class="my-4">

              <p class="mt-3">${data.Plot}</p>
              
              <hr class="my-4">

              <div class="row text-center">
              `;
      let type = ['IMDb.png', 'RottenTomatoes.png','Metacritic.png'];
      for (var i = 0; i < data.Ratings.length; i++){
        innerHTML += `<div class="col">
                        <img class="icon" src="./img/${type[i]}"></img>
                        <h4 class="">${data.Ratings[i].Value}</h4>
                      </div>`;
      }
      innerHTML += `</div>`;

        singleMovie.innerHTML = innerHTML;
;
        if(data.Rated === "N/A"){
          document.getElementById('rating').innerText = "(Unrated)";
        };
      
    })
    .catch(error => {
      console.log(error);
    }); 
}





  // <div class="d-block"><img class="icon" src="../img/IMDb.png"></img> ${movie.Ratings[0].Value}</div>
  // <div class="d-block mb-1"><img class="icon" src="../img/RottenTomatoes.png"></img> ${movie.Ratings[1].Value}</div>
  // <div class="d-block my-2"><img class="icon mr-2" src="../img/Metacritic.svg.png"></img> ${movie.Ratings[2].Value}</div>