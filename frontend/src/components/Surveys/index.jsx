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
import { openSurveyForm } from '../../store/actions/flags.actions';
import { SurveyForm } from './SurveyForm';
import ConfirmDialog from '../common/ConfirmDialog';


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
    openForm: PropTypes.func.isRequired,
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
    const { openForm } = this.props;
    openForm(surveyId);
  };

  handleShowDeletionDialog = (surveyId) => {
    this.setState({ deleteDialogOpened: true, currentSurveyId: surveyId });
  };

  toggleDeleteDialogOpeningFlag = (flag) => {
    this.setState({ deleteDialogOpened: flag });
  };

  render() {
    const {
      isLoading, surveys, openForm, formOpened, deleteSurvey,
    } = this.props;
    const { deleteDialogOpened, currentSurveyId } = this.state;
    let surveysListOrSpinner;
    if (isLoading) {
      surveysListOrSpinner = <CircularProgress />;
    } else {
      surveysListOrSpinner = (surveys.map((survey, index) => (
        <ListItem key={survey.id}>
          <Card>
            <CardContent>
              <Link to={`${survey.id}/edit_questions/`}>
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
          onConfirm={() => deleteSurvey(currentSurveyId)}
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
          onClick={openForm}
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
  openForm: (surveyId) => dispatch(openSurveyForm(surveyId)),
  deleteSurvey: (surveyId) => dispatch(deleteSurveyAction(surveyId)),

});

export const Surveys = connect(mapStateToProps, mapDispatchToProps)(SurveysComponent);
