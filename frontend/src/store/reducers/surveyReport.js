import update from 'immutability-helper';
import { STATUS_DATA_LOAD_START, STATUS_DATA_LOAD_SUCCESS, STATUS_DATA_LOAD_FAIL } from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';


const initialState = {
  respondents: [],
  isLoading: false,
  errors: null,
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
      return update(state, {
        isLoading: { $set: false },
        respondents: { $set: toCamel(action.payload) },
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
