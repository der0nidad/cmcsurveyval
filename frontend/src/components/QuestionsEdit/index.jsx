import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { closeQuestionForm, openQuestionFormAction } from '../../store/actions/flags.actions';
import { Header } from '../Header';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';
import { Question } from './Question';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { QuestionForm } from './QuestionForm';

class QuestionEditComponent extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loadCurrentSurvey: PropTypes.func.isRequired,
    closeQuestionForm: PropTypes.func.isRequired,
    openQuestionForm: PropTypes.func.isRequired,
    questionFormOpened: PropTypes.bool,
    survey: PropTypes.shape(surveyWithQuestionsSchema).isRequired,
  };

  static defaultProps = {
    questionFormOpened: false,
  };

  componentDidMount() {
    const { loadCurrentSurvey, match } = this.props;
    loadCurrentSurvey(match.params.id);
  }

  handleRedirectToSurveys = () => {
    this.props.history.push('/surveys/');
  };

  render() {
    const {
      match, survey, openQuestionForm, questionFormOpened,
    } = this.props;
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
          pageTitle={`Редактирование вопросов в опросе "${survey.name}"`}
        />
        <QuestionForm
          open={questionFormOpened}
        />
        {/* добавь хлебные крошки "к списку опросов" */}
        {questions}
        <Button
          onClick={openQuestionForm}
          color="primary"
        >
          Add question
        </Button>
        <Button
          onClick={this.handleRedirectToSurveys}
        >
          Save
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
  openQuestionForm: (questionId) => dispatch(openQuestionFormAction(questionId)),
  loadCurrentSurvey: (surveyId) => dispatch(loadCurrentSurveyAction(surveyId)),
});

export const QuestionEdit = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionEditComponent),
);
