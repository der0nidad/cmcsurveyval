import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { closeQuestionForm, openQuestionFormAction } from '../../store/actions/flags.actions';
import { Header } from '../Header';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';
import { Question } from './Question';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { QuestionForm } from './QuestionForm';
import './questionEditStyles.css';
import { SELECT_QUESTION, TEXT_QUESTION } from './questionEdit.constants';
import { fiveVariants } from '../SurveyReport';
import { surveysRoute } from '../RouterComponent/routerComponent.constants';

const questionsListData = [
  {
    id: 1,
    name: 'Вы удовлетворены преподаванием данного курса?',
    questionType: SELECT_QUESTION,
    answersList: fiveVariants,
  },
  {
    id: 2,
    name: 'Место, где можно более подробно рассказать о впечатлениях от курса',
    questionType: TEXT_QUESTION,
  },
];

export const currSurvey = {
  id: 1,
  name: 'Линейная алгебра. Опрос по курсу',
  author: 'Кузнецов Сергей',
  questionsList: questionsListData,

};

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
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Главная страница
            </Link>
            <Link color="inherit" href={surveysRoute}>
              Создание и редактирование опросов
            </Link>
            <Typography color="textPrimary">
              Редактирование опроса:
              {' '}
              {survey.name}
            </Typography>
          </Breadcrumbs>
        </div>
        <Container maxWidth="sm">
          {questions}
          <Button
            onClick={openQuestionForm}
            color="primary"
            variant="contained"
          >
            Добавить вопрос
          </Button>
          <Button
            onClick={this.handleRedirectToSurveys}
            variant="outlined"
            style={{ marginLeft: '20px' }}
          >
            Сохранить черновик опроса
          </Button>
        </Container>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // editingSurvey: state.surveys.editingSurvey,
  user: state.auth.user,
  // survey: state.surveys.surveys.filter((survey) => survey.id === ownProps.match.params.id),
  // survey: state.questionEdit.survey,
  survey: currSurvey,
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
