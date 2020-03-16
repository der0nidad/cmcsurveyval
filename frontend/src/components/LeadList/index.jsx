import React from 'react';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapStateToProps = (state) => ({
  count: state.initialReducer,
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
  handleDecrementClick: () => dispatch({ type: 'DECREMENT' }),
});
export const DefaultComponent = ({ count, handleIncrementClick, handleDecrementClick }) => (
  <div>
    <h1>
      Helloworld React & Redux!
      {count}
    </h1>
    <button onClick={handleDecrementClick} type="button">Decrement</button>
    <button onClick={handleIncrementClick} type="button">Increment</button>
  </div>
);

DefaultComponent.propTypes = {
  count: PropTypes.number.isRequired,
  handleIncrementClick: PropTypes.func.isRequired,
  handleDecrementClick: PropTypes.func.isRequired,
};

const DefaultContainer = connect(mapStateToProps, mapDispatchToProps)(DefaultComponent);


// eslint-disable-next-line import/prefer-default-export
export class LeadList extends React.Component {
  // const classes = useStyles();

  componentDidMount() {
    console.log(123);
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <DefaultContainer />
      </Container>
    );
  }
}

// const Auth = () => {
//     return (
//     <Button variant="contained" color="primary">
//       Hello World
//     </Button>
//   );
// };
