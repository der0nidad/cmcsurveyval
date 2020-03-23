import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../Auth';
import SignUp from '../SignUp';
import { LeadList } from '../LeadList';
import { whoAmIAction } from '../../store/actions/routerComponent.actions';

function Home() {
  return <h2>Home2</h2>;
}
class RouterComp extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    checkUserIsAuthenticated: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  componentDidMount() {
    const { checkUserIsAuthenticated } = this.props;
    checkUserIsAuthenticated();
  }


  render() {
    return (
      <Router>
        <div>
          {/*  <nav> */}
          {/*    <ul> */}
          {/*      <li> */}
          {/*        <Link to="/">Home</Link> */}
          {/*      </li> */}
          {/*      <li> */}
          {/*        <Link to="/login">Login</Link> */}
          {/*      </li> */}
          {/*      <li> */}
          {/*        <Link to="/signup">SignUp</Link> */}
          {/*      </li> */}
          {/*      <li> */}
          {/*        <Link to="/lead">Protected Leads2</Link> */}
          {/*        {' '} */}
          {/*        по идее мы не должны напрямую обращаться к джанго-вьюхам */}
          {/*      </li> */}
          {/*      <li> */}
          {/*        <Link to="/someurl">SomeUrl</Link> */}
          {/*      </li> */}
          {/*    </ul> */}
          {/*  </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login/">
              <Auth />
            </Route>
            <Route path="/signup/">
              <SignUp />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/lead">
              <SignUp />
            </Route>
            <Route path="/someurl">
              <LeadList />
            </Route>
          </Switch>
        </div>

      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserIsAuthenticated: () => dispatch(whoAmIAction()),
  handleDecrementClick: () => dispatch({ type: 'DECREMENT' }),
});

export const RouterComponent = connect(mapStateToProps, mapDispatchToProps)(RouterComp);
