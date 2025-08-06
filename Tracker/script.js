let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!amount || !category || !date) {
    alert("Please fill all fields.");
    return;
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
}

function clearInputs() {
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

renderExpenses();
