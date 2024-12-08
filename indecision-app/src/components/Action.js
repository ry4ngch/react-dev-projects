import React from 'react';

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.onMakeDecision}
        disabled={!props.hasOptions}
        className="big-button"
        >
        What Should I do?
      </button>
    </div>
  );
}

// class Action extends Component{
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

export default Action;
