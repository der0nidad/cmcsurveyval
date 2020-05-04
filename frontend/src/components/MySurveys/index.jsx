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
import { CardActions } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { deleteSurveyAction, loadSurveysAction } from '../../store/actions/surveys.actions';
import { openSurveyFormAction } from '../../store/actions/flags.actions';
import ConfirmDialog from '../common/ConfirmDialog';

const surveyData = {
  questionsList: [],
  name: 'Первый опрос',
}
class MySurveysComponent extends React.Component {
  static propTypes = {
    loadSurveyData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    survey: null,
    isLoading: false,
  };

  state = {
    currentSurveyId: null,
  };

  componentDidMount() {
    const { loadSurveyData } = this.props;
    loadSurveyData();
  }

  loadSurveysByButton = () => {
    const { loadSurveyData } = this.props;
    loadSurveyData();
  };
  // назначенные на меня опро
  render() {
    const {
      isLoading, loadSurveyData,
    } = this.props;
    const { deleteDialogOpened, currentSurveyId } = this.state;
    let surveysListOrSpinner;
    const questions = surveyData.questionsList.map((question) => {
      console.log(5)
      return <div></div>
    })
    if (isLoading) {
      surveysListOrSpinner = <CircularProgress />;
    } else {
      surveysListOrSpinner = (surveys.map((survey, index) => (
        <ListItem key={survey.id}>
          <Card>
            <CardContent>
              <Link to={`/surveys/${survey.id}/`}>
                <Typography color="textSecondary" gutterBottom>
                  {survey.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {survey.author}
                </Typography>
              </Link>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
              <IconButton title="Edit questions" aria-label="edit questions">
                <HelpOutlineIcon />
              </IconButton>
              <IconButton
                title="Edit survey"
                aria-label="edit survey"
                onClick={() => this.handleEditSurvey(survey.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                title="Delete survey"
                aria-label="delete"
                onClick={() => this.handleShowDeletionDialog(survey.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </ListItem>
      )));
    }

    return (
      <div>
        <Header
          pageTitle="Surveys"
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
        <Button onClick={this.loadSurveysByButton}>Reload surveys</Button>
        <List>
          {surveysListOrSpinner}
        </List>
        <Fab
          color="primary"
          aria-label="add"
          onClick={openSurveyForm}
        >
          <AddIcon />
        </Fab>
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

export const MySurveys = connect(mapStateToProps, mapDispatchToProps)(MySurveysComponent);
