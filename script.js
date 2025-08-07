let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;

document.addEventListener("DOMContentLoaded", function () {
  renderExpenses();

  // Attach the form submission prevention here
  const expenseForm = document.getElementById("expenseForm");
  if (expenseForm) {
    expenseForm.addEventListener("submit", function (e) {
      e.preventDefault(); // 🚫 Stop the page from reloading
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
  } else {
    alert("Please fill in all fields.");
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${expense.name}</strong> - ₹${expense.amount.toFixed(2)}
      <small class="text-muted">[${expense.category}]</small>
      <span style="float:right;">${expense.date}</span>
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
  }
}

function updateBudgetUI() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("budgetDisplay").innerText = budget.toFixed(2);
  document.getElementById("remainingDisplay").innerText = (budget - total).toFixed(2);
}

function renderHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  if (expenses.length === 0) {
    historyList.innerHTML = '<p>No expenses added yet.</p>';
    return;
  }

  expenses.forEach(expense => {
    const entry = document.createElement('div');
    entry.className = 'expense-item';
    entry.innerHTML = `
      <div><strong>${expense.name}</strong></div>
      <div>₹${expense.amount.toFixed(2)}</div>
      <div class="text-muted">${expense.category} | ${expense.date}</div>
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
