document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  document.getElementById("name").textContent = params.get("name") || '';
  document.getElementById("email").textContent = params.get("email") || '';
  document.getElementById("message").textContent = params.get("message") || '';
});
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
