import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Header } from '../Header';
import Paper from "@material-ui/core/Paper";
import { userShape } from '../Auth/auth.schema';

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

  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header
          pageTitle="Профиль пользователя ivanov"
        />
        <Container maxWidth="sm">
          <Paper
            style={{ padding: '20px' }}
          >
            <Typography
              variant="h6"
            >
              Данные пользователя.
            </Typography>
            <Typography>
              ФИО: Иванов Иван Иванович
              <br />
              Академическая группа: 214 гр. 2019/2020 учебного года
              <br />
              Роль: Студент
            </Typography>
          </Paper>
        </Container>

      </div>
    );
  }
}
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
