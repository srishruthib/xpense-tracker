import React, { useState, useEffect } from "react";
import Wallet from "./Components/Wallet";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import SummaryChart from "./Components/SummaryChart";
import TrendsChart from "./Components/TrendsChart";
import "./App.css";

const defaultExpenses = [];

function App() {
  useEffect(() => {
    if (!localStorage.getItem("walletBalance")) {
      localStorage.setItem("walletBalance", 5000);
    }
    if (!localStorage.getItem("expenses")) {
      localStorage.setItem("expenses", JSON.stringify(defaultExpenses));
    }
  }, []);

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
    setExpenses((prev) => [...prev, expense]);
    setBalance((prev) => prev - expense.price);
  };

  const deleteExpense = (id) => {
    const expense = expenses.find((e) => e.id === id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setBalance((prev) => prev + expense.price);
  };

  const editExpense = (updatedExpense) => {
    const oldExpense = expenses.find((e) => e.id === updatedExpense.id);
    const newExpenses = expenses.map((e) =>
      e.id === updatedExpense.id ? updatedExpense : e
    );
    setExpenses(newExpenses);
    setBalance((prev) => prev + oldExpense.price - updatedExpense.price);
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
      <TrendsChart expenses={expenses} />
    </div>
  );
}

export default App;