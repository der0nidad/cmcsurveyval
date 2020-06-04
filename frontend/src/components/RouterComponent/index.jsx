import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, Switch } from 'react-router-dom';
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
import { Header } from '../Header';
import { QuestionEdit } from '../QuestionsEdit';
import { SurveyPassing } from '../SurveyPassing';
import { MySurveys } from '../MySurveys';
import { SurveyReport } from '../SurveyReport';
import { UsersSearch } from '../UsersSearch';
import historyRouter from '../../common/helpers/historyRouter';
import {mySurveysRoute} from './routerComponent.constants';

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
const divider = 'divider';

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
        title: 'Мой профиль',
        url: '/profile',
      },
      {
        title: 'Назначенные мне опросы',
        url: '/mysurveys',
      },
      {
        title: divider,
      },
      {
        title: 'Управление опросами',
        url: '/surveys',
      },
      {
        title: divider,
      },
      {
        title: 'Управление пользователями',
        url: '/user-search',
      },
      // {
      //   title: 'Управление опросами',
      //   url: '/surveys',
      // },
    ];
    const list = () => (
      <div
        role="presentation"
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <List>
          {pages.map((page, index) => (
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
            <Route path="/profile">
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
});
const mapDispatchToProps = (dispatch) => ({
  checkUserIsAuthenticated: () => dispatch(whoAmIAction()),
  openMenu: () => dispatch(openLeftMenu()),
  closeMenu: () => dispatch(closeLeftMenu()),
});

export const RouterComponent = connect(mapStateToProps, mapDispatchToProps)(RouterComp);
