import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import {IngredientsContext} from '../../context/ingredientContext';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null, //fetch ingredients from server
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    static contextType = IngredientsContext

    componentDidMount(){
        const [data, setIngredients] = this.context;
        axios.get('https://react-my-burger-80227-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json').then(res => {
            this.setState({ingredients: res.data})
        }).catch(error => {
            this.setState({
                error: true,
                ingredients: data.ingredients //added this for testing to avoid failure from firebase query when expire
                    
            })
        })
        this.setIngredients = setIngredients;
    }

    updatePurchaseState() {

        this.setState((prevState) => ({
            purchasable: Object.keys(prevState.ingredients).map((igKey) => {
                return prevState.ingredients[igKey] > 0
            }).reduce((sum, el) => {
                return sum + el > 0;
            }, 0)
        }))
    }
        

    addIngredientHandler = (igType) => {
        this.setState(prevState => ({
            ingredients: {
              ...prevState.ingredients,
              [igType]: prevState.ingredients[igType] + 1
            },
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[igType]
          }))
          this.updatePurchaseState()
          
    }

    removeIngredientHandler = (igType) => {

        if (this.state.ingredients[igType] <= 0) {
            return;
        } else {
            this.setState(prevState => ({
                ingredients: {
                  ...prevState.ingredients,
                  [igType]: prevState.ingredients[igType] - 1 
                },
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[igType]
              }))
        }
        this.updatePurchaseState()
        
    }

    purchaseHandler = () => {
        this.setState((prevState) => ({
            purchasing: !prevState.purchasing
        }))
    }

    purchaseContinueHandler = () => {
        
        this.setIngredients(prevState => ({
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice
        }))

        this.props.router.navigate('/checkout')
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
                
            );

            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients} 
                            modalClose={this.purchaseHandler} 
                            continuePurchase={this.purchaseContinueHandler}
                            price={this.state.totalPrice}/>;
        }

        if (this.state.loading){
            orderSummary = <Spinner/>
        }
        

        // for (const [ing, count] of Object.entries(disableInfo)) {//Object.entries(object).forEach(([k,v]) => {})
        //     console.log(ing, count)
        // }


        // Object.entries(disableInfo).forEach(function([key, value], index){    
        // })
       

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

export default withRouter(withErrorHandler(BurgerBuilder, axios));