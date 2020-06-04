import update from 'immutability-helper';
import { SURVEYS_INFO_LOAD_FAIL, SURVEYS_INFO_LOAD_START, SURVEYS_INFO_LOAD_SUCCESS } from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';

const initialState = {
  surveysList: [],
  isLoading: false,
  errors: null,
  editingSurvey: null,
};
const surveySchemaExample = {
  id: '',
  name: '',
  author: '',
  questions: [],
};

const mySurveys = (state = initialState, action) => {
  switch (action.type) {
    case SURVEYS_INFO_LOAD_START: {
      return update(state, {
        isLoading: { $set: true },
      });
    }
    case SURVEYS_INFO_LOAD_SUCCESS: {
      console.log(toCamel(action.payload));
      return update(state, {
        isLoading: { $set: false },
        surveysList: { $set: toCamel(action.payload) },
      });
    }
    case SURVEYS_INFO_LOAD_FAIL: {
      return update(state, {
        isLoading: { $set: false },
      });
    }

    default:
      return state;
  }
};

export default mySurveys;
