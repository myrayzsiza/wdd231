const moviesContainer = document.getElementById('movies-container');
const modal = document.getElementById('movie-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

async function fetchMovies() {
  try {
    const response = await fetch('data/movies.json');
    const movies = await response.json();
    displayMovies(movies);
    localStorage.setItem('moviesData', JSON.stringify(movies));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'card';
    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title} (${movie.year})</h3>
      <p>Genre: ${movie.genre}</p>
      <p>Rating: ${movie.rating}</p>
      <button data-id="${movie.id}">More Info</button>
    `;

    const button = movieCard.querySelector('button');
    button.addEventListener('click', () => showModal(movie));

    moviesContainer.appendChild(movieCard);
  });
}

function showModal(movie) {
  modalContent.innerHTML = `
    <h2>${movie.title} (${movie.year})</h2>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p>${movie.description}</p>
    <img src="${movie.image}" alt="${movie.title}" style="width:50%; margin-top:10px;">
  `;
  modal.style.display = 'block';
}

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
});

fetchMovies();
document.addEventListener("DOMContentLoaded", () => {
  const lastModified = new Date(document.lastModified);
  const formattedDate = lastModified.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const container = document.getElementById("last-modified");
  if(container) container.textContent = `Last Modified: ${formattedDate}`;
});
