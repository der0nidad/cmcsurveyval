export const surveyQuestionsData = (surveyId) => `/api/surveys/${surveyId}/questions/`;
export const questionDetailId = (questionId) => `/api/questions/${questionId}/`;
export const questionUrl = '/api/questions/';

export const SELECT_QUESTION = 'SO';
export const TEXT_QUESTION = 'ST'; // small text
export const MULTI_SELECT_QUESTION = 'MS';
export const QUESTION_TYPES = [SELECT_QUESTION, TEXT_QUESTION, MULTI_SELECT_QUESTION];
