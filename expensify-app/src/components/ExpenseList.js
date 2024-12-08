import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map((expense, index) => {
      return <ExpenseListItem key={expense.id} {...expense}/>
    })}
  </div>
)

// const ConnectedExpenseList = connect((state) => {
//   return {
//     expenses: state.expenses,
//     filters: state.filters
//   }
// })(ExpenseList);

const ConnectedExpenseList = connect((state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
})(ExpenseList);

export default ConnectedExpenseList;
