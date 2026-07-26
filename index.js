const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
const searchDetails = document.getElementById("search-details");

const displayStudentId =
    document.getElementById("display-student-id");

const displayStudentName =
    document.getElementById("display-student-name");

const displayProjectTitle =
    document.getElementById("display-project-title");

const displayDepartment =
    document.getElementById("display-department");

// Table-এর আগের data মুছে দেওয়ার function
function clearTable() {
    displayStudentId.textContent = "";
    displayStudentName.textContent = "";
    displayProjectTitle.textContent = "";
    displayDepartment.textContent = "";
}

// Search button click
searchButton.addEventListener("click", async () => {
    const id = searchField.value.trim();

    if (id === "") {
        searchDetails.textContent = "Please enter a Student ID";
        clearTable();
        return;
    }

    searchDetails.textContent = "Searching...";

    try {
        const response = await fetch(
            `http://127.0.0.1:3000/read/${encodeURIComponent(id)}`
        );

        const data = await response.json();

        // 404 বা অন্য error response হলে
        if (!response.ok) {
            throw new Error(
                data.error || "Could not fetch student data"
            );
        }

        // পাওয়া data table-এ বসানো
        displayStudentId.textContent = data.id || "";
        displayStudentName.textContent = data.name || "";
        displayProjectTitle.textContent =
            data.projectTitle || "";
        displayDepartment.textContent =
            data.department || "";

        searchDetails.textContent =
            "Student project found successfully";
    } catch (error) {
        console.error(error);

        clearTable();
        searchDetails.textContent = error.message;
    }
});