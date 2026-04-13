let data = JSON.parse(localStorage.getItem("feedbacks")) || [];
let table = document.getElementById("tableData");

data.forEach(fb => {
    let row = `<tr>
        <td>${fb.name}</td>
        <td>${fb.email}</td>
        <td>${fb.message}</td>
    </tr>`;
    table.innerHTML += row;
});

// Excel Download
function downloadExcel() {
    let csv = "Name,Email,Message\n";

    data.forEach(fb => {
        csv += `${fb.name},${fb.email},${fb.message}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "feedback.csv";
    a.click();
}