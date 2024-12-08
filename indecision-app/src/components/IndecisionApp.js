import React, {Component} from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';


class IndecisionApp extends Component{
  state = {
    options: this.props.options,
    selectedOption: undefined
  }

  // constructor(props){
  //   super(props);
  //   this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
  //   this.onMakeDecision = this.onMakeDecision.bind(this);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  //   this.handleDeleteOption = this.handleDeleteOption.bind(this);
  //   this.state = {
  //     options: props.options
  //   };
  // }

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

  handleClearModal = () => {
    this.setState(() => ({selectedOption: undefined}))
  }

  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: []
      }

    })
  }

  handleDeleteOption = (option) => {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((opt) => (opt !== option))
      }
    })
  }

  handleAddOption = (option) => {
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

  onMakeDecision = () => {
    const randNum = Math.floor(Math.random()*this.state.options.length);
    const option = this.state.options[randNum];
    this.setState(() => ({selectedOption: option}))


  }

  render(){
    const title = "Indecision";
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle}/>
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} onMakeDecision={this.onMakeDecision} />
          <div className="widget">
            <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption}/>
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
          <OptionModal selectedOption={this.state.selectedOption} handleClearModal={this.handleClearModal}/>
        </div>
      </div>
    )
  }
}


IndecisionApp.defaultProps = {
  options: []
}

export default IndecisionApp;
