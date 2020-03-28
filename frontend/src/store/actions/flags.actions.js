import {
  CLOSE_LEFT_MENU, CLOSE_SURVEY_FORM, OPEN_LEFT_MENU, OPEN_SURVEY_FORM,
} from '../actionTypes';

export const openLeftMenu = () => ({
  type: OPEN_LEFT_MENU,
});

export const closeLeftMenu = () => ({
  type: CLOSE_LEFT_MENU,
});

export const openSurveyForm = (surveyId) => ({
  type: OPEN_SURVEY_FORM,
  additionalData: { surveyId },
});

export const closeSurveyForm = () => ({
  type: CLOSE_SURVEY_FORM,
});
