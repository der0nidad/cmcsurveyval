import { combineReducers } from 'redux';
import initialReducer from './initial';
import flags from './flags';
import auth from './auth';
import surveys from './surveys';
import questionEdit from './questionEdit';
import mySurveys from './mySurveys';


const rootReducer = combineReducers({
  initialReducer,
  flags,
  auth,
  surveys,
  questionEdit,
  mySurveys,
});

export default rootReducer;
