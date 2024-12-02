document.addEventListener("DOMContentLoaded", () => {
    const progressData = [
        { course: "Web Development", progress: "85%", mentor: "John Smith", completionDate: "2024-11-30" },
        { course: "Data Science", progress: "60%", mentor: "Jane Doe", completionDate: "2024-12-15" },
    ];

    const totalPayments = document.getElementById("total-payments");
    const childProgress = document.getElementById("child-progress");
    const mentorName = document.getElementById("mentor-name");
    const progressTable = document.getElementById("progress-data");

    totalPayments.textContent = "$1500";
    childProgress.textContent = "75%";
    mentorName.textContent = "John Smith";

    progressData.forEach(data => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.course}</td>
            <td>${data.progress}</td>
            <td>${data.mentor}</td>
            <td>${data.completionDate}</td>
        `;
        progressTable.appendChild(row);
    });
});