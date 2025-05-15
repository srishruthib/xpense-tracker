// App.js
import React, { useState, useEffect } from "react";
import Wallet from "./Components/Wallet";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import SummaryChart from "./Components/SummaryChart";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem("walletBalance")) || 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const addExpense = (expense) => {
    if (expense.price > balance) {
      alert("Insufficient wallet balance.");
      return;
    }
    setExpenses([...expenses, expense]);
    setBalance(balance - expense.price);
  };

  const deleteExpense = (id) => {
    const expense = expenses.find((e) => e.id === id);
    setExpenses(expenses.filter((e) => e.id !== id));
    setBalance(balance + expense.price);
  };

  const editExpense = (updatedExpense) => {
    const oldExpense = expenses.find((e) => e.id === updatedExpense.id);
    const newExpenses = expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e));
    setExpenses(newExpenses);
    setBalance(balance + oldExpense.price - updatedExpense.price);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <Wallet balance={balance} addIncome={addIncome} />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
      <SummaryChart expenses={expenses} />
    </div>
  );
}

export default App;

// Other component files like Wallet.js, ExpenseForm.js, ExpenseList.js, SummaryChart.js, TrendsChart.js need to be created separately with proper functionality as per requirements.
