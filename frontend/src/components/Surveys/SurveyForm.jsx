import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormikTextField } from 'formik-material-fields';
import { connect } from 'react-redux';
import { SurveyCreationSchema, surveyShape } from './surveys.schema';
import { closeSurveyForm } from '../../store/actions/flags.actions';
import { createSurveyAction } from '../../store/actions/surveys.actions';

class SurveyFormComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeForm: PropTypes.func.isRequired,
    createSurvey: PropTypes.func.isRequired,
    editingSurvey: PropTypes.shape(surveyShape),
  };

  static defaultProps = {
    open: false,
    editingSurvey: null,
  };

  render() {
    const {
      open, closeForm, createSurvey, editingSurvey,
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
                  createSurvey();
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
});

const mapDispatchToProps = (dispatch) => ({
  closeForm: () => dispatch(closeSurveyForm()),
  createSurvey: () => dispatch(createSurveyAction()),
});

export const SurveyForm = connect(mapStateToProps, mapDispatchToProps)(SurveyFormComponent);
