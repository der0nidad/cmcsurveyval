import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { Header } from '../Header';
import { mySurveysMinSchema, surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { loadSurveysMinInfoAction } from '../../store/actions/mySurveys.actions';
import historyRouter from '../../common/helpers/historyRouter';
import { mySurveysRoute } from '../RouterComponent/routerComponent.constants';


// const surveyData = {
//   questionsList: questions,
//   name: 'Первый опрос',
//   author: 'Кузнецов Сергей',
// };
class MySurveysComponent extends React.Component {
  static propTypes = {
    survey: PropTypes.shape(surveyWithQuestionsSchema),
    surveysList: PropTypes.arrayOf(mySurveysMinSchema),
    loadSurveysMinInfo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    survey: null,
    isLoading: false,
    surveysList: null,
  };

  state = {
  };

  componentDidMount() {
    this.props.loadSurveysMinInfo();
  }

  startSurvey = (id) => {
    historyRouter.push(`${mySurveysRoute}/${id}`);
  };

  render() {
    const {
      survey, surveysList, isLoading,
    } = this.props;
    if (isLoading) {
      return <CircularProgress />;
    }
    const surveysData = surveysList.map((surveyItem) => (
      <Card
        style={{ margin: '20px' }}
      >
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {surveyItem.name}
          </Typography>
          <Typography color="textSecondary">
            {surveyItem.authorName}
          </Typography>

        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.startSurvey(surveyItem.id)}
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
  surveysList: state.mySurveys.surveysList,
  isLoading: state.mySurveys.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadSurveysMinInfo: () => dispatch(loadSurveysMinInfoAction()),

});

export const MySurveys = connect(mapStateToProps, mapDispatchToProps)(MySurveysComponent);
