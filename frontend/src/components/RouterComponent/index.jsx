import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Link from '@material-ui/core/Link';
import { closeLeftMenu, openLeftMenu } from '../../store/actions/flags.actions';
import { whoAmIAction } from '../../store/actions/routerComponent.actions';
import SignUp from '../SignUp';
import Auth from '../Auth';
import { UserProfile } from '../UserProfile';
import { Surveys } from '../Surveys';
import { Header } from '../Header';
import { QuestionEdit } from '../QuestionsEdit';
import { SurveyPassing } from '../SurveyPassing';
import { MySurveys } from '../MySurveys';

function Home() {
  return (
    <div>
      <Header
        pageTitle="Main Page"
      />
      <h2>Home2</h2>
    </div>
  );
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
    const pages = [
      {
        // TODO вынеси урлы отсюда и из роутера в одно место
        title: 'Profile',
        url: '/profile',
      },
      {
        title: 'Surveys',
        url: '/surveys',
      },
    ];
    const list = () => (
      <div
        role="presentation"
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <List>
          {pages.map((page, index) => (
            <ListItem button key={page.title}>
              <div
                style={{ minWidth: '200px' }}
              >
                <Link href={page.url}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={page.title} />
                </Link>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <Router>
        <Drawer
          open={menuOpened}
          onClose={closeMenu}
        >
          {list()}
        </Drawer>
        <div>
          <Switch>
            <Route path="/login/">
              <Auth />
            </Route>
            <Route path="/signup/">
              <SignUp />
            </Route>
            <Route path="/surveys/:id">
              <QuestionEdit />
            </Route>
            <Route path="/surveys">
              <Surveys />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/mysurveys/:id">
              <SurveyPassing />
            </Route>
            <Route path="/mysurveys">
              <MySurveys />
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
});

export const RouterComponent = connect(mapStateToProps, mapDispatchToProps)(RouterComp);
