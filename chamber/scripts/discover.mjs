import { items } from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");
if (grid && Array.isArray(items)) {
    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.id = `card${index + 1}`;
        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
              <img loading="lazy" src="${item.image}" alt="${item.title}">
              <figcaption>${item.title}</figcaption>
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        grid.appendChild(card);
    });
}

const message = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();
if (message) {
    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        if (days < 1) {
            message.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            message.textContent = "You last visited 1 day ago.";
        } else {
            message.textContent = `You last visited ${days} days ago.`;
        }
    }
}
localStorage.setItem("lastVisit", String(now));

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
    const dm = document.lastModified;
    if (dm) {
        const lastModified = new Date(dm);
        lastModifiedEl.textContent = `Last modified: ${lastModified.toLocaleDateString()} ${lastModified.toLocaleTimeString()}`;
    } else {
        lastModifiedEl.textContent = "Last modified: unavailable (serve the site via HTTP to see server timestamps)";
    }
}
