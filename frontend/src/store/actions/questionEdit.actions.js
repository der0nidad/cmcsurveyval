import { createAction } from 'redux-api-middleware';
import {
  questionDetailId,
  questionUrl,
  surveyQuestionsData,
} from '../../components/QuestionsEdit/questionEdit.constants';
import {
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_START,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  SURVEY_DATA_LOAD_FAIL,
  SURVEY_DATA_LOAD_START,
  SURVEY_DATA_LOAD_SUCCESS,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION_START,
  UPDATE_QUESTION_SUCCESS,
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

export const createQuestionAction = () => createAction({
  endpoint: questionUrl,
  method: 'POST',
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    CREATE_QUESTION_START,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
  ],
});


export const updateQuestionAction = (questionId) => createAction({
  endpoint: questionDetailId(questionId),
  method: 'PUT',
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    UPDATE_QUESTION_START,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAIL,
  ],
});
