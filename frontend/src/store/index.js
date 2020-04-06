import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger/src';
import { apiMiddleware, RSAA } from 'redux-api-middleware';
import rootReducer from './reducers/index';

// https://dev.to/wozzo/customising-redux-api-middleware-calls-4ibm
const apiAuthorizationMiddleware = (store) => (next) => (action) => {
  if (!action[RSAA]) {
    return next(action);
  }
  console.log(action[RSAA]);
  console.log(RSAA);
  const newVar = {
    ...action,
    // [RSAA]: {
    //   ...action[RSAA],
    //   headers: {
    //     ...action[RSAA].headers,
    //     'X-CSRFTOKEN': store.getState().auth.csrf,
    //   },
    // },
  };
  newVar.headers = {
    ...action.headers,
    'X-CSRFTOKEN': store.getState().auth.csrf,
  };
  console.log(newVar);
  return newVar;
};


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
