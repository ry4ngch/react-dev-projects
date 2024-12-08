import React from 'react';

const Header = (props) => {
  return (
    <div className='header'>
      <div className="container">
        <h1 className="header__title">{props.title}</h1>
        {props.subtitle && <p className="header__subtitle">{props.subtitle}</p>}
      </div>
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision'
}

// class Header extends Component{
//   render(){
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <p>{this.props.subtitle}</p>
//       </div>
//     );
//   }
// }

export default Header;
