import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers/index';

let enhancer;
const logger = createLogger();
const initialState = {};
// noinspection JSDeprecatedSymbols
const middlewares = [apiMiddleware, logger];
// eslint-disable-next-line no-underscore-dangle
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(applyMiddleware(...middlewares),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
  enhancer = compose(applyMiddleware(...middlewares));
}


const store = createStore(rootReducer, initialState, enhancer);


export default store;
