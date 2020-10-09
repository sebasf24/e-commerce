import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productReducer.js';

const rootReducer =combineReducers({
    products: productsReducer
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
