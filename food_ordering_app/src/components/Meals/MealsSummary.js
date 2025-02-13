import React from "react";
import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Delicious Food, Delivered To You</h2>
            <p>
                Choose your favourite meal from our broad selection of available meals
                and enjoy a delicous lunch or dinner time
            </p>
            <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experiened chef!</p>
        </section>
    )
};

export default MealsSummary;