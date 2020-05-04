import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { Header } from '../Header';
import StatusTable from './StatusTable';

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
class SurveyReportComponent extends React.Component {
  static propTypes = {
    survey: PropTypes.shape(surveyWithQuestionsSchema),
  };

  static defaultProps = {
    survey: null,
    isLoading: false,
  };

  state = {
    activeTab: 1,
  };

  componentDidMount() {
  }

  handleChangeTab = (e) => {
    console.log(e);
    this.setState({ activeTab: e.target.value });
  };

  // отчет о прохождении опроса
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа).
  // дальше мы рендерим 2 таба: отчет о прохождении(где будет отображаться статус прошел/не прошел опрос для каждого
  // респондента из аудитории. какие данные нам нужны: фио + группа студентов из аудитории
  // и таб с результатами опроса. его пока не рендерим. всего 3 компонента: основной, таблица и результатыЫ
  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <Header
          pageTitle={'Отчёт по опросу "Линейная алгебра - опрос по курсу"'}
        />
        <Container maxWidth="sm">
          <Tabs
            value={activeTab}
            // onChange={(e) => this.handleChangeTab(e)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value={1} label="Отчёт о прохождении опроса" />
            <Tab value={2} label="Результаты опроса" />
          </Tabs>
          <div
            style={{ minHeight: '10vh', marginTop: '2vh' }}
          >
            <StatusTable />
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

export const SurveyReport = connect(mapStateToProps, mapDispatchToProps)(SurveyReportComponent);
