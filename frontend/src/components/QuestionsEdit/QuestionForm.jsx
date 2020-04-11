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
import { closeSurveyForm } from '../../store/actions/flags.actions';
import { createSurveyAction, loadSurveysAction } from '../../store/actions/surveys.actions';
import { getCookie } from '../../common/helpers/csrf';
import { userShape } from '../Auth/auth.schema';
import { questionShape, SurveyCreationSchema } from '../Surveys/surveys.schema';
import { QUESTION_TYPES, SELECT_QUESTION } from './questionEdit.constants';

class QuestionFormComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeForm: PropTypes.func.isRequired,
    user: PropTypes.shape(userShape),
    question: PropTypes.shape(questionShape),
  };

  static defaultProps = {
    open: false,
    user: null,
    question: null,
  };

  state = {
    questionType: '',
  };

  handleChangeQuestionType(e) {
    if (e && e.target && e.target.value) {
      this.setState({ questionType: { value: e.target.value, label: e.target.value} });
    }
  }

  render() {
    const {
      open, closeForm, createQuestion, question, user, loadQuestions,

    } = this.props;
    const { questionType } = this.state;
    const titleText = question ? `Edit ${question.text}` : 'Create Question';
    return (
      <div>
        { open
        && (
          <Dialog open={open} onClose={closeForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ text: question ? question.text : '' }}
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
                      name="text"
                      label="Text"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage name="name" />
                    <FormikSelectField
                      name="type"
                      label="Type"
                      margin="normal"
                      fullWidth
                      options={QUESTION_TYPES.map((item) => ({ value: item, label: item }))}
                      value={questionType}
                      onChange={(e) => this.handleChangeQuestionType(e)}
                    />
                    <ErrorMessage name="type" />
                    {isSubmitting && <LinearProgress />}
                    <br />
                    {questionType.value === SELECT_QUESTION && <div>варианты ответа</div>}
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
  open: state.flags.formOpened,
  question: state.questionEdit.currentQuestion,
  // user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  closeForm: () => dispatch(closeSurveyForm()),
  createSurvey: (data) => dispatch(createSurveyAction(data)),
  loadSurveys: () => dispatch(loadSurveysAction()),
});

export const QuestionForm = connect(mapStateToProps, mapDispatchToProps)(QuestionFormComponent);
