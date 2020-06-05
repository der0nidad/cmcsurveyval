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
import { loadSurveyQuestionsAction, saveSurveyAnswersAction } from '../../store/actions/surveyPassing.actions';

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
    answerVariants: fiveVariants,
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

  };

  static defaultProps = {
    surveyQuestions: [],
    isLoading: false,
  };

  state = {
  };

  componentDidMount() {
    console.log(this.props);
    this.props.loadSurveyQuestions();
  }

  // назначенные на меня опросы
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа). мы рендерим по карточке на каждый вопрос, в зависимости от типа вопроса рендерим либо варианты ответа,
  // либо текстовое поле для ответа
  // действия - отправить, отмена
  render() {
    const {
      surveyQuestions, isLoading,
    } = this.props;
    if (isLoading) {
      return <CircularProgress />;
    }
    const questionsData = surveyQuestions.questionsList && surveyQuestions.questionsList.map((question, index) => {
      const answerVariantList = question.type === SELECT_QUESTION
        ? question.answerVariants.map((variant) => (
          <ListItem key={variant.id}>
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
            {question.type === TEXT_QUESTION
              ? (
                <TextField
                  placeholder="Введите текст ответа"
                />
              )
              : answerVariantList}

          </CardContent>
        </Card>
      );
    });

    return (
      <div>
        <Header
          pageTitle="Линейная алгебра - опрос по курсу"
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
          <List>
            {questionsData}
          </List>
          <div
            style={{ marginLeft: '50px', display: 'flex', maxWidth: '500px' }}
          >
            <Button
              color="primary"
              variant="contained"
            >
              Сохранить
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
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
});

const mapDispatchToProps = (dispatch) => ({
  loadSurveyQuestions: () => dispatch(loadSurveyQuestionsAction()),
  saveSurveyAnswers: () => dispatch(saveSurveyAnswersAction()),

});

export const SurveyPassing = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPassingComponent)
);
