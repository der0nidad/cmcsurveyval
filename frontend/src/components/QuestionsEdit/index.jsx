import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { closeQuestionForm, openQuestionForm } from '../../store/actions/flags.actions';
import { Header } from '../Header';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';
import { Question } from './Question';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';

class QuestionEditComponent extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    loadCurrentSurvey: PropTypes.func.isRequired,
    closeQuestionForm: PropTypes.func.isRequired,
    openQuestionForm: PropTypes.func.isRequired,
    survey: PropTypes.shape(surveyWithQuestionsSchema).isRequired,
  };

  static defaultProps = {
  };

  componentDidMount() {
    const { loadCurrentSurvey, match } = this.props;
    loadCurrentSurvey(match.params.id);
  }

  render() {
    const { match, survey, openQuestionForm } = this.props;
    if (!survey) return <CircularProgress />;
    const questions = survey
      ? survey.questionsList.map((question) => (
        <Question
          id={question.id}
        />
      ))
      : <div>There aren&apos;t questions in this survey yet</div>; // add loader
    return (
      <div>
        <Header
          pageTitle={`Edit questions in ${survey.name}`}
        />
        {questions}
        <Button
          onClick={openQuestionForm}
          color="primary"
        >
          Add question
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editingSurvey: state.surveys.editingSurvey,
  user: state.auth.user,
  // survey: state.surveys.surveys.filter((survey) => survey.id === ownProps.match.params.id),
  survey: state.questionEdit.survey,
  questionFormOpened: state.flags.formOpened,
});

const mapDispatchToProps = (dispatch) => ({
  closeQuestionForm: () => dispatch(closeQuestionForm()),
  openQuestionForm: (questionId) => dispatch(openQuestionForm(questionId)),
  loadCurrentSurvey: (surveyId) => dispatch(loadCurrentSurveyAction(surveyId)),
});

export const QuestionEdit = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionEditComponent),
);
