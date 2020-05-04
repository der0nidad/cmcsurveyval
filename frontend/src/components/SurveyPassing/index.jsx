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
class SurveyPassingComponent extends React.Component {
  static propTypes = {
    loadSurveyData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
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
    console.log(213);
    // const { loadSurveyData } = this.props;
    // loadSurveyData();
  }

  loadSurveysByButton = () => {
    const { loadSurveyData } = this.props;
    loadSurveyData();
  };

  // назначенные на меня опросы
  // какие данные нам нужны: название опроса, автор(имя), список вопросов(у каждого вопроса текст, тип и варианты
  // ответа). мы рендерим по карточке на каждый вопрос, в зависимости от типа вопроса рендерим либо варианты ответа,
  // либо текстовое поле для ответа
  // действия - отправить, отмена
  render() {
    const {
      isLoading, loadSurveyData, survey,
    } = this.props;
    const { deleteDialogOpened, currentSurveyId } = this.state;
    let surveysListOrSpinner;
    const questionsData = survey.questionsList.map((question, index) => {
      const answerVariantList = question.type === 'SO'
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
    // if (isLoading) {
    //   surveysListOrSpinner = <CircularProgress />;
    // } else {
    //   surveysListOrSpinner = (surveys.map((survey, index) => (
    //     <ListItem key={survey.id}>
    //       <Card>
    //         <CardContent>
    //           <Link to={`/surveys/${survey.id}/`}>
    //             <Typography color="textSecondary" gutterBottom>
    //               {survey.name}
    //             </Typography>
    //             <Typography color="textSecondary" gutterBottom>
    //               {survey.author}
    //             </Typography>
    //           </Link>
    //         </CardContent>
    //         <CardActions>
    //           {/* <Button size="small">Learn More</Button> */}
    //           <IconButton title="Edit questions" aria-label="edit questions">
    //             <HelpOutlineIcon />
    //           </IconButton>
    //           <IconButton
    //             title="Edit survey"
    //             aria-label="edit survey"
    //             onClick={() => this.handleEditSurvey(survey.id)}
    //           >
    //             <EditIcon />
    //           </IconButton>
    //           <IconButton
    //             title="Delete survey"
    //             aria-label="delete"
    //             onClick={() => this.handleShowDeletionDialog(survey.id)}
    //           >
    //             <DeleteIcon />
    //           </IconButton>
    //         </CardActions>
    //       </Card>
    //     </ListItem>
    //   )));
    // }

    return (
      <div>
        <Header
          pageTitle="Линейная алгебра - опрос по курсу"
        />
        {/* <ConfirmDialog */}
        {/*  onConfirm={() => deleteSurvey(currentSurveyId).then(() => loadSurveys())} */}
        {/*  open={deleteDialogOpened} */}
        {/*  setOpen={this.toggleDeleteDialogOpeningFlag} */}
        {/*  title="Delete survey?" */}
        {/* /> */}
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
  // isLoading: state.surveys.isLoading,
  // formOpened: state.flags.formOpened,
  // очень хороший вопрос: возможно, стоит держать все подобные флаги во flags?? хз
  // с одной стороны, нам не нужно засорять кучу редюсеров флагами загрузки и открытия форм,
  // с другой стороны возможны конфликты...
});

const mapDispatchToProps = (dispatch) => ({

});

export const SurveyPassing = connect(mapStateToProps, mapDispatchToProps)(SurveyPassingComponent);
