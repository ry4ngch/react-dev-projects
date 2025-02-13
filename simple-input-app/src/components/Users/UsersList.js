import React from "react";
import Card from "../UI/Card/Card";
import classes from './UsersList.module.css';

const UsersList = (props) => {
    return (
        <Card className={classes.users}>
            <ul>
                {props.users.map((user, index) => (
                    <li key={index}>
                        {user.username} ({user.age} years old)
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export default UsersList;