import { createAction } from 'redux-api-middleware';
import {
  SURVEY_CREATE_FAIL,
  SURVEY_CREATE_START,
  SURVEY_CREATE_SUCCESS,
  SURVEY_LOAD_FAIL,
  SURVEY_LOAD_START,
  SURVEY_LOAD_SUCCESS,
} from '../actionTypes';
import { surveysEndpoint } from '../../components/Surveys/surveys.constants';

export const loadSurveysAction = () => createAction({
  endpoint: surveysEndpoint,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEY_LOAD_START,
    SURVEY_LOAD_SUCCESS,
    SURVEY_LOAD_FAIL,
  ],
});

export const createSurveyAction = () => createAction({
  endpoint: surveysEndpoint,
  method: 'POST',
  headers: { 'Content-Type': 'multipart/form-data' },
  types: [
    SURVEY_CREATE_START,
    SURVEY_CREATE_SUCCESS,
    SURVEY_CREATE_FAIL,
  ],
});
