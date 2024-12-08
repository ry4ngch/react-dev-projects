import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import {IngredientsContext} from '../../context/ingredientContext';
import {Route, Routes} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  
    checkoutCancelled = () => {
        //go back to previous page
        this.props.router.navigate(-1)
    }

    checkoutContinued = () => {
        this.props.router.navigate('/checkout/contact-data');
    }

    componentDidMount(){
        //console.log(this.props.router.location)
    }

    render() {
        return (
            <div>
                <IngredientsContext.Consumer>
                    {context =>
                        <React.Fragment>
                            <CheckoutSummary 
                                ingredients={context[0].ingredients}
                                checkoutCancelled={this.checkoutCancelled}
                                checkoutContinued={this.checkoutContinued}/>
                            <Routes>
                                <Route path='contact-data' element={<ContactData ingredients={context[0].ingredients} totalPrice={context[0].totalPrice}/>}/>
                            </Routes>
                        </React.Fragment>
                    }
                </IngredientsContext.Consumer>
            </div>
        )
    }
    
}

export default withRouter(Checkout);