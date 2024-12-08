class Counter extends React.Component {
  constructor(props){
    super(props);
    this.minusOne = this.minusOne.bind(this);
    this.addOne = this.addOne.bind(this);
    this.reset = this.reset.bind(this);
    this.resetToOrigin = this.resetToOrigin.bind(this);

    this.state = {
      count: props.count
    };
  }

  componentDidMount(){
    const countStr = localStorage.getItem('count');
    const count = parseInt(countStr, 10);

    if(!isNaN(count)){
      this.setState(() => ({count}));
    }

  }

  componentDidUpdate(prevState, prevProps){
    if(prevProps.count !== this.state.count){
      const count = JSON.stringify(this.state.count);
      localStorage.setItem('count', count);
    }

  }

  resetToOrigin(){
    this.setState((prevState) => {
      return {
        count: this.props.count
      }
    })
  }

  minusOne(){
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      }
    })
  }

  addOne(){
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })

  }

  reset(){
    this.setState((prevState) => {
      return {
        count: 0
      }
    })
  }

  render(){
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.resetToOrigin}>Reset to Origin</button>
      </div>
    )
  }
}

Counter.defaultProps = {
  count: 0
}

ReactDOM.render(<Counter count={3}/>, document.getElementById('app'));
