const form = document.querySelector('form');
const display = document.querySelector('#display');

const BASE_URL = 'https://api.tvmaze.com/search/shows?';

const getMovies = async (movieName) => {
  try {
    const options = { params: { q: movieName } };
    const res = await axios.get(`${BASE_URL}`, options);

    return res.data;
  } catch (e) {
    console.log(e);
    throw `Message: ${e.message}, URL: ${BASE_URL}`;
  }
};

const showThumbnails = (movies) => {
  if (movies) {
    movies.forEach((movie) => {
      const newImg = document.createElement('img');
      if (movie.show.image) {
        newImg.src = movie.show.image.medium;
        display.append(newImg);
      } else {
        newImg.alt = 'Movie has no image';
      }
    });
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  display.innerHTML = '';
  // Get input value
  const formData = new FormData(form);
  const movieName = formData.get('movie');

  try {
    const movies = await getMovies(movieName);
    showThumbnails(movies);
  } catch (e) {
    const pError = document.createElement('p');
    pError.textContent = e;
    display.append(pError);
  }
});
