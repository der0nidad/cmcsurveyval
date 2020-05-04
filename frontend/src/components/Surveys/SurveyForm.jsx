import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ErrorMessage, Form, Formik } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormikSelectField, FormikTextField } from 'formik-material-fields';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SurveyCreationSchema, surveyShape } from './surveys.schema';
import { closeSurveyForm } from '../../store/actions/flags.actions';
import { createSurveyAction, loadSurveysAction } from '../../store/actions/surveys.actions';
import { getCookie } from '../../common/helpers/csrf';
import { userShape } from '../Auth/auth.schema';

const streamData = [
  {
    name: '1 поток',
    groups: [1, 2, 3, 4, 5, 6],
  },
  {
    name: '2 поток',
    groups: [7, 8, 9, 10, 11, 12],
  },
  {
    name: '3 поток',
    groups: [13, 14, 15, 16, 17, 18],
  },
];
const course = '1';
class SurveyFormComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeForm: PropTypes.func.isRequired,
    createSurvey: PropTypes.func.isRequired,
    loadSurveys: PropTypes.func.isRequired,
    editingSurvey: PropTypes.shape(surveyShape),
    user: PropTypes.shape(userShape),
  };

  static defaultProps = {
    open: false,
    editingSurvey: null,
    user: null,
  };

  render() {
    const {
      open, closeForm, createSurvey, editingSurvey, user, loadSurveys,
    } = this.props;
    const groupOptionsList = streamData
      .map(
        (stream) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel control={<Checkbox color="primary" name="checkedC" />} label={stream.name} />
            {stream.groups
              .map((group) => {
                const groupNmumber = course + group.toString().padStart(2, '0');
                return <FormControlLabel control={<Checkbox color="primary" name="checkedC" />} label={`${groupNmumber} группа`} />;
              })}
          </div>
        ),
      );

    const titleText = editingSurvey ? `Редактирование опроса ${editingSurvey.name}` : 'Создание опроса';
    return (
      <div>
        { open
        && (
          <Dialog
            open={open}
            onClose={closeForm}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ name: editingSurvey ? editingSurvey.name : '' }}
                validationSchema={SurveyCreationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const formData = new FormData();
                  // TODO use objToFormData helper
                  const cookie = getCookie('csrftoken');
                  formData.append('name', values.name);
                  formData.append('author', user.id);
                  formData.append('csrfmiddlewaretoken', cookie);
                  createSurvey(formData)
                    .then(() => { loadSurveys(); });
                  // .catch((error) => { console.log(2); });
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    <FormikTextField
                      name="name"
                      label="Название"
                      margin="normal"
                      // fullWidth
                    />
                    <br />
                    <ErrorMessage name="name" />
                    <FormikSelectField
                      name="course"
                      label="Курс"
                      margin="normal"
                      options={[{ value: '1', label: '1 курс 2019/2020 гг.' }]}
                      fulWidth
                      style={{ minWidth: '400px' }}
                    />
                    <br />
                    Аудитория
                    <br />
                    <div
                      style={{ display: 'flex', flexDirection: 'row' }}
                    >
                      {groupOptionsList}
                    </div>
                    {isSubmitting && <LinearProgress />}
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Создать опрос
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        )}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  editingSurvey: state.surveys.editingSurvey,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  closeForm: () => dispatch(closeSurveyForm()),
  createSurvey: (data) => dispatch(createSurveyAction(data)),
  loadSurveys: () => dispatch(loadSurveysAction()),
});

export const SurveyForm = connect(mapStateToProps, mapDispatchToProps)(SurveyFormComponent);
