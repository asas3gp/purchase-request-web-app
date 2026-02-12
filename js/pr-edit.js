const prList = JSON.parse(localStorage.getItem("prList")) || [];
const index = localStorage.getItem("selectedPRIndex");
const pr = prList[index];
const table = document.getElementById("editTable");

pr.items.forEach((item, i) => {
  table.innerHTML += `
    <tr>
      <td>${item.product}</td>
      <td>${item.supplier}</td>
      <td>
        <input type="number" value="${item.qty}"
          onchange="updateQty(${i}, this.value)">
      </td>
      <td>
        <button onclick="removeItem(${i})">Delete</button>
      </td>
    </tr>
  `;
});

function updateQty(i, val) {
  pr.items[i].qty = val;
}

function removeItem(i) {
  pr.items.splice(i, 1);
  render();
}

function render() {
  localStorage.setItem("prList", JSON.stringify(prList));
  location.reload();
}

function saveEdit() {
  pr.status = "Draft";
  localStorage.setItem("prList", JSON.stringify(prList));
  alert("PR updated!");
  back();
}

function back() {
  window.location.href = "purchase-request.html";
}
