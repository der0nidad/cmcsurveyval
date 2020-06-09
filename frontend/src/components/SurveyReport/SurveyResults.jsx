import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SELECT_QUESTION, TEXT_QUESTION } from '../QuestionsEdit/questionEdit.constants';
import './reportStyles.css';

const fiveVariantsReport = [
  {
    name: 'Нет',
    id: 1,
    part: '20%',
  },
  {
    name: 'Скорее нет',
    id: 2,
    part: '0%',
  },
  {
    name: 'Трудно сказать, да или нет',
    id: 3,
    part: '20%',
  },
  {
    name: 'Скорее да',
    id: 4,
    part: '40%',
  },
  {
    name: 'Да',
    id: 5,
    part: '20%',
  },
];

// const textQuestionAnswers = {
//   1: 'Очень хороший курс, мне понравилось',
//   2: 'Семинарам можно было бы уделить больше времени',
//   3: 'Примеры разбирали недостаточно',
// };
const textQuestionAnswersList = ['Очень хороший курс, мне понравилось',
  'Семинарам можно было бы уделить больше времени',
  'Примеры разбирали недостаточно'];
const secondQuestionData = {
  type: SELECT_QUESTION,
  name: 'Вы удовлетворены преподаванием данного курса?',
  answersDistribution: fiveVariantsReport,

};
const firstQuestionData = {
  type: TEXT_QUESTION,
  name: 'Место, где можно более подробно рассказать о впечатлениях от курса',
  answerData: textQuestionAnswersList,
};
const questionsData = [secondQuestionData, firstQuestionData];
class SurveyResults extends React.Component {

  static propTypes = {
    answersData: PropTypes.object
  }
  render() {
    const data = questionsData.map((question) => {
      let answerData;
      if (question.type === TEXT_QUESTION) {
        answerData = (textQuestionAnswersList.map((variant) => <li>{variant}</li>)

        );
      } else if (question.type === SELECT_QUESTION) {
        answerData = (fiveVariantsReport.map((answer) => (
          <li key={answer.id}>
            {answer.name}
            {' '}
            -
            {' '}
            {answer.part}
          </li>
        )));
      }
      return (
        <Card className="question-report-card">
          <CardContent>
            <Typography color="textSecondary" variant="subtitle2">
              Ответы респондентов на вопрос:
            </Typography>
            <Typography>
              {question.name}
            </Typography>
            {
              question.type === TEXT_QUESTION
              && <Typography variant="subtitle2" color="textSecondary">Вопрос пропустили 2 респондента из 5</Typography>
            }
            {answerData}
          </CardContent>
        </Card>
      );
    });
    return (
      <Container
        maxWidth="sm"
      >
        <Typography>Всего респондентов: 5</Typography>
        {data}
      </Container>
    );
  }
}

export default SurveyResults;
