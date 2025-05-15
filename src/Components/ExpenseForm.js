import React, { useState } from "react";
import Modal from "react-modal";
import "./ExpenseForm.css";

Modal.setAppElement("#root");

const ExpenseForm = ({ addExpense }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        date: "",
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, price, category, date } = formData;

        if (!title || !price || !category || !date) {
            alert("All fields are required");
            return;
        }

        const newExpense = {
            ...formData,
            id: Date.now(),
            price: Number(price),
        };

        addExpense(newExpense);
        setFormData({ title: "", price: "", category: "", date: "" });
        closeModal();
    };

    return (
        <div className="expense-form-container">
            <button
                type="button"
                onClick={openModal}
                data-testid="add-expense-button"
            >
                + Add Expense
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="expense-modal"
                overlayClassName="modal-overlay"
            >
                <h2>Add Expense</h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        data-testid="expense-title"
                    />
                    <input
                        name="price"
                        type="number"
                        placeholder="Amount"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        data-testid="expense-amount"
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        data-testid="expense-category"
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
                        value={formData.date}
                        onChange={handleChange}
                        required
                        data-testid="expense-date"
                    />
                    <button type="submit" data-testid="submit-expense">
                        Add Expense
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ExpenseForm;
