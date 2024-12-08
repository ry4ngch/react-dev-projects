import React, {Component} from 'react';

class AddOption extends Component{
  state = {
    error: undefined
  }

  // constructor(props){
  //   super(props);
  //   this.submitOption = this.submitOption.bind(this);
  //
  //   this.state = {
  //     error: undefined
  //   };
  // }

  submitOption = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return {
        error
      }
    })

    if (!error){
      e.target.elements.option.value = "";
    }

  }

  render(){
    return (
      <div>
        {this.state.error && <p className="addOptions-error">{this.state.error}</p>}

        <form onSubmit={this.submitOption} className="addOptions">
          <input className="addOptions__input" type="text" name="option"/>
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;
