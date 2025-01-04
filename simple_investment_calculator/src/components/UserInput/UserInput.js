import React, {useState} from "react";
import styles from './UserInput.module.css';

const initialUserInput = {
    'current-savings': 10000,
    'yearly-contribution': 1200,
    'expected-return': 7,
    'duration': 10
}

const UserInput = (props) => {
    const [userInput, setUserInput] = useState(initialUserInput)


    const submitHandler = (event) => {
        event.preventDefault();
        // const formData = Array.from(event.target).reduce((obj, field) => {
        //     if(field.name){
        //         obj[field.name] = field.value;
        //     }
        //     return obj;
        // }, {});

        props.onCalculate(userInput);
    }

    const resetHandler = () => {
        setUserInput(initialUserInput);
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setUserInput((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles['input-group']}>
            <p>
                <label htmlFor="current-savings">Current Savings ($)</label>
                <input type="number" id="current-savings" name="current-saving" onChange={changeHandler} value={userInput['current-savings']}/>
            </p>
            <p>
                <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                <input type="number" id="yearly-contribution" name="yearly-contribution" onChange={changeHandler} value={userInput['yearly-contribution']}/>
            </p>
            </div>
            <div className={styles['input-group']}>
            <p>
                <label htmlFor="expected-return">
                Expected Interest (%, per year)
                </label>
                <input type="number" id="expected-return" name="expected-return" onChange={changeHandler} value={userInput['expected-return']}/>
            </p>
            <p>
                <label htmlFor="duration">Investment Duration (years)</label>
                <input type="number" id="duration" name="duration" onChange={changeHandler} value={userInput['duration']}/>
            </p>
            </div>
            <p className={styles.actions}>
            <button type="reset" className={styles.buttonAlt} onClick={resetHandler}>
                Reset
            </button>
            <button type="submit" className={styles.button}>
                Calculate
            </button>
            </p>
        </form>
    )
}

export default UserInput;