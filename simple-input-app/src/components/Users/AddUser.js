import React, {useState} from "react";
import Card from "../UI/Card/Card";
import classes from './AddUser.module.css';
import Button from '../UI/Button/Button';
import ErrorModal from '../UI/ErrorModal/ErrorModal';

const initial_state = {
    username: '',
    age: ''
}

const AddUser = (props) => {
    const [user, setUser] = useState(initial_state);
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();

        if(user.age.trim().length > 0 && user.username.trim().length > 0){
            if(+user.age >= 1){
                props.onAddUser(user);
                setUser(initial_state);
            } else {
                setError({
                    title: 'Invalid Age',
                    message: 'Please enter a valid age (> 0)'
                });
            }
            
        } else {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values)'
            })
        }
        
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={user.username} onChange={onChangeHandler}/>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={user.age} onChange={onChangeHandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    )
}

export default AddUser;