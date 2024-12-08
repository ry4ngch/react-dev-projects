import React, {Component} from 'react';

class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: ''
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => {
      return {
        description
      }
    })
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    const regex = '/^\d{1,}(\.\d{0,2})?$/';
    if(amount.match(regex)){
      this.setState(() => ({amount}));
    }

  }

  render(){
    return (
      <div>
        <form>
          <input type="text" value={this.state.description} onChange={this.onDescriptionChange} placeholder="Description" autoFocus />
          <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}/>
          <textarea onChange={this.onNoteChange} value={this.state.note} placeholder="Add a note for your expense (optional)"></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm;
