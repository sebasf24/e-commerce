import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productReducer.js';
import categoryReducer from '../reducers/categoryReducer.js';
import productsCart from '../reducers/cartReducer.js';

const rootReducer =combineReducers({
    products: productsReducer,
    category: categoryReducer,
    productsCart: productsCart
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
