import React from "react";
import './ExpensesList.css';
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({filteredExpenses}) => {
    if(filteredExpenses.length === 0) {
        return <h2 className="expenses-list__fallback">No expenses found.</h2>
    }

    return (
        <ul className="expenses-list">
            {filteredExpenses.map((expense) => (
                <ExpenseItem {...expense} key={expense.id}></ExpenseItem>
            ))}
        </ul>
    )
}

export default ExpensesList;