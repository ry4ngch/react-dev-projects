import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import {Route, Routes, Navigate} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    checkoutCancelled = () => {
        //go back to previous page
        this.props.router.navigate(-1)
    }

    checkoutContinued = () => {
        this.props.router.navigate('/checkout/contact-data');
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    // }

    render() {
        let summary = <Navigate to="/" replace={true} />
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Navigate to='/' replace={true}/> : null
            summary = <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                <Routes>
                    <Route path='contact-data' element={<ContactData ingredients={this.props.ings} totalPrice={this.props.totalPrice}/>}/>
                </Routes>
            </React.Fragment>  
        }

        return summary
    }
    
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));