import { createAction } from 'redux-api-middleware';
import { SURVEYS_INFO_LOAD_FAIL, SURVEYS_INFO_LOAD_START, SURVEYS_INFO_LOAD_SUCCESS } from '../actionTypes';
import { surveysInfoApiEndpoint } from '../../components/MySurveys/mySurveys.constants';

export const loadSurveysMinInfoAction = () => createAction({
  endpoint: surveysInfoApiEndpoint,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    SURVEYS_INFO_LOAD_START,
    SURVEYS_INFO_LOAD_SUCCESS,
    SURVEYS_INFO_LOAD_FAIL,
  ],
});
