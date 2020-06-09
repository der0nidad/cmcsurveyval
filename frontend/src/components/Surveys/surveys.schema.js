import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { userShape } from '../Auth/auth.schema';
import { QUESTION_TYPES_TEXT } from '../QuestionsEdit/questionEdit.constants';

export const SurveyCreationSchema = Yup.object().shape({
  name: Yup.string().required('This is required field'),
});

export const QuestionCreationSchema = Yup.object().shape({
  text: Yup.string().required('This is required field'),
  type: Yup.string().oneOf([QUESTION_TYPES_TEXT]).required('This is required field'),
  // answersList
});

export const surveyShape = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  author: PropTypes.shape(userShape),
});

export const answerVariantShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  // ordering: PropTypes.number, // - стоит ли делать сортировку на фронте?
  // или при изменении порядка просто подгружать
  // вопросы с бэка? - почему бы и нет, только если интернет хороший
});

export const questionShape = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  surveyId: PropTypes.number,
  questionType: PropTypes.oneOf(['SO', 'ST', 'MS']),
  answersList: PropTypes.arrayOf(answerVariantShape),
});

export const surveyWithQuestionsSchema = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  author: PropTypes.shape(userShape),
  questionList: PropTypes.shape(questionShape),
});

export const mySurveysMinSchema = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  author: PropTypes.shape(userShape),
});

export const respondentsStatusDataSchema = PropTypes.shape({
  username: PropTypes.string,
  id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  status: PropTypes.bool,
});
