const ham = document.querySelector("#ham");
const nav = document.querySelector("nav ul");

ham.addEventListener("click", () => {
  nav.classList.toggle("open");
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
