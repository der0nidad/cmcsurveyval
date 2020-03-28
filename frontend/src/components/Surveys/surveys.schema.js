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
