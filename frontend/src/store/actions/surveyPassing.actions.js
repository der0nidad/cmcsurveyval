import { createAction } from 'redux-api-middleware';
import {
  ADD_QUESTION_ANSWER,
  SURVEY_ANSWERS_SAVE_FAIL,
  SURVEY_ANSWERS_SAVE_START,
  SURVEY_ANSWERS_SAVE_SUCCESS,
  SURVEY_QUESTIONS_LOAD_FAIL,
  SURVEY_QUESTIONS_LOAD_START,
  SURVEY_QUESTIONS_LOAD_SUCCESS,
} from '../actionTypes';
import {
  surveyAnswersApiEndpoint,
  surveyQuestionsApiEndpoint,
} from '../../components/SurveyPassing/surveyPassing.constants';
import { getCookie } from '../../common/helpers/csrf';
import objToFormData from '../../common/helpers/objToFormData';


export const loadSurveyQuestionsAction = (id) => createAction({
  endpoint: surveyQuestionsApiEndpoint(id),
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEY_QUESTIONS_LOAD_START,
    SURVEY_QUESTIONS_LOAD_SUCCESS,
    SURVEY_QUESTIONS_LOAD_FAIL,
  ],
});

export const saveSurveyAnswersAction = (surveyId, answersData) => {
  console.log(surveyId, answersData);
  return createAction({
    endpoint: surveyAnswersApiEndpoint(surveyId), // мб тут нужен сериалайзер вопросов. хз.
    // скорее, роут опросов и сериалайзер вопросов
    method: 'POST',
    // body: JSON.stringify(answersData),
    body: objToFormData(answersData),
    headers: {
      'X-CSRFTOKEN': getCookie('csrftoken'),
      // 'Content-Type': 'application/json',
    },
    types: [
      SURVEY_ANSWERS_SAVE_START,
      SURVEY_ANSWERS_SAVE_SUCCESS,
      SURVEY_ANSWERS_SAVE_FAIL,
    ],
  });
};
export const addSurveyAnswerAction = (answer) => ({
  type: ADD_QUESTION_ANSWER,
  payload: answer,
});
