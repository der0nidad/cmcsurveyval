import { combineReducers } from 'redux';
import initialReducer from './initial';
import flags from './flags';
import auth from './auth';
import surveys from './surveys';


const rootReducer = combineReducers({
  initialReducer,
  flags,
  auth,
  surveys,
});

export default rootReducer;
