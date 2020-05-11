import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { ErrorMessage, Form, Formik } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormikSelectField, FormikTextField } from 'formik-material-fields';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { closeSurveyForm } from '../../store/actions/flags.actions';
import { loadSurveysAction } from '../../store/actions/surveys.actions';
import { userShape } from '../Auth/auth.schema';
import { QuestionCreationSchema, questionShape } from '../Surveys/surveys.schema';
import { QUESTION_TYPES_TEXT, TEXT_QUESTION } from './questionEdit.constants';
import { createQuestionAction } from '../../store/actions/questionEdit.actions';


const initialState = {
  questionType: { value: TEXT_QUESTION, name: TEXT_QUESTION },
  answersVariantsData: [],
  newAnswerVariant: '',
};

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

  state = initialState;

  // static getDerivedStateFromProps(props, state) {
  //   return initialState;
  // }

  handleChangeQuestionType(e) {
    const { questionType } = this.state;
    if (e && e.target && e.target.value) {
      if (e.target.value !== questionType) {
        this.setState({
          questionType: { value: e.target.value, label: e.target.value },
          answersVariantsData: [],
        });
      } else {
        this.setState({ questionType: { value: e.target.value, label: e.target.value } });
      }
    }
  }

  handleNewAnswerVariant() {
    this.setState({
      answersVariantsData: [...this.state.answersVariantsData, this.state.newAnswerVariant],
    });
  }

  handleChangeNewAnswerVariantText(e) {
    this.setState({ newAnswerVariant: e.target.value });
  }

  render() {
    const {
      open, closeForm, createQuestion, question, user, loadQuestions,

    } = this.props;
    const { questionType, answersVariantsData, newAnswerVariant } = this.state;
    const titleText = question ? `Редактирование вопроса: ${question.text}` : 'Создание вопроса';
    const answerVariantsLayout = answersVariantsData
      .map((answer) => (
        <li key={answer.id}>
          {answer.name}
          {' '}
          <IconButton>
            <CloseIcon />
          </IconButton>
        </li>
      ));
    answerVariantsLayout.push(
      <li>
        <TextField
          value={newAnswerVariant}
          onChange={this.handleChangeNewAnswerVariantText}
        />
        <IconButton onClick={this.handleNewAnswerVariant}><AddIcon /></IconButton>
      </li>,
    );
    return (
      <div>
        { open
        && (
          <Dialog
            open={open}
            onClose={closeForm}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ text: question ? question.text : '' }}
                validationSchema={QuestionCreationSchema}
                onSubmit={(values, { setSubmitting }) => {
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    <FormikTextField
                      name="text"
                      label="Текст вопроса"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage name="name" />
                    <FormikSelectField
                      name="type"
                      label="Тип вопроса"
                      margin="normal"
                      fullWidth
                      options={QUESTION_TYPES_TEXT.map((item) => ({ value: item, label: item }))}
                      // value={questionType}
                      onChange={(e) => this.handleChangeQuestionType(e)}
                    />
                    {/*<ErrorMessage name="type" />*/}
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
  open: state.flags.formOpened,
  question: state.questionEdit.currentQuestion,
  // user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  closeForm: () => dispatch(closeSurveyForm()),
  createQuestion: (data) => dispatch(createQuestionAction(data)),
  loadSurveys: () => dispatch(loadSurveysAction()),
});

export const QuestionForm = connect(mapStateToProps, mapDispatchToProps)(QuestionFormComponent);
