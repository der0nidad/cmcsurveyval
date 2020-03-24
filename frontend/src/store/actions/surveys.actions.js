import { createAction } from 'redux-api-middleware';
import { SURVEY_LOAD_FAIL, SURVEY_LOAD_START, SURVEY_LOAD_SUCCESS } from '../actionTypes';
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
