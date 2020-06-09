import update from 'immutability-helper';
import { STATUS_DATA_LOAD_START, STATUS_DATA_LOAD_SUCCESS, STATUS_DATA_LOAD_FAIL } from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';


const initialState = {
  respondents: [],
  answers: [],
  surveyMinData: null,
  isLoading: false,
  errors: null,
  respondentsCount: null,
};
const respondentsSchemaExample = {

};

const surveyReport = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_DATA_LOAD_START: {
      return update(state, {
        isLoading: { $set: true },
      });
    }
    case STATUS_DATA_LOAD_SUCCESS: {
      const data = toCamel(action.payload);
      return update(state, {
        isLoading: { $set: false },
        respondents: { $set: data.surveyStatus },
        answers: { $set: data.answersData },
        surveyMinData: { $set: data.surveyData },
        respondentsCount: { $set: data.respondentsCount},
      });
    }
    case STATUS_DATA_LOAD_FAIL: {
      return update(state, {
        isLoading: { $set: false },
      });
    }
    default:
      return state;
  }
};

export default surveyReport;
