import React from 'react';
import Option from './Option';

const Options = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button
        className="button button--link"
        onClick={props.handleDeleteOptions}>Remove All</button>

      </div>

      {props.options.length === 0 && <p className="widget__message">Please add an options to get started!</p>}
      {
        props.options.map((option, index) => {
          return <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption} count={index+1}/>
        })
      }
    </div>
  );
}

// class Options extends Component{
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

export default Options;
