async function loadSpotlights() {
  const container = document.getElementById("spotlight-container");
  container.innerHTML = ''; // clear previous content

  try {
    const resp = await fetch("data/members.json");
    if (!resp.ok) throw new Error(`Network error: ${resp.status}`);
    const members = await resp.json();

    // Normalize member objects to a consistent shape:
    const normalized = members.map(m => {
      // membership can be number (membershipLevel) or string ('Gold','Silver','Member')
      let membershipText = '';
      if (typeof m.membershipLevel === 'number') {
        if (m.membershipLevel === 3) membershipText = 'Gold';
        else if (m.membershipLevel === 2) membershipText = 'Silver';
        else membershipText = 'Member';
      } else if (typeof m.membership === 'string') {
        membershipText = m.membership;
      } else {
        membershipText = (m.membershipLevel || m.membership) ? String(m.membershipLevel || m.membership) : 'Member';
      }

      // image field might be named `image` or `logo`
      const imageFile = m.image || m.logo || '';

      return {
        name: m.name || 'Unknown',
        phone: m.phone || '',
        address: m.address || '',
        website: m.website || '#',
        membership: membershipText,
        image: imageFile
      };
    });

    // Filter to Silver or Gold members
    const goldSilver = normalized.filter(m => {
      const mem = (m.membership || '').toString().toLowerCase();
      return mem.includes('gold') || mem.includes('silver') || mem === '3' || mem === '2';
    });

    if (goldSilver.length === 0) {
      container.innerHTML = '<p>No Gold or Silver members found for spotlights.</p>';
      return;
    }

    // Shuffle and take 2 or 3 (if available)
    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const take = Math.min(3, Math.max(2, shuffled.length)); // prefer 3, at least 2 if possible
    const chosen = shuffled.slice(0, take);

    chosen.forEach(member => {
      const card = document.createElement('article');
      card.className = 'member-card spotlight-card';
      card.setAttribute('role', 'listitem');
      const imgPath = member.image ? `images/${member.image}` : 'images/placeholder.png';
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${imgPath}" alt="${member.name} logo" loading="lazy">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        <p>Membership: ${member.membership}</p>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error('Spotlight error:', err);
    container.innerHTML = `<p>Failed to load spotlights.</p>`;
  } finally {
    // set footer dynamic content here (runs after spotlights load)
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const lm = document.getElementById('lastModified');
    if (lm) lm.textContent = document.lastModified || 'Unknown';
  }
}

loadSpotlights();
