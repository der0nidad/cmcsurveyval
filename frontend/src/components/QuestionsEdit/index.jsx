import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import { closeQuestionForm, openQuestionFormAction } from '../../store/actions/flags.actions';
import { Header } from '../Header';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';
import { Question } from './Question';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { QuestionForm } from './QuestionForm';
import './questionEditStyles.css';

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
        <div className="surveys-breadcrumbs">
          <Container maxWidth="md">
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Главная страница
              </Link>
              <Link color="inherit" href="/surveys">
                Создание и редактирование опросов
              </Link>
              <Typography color="textPrimary">
                Редактирование опроса:
                {' '}
                {survey.name}
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container maxWidth="sm">
          {questions}
          <Button
            onClick={openQuestionForm}
            color="primary"
            variant="contained"
          >
            Add question
          </Button>
          <Button
            onClick={this.handleRedirectToSurveys}
            variant="outlined"
            style={{ marginLeft: '20px' }}
          >
            Save
          </Button>
        </Container>

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
