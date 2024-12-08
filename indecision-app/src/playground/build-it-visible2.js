class Visibility extends React.Component{
  constructor(props){
      super(props)
      this.toggleVisible = this.toggleVisible.bind(this);

      this.state = {
        visible: false
      }
  }

  toggleVisible(e){
    e.preventDefault();
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    })
  }

  render(){
    return (
      <div>
        <h1>Toggle Visible</h1>
        <button onClick={this.toggleVisible}>{this.state.visible ? 'Hide Detail' : 'Show Detail'}</button>
        {this.state.visible && <p>This is a hidden message</p>}
      </div>
    )
  }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));
