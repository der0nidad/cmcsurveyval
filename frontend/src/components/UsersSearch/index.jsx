import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Header } from '../Header';

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class UsersSearchComponent extends React.Component {
  static propTypes = {
  };

  static defaultProps = {

  };

  render() {
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
              Данные пользователя
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
export const UsersSearch = connect(mapStateToProps, mapDispatchToProps)(UsersSearchComponent);
