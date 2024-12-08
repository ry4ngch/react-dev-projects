import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withRouter from '../../../hoc/withRouter/withRouter';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as purchaseActions from '../../../store/actions/index';
import {connect} from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {
                    valid: true
                }
            },
        },
        trackChanges: {},
        formIsValid: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {}
        Object.entries(this.state.orderForm).forEach(([key, data], id) => {
            formData[key] = data.value
        })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
        

    }

    inputChangedHandler = (event, inputIdentifier) => {
        this.checkInputInstance(event.target.value, inputIdentifier);
        this.setState((prevState) => {
            let mergedValidationValids = {}
            Object.entries(prevState.orderForm).forEach(([key, data]) => {
                if(key === inputIdentifier){
                    mergedValidationValids[key] = event.target.value.trim() !== ''
                } else {
                    mergedValidationValids[key] = data.validation.valid
                }
            })

            return {
                orderForm: {
                    ...prevState.orderForm, 
                    [inputIdentifier]: {
                        ...prevState.orderForm[inputIdentifier], 
                        value: event.target.value,
                        validation: {
                            ...prevState.orderForm[inputIdentifier].validation, 
                            valid: event.target.value.trim() !== ''
                        }
                    }
                },
                formIsValid: Object.values(mergedValidationValids).every((val) => val === true)
            } 
        })
    }

    
    checkInputInstance = (val, inputName) => {
        if (val.length > 0 && this.state.orderForm[inputName].validation.required) {
            this.setState((prevState) => ({
                trackChanges: {...prevState.trackChanges, [inputName]: true}
            }))
        }
    }

    render() {
        const formElementsArray = [];
        Object.entries(this.state.orderForm).forEach(([key, value], idx) => {
            formElementsArray.push({
                id: key,
                config: value
            })
        })

        let form = (
            <form onSubmit={this.orderHandler}>
                
                {formElementsArray.map((formElement, id) => (
                    <Input key={id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            changed={(e) => this.inputChangedHandler(e, formElement.id)}
                            invalid={formElement.config.validation ? !formElement.config.validation.valid && this.state.trackChanges[formElement.id] : null}
                            shouldValidate={formElement.config.validation}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseActions.purchaseBurger(orderData, token))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));