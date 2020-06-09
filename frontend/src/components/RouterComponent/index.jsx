import React from 'react';
import PropTypes from 'prop-types';

import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { closeLeftMenu, openLeftMenu } from '../../store/actions/flags.actions';
import { whoAmIAction } from '../../store/actions/routerComponent.actions';
import SignUp from '../SignUp';
import Auth from '../Auth';
import { UserProfile } from '../UserProfile';
import { Surveys } from '../Surveys';
import { QuestionEdit } from '../QuestionsEdit';
import { SurveyPassing } from '../SurveyPassing';
import { MySurveys } from '../MySurveys';
import { SurveyReport } from '../SurveyReport';
import { UsersSearch } from '../UsersSearch';
import historyRouter from '../../common/helpers/historyRouter';
import {
  divider, loginRoute, mySurveysRoute, urlPages, userProfileRoute,
} from './routerComponent.constants';
import { Home } from './Home';


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
    redirect: PropTypes.string,
  };

  static defaultProps = {
    user: null,
    menuOpened: false,
    redirect: null,
  };

  componentDidMount() {
    const { checkUserIsAuthenticated } = this.props;
    checkUserIsAuthenticated(window.location.pathname)
      .then((response) => {
      })
      .catch((response) => {
        historyRouter.push(`${loginRoute}?next=${1}`);
      });
  }

  handleOpenMenu = () => {
    const { openMenu } = this.props;
    openMenu();
  };

  render() {
    const { menuOpened, closeMenu, redirect } = this.props;
    if (redirect) {
      historyRouter.push(`${loginRoute}?next=${redirect}`);
    }
    const list = () => (
      <div
        role="presentation"
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <List>
          {urlPages.map((page, index) => (
            page.title === divider
              ? <Divider />
              : (
                <ListItem button key={page.title}>
                  <div
                    style={{ minWidth: '200px' }}
                  >
                    <Link href={page.url}>
                      {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                      <ListItemText primary={page.title} />
                    </Link>
                  </div>
                </ListItem>
              )
          ))}
        </List>
      </div>
    );
    return (
      <Router history={historyRouter}>
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
            <Route path="/surveys/:id/report">
              <SurveyReport />
            </Route>
            <Route path="/surveys/:id">
              <QuestionEdit />
            </Route>
            <Route path="/surveys">
              <Surveys />
            </Route>
            <Route path={userProfileRoute}>
              <UserProfile />
            </Route>
            <Route path="/user-search">
              <UsersSearch />
            </Route>
            <Route path={`${mySurveysRoute}/:id`}>
              <SurveyPassing />
            </Route>
            {/* <Route path="/mysurveys"> */}
            {/*  <CurrentSurvey /> */}
            {/* </Route> */}
            <Route path={mySurveysRoute}>
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
  redirect: state.auth.redirect,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserIsAuthenticated: (next) => dispatch(whoAmIAction(next)),
  openMenu: () => dispatch(openLeftMenu()),
  closeMenu: () => dispatch(closeLeftMenu()),
});

export const RouterComponent = connect(mapStateToProps, mapDispatchToProps)(RouterComp);
