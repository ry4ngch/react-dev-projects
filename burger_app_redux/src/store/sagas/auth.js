import {delay, put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';


//this is a generator function
export function* logoutSaga(action){
    yield localStorage.clear()
    yield put(actions.logoutSucceed)
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000)
    yield put(actions.logout())
}

export function* authUserSaga(action){
    yield put(actions.authStart())
    const API_KEY = process.env.REACT_APP_API_KEY
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    if(!action.isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    }

    try {
        const res = yield axios.post(`${url}?key=${API_KEY}`, authData)
    
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action){
   
    const token = yield localStorage.getItem('token');
    if(!token){
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        const userId = yield localStorage.getItem('userId')
        if(expirationDate > new Date()){
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        } else {
            yield put(actions.logout())
        }
        
    }
    
}