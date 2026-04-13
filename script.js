// Submit Feedback
function submitFeedback() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Fill all fields");
        return;
    }

    let feedback = { name, email, message };

    let data = JSON.parse(localStorage.getItem("feedbacks")) || [];
    data.push(feedback);

    localStorage.setItem("feedbacks", JSON.stringify(data));

    alert("Feedback Submitted!");
}

// Admin Login
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("Invalid Login");
    }
}