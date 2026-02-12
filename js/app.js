/***********************
 * STORAGE
 ***********************/
let poList = JSON.parse(localStorage.getItem("poList")) || [];
let prList = JSON.parse(localStorage.getItem("prList")) || [];

/***********************
 * PRODUCT DATA
 ***********************/
let productList = [];

fetch("product.json")
  .then(res => res.json())
  .then(data => {
    productList = data;
  });

/***********************
 * SUPPLIER DATA
 ***********************/
const suppliers = [
  "PT Maju Jaya",
  "PT Sinar Abadi",
  "PT Global Makmur",
  "PT Cahaya Mandiri",
  "PT Karya Bersama"
];

/***********************
 * ELEMENTS
 ***********************/
const productInput = document.getElementById("product");
const productIdInput = document.getElementById("productId");
const productDropdown = document.getElementById("productDropdown");

const supplierInput = document.getElementById("supplier");
const supplierDropdown = document.getElementById("supplierList");

const qtyInput = document.getElementById("qty");
const poTable = document.getElementById("poTable");

/***********************
 * AUTOCOMPLETE HELPERS
 ***********************/
function showDropdown(dropdown, items, onClick) {
  dropdown.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "autocomplete-item";
    div.textContent = item.label;

    div.onclick = () => onClick(item);

    dropdown.appendChild(div);
  });

  dropdown.style.display = items.length ? "block" : "none";
}

function hideDropdown(dropdown) {
  setTimeout(() => {
    dropdown.style.display = "none";
  }, 150);
}

/***********************
 * PRODUCT AUTOCOMPLETE
 ***********************/
productInput.addEventListener("focus", () => {
  showDropdown(
    productDropdown,
    productList.map(p => ({ label: p.name, data: p })),
    item => {
      productInput.value = item.data.name;
      productIdInput.value = item.data.id;
      productDropdown.style.display = "none";
    }
  );
});

productInput.addEventListener("input", () => {
  const value = productInput.value.toLowerCase();

  const filtered = productList
    .filter(p => p.name.toLowerCase().includes(value))
    .map(p => ({ label: p.name, data: p }));

  showDropdown(productDropdown, filtered, item => {
    productInput.value = item.data.name;
    productIdInput.value = item.data.id;
    productDropdown.style.display = "none";
  });
});

productInput.addEventListener("blur", () => hideDropdown(productDropdown));

/***********************
 * SUPPLIER AUTOCOMPLETE
 ***********************/
supplierInput.addEventListener("focus", () => {
  showDropdown(
    supplierDropdown,
    suppliers.map(s => ({ label: s })),
    item => {
      supplierInput.value = item.label;
      supplierDropdown.style.display = "none";
    }
  );
});

supplierInput.addEventListener("input", () => {
  const value = supplierInput.value.toLowerCase();

  const filtered = suppliers
    .filter(s => s.toLowerCase().includes(value))
    .map(s => ({ label: s }));

  showDropdown(supplierDropdown, filtered, item => {
    supplierInput.value = item.label;
    supplierDropdown.style.display = "none";
  });
});

supplierInput.addEventListener("blur", () => hideDropdown(supplierDropdown));

/***********************
 * FORM
 ***********************/
function resetForm() {
  supplierInput.value = "";
  productInput.value = "";
  productIdInput.value = "";
  qtyInput.value = "";
}

/***********************
 * PO CRUD
 ***********************/
function addPO() {
  if (!supplierInput.value || !productInput.value || !qtyInput.value) {
    alert("Lengkapi data PO terlebih dahulu");
    return;
  }

  const po = {
    productId: productIdInput.value,
    supplier: supplierInput.value,
    product: productInput.value,
    qty: qtyInput.value,
    date: new Date().toLocaleDateString("id-ID")
  };

  poList.push(po);
  localStorage.setItem("poList", JSON.stringify(poList));
  loadTable();
  resetForm();
}

function deletePO(index) {
  poList.splice(index, 1);
  localStorage.setItem("poList", JSON.stringify(poList));
  loadTable();
}

/***********************
 * TABLE
 ***********************/
function loadTable() {
  poTable.innerHTML = "";

  poList.forEach((po, i) => {
    poTable.innerHTML += `
      <tr>
        <td>${po.productId}</td>
        <td>${po.product}</td>
        <td>${po.supplier}</td>
        <td>${po.qty}</td>
        <td>${po.date}</td>
        <td>
          <button onclick="deletePO(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

loadTable();

/***********************
 * SAVE PR
 ***********************/
function savePR() {
  if (poList.length === 0) {
    alert("PO list is empty!");
    return;
  }

  const prNo = "PR" + String(prList.length + 1).padStart(3, "0");

  const newPR = {
    prNo,
    items: [...poList],
    status: "Draft",
    createdDate: new Date().toLocaleDateString("id-ID")
  };

  prList.push(newPR);
  localStorage.setItem("prList", JSON.stringify(prList));

  poList = [];
  localStorage.setItem("poList", JSON.stringify(poList));
  loadTable();

  alert("Purchase Request saved!");
  window.location.href = "purchase-request.html";
}

/***********************
 * CANCEL & PRINT
 ***********************/
function cancelPR() {
  if (confirm("Are you sure want to cancel?")) {
    poList = [];
    localStorage.setItem("poList", JSON.stringify(poList));
    loadTable();
    back();
  }
}



function back() {
  window.location.href = "purchase-request.html";
}

function printPOList() {
  window.print();
}
