import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Routes} from 'react-router-dom';
import {IngredientsProvider} from './context/ingredientContext';
import Orders from './containers/Orders/Orders';

const App = () => {
  return (
    <div>
      <Layout>
        <IngredientsProvider>
          <Routes>
            <Route path='/' element={<BurgerBuilder/>}/>
            <Route path='/checkout/*' element={<Checkout/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </IngredientsProvider>
      </Layout>
    </div>
  );
}

export default App;
