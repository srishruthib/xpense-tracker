import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./TrendsChart.css";

const TrendsChart = ({ expenses }) => {
    const data = Object.entries(
        expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    return (
        <div className="trends-chart">
            <h2>Spending Trends</h2>
            {data.length ? (
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            ) : (
                <p>No expenses to show.</p>
            )}
        </div>
    );
};

export default TrendsChart;