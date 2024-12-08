import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <div>
    <h1>Portfolio Site</h1>
    <NavLink to="/" exact={true} activeClassName="is-active">Home Page</NavLink>
    <NavLink to="/portfolio" exact={true} activeClassName="is-active">Portfolio</NavLink>
    <NavLink to="/contact" exact={true}>Contact</NavLink>
  </div>
)

export default Header;
