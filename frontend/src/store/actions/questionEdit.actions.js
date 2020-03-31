import { createAction } from 'redux-api-middleware';
import { surveyQuestionsData } from '../../components/QuestionsEdit/questionEdit.constants';
import { SURVEY_DATA_LOAD_FAIL, SURVEY_DATA_LOAD_START, SURVEY_DATA_LOAD_SUCCESS } from '../actionTypes';


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
