// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// ✅ Init
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ==========================
// ✅ Submit Feedback
// ==========================
function submitFeedback() {
    let name = document.getElementById("name")?.value;
    let email = document.getElementById("email")?.value;
    let message = document.getElementById("message")?.value;

    if (!name || !email || !message) {
        alert("Fill all fields");
        return;
    }

    db.ref("feedbacks").push({
        name,
        email,
        message,
        time: new Date().toLocaleString()
    })
    .then(() => {
        alert("Saved successfully!");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    })
    .catch(err => {
        console.error(err);
        alert("Error saving data");
    });
}


// ==========================
// ✅ Load Feedback (Admin)
// ==========================
let table = document.getElementById("tableData");

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


// ==========================
// ✅ Download CSV
// ==========================
function downloadExcel() {
    let csv = "Name,Email,Message\n";

    db.ref("feedbacks").once("value", snapshot => {
        snapshot.forEach(child => {
            let fb = child.val();
            csv += `${fb.name},${fb.email},${fb.message}\n`;
        });

        let blob = new Blob([csv], { type: "text/csv" });
        let a = document.createElement("a");

        a.href = URL.createObjectURL(blob);
        a.download = "feedback.csv";
        a.click();
    });
}
