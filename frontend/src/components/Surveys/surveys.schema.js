import * as Yup from 'yup';

export const SurveyCreationSchema = Yup.object().shape({
  name: Yup.string().required('This is required field'),
});
