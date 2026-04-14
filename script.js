// ✅ Firebase Config (replace with your real values)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// ✅ Initialize Firebase FIRST
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ==========================
// ✅ Submit Feedback (User Page)
// ==========================
function submitFeedback() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Fill all fields");
        return;
    }

    db.ref("feedbacks").push({
        name: name,
        email: email,
        message: message
    })
    .then(() => {
        alert("Saved permanently!");

        // Clear fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    })
    .catch((error) => {
        console.error(error);
        alert("Error saving data");
    });
}


// ==========================
// ✅ Admin Login
// ==========================
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("Invalid Login");
    }
}


// ==========================
// ✅ Load Feedback (Admin Page)
// ==========================
let table = document.getElementById("tableData");

// Only run if table exists (important!)
if (table) {
    db.ref("feedbacks").on("value", snapshot => {
        table.innerHTML = "";

        snapshot.forEach(child => {
            let fb = child.val();

            let row = `<tr>
                <td>${fb.name}</td>
                <td>${fb.email}</td>
                <td>${fb.message}</td>
            </tr>`;

            table.innerHTML += row;
        });
    });
}
