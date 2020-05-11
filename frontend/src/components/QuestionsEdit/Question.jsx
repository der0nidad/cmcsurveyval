import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  deleteQuestionAction,
  loadCurrentSurveyAction,
} from '../../store/actions/questionEdit.actions';
import { closeQuestionForm, openQuestionFormAction } from '../../store/actions/flags.actions';
import { MULTI_SELECT_QUESTION, SELECT_QUESTION, TEXT_QUESTION } from './questionEdit.constants';
import { questionShape } from '../Surveys/surveys.schema';
import { AnswerVariants } from './AnswerVariants';
import ConfirmDialog from '../common/ConfirmDialog';
import { QuestionForm } from './QuestionForm';

const classes = {
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class QuestionComponent extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    questionData: PropTypes.shape(questionShape).isRequired,
    // closeQuestionForm: PropTypes.func.isRequired,
    openQuestionForm: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    questionFormOpened: PropTypes.bool,
  };

  static defaultProps = {
    questionFormOpened: false,
  };

  state = {
    questionDeleteDialogOpened: false,
  };

  componentDidMount() {
  }

  toggleDeleteDialogOpeningFlag = (flag) => {
    this.setState({ questionDeleteDialogOpened: flag });
  };

  handleShowDeletionDialog(questionId) {
    this.setState({ questionDeleteDialogOpened: true });
  }

  render() {
    const {
      match, questionData, deleteQuestion, openQuestionForm, questionFormOpened,
    } = this.props;
    const { questionDeleteDialogOpened } = this.state;
    const {
      text, id, surveyId, questionType, answersList,
    } = questionData;
    return (
      <div>
        <ConfirmDialog
          onConfirm={() => deleteQuestion(id).then(() => loadSurveys())}
          open={questionDeleteDialogOpened}
          setOpen={this.toggleDeleteDialogOpeningFlag}
          title="Delete question?"
        />
        <Card style={{ margin: '15px' }}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {text}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              {questionType === TEXT_QUESTION ? 'Вопрос со свободным ответом' : 'Вопрос с выбором варианта ответа'}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {
                [SELECT_QUESTION, MULTI_SELECT_QUESTION].indexOf(questionType) >= 0
                && (
                  <div>
                    <Typography variant="subtitle1" color="textPrimary">Варианты ответа:</Typography>
                <AnswerVariants
                  questionId={id}
                  answersList={answersList}
                />
                </div>
                )
              }
            </Typography>
            {/* текст вопроса. варианты ответа. новые вариант ответа */}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => openQuestionForm(id)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => this.handleShowDeletionDialog(id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  questionData: state.questionEdit.survey.questionsList.find(
    (question) => question.id === ownProps.id,
  ),
  user: state.auth.user,
  questionFormOpened: state.flags.formOpened,
});

const mapDispatchToProps = (dispatch) => ({
  // closeQuestionForm: () => dispatch(closeQuestionForm()),
  openQuestionForm: (questionId) => dispatch(openQuestionFormAction(questionId)),
  deleteQuestion: (questionId) => dispatch(deleteQuestionAction(questionId)),
});

export const Question = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionComponent),
);
