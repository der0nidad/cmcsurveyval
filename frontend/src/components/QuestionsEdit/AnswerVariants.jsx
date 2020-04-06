import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AnswerVariantsComponent extends React.Component {
  render() {
    return (
      <div>
        AnswerVariants
      </div>
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
