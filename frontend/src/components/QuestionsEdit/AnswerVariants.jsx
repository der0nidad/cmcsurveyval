import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { answerVariantShape, surveyShape } from '../Surveys/surveys.schema';
import {
  createAnswerVariantAction,
  deleteAnswerVariantAction, loadCurrentSurveyAction,
} from '../../store/actions/questionEdit.actions';
import objToFormData from '../../common/helpers/objToFormData';
import Typography from "@material-ui/core/Typography";

class QuestionAnswerVariantsComponent extends React.Component {
  static propTypes = {
    questionId: PropTypes.number.isRequired,
    answersList: PropTypes.arrayOf(answerVariantShape),
    createAnswerVariant: PropTypes.func.isRequired,
    deleteAnswerVariant: PropTypes.func.isRequired,
    loadCurrentSurvey: PropTypes.func.isRequired,
    survey: PropTypes.shape(surveyShape),
  };

  static defaultProps = {
    answersList: [],
    survey: null,
  };

  state = {
    newAnswerVariantText: '',
  };

  handleChangeNewAVText = (e) => {
    this.setState({ newAnswerVariantText: e.target.value });
  };

  handleNewAnswerVariant = () => {
    const { newAnswerVariantText } = this.state;
    const {
      createAnswerVariant, questionId, answersList, loadCurrentSurvey, survey,
    } = this.props;
    const data = objToFormData(
      { text: newAnswerVariantText, question_id: questionId, order: answersList.length },
    );
    createAnswerVariant(data).then(() => {
      loadCurrentSurvey(survey.id);
      this.setState({ newAnswerVariantText: '' });
    });
  };

  handleDeleteAnswerVariant = (id) => {
    const { deleteAnswerVariant, loadCurrentSurvey, survey } = this.props;
    deleteAnswerVariant(id).then(loadCurrentSurvey(survey.id));
  };

  render() {
    console.log(this.props);
    const { answersList } = this.props;
    const { newAnswerVariantText } = this.state;
    const answers = answersList ? answersList.map((answer, index) => (
      <li key={answer.id} style={{ maxHeight: '24px' }}>
        {/*{' '}*/}
        {/*{index + 1}*/}
        {/*{' '}*/}
        {/*{answer.id}*/}
        {/*{' '}*/}
        {/*-*/}
        {answer.name}
        {/*{' '}*/}
        <IconButton>
          <CloseIcon
            onClick={() => this.handleDeleteAnswerVariant(answer.id)}
          />
        </IconButton>
      </li>
    )) : null;
    return (
      <>
        <ul style={{ marginTop: '0px', }}>
          {answers}
        </ul>
        <Typography>Добавить вариант ответа</Typography>
        <TextField value={newAnswerVariantText} onChange={this.handleChangeNewAVText} />
        <IconButton onClick={this.handleNewAnswerVariant}><AddIcon /></IconButton>

      </>
    );
  }
}
const mapStateToProps = (state) => ({
  answers: state.questionEdit.surveyData,
  survey: state.questionEdit.survey,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAnswerVariant: (id) => dispatch(deleteAnswerVariantAction(id)),
  createAnswerVariant: (data) => dispatch(createAnswerVariantAction(data)),
  loadCurrentSurvey: (surveyId) => dispatch(loadCurrentSurveyAction(surveyId)),

});

export const AnswerVariants = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionAnswerVariantsComponent),
);
