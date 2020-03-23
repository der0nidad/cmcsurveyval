import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class SurveysComponent extends React.Component {
  static propTypes = {
  };

  static defaultProps = {

  };

  render() {
    return (
      <div>
        <Header
          pageTitle="Surveys"
        />
        Survyes
      </div>
    );
  }
}
export const Surveys = connect(mapStateToProps, mapDispatchToProps)(SurveysComponent);
