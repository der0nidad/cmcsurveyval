import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Header } from '../Header';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { SELECT_QUESTION, TEXT_QUESTION } from '../QuestionsEdit/questionEdit.constants';
import { mySurveysRoute } from '../RouterComponent/routerComponent.constants';
import {
  addSurveyAnswerAction,
  loadSurveyQuestionsAction,
  saveSurveyAnswersAction,
} from '../../store/actions/surveyPassing.actions';
import './survey_passing.css';


const fiveVariants = [
  {
    name: 'Нет',
    id: 1,
  },
  {
    name: 'Скорее нет',
    id: 2,
  },
  {
    name: 'Трудно сказать, да или нет',
    id: 3,
  },
  {
    name: 'Скорее да',
    id: 4,
  },
  {
    name: 'Да',
    id: 5,
  },
];
const questions = [
  {
    name: 'Вы удовлетворены преподаванием данного курса?',
    type: SELECT_QUESTION,
    answersList: fiveVariants,
  },
  {
    name: 'Место, где можно более подробно рассказать о впечатлениях от курса',
    type: TEXT_QUESTION,
  },
];
const surveyData = {
  questionsList: questions,
  name: 'Первый опрос',
  author: 'Кузнецов Сергей',
};
class SurveyPassingComponent extends React.Component {
  static propTypes = {
    surveyQuestions: PropTypes.shape(surveyWithQuestionsSchema),
    loadSurveyQuestions: PropTypes.func.isRequired,
    saveSurveyAnswers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    answers: PropTypes.array.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    surveyQuestions: [],
    isLoading: false,
    answers: null,
  };

  state = {
    form: {}, // {'id вопроса': {type: [SO|ST], answerId: number -or- answerText: str}
    error: false,
  };


  componentDidMount() {
    const { match, loadSurveyQuestions } = this.props;
    const newStateQuestions = {};
    loadSurveyQuestions(match.params.id).then(() => {
      const { surveyQuestions } = this.props;
      surveyQuestions.questionsList.map((question) => { newStateQuestions[question.id] = { answerText: '' }; });
      this.setState(() => ({ form: newStateQuestions }));
    });
  }

  makeTextAnswer = (event, id) => {
    const answerText = event.target.value;
    const { form } = this.state;
    this.setState({ form: { ...form, [id]: { answerText, type: TEXT_QUESTION } } });
  };

  makeSelectAnswer = (event, id, answerId) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [id]: { answerId, type: SELECT_QUESTION } } });
  };

  handleCloseSnackBar = () => {
    this.setState({ error: false });
  };

  saveAnswers = () => {
    if (this.validateAnswers()) {
      const { match, saveSurveyAnswers } = this.props;
      const { form } = this.state;
      saveSurveyAnswers(match.params.id, form)
        .then(() => {
        // this.props.history.push(mySurveysRoute);
        });
    } else {
      this.setState({ error: true });
    }
  };

  validateAnswers = () => {
    const { form } = this.state;
    const { surveyQuestions } = this.props;
    const unansweredQuestions = surveyQuestions.questionsList
      .filter((question) => (form[question.id].answerText === ''));
    return unansweredQuestions.length === 0;
  };


  // назначенные на меня опросы
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа). мы рендерим по карточке на каждый вопрос, в зависимости от типа вопроса рендерим либо варианты ответа,
  // либо текстовое поле для ответа
  // действия - отправить, отмена
  render() {
    const {
      surveyQuestions, isLoading, answers, history,
    } = this.props;
    const { form, error } = this.state;
    if (isLoading) {
      return <CircularProgress />;
    }
    const questionsData = surveyQuestions.questionsList ? surveyQuestions.questionsList.map((question, index) => {
      const answerVariantList = question.questionType === SELECT_QUESTION
        ? question.answersList.map((variant) =>
          // console.log(question)
          (
            <ListItem
              key={variant.id}
              onClick={(event) => this.makeSelectAnswer(event, question.id, variant.id)}
            >
              <Radio
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
              />
              <span>{variant.name}</span>
            </ListItem>
          ))
        : null;
      return (
        <Card
          style={{ margin: '20px' }}
          key={question.id}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Вопрос
              {' '}
              {index + 1}
              {' '}
              из
              {' '}
              {surveyQuestions.questionsList.length}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {question.name}
            </Typography>
            {question.questionType === TEXT_QUESTION
              ? (
                <TextField
                  onChange={(e) => this.makeTextAnswer(e, question.id)}
                  value={form[question.id]?.answerText}
                  placeholder="Введите текст ответа"
                />
              )
              : answerVariantList}

          </CardContent>
        </Card>
      );
    }) : null;

    return (
      <div>
        <Header
          pageTitle="Линейная алгебра - опрос по курсу"
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={error}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackBar}
          message="Все вопросы опроса должны быть заполнены"
        />
        <Container maxWidth="sm">

          <Breadcrumbs aria-label="breadcrumb">
            {/* TODO добавь предупреждение-модалку при уходе со страницы, что ваши данные не будут сохранены.
            либо сохранение в локалсторадж(неа)) */}
            <Link color="inherit" href="/">
              Главная страница
            </Link>
            <Link color="inherit" href={mySurveysRoute}>
              Мои опросы
            </Link>
            <Typography color="textPrimary">
              Прохождение опроса:
              {' '}
              {123}
            </Typography>
          </Breadcrumbs>
          { questionsData && questionsData.length
            ? <List>{questionsData}</List>
            : <Typography className="survey-questions__no-questions-text">В этом опросе пока нет вопросов</Typography>}

          <div
            style={{ marginLeft: '50px', display: 'flex', maxWidth: '500px' }}
          >
            {/* {questionsData && questionsData.length && !answers && ( */}
            {/* <Typography */}
            {/*  color="error" */}
            {/*  variant="subtitle2" */}
            {/* > */}
            {/*  Нужно ответить на все вопросы */}
            {/* </Typography> */}
            {/* )} */}
            <Button
              color="primary"
              variant="contained"
              // TODO надо блочить кнопку до api success и показывать нотификашку, если api error(M-UI <SnackBar />)
              // TODO добавь реакцию на 400 и 200 код апи(они уже есть)
              // disabled={this.validateAnswers}
              onClick={this.saveAnswers}
            >
              Сохранить
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={() => history.push(mySurveysRoute)}
            >
              Отменить
            </Button>
          </div>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  surveyQuestions: state.surveyPassing.surveyQuestions,
  answers: state.surveyPassing.answers, // а оно надо? не думаю
});

const mapDispatchToProps = (dispatch) => ({
  loadSurveyQuestions: (id) => dispatch(loadSurveyQuestionsAction(id)),
  saveSurveyAnswers: (surveyId, answerData) => dispatch(saveSurveyAnswersAction(surveyId, answerData)),
  addSurveyAnswer: (data) => dispatch(addSurveyAnswerAction(data)),
});

export const SurveyPassing = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPassingComponent),
);
