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
  const movieCards = movies.map(movie => `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.image}" alt="${movie.title}" loading="lazy">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year} | ${movie.genre}</p>
        <span>Rating: <span style="color:#ff3333;font-weight:bold">${movie.rating}/10</span></span>
      </div>
      <div class="movie-actions" style="padding:12px;">
        <button class="btn btn-primary more-info-btn" data-id="${movie.id}">More Info</button>
      </div>
    </div>
  `).join('');
  
  moviesContainer.innerHTML = movieCards;
  
  document.querySelectorAll('.more-info-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const movieId = e.target.dataset.id;
      const response = await fetch('data/movies.json');
      const movies = await response.json();
      const movie = movies.find(m => m.id == movieId);
      showModal(movie);
    });
  });
}

function showModal(movie) {
  modalContent.innerHTML = `
    <h2>${movie.title}</h2>
    <div style="text-align: center; margin-bottom: 15px;">
      <img src="${movie.image}" alt="${movie.title}" style="width: 100%; max-width: 300px; border-radius: 8px;">
    </div>
    <p><strong>Year:</strong> ${movie.year}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Rating:</strong> <span style="color: #ff3333; font-weight: bold;">${movie.rating}/10</span></p>
    <p><strong>Synopsis:</strong></p>
    <p style="line-height: 1.8;">${movie.description}</p>
  `;
  modal.showModal();
}

closeModalBtn.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.close();
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
