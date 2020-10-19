import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productReducer.js';
import categoryReducer from '../reducers/categoryReducer.js';
import userReducer from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer'
import cartUserReducer from '../reducers/cartUserReducer.js'
import Cookies from 'universal-cookie'
const cookies=new Cookies();

const rootReducer =combineReducers({
    products: productsReducer,
    category: categoryReducer,
    user: userReducer,
    productsCart:cookies.get('username')?cartUserReducer:cartReducer
})

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;
