import { createAction } from 'redux-api-middleware';
import { STATUS_DATA_LOAD_FAIL, STATUS_DATA_LOAD_START, STATUS_DATA_LOAD_SUCCESS } from '../actionTypes';
import { respondentsStatusApiEndpoint } from '../../components/SurveyReport/surveyReport.constants';

export const loadRespondentsStatusesAction = (surveyId) => createAction({
  endpoint: respondentsStatusApiEndpoint(surveyId),
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    STATUS_DATA_LOAD_START,
    STATUS_DATA_LOAD_SUCCESS,
    STATUS_DATA_LOAD_FAIL,
  ],
});
