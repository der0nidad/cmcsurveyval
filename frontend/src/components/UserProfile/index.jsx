import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class UserProfileComponent extends React.Component {
  static propTypes = {
  };

  static defaultProps = {

  };

  render() {
    return (
      <div>
        <Header
          pageTitle="Profile"
        />
        Userprofile
      </div>
    );
  }
}
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
