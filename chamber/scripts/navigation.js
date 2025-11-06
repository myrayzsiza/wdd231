// scripts/navigation.js
const menuButton = document.getElementById('hamburger');
const mainNav = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    
    const isExpanded = mainNav.classList.contains('open');
    
    // Accessibility (Lighthouse) and visual update
    menuButton.setAttribute('aria-expanded', isExpanded);
    menuButton.textContent = isExpanded ? '✕' : '☰';
});