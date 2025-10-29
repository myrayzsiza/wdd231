// scripts/date.js

// CRITERION 13: Dynamic Copyright Year (Uses required ID: currentyear)
document.getElementById("currentyear").textContent = new Date().getFullYear(); 

// CRITERION 13: Dynamic Last Modified Date
document.getElementById("lastModified").textContent = document.lastModified;