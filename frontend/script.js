const API_URL = "http://localhost:8080/api/expenses";

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

// Fetch all expenses and display them
async function getExpenses() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    expenseList.innerHTML = "";
    let totalAmount = 0;

    data.forEach(exp => {
      totalAmount += exp.amount;

      const li = document.createElement("li");
      const formattedDate = exp.date ? new Date(exp.date).toLocaleDateString() : "";
      li.innerHTML = `
        <span>${exp.title} - ₹${exp.amount} (${exp.category}) - ${formattedDate}</span>
        <button onclick="deleteExpense('${exp._id}')">❌</button>
      `;
      expenseList.appendChild(li);
    });

    totalElement.textContent = totalAmount;
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

// Add new expense
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category, date }),
    });

    form.reset();
    getExpenses(); // Refresh the list and total
  } catch (error) {
    console.error("Error adding expense:", error);
  }
});

// Delete expense
async function deleteExpense(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getExpenses(); // Refresh list and total
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}

// Load expenses initially
getExpenses();
