import update from 'immutability-helper';
import {
  OPEN_SURVEY_FORM,
  SURVEY_DATA_LOAD_FAIL,
  SURVEY_DATA_LOAD_START,
  SURVEY_DATA_LOAD_SUCCESS,
} from '../actionTypes';

const initialState = {
};
const surveyDataSchemaExample = {
  questions_list: [],
};

const questionsEdit = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_DATA_LOAD_START:
      return update(state, {
      });
    case SURVEY_DATA_LOAD_SUCCESS:
      return update(state, {
      });
    case SURVEY_DATA_LOAD_FAIL:
      return update(state, {

      });
    default:
      return state;
  }
};

export default questionsEdit;
