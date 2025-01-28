document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gpa-form');
    const addCourseBtn = document.getElementById('add-course');
    const coursesContainer = document.getElementById('courses-container');
    let courseCount = 1;

    // Add a new course input row
    addCourseBtn.addEventListener('click', () => {
        courseCount++;
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');
        courseDiv.innerHTML = `
            <label for="grade-${courseCount}">Course ${courseCount}</label>
            <select id="grade-${courseCount}" class="grade" required>
                <option value="" disabled selected>Select grade</option>
                <option value="5">A</option>
                <option value="4">B</option>
                <option value="3">C</option>
                <option value="2">D</option>
                <option value="1">E</option>
                <option value="0">F</option>
            </select>
            <label for="credits-${courseCount}">Units</label>
            <input type="number" id="credits-${courseCount}" class="credits" min="1" required>
        `;
        coursesContainer.appendChild(courseDiv);
    });

    // Calculate GPA
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const grades = document.querySelectorAll('.grade');
        const credits = document.querySelectorAll('.credits');

        let totalGradePoints = 0;
        let totalCredits = 0;

        grades.forEach((grade, index) => {
            const gradeValue = parseInt(grade.value);
            const creditValue = parseInt(credits[index].value);

            if (!isNaN(gradeValue) && !isNaN(creditValue)) {
                totalGradePoints += gradeValue * creditValue;
                totalCredits += creditValue;
            }
        });

        const gpa = totalGradePoints / totalCredits;
        const result = document.getElementById('result');
        result.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
    });
});