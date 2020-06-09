import React from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  student1, student2, student3, student4, student5, student6, student7,
} from '../UsersSearch';
import { respondentsStatusDataSchema } from '../Surveys/surveys.schema';

// function createData(name, studyGroup, passing) {
//   return { name, studyGroup, passing };
// }
// function createDataFromObj(student, passing) {
//   return { name: student.name, studyGroup: student.studyGroup, passing };
// }
// const yes = 'Да';
// const no = 'Нет';
// const rows2 = [
//   createData('Иванов Иван Иванович', 102, yes),
//   createData('Сидоров Валентин Павлович', 102, yes),
//   createData('Кораблев Вячеслав Павлович', 102, yes),
//   createData('Степаненко Анастасия Геннадьевна', 106, yes),
//   createData('Иванова Мария Сергеевна', 106, yes),
//   createData('Поляков Сергей Петрович', 106, no),
// ];

// const rows = [
//   createDataFromObj(student1, yes),
//   createDataFromObj(student3, yes),
//   createDataFromObj(student2, yes),
//   createDataFromObj(student7, yes),
//   createDataFromObj(student4, yes),
// ];

class StatusTable extends React.Component {
  static propTypes = {
    respondentsData: PropTypes.arrayOf(respondentsStatusDataSchema),
  };

  static defaultProps = {
    respondentsData: null,
  };

  render() {
    const { respondentsData } = this.props;
    const passed = respondentsData.filter((user) => user.status)
    if (!respondentsData) return null;
    return (
      <TableContainer component={Paper}>
        <div
          className="status-table__header"
        >
          {/* <Typography>Размер аудитории опроса, человек: 7</Typography> */}
          {/* <Typography>Опрос прошли, человек: 5</Typography> */}
          <Typography>{`Опрос прошли ${passed.length} из ${respondentsData.length} респондентов`}</Typography>
        </div>
        <Table
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ФИО студента</TableCell>
              <TableCell align="right">Академическая группа</TableCell>
              <TableCell align="right">Опрос пройден</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {respondentsData.map((row) => (
              <TableRow key={row.fullName}>
                <TableCell component="th" scope="row" className="status-table__name-row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.studyGroup}</TableCell>
                <TableCell align="right">{row.status ? 'Да' : 'Нет'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default StatusTable;
