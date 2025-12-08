const ham = document.querySelector("#ham");
const nav = document.querySelector("nav ul");

if (ham) {
  ham.addEventListener("click", () => {
    nav.classList.toggle("open");
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
