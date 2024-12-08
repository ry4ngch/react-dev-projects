import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as AuthActions from '../../store/actions/index';
import {connect} from 'react-redux';
import withRouter from '../../hoc/withRouter/withRouter';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Navigate} from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            }
        },
        trackChanges: {},
        formIsValid: false,
        isSignUp: true
    }


    inputChangedHandler = (event, inputIdentifier) => {
        this.checkInputInstance(event.target.value, inputIdentifier);
        this.setState((prevState) => {
            let mergedValidationValids = {}
            Object.entries(prevState.controls).forEach(([key, data]) => {
                if(key === inputIdentifier){
                    mergedValidationValids[key] = event.target.value.trim() !== ''
                } else {
                    mergedValidationValids[key] = data.validation.valid
                }
            })

            return {
                controls: {
                    ...prevState.controls, 
                    [inputIdentifier]: {
                        ...prevState.controls[inputIdentifier], 
                        value: event.target.value,
                        validation: {
                            ...prevState.controls[inputIdentifier].validation, 
                            valid: event.target.value.trim() !== ''
                        }
                    }
                },
                formIsValid: Object.values(mergedValidationValids).every((val) => val === true)
            } 
        })
    }

    
    checkInputInstance = (val, inputName) => {
        if (val.length > 0 && this.state.controls[inputName].validation.required) {
            this.setState((prevState) => ({
                trackChanges: {...prevState.trackChanges, [inputName]: true}
            }))
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignUp
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        Object.entries(this.state.controls).forEach(([key, value], idx) => {
            formElementsArray.push({
                id: key,
                config: value
            })
        })

        let form = formElementsArray.map((formElement) => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
            invalid={formElement.config.validation ? !formElement.config.validation.valid && this.state.trackChanges[formElement.id] : null}
            shouldValidate={formElement.config.validation}/>
        ))


        if(this.props.loading) {
            form = <Spinner/>
        }

        let errorMsg = null;
        if(this.props.error){
            errorMsg = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Navigate to={this.props.authRedirectPath} replace={true}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>
                        Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(AuthActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(AuthActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));