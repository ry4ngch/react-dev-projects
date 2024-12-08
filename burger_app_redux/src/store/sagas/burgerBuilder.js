import * as actions from '../actions/index'
import {put} from 'redux-saga/effects'
import axios from '../../axios-orders';

export function* initIngredientsSaga(action){
    const res = yield axios.get('https://react-my-burger-80227-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json');
    try {
        yield put(actions.setIngredients(res.data))
    } catch(error) {
        yield put(actions.fetchIngredientsFailed())
    }
}