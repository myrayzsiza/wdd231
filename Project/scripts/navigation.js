const ham = document.getElementById('ham');
const navEl = document.querySelector('nav');

if (ham && navEl) {
  ham.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('active');
    ham.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is clicked (mobile)
  navEl.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('a')) {
      navEl.classList.remove('active');
      ham.setAttribute('aria-expanded', 'false');
    }
  });

  // Allow Enter/Space to toggle when focused
  ham.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isOpen = navEl.classList.toggle('active');
      ham.setAttribute('aria-expanded', String(isOpen));
    }
  });
}

// Back button behavior: go back in history, fallback to index.html
function installBackButton() {
  const backBtn = document.getElementById('back-btn');
  if (!backBtn) return;
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.history && window.history.length > 1) {
      window.history.back();
    } else {
      // fallback to homepage
      window.location.href = 'index.html';
    }
  });
}

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
  installBackButton();
});
