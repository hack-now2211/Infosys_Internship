document.addEventListener("DOMContentLoaded", () => {
    // Mock data
    const studentsData = [
        { id: 1, name: "John Doe", email: "john@example.com", course: "Web Development", payments: 3, enrollmentDate: "2024-01-15", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Data Science", payments: 2, enrollmentDate: "2024-02-10", status: "Active" },
        { id: 3, name: "Tom Brown", email: "tom@example.com", course: "UI/UX Design", payments: 1, enrollmentDate: "2024-03-05", status: "Pending" }
    ];

    const studentsTable = document.getElementById("students-data");
    const totalStudents = document.getElementById("total-students");
    const totalPayments = document.getElementById("total-payments");
    const totalCourses = document.getElementById("total-courses");

    totalStudents.textContent = studentsData.length;
    totalPayments.textContent = studentsData.reduce((sum, student) => sum + student.payments, 0);
    totalCourses.textContent = new Set(studentsData.map(student => student.course)).size;

    studentsData.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.payments}</td>
            <td>${student.enrollmentDate}</td>
            <td>${student.status}</td>
        `;
        studentsTable.appendChild(row);
    });
});