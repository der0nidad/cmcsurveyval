import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import { Header } from '../Header';
import { userShape } from '../Auth/auth.schema';

const STUDENT = 1;
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class UserProfileComponent extends React.Component {
  static propTypes = {
    user: PropTypes.shape(userShape),
  };

  static defaultProps = {
    user: null,
  };


  render() {
    const { user } = this.props;
    if (!user) return <CircularProgress />;
    console.log(user);
    return (
      <div>
        <Header
          pageTitle={`Профиль пользователя ${user?.username}`}
        />
        <Container
          style={{ padding: '20px' }}
          maxWidth="sm"
        >
          <Paper
            style={{ padding: '20px' }}
          >
            <Typography
              variant="h6"
            >
              Данные пользователя
            </Typography>
            <Typography>
              ФИО:
              {' '}
              {user.fullName}

              <br />
              Email:
              {' '}
              {user.email}
              <br />
              Роль:
              {' '}
              {user.role}
              { user.role === STUDENT
              && (
              <div>
                Академическая группа:
                {' '}
                {user.studyGroup}
              </div>
              )}
            </Typography>
          </Paper>
        </Container>

      </div>
    );
  }
}
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
