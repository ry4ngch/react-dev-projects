import React from 'react';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => (
  <div>
    Editing expense page with id of {props.match.params.id}
    <ExpenseForm />
  </div>
)

export default EditExpensePage;
