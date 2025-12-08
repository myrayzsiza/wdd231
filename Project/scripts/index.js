// Index page script: fetches movies, handles feature filters and watchlist
const resultsSection = document.getElementById('feature-results');
const resultsContainer = document.getElementById('results-container');
const watchlistModal = document.getElementById('watchlist-modal');
const watchlistContainer = document.getElementById('watchlist-container');
const closeWatchlistBtn = document.getElementById('close-watchlist');

let allMovies = [];

async function fetchMovies() {
  try {
    const res = await fetch('data/movies.json');
    allMovies = await res.json();
  } catch (e) {
    console.error('Failed to load movies.json', e);
    allMovies = [];
  }
}

function renderMovieCards(movies, container, options = {}) {
  container.innerHTML = movies.map(movie => `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.image}" alt="${movie.title}" loading="lazy">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year} | ${movie.genre}</p>
        <p class="rating">Rating: <span style="color:#ff3333;font-weight:bold">${movie.rating}/10</span></p>
      </div>
        <div class="movie-actions" style="padding:12px; display:flex; gap:8px; align-items:center;">
          <button class="btn btn-primary more-info-btn" data-id="${movie.id}">More Info</button>
          <button class="btn btn-save watchlist-btn" data-id="${movie.id}">Save</button>
        </div>
    </div>
  `).join('');

  // wire up buttons
  container.querySelectorAll('.more-info-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const movie = allMovies.find(m => String(m.id) === String(id));
      if (movie) showMovieModal(movie);
    });
  });

  container.querySelectorAll('.watchlist-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (isInWatchlist(id)) {
      btn.textContent = 'Saved';
      btn.disabled = true;
      btn.style.opacity = '0.8';
    }
    btn.addEventListener('click', (e) => {
      const mid = e.currentTarget.dataset.id;
      addToWatchlist(mid);
      e.currentTarget.textContent = 'Saved';
      e.currentTarget.disabled = true;
      e.currentTarget.style.opacity = '0.8';
    });
  });

  // allow tapping the card itself to save/open details (ignore clicks on buttons)
  container.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return; // let buttons handle their own actions
      const id = card.dataset.id;
      // if already saved, open details; otherwise save to watchlist
      if (isInWatchlist(id)) {
        const movie = allMovies.find(m => String(m.id) === String(id));
        if (movie) showMovieModal(movie);
        return;
      }
      addToWatchlist(id);
      const btn = card.querySelector('.watchlist-btn');
      if (btn) {
        btn.textContent = 'Saved';
        btn.disabled = true;
        btn.style.opacity = '0.8';
      }
    });
  });
}

function showMovieModal(movie) {
  // reuse existing modal if present (movies.js created movie-modal)
  const modalEl = document.getElementById('movie-modal');
  const modalContent = document.getElementById('modal-content');
  if (modalEl && modalContent) {
    modalContent.innerHTML = `
      <h2>${movie.title}</h2>
      <div style="text-align:center;margin-bottom:12px;">
        <img src="${movie.image}" alt="${movie.title}" style="width:100%;max-width:320px;border-radius:8px;">
      </div>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Rating:</strong> <span style="color:#ff3333;font-weight:bold">${movie.rating}/10</span></p>
      <p style="line-height:1.6">${movie.description}</p>
    `;
    modalEl.showModal();
  } else {
    // fallback: alert
    alert(`${movie.title} (${movie.year})\nRating: ${movie.rating}\n\n${movie.description}`);
  }
}

// Watchlist helpers
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

function openWatchlistModal() {
  const ids = getWatchlist();
  const movies = allMovies.filter(m => ids.includes(m.id));
  watchlistContainer.innerHTML = '';
  if (movies.length === 0) {
    watchlistContainer.innerHTML = '<p style="color:#b0b0b0;">Your watchlist is empty.</p>';
  } else {
    renderMovieCards(movies, watchlistContainer);
    // add remove buttons
    watchlistContainer.querySelectorAll('.watchlist-btn').forEach(btn => {
      btn.textContent = 'Remove';
      btn.disabled = false;
      btn.style.background = '#ff3333';
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        removeFromWatchlist(id);
        openWatchlistModal();
      });
    });
    // make watchlist cards tappable to open details (ignore button clicks)
    watchlistContainer.querySelectorAll('.movie-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const id = card.dataset.id;
        const movie = allMovies.find(m => String(m.id) === String(id));
        if (movie) showMovieModal(movie);
      });
    });
  }
  watchlistModal.showModal();
}

closeWatchlistBtn.addEventListener('click', () => watchlistModal.close());
watchlistModal.addEventListener('click', (e) => { if (e.target === watchlistModal) watchlistModal.close(); });

document.addEventListener('DOMContentLoaded', async () => {
  await fetchMovies();

  // Feature card listeners
  const latestEl = document.querySelector('[data-action="latest"]');
  const topEl = document.querySelector('[data-action="top"]');
  const watchEl = document.querySelector('[data-action="watchlist"]');

  if (latestEl) latestEl.addEventListener('click', () => {
    const list = allMovies.filter(m => Number(m.year) >= 2015);
    resultsSection.style.display = '';
    renderMovieCards(list, resultsContainer);
    window.scrollTo({ top: resultsSection.offsetTop - 80, behavior: 'smooth' });
  });

  if (topEl) topEl.addEventListener('click', () => {
    const list = allMovies.filter(m => parseFloat(m.rating) >= 7.0);
    resultsSection.style.display = '';
    renderMovieCards(list, resultsContainer);
    window.scrollTo({ top: resultsSection.offsetTop - 80, behavior: 'smooth' });
  });

  if (watchEl) watchEl.addEventListener('click', () => {
    openWatchlistModal();
  });

  // header watchlist button (if present)
  const headerWatchBtn = document.getElementById('header-watchlist');
  if (headerWatchBtn) {
    headerWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWatchlistModal();
    });
  }

  // initialize any existing watchlist buttons on page (if results shown)
});
