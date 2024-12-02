document.addEventListener("DOMContentLoaded", () => {
    const studentData = {
        name: "John Doe",
        courses: [
            { name: "Web Development", enrollmentDate: "2024-01-10", status: "Active" },
            { name: "Data Science", enrollmentDate: "2024-03-15", status: "Completed" }
        ],
        payments: [
            { id: "P001", date: "2024-01-15", amount: 500, status: "Paid" },
            { id: "P002", date: "2024-03-20", amount: 400, status: "Paid" }
        ]
    };

    const coursesCount = document.getElementById("courses-count");
    const paymentsTotal = document.getElementById("payments-total");
    const coursesList = document.getElementById("courses-list");
    const paymentsHistory = document.getElementById("payments-history");

    coursesCount.textContent = studentData.courses.length;
    paymentsTotal.textContent = `$${studentData.payments.reduce((sum, payment) => sum + payment.amount, 0)}`;

    studentData.courses.forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.enrollmentDate}</td>
            <td>${course.status}</td>
        `;
        coursesList.appendChild(row);
    });

    studentData.payments.forEach(payment => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.date}</td>
            <td>$${payment.amount}</td>
            <td>${payment.status}</td>
        `;
        paymentsHistory.appendChild(row);
    });
});