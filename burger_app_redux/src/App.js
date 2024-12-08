import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Routes, Navigate} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import React, {Component} from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){

    //unauthenticated
    let routes = (
      <React.Fragment>
        <Route path='/auth' element={<AsyncAuth/>}/>
        <Route path='/' element={<BurgerBuilder/>}/>
      </React.Fragment>
    )

    //authenticated only
    if(this.props.isAuth){
      routes = (
        <React.Fragment>
          <Route path='/orders' element={<AsyncOrders/>}/>
          <Route path='/' element={<BurgerBuilder/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/checkout/*' element={<AsyncCheckout/>}/>
        </React.Fragment>
      )
    }

    return (
      <div>
        <Layout>
          <Routes>
            {routes}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
