let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;

document.addEventListener("DOMContentLoaded", function () {
  renderExpenses();

  const expenseForm = document.getElementById("expenseForm");
  if (expenseForm) {
    expenseForm.addEventListener("submit", function (e) {
      e.preventDefault();
      addExpense();
    });
  }

  const budgetBtn = document.getElementById("setBudgetBtn");
  if (budgetBtn) {
    budgetBtn.addEventListener("click", setBudget);
  }
});

function addExpense() {
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const name = document.getElementById("expense-name").value;

  if (name && amount > 0 && category && date) {
    const expense = {
      name,
      amount: Number(amount),
      category,
      date: date || new Date().toLocaleString(),
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    clearInputs();
    showToast("Expense added successfully! 💸", "success");
  } else {
    showToast("Please fill in all fields ⚠️", "error");
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  showToast("Expense deleted 🗑️", "info");
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold">${expense.name}</div>
        <small class="text-muted">${expense.category}</small>
        <br>
        <small class="text-muted">${expense.date}</small>
      </div>
      <span class="badge bg-primary rounded-pill">₹${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${index})" class="btn btn-sm btn-danger ms-2">Delete</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = `Total: ₹${total.toFixed(2)}`;
  renderHistory();
  updateBudgetUI();
}

function setBudget() {
  const budgetInput = document.getElementById("budgetInput").value;
  if (budgetInput && budgetInput > 0) {
    budget = Number(budgetInput);
    localStorage.setItem("budget", budget);
    updateBudgetUI();
    showToast("Budget set ✅", "success");
  } else {
    showToast("Enter a valid budget amount ⚠️", "error");
  }
}

function updateBudgetUI() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("budgetDisplay").innerText = budget.toFixed(2);
  document.getElementById("remainingDisplay").innerText = (budget - total).toFixed(2);

  const remainingBox = document.getElementById("remainingDisplay");
  if (budget - total < 0) {
    remainingBox.style.color = "red";
    showToast("Budget Exceeded 🚨", "error");
  } else {
    remainingBox.style.color = "#198754";
  }
}

function renderHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  if (expenses.length === 0) {
    historyList.innerHTML = '<p class="text-muted">No expenses added yet.</p>';
    return;
  }

  expenses.forEach(expense => {
    const entry = document.createElement('div');
    entry.className = 'card mb-2 p-2 shadow-sm';
    entry.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <strong>${expense.name}</strong><br>
          <small class="text-muted">${expense.category}</small>
        </div>
        <div class="text-end">
          <span class="text-primary">₹${expense.amount.toFixed(2)}</span><br>
          <small class="text-muted">${expense.date}</small>
        </div>
      </div>
    `;
    historyList.appendChild(entry);
  });
}

function clearInputs() {
  document.getElementById("expense-name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}
