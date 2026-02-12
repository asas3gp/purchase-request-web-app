
const prList = JSON.parse(localStorage.getItem("prList")) || [];
const table = document.getElementById("prTable");

prList.forEach((pr, i) => {
  table.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${pr.prNo}</td>
      <td>${pr.status}</td>
      <td>${pr.createdDate}</td>
      <td>
        <button onclick="viewPR(${i})">View</button>
        <button onclick="editPR(${i})">Edit</button>
        <button onclick="deletePR(${i})">Delete</button>

      </td>
    </tr>
  `;
});

function viewPR(index) {
  localStorage.setItem("selectedPRIndex", index);
  window.location.href = "purchase-request-view.html";
}

function editPR(index) {
  localStorage.setItem("selectedPRIndex", index);
  window.location.href = "purchase-request-edit.html";
}

function logout(){
  if (confirm("Are you sure want to Logout?")){
    window.location.href = "login.html";
  }
}

function deletePR(index) {
  const confirmDelete = confirm(
    "Yakin ingin menghapus PR " + prList[index].prNo + "?"
  );

  if (!confirmDelete) return;

  prList.splice(index, 1);
  localStorage.setItem("prList", JSON.stringify(prList));

  // refresh tabel
  table.innerHTML = "";
  prList.forEach((pr, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${pr.prNo}</td>
        <td>${pr.status}</td>
        <td>${pr.createdDate}</td>
        <td>
          <button onclick="viewPR(${i})">View</button>
          <button onclick="editPR(${i})">Edit</button>
          <button onclick="deletePR(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}


