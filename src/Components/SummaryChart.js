import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import "./SummaryChart.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SummaryChart = ({ expenses }) => {
    const data = [
        { name: "Food", value: 0 },
        { name: "Entertainment", value: 0 },
        { name: "Travel", value: 0 },
        { name: "Shopping", value: 0 },
    ];

    expenses.forEach((expense) => {
        const category = data.find((item) => item.name === expense.category);
        if (category) category.value += Number(expense.price);
    });

    const filteredData = data.filter((item) => item.value > 0);

    return (
        <div className="summary-chart">
            <h2>Expense Summary</h2>
            {filteredData.length ? (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={filteredData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {filteredData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p>No expenses to show.</p>
            )}
        </div>
    );
};

export default SummaryChart;