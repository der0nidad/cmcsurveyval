import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

function createData(name, studyGroup, passing) {
  return { name, studyGroup, passing };
}
const yes = 'Да';
const no = 'Нет';
const rows = [
  createData('Иванов Иван Иванович', 102, yes),
  createData('Петров Виктор Сергеевич', 102, yes),
  createData('Кораблев Вячеслав Павлович', 102, yes),
  createData('Степаненко Анастасия Геннадьевна', 106, yes),
  createData('Иванова Мария Сергеевна', 106, yes),
  createData('Поляков Сергей Петрович', 106, no),
];


class StatusTable extends React.Component {
  render() {
    // throw 'Hahahah, my first error';
    // console.log('azazazazazazazazaz')
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ФИО студента</TableCell>
              <TableCell align="right">Академическая группа</TableCell>
              <TableCell align="right">Опрос пройден</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.studyGroup}</TableCell>
                <TableCell align="right">{row.passing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default StatusTable;
