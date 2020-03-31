import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeQuestionForm, openQuestionForm } from '../../store/actions/flags.actions';
import { Header } from '../Header';
import { loadCurrentSurveyAction } from '../../store/actions/questionEdit.actions';

class QuestionEditComponent extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    loadCurrentSurvey: PropTypes.func.isRequired,
    closeQuestionForm: PropTypes.func.isRequired,
    openQuestionForm: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  componentDidMount() {
    const { loadCurrentSurvey, match } = this.props;
    loadCurrentSurvey(match.params.id);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Header
          pageTitle="Edit questions in survey"
        />
        213
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editingSurvey: state.surveys.editingSurvey,
  user: state.auth.user,
  survey: state.surveys.surveys.filter((survey) => survey.id === this.props.match.params.id),
  questionFormOpened: state.flags.formOpened,
});

const mapDispatchToProps = (dispatch) => ({
  closeQuestionForm: () => dispatch(closeQuestionForm()),
  openQuestionForm: (surveyId) => dispatch(openQuestionForm(surveyId)),
  loadCurrentSurvey: (surveyId) => dispatch(loadCurrentSurveyAction(surveyId)),
});

export const QuestionEdit = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionEditComponent),
);
