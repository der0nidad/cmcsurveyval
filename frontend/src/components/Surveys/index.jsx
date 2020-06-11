import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Header } from '../Header';
import { deleteSurveyAction, loadSurveysAction } from '../../store/actions/surveys.actions';
import { openSurveyFormAction } from '../../store/actions/flags.actions';
import { SurveyForm } from './SurveyForm';
import ConfirmDialog from '../common/ConfirmDialog';
import CardActions from "@material-ui/core/CardActions";

class SurveysComponent extends React.Component {
  static propTypes = {
    loadSurveys: PropTypes.func.isRequired,
    surveys: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })),
    isLoading: PropTypes.bool,
    formOpened: PropTypes.bool,
    openSurveyForm: PropTypes.func.isRequired,
    deleteSurvey: PropTypes.func.isRequired,
  };

  static defaultProps = {
    surveys: [],
    isLoading: false,
    formOpened: false,
  };

  state = {
    deleteDialogOpened: false,
    currentSurveyId: null,
  };

  componentDidMount() {
    const { loadSurveys } = this.props;
    loadSurveys();
  }

  loadSurveysByButton = () => {
    const { loadSurveys } = this.props;
    loadSurveys();
  };

  handleEditSurvey = (surveyId) => {
    const { openSurveyForm } = this.props;
    openSurveyForm(surveyId);
  };

  handleShowDeletionDialog = (surveyId) => {
    this.setState({ deleteDialogOpened: true, currentSurveyId: surveyId });
  };

  toggleDeleteDialogOpeningFlag = (flag) => {
    this.setState({ deleteDialogOpened: flag });
  };

  render() {
    const {
      isLoading, surveys, openSurveyForm, formOpened, deleteSurvey, loadSurveys,
    } = this.props;
    const { deleteDialogOpened, currentSurveyId } = this.state;
    let surveysListOrSpinner;
    if (isLoading) {
      surveysListOrSpinner = <CircularProgress />;
    } else {
      surveysListOrSpinner = (surveys.map((survey, index) => (
        <ListItem key={survey.id}>
          <Box
            width="100%"
          >
            <Card>
              <CardContent>
                <Link
                  to={`/surveys/${survey.id}/`}
                  style={{ textDecoration: 'none' }}
                  color="primary"
                >
                  <Typography color="textPrimary" gutterBottom>
                    {survey.name}
                  </Typography>
                  <Typography
                    // style={{ display: 'inline-block' }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Автор:
                     {survey.author}
                    {/*Автор: Кузнецов Сергей*/}
                  </Typography>
                  {/*<Typography*/}
                  {/*  // style={{ display: 'inline-block', marginLeft: '30px' }}*/}
                  {/*  color="textSecondary"*/}
                  {/*  gutterBottom*/}
                  {/*>*/}
                  {/*   {survey.author} */}
                  {/*  {index === 1*/}
                  {/*    ? '323 группа'*/}
                  {/*    : 'Аудитория: 1 поток, 2 поток, 3 поток'}*/}

                  {/*</Typography>*/}
                </Link>
              </CardContent>
              <CardActions>
                {/* <IconButton title="Edit questions" aria-label="edit questions"> */}
                {/*  <HelpOutlineIcon /> */}
                {/* </IconButton> */}
                {index !== 1 && (
                <IconButton
                  title="Edit survey"
                  aria-label="edit survey"
                  onClick={() => this.handleEditSurvey(survey.id)}
                >
                  <EditIcon />
                </IconButton>
                )}
                <IconButton
                  title="Delete survey"
                  aria-label="delete"
                  onClick={() => this.handleShowDeletionDialog(survey.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Button style={{ fontSize: '12px' }} size="small"> <Link
                  to={`/surveys/${survey.id}/`}
                  style={{ textDecoration: 'none' }}
                  color="primary"
                >Редактировать вопросы</Link></Button>
                <Button style={{ fontSize: '12px' }} size="small"> <Link
                  to={`/surveys/${survey.id}/report`}
                  style={{ textDecoration: 'none' }}
                  color="primary"
                >Отчёт о прохождении</Link></Button>
                {/* <Button color="primary" variant="contained">Редактировать вопросы</Button> */}
                {/* <Button color="primary" variant="contained">Редактировать опрос</Button> */}
                {/* <Button color="primary" variant="contained">Удалить опрос</Button> */}
                {/*{index !== 1*/}
                {/*  ? (*/}
                {/*    <Button*/}
                {/*      style={{ fontSize: '12px' }}*/}
                {/*      size="small"*/}
                {/*      color="primary"*/}
                {/*      variant="contained"*/}
                {/*    >*/}
                {/*      Опубликовать*/}
                {/*    </Button>*/}
                {/*  )*/}

                {/*  : (*/}
                {/*    <Button*/}
                {/*      style={{ fontSize: '12px' }}*/}
                {/*      size="small"*/}
                {/*      color="primary"*/}
                {/*      variant="outlined"*/}
                {/*      disabled*/}
                {/*    >*/}
                {/*      Опубликован*/}
                {/*    </Button>*/}
                {/*  )}*/}
                {/*{index === 1 && (*/}
                {/*  <div*/}
                {/*    style={{ display: 'flex', justifyContent: 'space-around', minWidth: '300px' }}*/}
                {/*  >*/}
                {/*    <Typography*/}
                {/*      variant="subtitle2"*/}
                {/*      style={{ fontSize: '12px', maxWidth: '150px' }}*/}
                {/*    >*/}
                {/*      Опубликованные опросы нельзя редактировать*/}
                {/*    </Typography>*/}
                {/*    <Button*/}
                {/*      style={{ fontSize: '12px', maxHeight: '30px', marginLeft: '30px' }}*/}
                {/*      size="small"*/}
                {/*      color="primary"*/}
                {/*      variant="contained"*/}
                {/*    >*/}
                {/*      Закрыть опрос*/}
                {/*    </Button>*/}
                {/*  </div>*/}
                {/*)}*/}
              </CardActions>
            </Card>
          </Box>
        </ListItem>
      )));
    }

    return (
      <div>
        <Header
          pageTitle="Создание и редактирование опросов"
        />
        <SurveyForm
          open={formOpened}
        />
        <ConfirmDialog
          onConfirm={() => deleteSurvey(currentSurveyId).then(() => loadSurveys())}
          open={deleteDialogOpened}
          setOpen={this.toggleDeleteDialogOpeningFlag}
          title="Delete survey?"
        />
        {/* <Button onClick={this.loadSurveysByButton}>Reload surveys</Button> */}
        <Container
          maxWidth="sm"
        >
          <List>
            {surveysListOrSpinner}
          </List>
          <Fab
            color="primary"
            aria-label="add"
            onClick={openSurveyForm}
            style={{
              position: 'fixed',
              bottom: '1em',
              right: '1em',
            }}
          >
            <AddIcon />
          </Fab>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  surveys: state.surveys.surveys,
  isLoading: state.surveys.isLoading,
  formOpened: state.flags.formOpened,
  // очень хороший вопрос: возможно, стоит держать все подобные флаги во flags?? хз
  // с одной стороны, нам не нужно засорять кучу редюсеров флагами загрузки и открытия форм,
  // с другой стороны возможны конфликты...
});

const mapDispatchToProps = (dispatch) => ({
  loadSurveys: () => dispatch(loadSurveysAction()),
  openSurveyForm: (surveyId) => dispatch(openSurveyFormAction(surveyId)),
  deleteSurvey: (surveyId) => dispatch(deleteSurveyAction(surveyId)),

});

export const Surveys = connect(mapStateToProps, mapDispatchToProps)(SurveysComponent);
