import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button';
import { Header } from '../Header';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';

const surveysList = [
  {
    name: 'Первый опрос',
    author: 'Кузнецов Сергей',
  },
  {
    name: 'Второй опрос',
    author: 'Кузнецов Сергей',
  },
  {
    name: 'Третий опрос',
    author: 'Кузнецов Сергей',
  },
];

// const surveyData = {
//   questionsList: questions,
//   name: 'Первый опрос',
//   author: 'Кузнецов Сергей',
// };
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
  // какие данные нам нужны: название опроса, автор(имя),
  // действия - начать
  render() {
    const {
      survey,
    } = this.props;
    const surveysData = surveysList.map((surveyItem) => (
      <Card
        style={{ margin: '20px' }}
      >
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {surveyItem.name}
          </Typography>
          <Typography color="textSecondary">
            {surveyItem.author}
          </Typography>

        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Начать
          </Button>
        </CardActions>
      </Card>
    ));

    return (
      <div>
        <Header
          pageTitle="Мои опросы"
        />
        <Container maxWidth="sm">
          <Tabs
            value={1}
            // onChange={(e) => this.handleChangeTab(e)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value={1} label="Назначенные на меня" />
            <Tab value={2} label="Пройденные опросы" />
          </Tabs>
          <div
            style={{ minHeight: '10vh', marginTop: '2vh' }}
          >
            <Typography
              style={{ marginLeft: '20px' }}
            >
              Количество назначенных на меня опросов:
              {' '}
              {surveysData.length}
            </Typography>

            <List>
              {surveysData}
            </List>
          </div>

          {/* <div */}
          {/*  style={{ marginLeft: '50px', display: 'flex', maxWidth: '500px' }} */}
          {/* > */}
          {/*  <Button */}
          {/*    color="primary" */}
          {/*    variant="contained" */}
          {/*  > */}
          {/*    Сохранить */}
          {/*  </Button> */}
          {/*  <Button */}
          {/*    style={{ marginLeft: '20px' }} */}
          {/*  > */}
          {/*    Отменить */}
          {/*  </Button> */}
          {/* </div> */}

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export const MySurveys = connect(mapStateToProps, mapDispatchToProps)(MySurveysComponent);
