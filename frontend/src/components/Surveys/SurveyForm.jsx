import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ErrorMessage, Form, Formik } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormikTextField } from 'formik-material-fields';
import { connect } from 'react-redux';
import { SurveyCreationSchema, surveyShape } from './surveys.schema';
import { closeSurveyForm } from '../../store/actions/flags.actions';
import { createSurveyAction, loadSurveysAction } from '../../store/actions/surveys.actions';
import { getCookie } from '../../common/helpers/csrf';
import { userShape } from '../Auth/auth.schema';

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
      open, closeForm, createSurvey, editingSurvey, user, loadSurveys
    } = this.props;
    const titleText = editingSurvey ? `Edit ${editingSurvey.name}` : 'Create Survey';
    return (
      <div>
        { open
        && (
          <Dialog open={open} onClose={closeForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ name: editingSurvey ? editingSurvey.name : '' }}
                validationSchema={SurveyCreationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const formData = new FormData();
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
                      label="Name"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage name="name" />
                    {isSubmitting && <LinearProgress />}
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
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
