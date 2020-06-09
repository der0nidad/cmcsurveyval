import { createAction } from 'redux-api-middleware';
import { STATUS_DATA_LOAD_FAIL, STATUS_DATA_LOAD_START, STATUS_DATA_LOAD_SUCCESS } from '../actionTypes';
import { surveyReportApiEndpoint } from '../../components/SurveyReport/surveyReport.constants';

export const loadRespondentsStatusesAction = (surveyId) => createAction({
  endpoint: surveyReportApiEndpoint(surveyId),
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    STATUS_DATA_LOAD_START,
    STATUS_DATA_LOAD_SUCCESS,
    STATUS_DATA_LOAD_FAIL,
  ],
});
