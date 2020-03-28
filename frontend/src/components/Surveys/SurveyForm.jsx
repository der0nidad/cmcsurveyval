import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, Form, Formik } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { FormikTextField } from 'formik-material-fields';
import { SurveyCreationSchema } from './surveys.schema';

class SurveyFormComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeForm: PropTypes.func.isRequired,
    createSurvey: PropTypes.func.isRequired,
    currentName: PropTypes.string,
  };

  static defaultProps = {
    open: false,
    currentName: '',
  };

  render() {
    const { open, closeForm, createSurvey, currentName } = this.props;
    return (
      <div>
        { open
        && (
          <Dialog open={open} onClose={closeForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Survey</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ name: currentName }}
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
export const SurveyForm = SurveyFormComponent;
// const mapStateToProps = (state) => ({
//   open: state.flags.openForm,
// });
// const mapDispatchToProps = (dispatch) => ({
// });
// export const SurveyForm = connect(mapStateToProps, mapDispatchToProps)(SurveyFormComponent);
