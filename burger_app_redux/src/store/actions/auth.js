import * as actionTypes from './actionTypes';
//import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    //localStorage.clear()
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime*1000)
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignUp) => {
    // return dispatch => {
    //     dispatch(authStart())
    //     const API_KEY = process.env.REACT_APP_API_KEY
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }

    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    //     if(!isSignUp){
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    //     }
    //     axios.post(`${url}?key=${API_KEY}`, authData)
    //     .then(res => {
    //         const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    //         localStorage.setItem('token', res.data.idToken);
    //         localStorage.setItem('expirationDate', expirationDate);
    //         localStorage.setItem('userId', res.data.localId);
    //         dispatch(authSuccess(res.data.idToken, res.data.localId));
    //         dispatch(checkAuthTimeout(res.data.expiresIn));
    //     })
    //     .catch(error => {
    //         dispatch(authFail(error.response.data.error));
    //     })
    // }
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         dispatch(logout())
    //     }else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         const userId = localStorage.getItem('userId')
    //         if(expirationDate > new Date()){
    //             dispatch(authSuccess(token, userId))
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
    //         } else {
    //             dispatch(logout())
    //         }
           
    //     }
    // }
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}