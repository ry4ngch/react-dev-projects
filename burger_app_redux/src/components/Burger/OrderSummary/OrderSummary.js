import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this could be a functional components since we already check if the orderSummary need to be executed from the Modal.js shouldComponentUpdate
    componentDidUpdate(){
        
    }

    render() {
        const ingredientSummary = Object.entries(this.props.ingredients).map(([igKey, igVal], index) => {
            return <li key={index}>
                        <span style={{textTransform: 'capitalize'}}>
                            {igKey}
                        </span>: {igVal}
                    </li>
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p style={{fontWeight: 'bold'}}>Total Price: {this.props.price.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.modalClose}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux> 
        )
    }
    
}

export default OrderSummary;