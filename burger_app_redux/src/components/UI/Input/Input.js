import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <texterea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>
            break;
        case('select'):
            inputElement = <select
                             className={inputClasses.join(' ')} onChange={props.changed}>
                                {props.elementConfig.options.map(({value, displayValue}, id) => {
                                    return <option key={id} value={value}>{displayValue}</option>
                                })}
                                
                            </select>
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
 

export default input