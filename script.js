// Create Chart instance globally
let expenseChart;

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  const categoryTotals = {};

  expenses.forEach(exp => {
    total += exp.amount;
    
    // Group expenses by category
    if (categoryTotals[exp.category]) {
      categoryTotals[exp.category] += exp.amount;
    } else {
      categoryTotals[exp.category] = exp.amount;
    }

    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      <span>${exp.name} - ₹${exp.amount} <br> 
      ${exp.category} | ${exp.date}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editExpense(${exp.id})">✏️</button>
        <button class="delete-btn" onclick="deleteExpense(${exp.id})">🗑️</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  totalAmount.textContent = total;

  renderChart(categoryTotals);
}

function renderChart(categoryTotals) {
  const ctx = document.getElementById('expenseChart').getContext('2d');

  // Destroy previous chart to avoid duplicate rendering
  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });
}
