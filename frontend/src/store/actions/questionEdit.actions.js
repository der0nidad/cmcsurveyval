import { createAction } from 'redux-api-middleware';
import {
  questionDetailId,
  surveyQuestionsData,
} from '../../components/QuestionsEdit/questionEdit.constants';
import {
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_START, DELETE_QUESTION_SUCCESS,
  SURVEY_DATA_LOAD_FAIL,
  SURVEY_DATA_LOAD_START,
  SURVEY_DATA_LOAD_SUCCESS,
} from '../actionTypes';
import { getCookie } from '../../common/helpers/csrf';


export const loadCurrentSurveyAction = (surveyId) => createAction({
  endpoint: surveyQuestionsData(surveyId),
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEY_DATA_LOAD_START,
    SURVEY_DATA_LOAD_SUCCESS,
    SURVEY_DATA_LOAD_FAIL,
  ],
});

export const deleteQuestionAction = (questionId) => createAction({
  endpoint: questionDetailId(questionId),
  method: 'DELETE',
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    DELETE_QUESTION_START,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAIL,
  ],
});
