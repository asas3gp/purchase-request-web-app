const prList = JSON.parse(localStorage.getItem("prList")) || [];
const index = localStorage.getItem("selectedPRIndex");

if (index === null) {
  alert("PR tidak ditemukan");
  window.location.href = "purchase-request.html";
}

const pr = prList[index];

// === HEADER INFO ===
document.getElementById("prNo").textContent = pr.prNo;
document.getElementById("prDate").textContent = pr.createdDate;

const statusEl = document.getElementById("prStatus");
statusEl.textContent = pr.status;
statusEl.className = "badge " + pr.status.toLowerCase();

// === TABLE DETAIL PO ===
const table = document.getElementById("itemTable");
table.innerHTML = "";

if (pr.items.length === 0) {
  table.innerHTML = `
    <tr>
      <td colspan="4" style="text-align:center;color:#94a3b8">
        Tidak ada item PO
      </td>
    </tr>
  `;
} else {
  pr.items.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.productId}</td>
        <td>${item.product}</td>
        <td>${item.supplier}</td>
        <td>${item.qty}</td>
      </tr>
    `;
  });
}

function approved() {
  pr.status = "Approved";
  localStorage.setItem("prList", JSON.stringify(prList));
  alert("PR Approved!");
  back();
}

function back() {
  window.location.href = "purchase-request.html";
}
