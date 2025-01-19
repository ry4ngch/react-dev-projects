import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (prevState, action) => {
  if(action.type === 'USER_INPUT'){
    return {
      value: action.val, 
      isValid: action.val.includes('@')
    }
  }
  if(action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@')
    }
  }

  // default state
  return {
    value: '',
    isValid: false
  };
}

const passwordReducer =  (prevState, action) => {
  if(action.type === 'USER_INPUT'){
    return {
      value: action.val, 
      isValid: action.val.trim().length > 6
    }
  }
  if(action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6
    }
  }

  // default state
  return {
    value: '',
    isValid: false
  }

}

const initialState = {
  value: '',
  isValid: null
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // use useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);

  // use useContext to pass authorization state
  const authCtx = useContext(AuthContext)

  // useRef
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // trigger setFormIsValid everytime enteredPassword or enteredEmail updates
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);
    
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // note: the input ref below does not fire because we are using useEffect to control the button behaviour through disable attribute, 
    // remove the disabled attribute to see it work
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value)
    } else if(!emailState.isValid) {
      emailInputRef.current.focus();
    } else { //!passwordState.isValid
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
            ref={emailInputRef}
            type="email"
            id="email"
            label="Email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            isValid={emailState.isValid}
        />
        <Input 
            ref={passwordInputRef}
            type="password"
            id="password"
            label="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
