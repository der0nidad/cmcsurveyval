import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger/src';
import rootReducer from './reducers/index';

let enhancer;
const initialState = {};
const middlewares = [thunk, logger];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
  enhancer = compose(applyMiddleware(...middlewares));
}


const store = createStore(rootReducer, initialState, enhancer);


export default store;
