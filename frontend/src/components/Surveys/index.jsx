import React from 'react';
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
import { Header } from '../Header';

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class SurveysComponent extends React.Component {
  static propTypes = {
  };

  static defaultProps = {

  };

  render() {
    // const { items } = this.props;
    const items = [{ name: 'My first suervey', author: 'Ivanov Ivan', id: 2 }, { name: 'My second suervey', author: 'Ivanov Ivan', id: 3 }];
    const list = (items.map((survey, index) => (
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

    return (
      <div>
        <Header
          pageTitle="Surveys"
        />
        <List>
          {list}
        </List>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
export const Surveys = connect(mapStateToProps, mapDispatchToProps)(SurveysComponent);
