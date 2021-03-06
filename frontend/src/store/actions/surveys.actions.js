import { createAction } from 'redux-api-middleware';
import {
  SURVEY_CREATE_FAIL,
  SURVEY_CREATE_START,
  SURVEY_CREATE_SUCCESS,
  SURVEY_DELETE_FAIL,
  SURVEY_DELETE_START,
  SURVEY_DELETE_SUCCESS,
  SURVEY_LOAD_FAIL,
  SURVEY_LOAD_START,
  SURVEY_LOAD_SUCCESS,
} from '../actionTypes';
import { surveysApiEndpoint, surveysEndpointDetail } from '../../components/Surveys/surveys.constants';
import { getCookie } from '../../common/helpers/csrf';

export const loadSurveysAction = () => createAction({
  endpoint: surveysApiEndpoint,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEY_LOAD_START,
    SURVEY_LOAD_SUCCESS,
    SURVEY_LOAD_FAIL,
  ],
});

export const createSurveyAction = (data) => createAction({
  endpoint: surveysApiEndpoint,
  method: 'POST',
  body: data,
  headers: {
    // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    SURVEY_CREATE_START,
    SURVEY_CREATE_SUCCESS,
    SURVEY_CREATE_FAIL,
  ],
});

export const deleteSurveyAction = (surveyId) => createAction({
  endpoint: surveysEndpointDetail(surveyId),
  method: 'DELETE',
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    SURVEY_DELETE_START,
    SURVEY_DELETE_SUCCESS,
    SURVEY_DELETE_FAIL,
  ],
});
