import React, { useState } from "react";
import Modal from "react-modal";
import "./ExpenseList.css";

Modal.setAppElement("#root");

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);

    const openModal = (expense) => {
        setCurrentExpense({ ...expense });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentExpense(null);
    };

    const handleEditChange = (e) => {
        setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editExpense({ ...currentExpense, price: Number(currentExpense.price) });
        closeModal();
    };

    return (
        <div className="expense-list-container">
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses to display</p>
            ) : (
                <ul className="expense-list">
                    {expenses.map((expense) => (
                        <li key={expense.id} className="expense-item">
                            <span data-testid="expense-title">{expense.title}</span>
                            <span data-testid="expense-amount">${expense.price.toFixed(2)}</span>
                            <span data-testid="expense-category">{expense.category}</span>
                            <span data-testid="expense-date">{expense.date}</span>
                            <button
                                data-testid="edit-button"
                                onClick={() => openModal(expense)}
                            >
                                Edit
                            </button>
                            <button
                                data-testid="delete-button"
                                onClick={() => deleteExpense(expense.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for editing */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="expense-modal"
                overlayClassName="modal-overlay"
            >
                <h2>Edit Expense</h2>
                <form onSubmit={handleEditSubmit} className="expense-form">
                    <input
                        name="title"
                        type="text"
                        value={currentExpense?.title || ""}
                        onChange={handleEditChange}
                        required
                        data-testid="edit-title"
                    />
                    <input
                        name="price"
                        type="number"
                        value={currentExpense?.price || ""}
                        onChange={handleEditChange}
                        required
                        data-testid="edit-amount"
                    />
                    <select
                        name="category"
                        value={currentExpense?.category || ""}
                        onChange={handleEditChange}
                        required
                        data-testid="edit-category"
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    <input
                        name="date"
                        type="date"
                        value={currentExpense?.date || ""}
                        onChange={handleEditChange}
                        required
                        data-testid="edit-date"
                    />
                    <button type="submit" data-testid="update-expense">
                        Update
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ExpenseList;
