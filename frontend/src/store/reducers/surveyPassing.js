import update from 'immutability-helper';
import {
  ADD_QUESTION_ANSWER,
  SURVEY_QUESTIONS_LOAD_FAIL,
  SURVEY_QUESTIONS_LOAD_START, SURVEY_QUESTIONS_LOAD_SUCCESS,
  SURVEYS_INFO_LOAD_FAIL,
  SURVEYS_INFO_LOAD_START,
  SURVEYS_INFO_LOAD_SUCCESS
} from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';

const initialState = {
  surveyQuestions: [],
  isLoading: false,
  errors: null,
  editingSurvey: null,
  answers: null,
};
const surveySchemaExample = {

};

const surveyPassing = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_QUESTIONS_LOAD_START: {
      return update(state, {
        isLoading: { $set: true },
      });
    }
    case SURVEY_QUESTIONS_LOAD_SUCCESS: {
      console.log(toCamel(action.payload));
      return update(state, {
        isLoading: { $set: false },
        surveyQuestions: { $set: toCamel(action.payload) },
      });
    }
    case SURVEY_QUESTIONS_LOAD_FAIL: {
      return update(state, {
        isLoading: { $set: false },
      });
    }
    case ADD_QUESTION_ANSWER:
      return update(state, {
        answers: { $merge: action.payload}, // прочекай ещё payload, наверняка менять придётся
      });
    default:
      return state;
  }
};

export default surveyPassing;
