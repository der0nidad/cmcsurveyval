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
import { Header } from '../Header';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';

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
    type: 'SO',
    answerVariants: fiveVariants,
  },
  {
    name: 'Место, где можно более подробно рассказать о впечатлениях от курса',
    type: 'ST',
  },
];
const surveyData = {
  questionsList: questions,
  name: 'Первый опрос',
  author: 'Кузнецов Сергей',
};
class MySurveysComponent extends React.Component {
  static propTypes = {
    survey: PropTypes.shape(surveyWithQuestionsSchema),
  };

  static defaultProps = {
    survey: null,
    isLoading: false,
  };

  state = {
    currentSurveyId: null,
  };

  componentDidMount() {
  }

  // назначенные на меня опросы
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа). мы рендерим по карточке на каждый вопрос, в зависимости от типа вопроса рендерим либо варианты ответа,
  // либо текстовое поле для ответа
  // действия - отправить, отмена
  render() {
    const {
      survey,
    } = this.props;
    const questionsData = survey.questionsList.map((question, index) => {
      const answerVariantList = question.type === 'SO'
        ? question.answerVariants.map((variant) => (
          <ListItem key={variant.id}>
            <Radio
              value="a"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Typography>{variant.name}</Typography>
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
              {survey.questionsList.length}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {question.name}
            </Typography>
            {question.type === 'ST'
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
  survey: surveyData,
});

const mapDispatchToProps = (dispatch) => ({

});

export const MySurveys = connect(mapStateToProps, mapDispatchToProps)(MySurveysComponent);
