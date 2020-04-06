import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userShape } from '../Auth/auth.schema';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
});
class UserProfileComponent extends React.Component {
  static propTypes = {
    user: PropTypes.shape(userShape),
  };

  static defaultProps = {

  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header
          pageTitle="Profile"
        />
        {user && user.username}
      </div>
    );
  }
}
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
