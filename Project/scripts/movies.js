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
        <span>Rating: <span class="rating-value">${movie.rating}/10</span></span>
      </div>
      <div class="movie-actions" style="padding:12px; display:flex; gap:8px; align-items:center;">
        <button class="btn btn-primary more-info-btn" data-id="${movie.id}">More Info</button>
        <button class="btn btn-save watchlist-btn" data-id="${movie.id}">Save</button>
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

  // Wire watchlist buttons and initialize state
  document.querySelectorAll('.watchlist-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (isInWatchlist(id)) {
      btn.textContent = 'Saved';
      btn.disabled = true;
      btn.classList.add('btn-disabled');
    }
    btn.addEventListener('click', (e) => {
      const mid = e.currentTarget.dataset.id;
      addToWatchlist(mid);
      e.currentTarget.textContent = 'Saved';
      e.currentTarget.disabled = true;
      e.currentTarget.classList.add('btn-disabled');
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
    <p><strong>Rating:</strong> <span class="rating-value">${movie.rating}/10</span></p>
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

// LocalStorage helpers for watchlist (shared key: 'watchlist')
function getWatchlist() {
  try {
    const raw = localStorage.getItem('watchlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isInWatchlist(id) {
  const list = getWatchlist();
  return list.includes(Number(id));
}

function addToWatchlist(id) {
  const list = getWatchlist();
  const num = Number(id);
  if (!list.includes(num)) {
    list.push(num);
    localStorage.setItem('watchlist', JSON.stringify(list));
  }
}

function removeFromWatchlist(id) {
  let list = getWatchlist();
  list = list.filter(x => x !== Number(id));
  localStorage.setItem('watchlist', JSON.stringify(list));
}

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
