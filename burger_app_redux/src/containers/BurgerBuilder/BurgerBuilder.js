import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    componentDidUpdate(prevProps){
        if (this.props.ings !== prevProps.ings && this.props.totalPrice !== prevProps.totalPrice){
            this.updatePurchaseState();
        }
    }

    updatePurchaseState() {

        this.setState(() => ({
            purchasable: Object.keys(this.props.ings).map((igKey) => {
                return this.props.ings[igKey] > 0
            }).reduce((sum, el) => {
                return sum + el > 0;
            }, 0)
        }))
    }
        
    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState((prevState) => ({
                purchasing: true
            }))
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.router.navigate('/auth');
        }
        
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.router.navigate('/checkout')
    }

    render() {

        const disableInfo = {
            ...this.props.ings
        }

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
    
        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded} 
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.state.purchasable}
                        isAuth={this.props.isAuth}
                        ordered={this.purchaseHandler}/>
                </Aux>
                
            );

            orderSummary = <OrderSummary 
                            ingredients={this.props.ings} 
                            modalClose={this.purchaseHandler} 
                            continuePurchase={this.purchaseContinueHandler}
                            price={this.props.totalPrice}/>;
        }
       

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));