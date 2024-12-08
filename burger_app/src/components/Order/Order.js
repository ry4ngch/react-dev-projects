import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    Object.entries(props.ingredients).forEach(([igName, igVal]) => {
        ingredients.push(
            {
                name: igName, 
                amount: igVal
            }
        )
    })

    const ingredientOutput = ingredients.map((ig, idx)=> {
        return <span 
            key={idx}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;