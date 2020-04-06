import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';
import { Header } from '../Header';
import { closeQuestionForm, openQuestionForm } from '../../store/actions/flags.actions';
import {
  MULTI_SELECT_QUESTION,
  SELECT_QUESTION,
  surveyQuestionsData,
} from './questionEdit.constants';
import { questionShape } from '../Surveys/surveys.schema';
import { AnswerVariants } from './AnswerVariants';

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
    loadCurrentSurvey: PropTypes.func.isRequired,
    closeQuestionForm: PropTypes.func.isRequired,
    openQuestionForm: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  componentDidMount() {
    // const { loadCurrentSurvey, match } = this.props;
    // loadCurrentSurvey(match.params.id);
    console.log(this.props.questionData);
  }

  render() {
    const { match, questionData } = this.props;
    const {
      text, id, surveyId, questionType, answersList,
    } = questionData;
    console.log([SELECT_QUESTION, MULTI_SELECT_QUESTION].indexOf(questionType))
    return (
      <div>
        <Card style={{ margin: '15px' }}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {text}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {
                [SELECT_QUESTION, MULTI_SELECT_QUESTION].indexOf(questionType) >= 0
                && <AnswerVariants answersList={answersList} />
              }
            </Typography>
            {/* текст вопроса. варианты ответа. новые вариант ответа */}
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
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
  // editingSurvey: state.surveys.editingSurvey,
  // user: state.auth.user,
  // survey: state.surveys.surveys.filter((survey) => survey.id === this.props.match.params.id),
  // questionFormOpened: state.flags.formOpened,
});

const mapDispatchToProps = (dispatch) => ({
  closeQuestionForm: () => dispatch(closeQuestionForm()),
  openQuestionForm: (surveyId) => dispatch(openQuestionForm(surveyId)),
  loadCurrentSurvey: (surveyId) => dispatch(loadCurrentSurveyAction(surveyId)),
});

export const Question = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionComponent),
);
