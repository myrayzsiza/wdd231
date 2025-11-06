const container = document.getElementById('membersContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    container.innerHTML = `<p>Failed to load member data.</p>`;
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <div>
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Grid/List toggle
gridBtn.addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
  gridBtn.classList.add('active-filter');
  listBtn.classList.remove('active-filter');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
  listBtn.classList.add('active-filter');
  gridBtn.classList.remove('active-filter');
});

// Footer dynamic content
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

loadMembers();
