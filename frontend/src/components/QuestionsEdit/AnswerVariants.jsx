import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { answerVariantShape } from '../Surveys/surveys.schema';

class AnswerVariantsComponent extends React.Component {
  static propTypes = {
    answersList: PropTypes.arrayOf(answerVariantShape),
  };

  static defaultProps = {
    answersList: [],
  };

  render() {
    const { answersList } = this.props;
    const answers = answersList.map((answer) => <li>{answer.text}</li>);
    return (
      <ul>
        {answers}
      </ul>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export const AnswerVariants = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AnswerVariantsComponent),
);
