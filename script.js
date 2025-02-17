// Initialize the expenses array or load from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//Function to update the UI with the current list of expenses
function updateUI(){
    const expensesList = document.getElementById("expense-list");
    const totalExpenses = document.getElementById("total-expenses");
// clear the expenses list
    expensesList.innerHTML ="";

// total
    let total =0;

    // loop through each expense and add them
    expenses.forEach((expense, index )=> {
        const liItem = document.createElement("li");
        liItem.innerHTML =`${expense.name}: $${expense.amount} <button onclick="deleteExpense(${index})">Delete</button>`;
        expensesList.appendChild(liItem);
        total += expense.amount;
    });

    // update total expenses
    totalExpenses.textContent = total;
}


function addExpense(event){
    event.preventDefault();

    const name = document.getElementById("expense-name");
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (name.value.trim() !== "" && !isNaN(amount)) { 
        expenses.push({name: name.value, amount});
        localStorage.setItem('expenses', JSON.stringify(expenses));

        document.getElementById("expense-name").value='';
        document.getElementById("expense-amount").value='';

        updateUI();}
}


function deleteExpense(index){
    expenses.splice(index,1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
}
document.getElementById('expense-form').addEventListener('submit', addExpense);

updateUI();
