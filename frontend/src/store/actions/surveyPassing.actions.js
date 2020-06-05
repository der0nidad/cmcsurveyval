import { createAction } from 'redux-api-middleware';
import { SURVEY_QUESTIONS_LOAD_FAIL, SURVEY_QUESTIONS_LOAD_START, SURVEY_QUESTIONS_LOAD_SUCCESS } from '../actionTypes';
import {
  surveyDetailApiEndpoint,
  surveyQuestionsApiEndpoint,
} from '../../components/SurveyPassing/surveyPassing.constants';
import { getCookie } from '../../common/helpers/csrf';


export const loadSurveyQuestionsAction = () => createAction({
  endpoint: surveyQuestionsApiEndpoint,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEY_QUESTIONS_LOAD_START,
    SURVEY_QUESTIONS_LOAD_SUCCESS,
    SURVEY_QUESTIONS_LOAD_FAIL,
  ],
});

export const saveSurveyAnswersAction = (answersData) => createAction({
  endpoint: surveyDetailApiEndpoint, // мб тут нужен сериалайзер вопросов. хз.
  // скорее, роут опросов и сериалайзер вопросов
  method: 'POST',
  body: answersData,
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    SURVEY_QUESTIONS_LOAD_START,
    SURVEY_QUESTIONS_LOAD_SUCCESS,
    SURVEY_QUESTIONS_LOAD_FAIL,
  ],
});
