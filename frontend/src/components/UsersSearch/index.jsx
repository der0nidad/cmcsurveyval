import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Header } from '../Header';
import './user_search.css';

const student1 = {
  name: 'Иванов Иван Иванович',
  studyGroup: 303,
  role: 'Студент',
};
const student2 = {
  name: 'Петров Виктор Сергеевич',
  studyGroup: 424,
  role: 'Студент',
};
const student3 = {
  name: 'Клементьева София Геннадьевна',
  studyGroup: 206,
  role: 'Студент',
};
const student4 = {
  name: 'Ещё Один ТестовыйСтудент',
  studyGroup: 113,
  role: 'Студент',
};
const teacher = {
  name: 'Кузнецов Сергей Дмитриевич',
  studyGroup: '',
  role: 'Преподаватель',
};
const admin = {
  name: 'Администратор Системы',
  studyGroup: '',
  role: 'Администратор',
};

const studentData = [
  student1, student2, student3, student4, teacher, admin
];


function createData(studentDataDict) {
  return { ...studentDataDict };
}
const rows = studentData.map((studentDataDict) => createData(studentDataDict));

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

  // state = {
  //   name: 'Иван',
  //   lastName: 'Иванов',
  //   parentName: 'Иванович',
  //   studyGroup: '214',
  //   role: 1,
  // };
  state = {
    name: '',
    lastName: '',
    parentName: '',
    studyGroup: '',
    role: 1,
  };

  render() {
    const {
      name, lastName, parentName, studyGroup, role,
    } = this.state;
    return (
      <div>
        <Header
          pageTitle="Управление пользователями"
        />
        <Container maxWidth="md">
          <Paper
            style={{ padding: '20px', minHeight: '50vh' }}
          >
            <div
              className="filter-fields"
            >
              <Typography
                variant="h6"
              >
                Фильтры
              </Typography>
              <div
                className="admin-actions-buttons"
              >
                <div className="admin-button">
                  <Button variant="outlined">Экспорт</Button>
                </div>
                <div className="admin-button">
                  <Button variant="outlined">Импорт</Button>
                </div>
              </div>
            </div>
            <div
              className="filter-fields"
            >
              <TextField
                value={lastName}
                label="Фамиилия"
                placeholder="Введите фамилию"
              />
              <TextField
                value={name}
                label="Имя"
                placeholder="Введите имя"
              />
              <TextField
                value={parentName}
                label="Отчество"
                placeholder="Введите отчество"
              />
            </div>
            <div
              className="filter-fields"
            >
              <TextField
                style={{ minWidth: '250px' }}
                value={studyGroup}
                label="Академическая группа"
                placeholder="Введите номер группы"
              />
              <Select
                label="Роль"
                placeholder="Выберите роль"
                id="demo-simple-select"
                value={1}
                // onChange={handleChange}
              >
                <MenuItem value={1}>Студент</MenuItem>
                <MenuItem value={2}>Преподаватель</MenuItem>
                <MenuItem value={3}>Администратор</MenuItem>
              </Select>
              <Button className="search-button" variant="contained" color="primary" size="small">Поиск</Button>
            </div>
            <Typography
              style={{ padding: '15px' }}
            >
              Найдено пользователей:
              {' '}
              {rows.length}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>ФИО студента</TableCell>
                    <TableCell align="right">Академическая группа(для студентов)</TableCell>
                    <TableCell align="right">Роль</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.studyGroup}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          title="Edit survey"
                          aria-label="edit survey"
                          style={{ padding: '0' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

      </div>
    );
  }
}
export const UsersSearch = connect(mapStateToProps, mapDispatchToProps)(UsersSearchComponent);
