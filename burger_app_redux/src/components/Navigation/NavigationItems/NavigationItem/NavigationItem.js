import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            className={({isActive}) => isActive ? classes.active : null}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;