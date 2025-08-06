let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const amount = document.getElementById("amount").value;
  const categoryInput = document.getElementById('expense-category');

  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

 if (name && amount > 0) {
  const date = new Date().toLocaleString();
  expenses.push({ name, amount, date });

  }

  const expense = { amount: Number(amount), category, date };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  clearInputs();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
    item.innerHTML = `
  <span><strong>${expense.name}</strong> <small class="text-muted">[${expense.category}]</small></span>
  <span>₹${expense.amount.toFixed(2)} <button onclick="deleteExpense(${index})" class="btn btn-sm btn-danger ms-2">Delete</button></span>
`;

  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `Rs. ${expense.amount} - ${expense.category} - ${expense.date}
      <button onclick="deleteExpense(${index})">X</button>`;
    list.appendChild(li);
  });


  document.getElementById("total").innerText = `Total: Rs. ${total}`;
  renderHistory();

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
      <div class="text-muted">${expense.date || 'Unknown date'}</div>
    `;
    historyList.appendChild(entry);
  });
}


function clearInputs() {
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

renderExpenses();
