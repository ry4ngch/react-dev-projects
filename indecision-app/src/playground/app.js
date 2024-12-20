//import React, {Component} from 'react';
class IndecisionApp extends React.Component{
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.onMakeDecision = this.onMakeDecision.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: props.options
    };
  }

  componentDidMount(){
    try{
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if(options){
        this.setState(() => ({options}));
      }
    }catch(e){
      // do nothing
    }

  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json)
    }
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  handleDeleteOptions(){
    this.setState(() => {
      return {
        options: []
      }

    })
  }

  handleDeleteOption(option){
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((opt) => (opt !== option))
      }
    })
  }

  handleAddOption(option){
    if(!option){
      return 'Enter Valid Value to Add Item';
    } else if (this.state.options.indexOf(option) > -1 ){
        return 'This option already exist';
    }


    this.setState((prevState) => {
      return {
        options: [...prevState.options, option]
      }
    })
  }

  onMakeDecision(){
    const randNum = Math.floor(Math.random()*this.state.options.length);
    alert(this.state.options[randNum]);
  }

  render(){
    const title = "Indecision";
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle}/>
        <Action hasOptions={this.state.options.length > 0} onMakeDecision={this.onMakeDecision} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption}/>
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    )
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <p>{props.subtitle}</p>}
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision App'
}

// class Header extends React.Component{
//   render(){
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <p>{this.props.subtitle}</p>
//       </div>
//     );
//   }
// }

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.onMakeDecision}
        disabled={!props.hasOptions}>
        What Should I do?
      </button>
    </div>
  );
}

// class Action extends React.Component{
//   render(){
//     return (
//       <div>
//         <button
//           onClick={this.props.onMakeDecision}
//           disabled={!this.props.hasOptions}>
//           What Should I do?
//         </button>
//       </div>
//     );
//   }
// }

const Options = (props) => {
  return (
    <div>

      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an options to get started!</p>}
      {
        props.options.map((option) => {
          return <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>
        })
      }
    </div>
  );
}

// class Options extends React.Component{
//   render(){
//     return (
//       <div>
//
//         <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//         {
//           this.props.options.map((option) => {
//             return <Option key={option} optionText={option}/>
//           })
//         }
//       </div>
//     );
//   }
// }

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button onClick={(e) => {
        props.handleDeleteOption(props.optionText);
      }}>Remove</button>
    </div>
  );
}

// class Option extends React.Component{
//   render(){
//     return (
//       <div>
//         {this.props.optionText}
//       </div>
//     )
//   }
// }

class AddOption extends React.Component{
  constructor(props){
    super(props);
    this.submitOption = this.submitOption.bind(this);

    this.state = {
      error: undefined
    };
  }

  submitOption(e){
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
        {this.state.error && <p>{this.state.error}</p>}

        <form onSubmit={this.submitOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
