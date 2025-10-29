const courses = [
  { name: "WDD231", subject: "WDD", credits: 3, completed: true },
  { name: "CSE110", subject: "CSE", credits: 2, completed: false },
  { name: "WDD130", subject: "WDD", credits: 2, completed: true },
  { name: "CSE210", subject: "CSE", credits: 3, completed: false }
];

function renderCourses(filter = "All") {
  const list = document.getElementById("courseList");
  list.innerHTML = "";
  const filtered = courses.filter(c => filter === "All" || c.subject === filter);
  filtered.forEach(course => {
    const div = document.createElement("div");
    div.textContent = `${course.name} (${course.credits} credits)`;
    if (course.completed) div.style.textDecoration = "line-through";
    list.appendChild(div);
  });
  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("creditTotal").textContent = `Total Credits: ${total}`;
}

renderCourses();
