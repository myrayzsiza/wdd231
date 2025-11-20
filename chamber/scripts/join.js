// Fill hidden timestamp when page loads
document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
});

// Open modal by ID
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
  }
}

// Close modal by ID
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}
// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fill hidden timestamp on join.html
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // 2. Show submitted values on thankyou.html
  const params = new URLSearchParams(window.location.search);

  const fields = ["fname", "lname", "email", "phone", "business", "timestamp"];
  fields.forEach(field => {
    const el = document.getElementById(field);
    if (el && params.has(field)) {
      el.textContent = params.get(field);
    }
  });
});

// 3. Modal open/close functions (used in join.html)
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}
