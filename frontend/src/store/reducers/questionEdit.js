import update from 'immutability-helper';
import {
  OPEN_QUESTION_FORM,
  SURVEY_DATA_LOAD_FAIL,
  SURVEY_DATA_LOAD_START,
  SURVEY_DATA_LOAD_SUCCESS,
} from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';

const initialState = {
  survey: null,
  currentQuestion: null,
};

const questionsEdit = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_DATA_LOAD_START: {
      return update(state, {
      });
    }
    case SURVEY_DATA_LOAD_SUCCESS: {
      return update(state, {
        survey: { $set: toCamel(action.payload) },
      });
    }
    case SURVEY_DATA_LOAD_FAIL: {
      return update(state, {
      });
    }
    case OPEN_QUESTION_FORM: {
      const { questionId } = action.additionalData;
      const currentQuestionData = state.survey.questionsList
        .find((question) => question.id === questionId);
      return update(state, {
        currentQuestion: { $set: currentQuestionData },
      });
    }
    default:
      return state;
  }
};

export default questionsEdit;
