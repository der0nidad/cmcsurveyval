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
import { Header } from '../Header';
import { loadSurveysAction } from '../../store/actions/surveys.actions';


class SurveysComponent extends React.Component {
  static propTypes = {
    loadSurveys: PropTypes.func.isRequired,
    surveys: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    surveys: [],
    isLoading: false,
  };

  componentDidMount() {
    const { loadSurveys } = this.props;
    loadSurveys();
    console.log('success');
  }

  loadSurveysByButton = () => {
    const { loadSurveys } = this.props;
    loadSurveys();
  }


  render() {
    const { isLoading, surveys } = this.props;
    let surveysListOrSpinner;
    if (isLoading) {
      surveysListOrSpinner = <CircularProgress />;
    } else {
      surveysListOrSpinner = (surveys.map((survey, index) => (
        <ListItem key={survey.id}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {survey.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {survey.author}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
              <IconButton title="Edit questions" aria-label="edit questions">
                <HelpOutlineIcon />
              </IconButton>
              <IconButton title="Edit survey" aria-label="edit survey">
                <EditIcon />
              </IconButton>
              <IconButton title="Delete survey" aria-label="delete">
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
        <Button onClick={this.loadSurveysByButton}>Reload surveys</Button>
        <List>
          {surveysListOrSpinner}
        </List>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  surveys: state.surveys.surveys,
  isLoading: state.surveys.isLoading,
  // очень хороший вопрос: возможно, стоит держать все подобные флаги во flags?? хз
});

const mapDispatchToProps = (dispatch) => ({
  loadSurveys: () => dispatch(loadSurveysAction()),
});

export const Surveys = connect(mapStateToProps, mapDispatchToProps)(SurveysComponent);
