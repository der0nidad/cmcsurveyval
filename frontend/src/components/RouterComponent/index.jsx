import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';

import { closeLeftMenu, openLeftMenu } from '../../store/actions/flags.actions';
import { whoAmIAction } from '../../store/actions/routerComponent.actions';
import { LeadList } from '../LeadList';
import SignUp from '../SignUp';
import Auth from '../Auth';

function Home() {
  return <h2>Home2</h2>;
}

class RouterComp extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    menuOpened: PropTypes.bool,
    checkUserIsAuthenticated: PropTypes.func.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    menuOpened: false,
  };

  componentDidMount() {
    const { checkUserIsAuthenticated } = this.props;
    checkUserIsAuthenticated();
  }

  handleOpenMenu = () => {
    const { openMenu } = this.props;
    openMenu();
  };

  render() {
    const { menuOpened, closeMenu } = this.props;
    const list = (anchor) => (
      <div
        // className={clsx(classes.list, {
        //   [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        // })}
        role="presentation"
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <Router>
        <Button
          onClick={this.handleOpenMenu}
        >
          Open Menu
        </Button>
        <Drawer
          open={menuOpened}
          onClose={closeMenu}
        >
          {list('left')}
        </Drawer>
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
            <Route path="/lead">
              <SignUp />
            </Route>
            <Route path="/someurl">
              <LeadList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  menuOpened: state.flags.menuOpened,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserIsAuthenticated: () => dispatch(whoAmIAction()),
  openMenu: () => dispatch(openLeftMenu()),
  closeMenu: () => dispatch(closeLeftMenu()),
  handleDecrementClick: () => dispatch({ type: 'DECREMENT' }),
});

export const RouterComponent = connect(mapStateToProps, mapDispatchToProps)(RouterComp);
