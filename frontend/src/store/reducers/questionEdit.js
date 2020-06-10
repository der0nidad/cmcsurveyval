import update from 'immutability-helper';
import { normalize, schema } from 'normalizr';
import {
  OPEN_QUESTION_FORM,
  SURVEY_DATA_LOAD_FAIL,
  SURVEY_DATA_LOAD_START,
  SURVEY_DATA_LOAD_SUCCESS,
} from '../actionTypes';
import { toCamel } from '../../common/helpers/toCamel';

const answer = new schema.Entity('answersVariantsData');
const question = new schema.Entity('questionsData', {
  answersList: [answer],
});
const survey = new schema.Entity('surveyData', {
  questionsList: [question],
});

const initialState = {
  survey: null,
  surveyData: null,
  currentQuestion: null,
  questionsData: null,
  answersVariantsData: null,

};

const questionsEdit = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_DATA_LOAD_START: {
      return update(state, {
      });
    }
    case SURVEY_DATA_LOAD_SUCCESS: {
      const normalizedData = normalize(toCamel(action.payload), survey);
      return update(state, {
        survey: { $set: toCamel(action.payload) },
        surveyData: { $set: normalizedData.entities.surveyData },
        questionsData: { $set: normalizedData.entities.questionsData },
        answersVariantsData: { $set: normalizedData.entities.answersVariantsData },

      });
    }
    case SURVEY_DATA_LOAD_FAIL: {
      return update(state, {
      });
    }
    case OPEN_QUESTION_FORM: {
      const { questionId } = action.additionalData;
      const currentQuestionData = questionId ? state.questionsData[questionId] : null;
      return update(state, {
        currentQuestion: { $set: currentQuestionData },
      });
    }
    default:
      return state;
  }
};

export default questionsEdit;
