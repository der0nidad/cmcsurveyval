import {
  CLOSE_LEFT_MENU,
  CLOSE_QUESTION_FORM,
  CLOSE_SURVEY_FORM,
  OPEN_LEFT_MENU,
  OPEN_QUESTION_FORM,
  OPEN_SURVEY_FORM,
} from '../actionTypes';

export const openLeftMenu = () => ({
  type: OPEN_LEFT_MENU,
});

export const closeLeftMenu = () => ({
  type: CLOSE_LEFT_MENU,
});

export const openSurveyFormAction = (surveyId) => ({
  type: OPEN_SURVEY_FORM,
  additionalData: { surveyId },
});

export const closeSurveyForm = () => ({
  type: CLOSE_SURVEY_FORM,
});

export const openQuestionForm = (surveyId) => ({
  type: OPEN_QUESTION_FORM,
  additionalData: { surveyId },
});

export const closeQuestionForm = () => ({
  type: CLOSE_QUESTION_FORM,
});
