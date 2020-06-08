import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { withRouter } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { respondentsStatusDataSchema, surveyWithQuestionsSchema } from '../Surveys/surveys.schema';
import { Header } from '../Header';
import StatusTable from './StatusTable';
import SurveyResults from './SurveyResults';
import { SELECT_QUESTION, TEXT_QUESTION } from '../QuestionsEdit/questionEdit.constants';
import { surveysRoute } from '../RouterComponent/routerComponent.constants';
import { loadRespondentsStatusesAction } from '../../store/actions/surveyReport.actions';

export const fiveVariants = [
  {
    name: 'Нет',
    id: 1,
    part: '20%',
  },
  {
    name: 'Скорее нет',
    id: 2,
    part: '0%',
  },
  {
    name: 'Трудно сказать, да или нет',
    id: 3,
    part: '20%',
  },
  {
    name: 'Скорее да',
    id: 4,
    part: '40%',
  },
  {
    name: 'Да',
    id: 5,
    part: '20%',
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
  author: 'Петров Виктор',
};
class SurveyReportComponent extends React.Component {
  static propTypes = {
    survey: PropTypes.shape(surveyWithQuestionsSchema),
    loadRespondentsStatuses: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    respondentsData: PropTypes.arrayOf(respondentsStatusDataSchema),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    survey: null,
    isLoading: false,
    respondentsData: null,
  };

  state = {
    activeTab: 1,
  };

  componentDidMount() {
    const { loadRespondentsStatuses, match } = this.props;
    const surveyId = match.params.id;
    loadRespondentsStatuses(surveyId);
  }

  handleChangeTab = (e) => {
    e.persist();
    const value = e.currentTarget.getAttribute('data-value');
    this.setState({ activeTab: Number(value) });
  };

  // отчет о прохождении опроса
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа).
  // дальше мы рендерим 2 таба: отчет о прохождении(где будет отображаться статус прошел/не прошел опрос для каждого
  // респондента из аудитории. какие данные нам нужны: фио + группа студентов из аудитории
  // и таб с результатами опроса. его пока не рендерим. всего 3 компонента: основной, таблица и результатыЫ
  render() {
    const { activeTab } = this.state;
    const { respondentsData, isLoading } = this.props;
    if (isLoading && !respondentsData) return <div className="status-screen__spinner"><CircularProgress /></div>;
    // TODO в этом же компоненте(но наверное  вотдельном экшне, хз, хотя зачем в отдельном) подгружай нужные данные для
    // таблицы с резами
    return (
      <div>
        <Header
          pageTitle={'Отчёт по опросу "Линейная алгебра - опрос по курсу"'}
        />
        <Container maxWidth="sm">
          <Breadcrumbs
            aria-label="breadcrumb"
            className="surveys-breadcrumbs"
          >
            <Link color="inherit" href="/">
              Главная страница
            </Link>
            <Link color="inherit" href={surveysRoute}>
              Созданные мной опросы
            </Link>
            <Typography color="textPrimary">
              Отчёт по опросу "Линейная алгебра - опрос по курсу"

            </Typography>
          </Breadcrumbs>
          { isLoading ? <div className="status-screen__spinner"><CircularProgress /></div>
            : (
              <div>
                <Tabs
                  value={activeTab}
                  onChange={(e) => this.handleChangeTab(e)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab data-value={1} value={1} label="Отчёт о прохождении опроса" />
                  <Tab data-value={2} value={2} label="Результаты опроса" />
                </Tabs>
                <div
                  style={{ minHeight: '10vh', marginTop: '2vh' }}
                >
                  { activeTab === 1 ? <StatusTable respondentsData={respondentsData} /> : <SurveyResults />}
                </div>
              </div>
            )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  survey: surveyData,
  respondentsData: state.surveyReport.respondents,
  isLoading: state.surveyReport.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadRespondentsStatuses: (surveyId) => dispatch(loadRespondentsStatusesAction(surveyId)),

});

export const SurveyReport = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyReportComponent));
