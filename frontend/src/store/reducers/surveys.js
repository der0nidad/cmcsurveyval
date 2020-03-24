import update from 'immutability-helper';
import { SURVEY_LOAD_FAIL, SURVEY_LOAD_START, SURVEY_LOAD_SUCCESS } from '../actionTypes';

const initialState = {
  surveys: [],
  isLoading: false,
  errors: null,
};
const surveySchemaExample = {
  id: '',
  name: '',
  author: '',
  questions: [],
};

const surveys = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_LOAD_START:
      return update(state, {
        isLoading: { $set: true },
      });
    case SURVEY_LOAD_SUCCESS:
      console.log(action.payload);
      return update(state, {
        isLoading: { $set: false },
        surveys: { $set: action.payload },
      });
    case SURVEY_LOAD_FAIL:
      return update(state, {

      });
    default:
      return state;
  }
};

export default surveys;
