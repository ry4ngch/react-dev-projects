import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData).then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        }).catch(err => {
            dispatch(purchaseBurgerFail(err))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        //note: we can also use getState to retrieve the token directly
        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then(res => {
            const fetchOrders = [];
            Object.entries(res.data).forEach(([key, value]) => {
                fetchOrders.push({
                    ...value,
                    id: key
                })
            })

            dispatch(fetchOrdersSuccess(fetchOrders))
        }).catch(err => {
            dispatch(fetchOrdersFail(err))
        })
    }
}