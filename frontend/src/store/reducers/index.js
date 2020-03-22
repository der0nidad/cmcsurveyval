import { combineReducers } from 'redux';
import initialReducer from './initial';
import flags from './flags';
import auth from './auth';


const rootReducer = combineReducers({
  initialReducer,
  flags,
  auth,
});

export default rootReducer;
