import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { userShape } from '../Auth/auth.schema';

export const SurveyCreationSchema = Yup.object().shape({
  name: Yup.string().required('This is required field'),
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
