import React, { useState } from "react";
import "./Wallet.css";

const Wallet = ({ balance, addIncome }) => {
    const [income, setIncome] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = Number(income);
        if (!amount || amount < 0) {
            alert("Please enter a valid positive income amount.");
            return;
        }
        addIncome(amount);
        setIncome("");
        setShowForm(false); // hide after submit
    };

    return (
        <div className="wallet-container">
            <h2>Wallet Balance: ₹{balance.toFixed(2)}</h2>

            <button
                type="button"
                data-testid="add-income-button"
                onClick={() => setShowForm(!showForm)}
            >
                + Add Income
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} data-testid="income-form">
                    <input
                        type="number"
                        placeholder="Income Amount"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        data-testid="income-input"
                    />
                    <button type="submit" data-testid="submit-income">Add Balance</button>
                </form>
            )}
        </div>
    );
};

export default Wallet;
