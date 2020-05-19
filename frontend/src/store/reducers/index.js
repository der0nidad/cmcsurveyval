import { combineReducers } from 'redux';
import initialReducer from './initial';
import flags from './flags';
import auth from './auth';
import surveys from './surveys';
import questionEdit from './questionEdit';


const rootReducer = combineReducers({
  initialReducer,
  flags,
  auth,
  surveys,
  questionEdit,
});

export default rootReducer;
