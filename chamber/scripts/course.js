// scripts/course.js

const courses = [
    { courseNum: "WDD 131", courseName: "Web Fundamentals", credits: 2, completed: true },
    { courseNum: "CSE 121", courseName: "Introduction to Programming", credits: 2, completed: false },
    { courseNum: "WDD 231", courseName: "Web Backend Development", credits: 3, completed: false },
    { courseNum: "CSE 210", courseName: "Programming with Classes", credits: 4, completed: true },
    { courseNum: "WDD 331", courseName: "Advanced Web Topics", credits: 3, completed: false },
    { courseNum: "CSE 341", courseName: "Web Scripting", credits: 3, completed: true }
];

const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsSpan = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');

// CRITERION 11: Calculates total credits using Array.reduce
const calculateTotalCredits = (filteredCourses) => {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
};

// CRITERION 9, 12: Displays courses and marks completed ones
const displayCourses = (courseList) => {
    courseCardsContainer.innerHTML = ''; 
    
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        // CRITERION 12: Marks completed courses
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.courseNum}</h3>
            <p><strong>Title:</strong> ${course.courseName}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        `;
        courseCardsContainer.appendChild(card);
    });

    calculateTotalCredits(courseList);
};

// CRITERION 10: Filtering Logic using Array.filter
const filterCourses = (filterType) => {
    let filteredList = courses;

    if (filterType === 'WDD') {
        filteredList = courses.filter(course => course.courseNum.startsWith('WDD'));
    } else if (filterType === 'CSE') {
        filteredList = courses.filter(course => course.courseNum.startsWith('CSE'));
    }

    displayCourses(filteredList);
};

// Non-Intrusive JS Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const filterType = event.target.id.split('-')[1].toUpperCase();

        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        event.target.classList.add('active-filter');

        filterCourses(filterType);
    });
});

// Initial page load: display all courses
filterCourses('ALL');