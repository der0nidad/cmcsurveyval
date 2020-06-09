import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { openLeftMenu } from '../../store/actions/flags.actions';
import { userShape } from '../Auth/auth.schema';
import { logOutAction } from '../../store/actions/routerComponent.actions';
import historyRouter from '../../common/helpers/historyRouter';
import {userProfileRoute} from '../RouterComponent/routerComponent.constants';


const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openLeftMenu()),
  logOut: () => dispatch(logOutAction()),
});

const classes = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class HeaderComponent extends React.Component {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
    pageTitle: PropTypes.string,
    user: PropTypes.shape(userShape),
    logOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pageTitle: '',
    user: null,
  };

  state = {
    anchorEl: null,
  };

  handleOpenMenu = () => {
    const { openMenu } = this.props;
    openMenu();
  };

  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseUserPopover = () => {
    this.setState({ anchorEl: null });
  };

  handleGoToUserProfile = () => {
    historyRouter.push(userProfileRoute);
  };

  handleLogout = () => {
    const { logOut } = this.props;
    logOut()
      .then((action) => {
        const loginUrl = action.payload.response.next;
        historyRouter.push(loginUrl);
      });
  };

  render() {
    const { pageTitle, user } = this.props;
    const { anchorEl } = this.state;
    return (
      <>
        <Popover
          id="simple-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleCloseUserPopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            <ListItem button onClick={this.handleGoToUserProfile}>Мой профиль</ListItem>
            <ListItem button onClick={this.handleLogout}>Выйти</ListItem>
          </List>
        </Popover>

        <AppBar position="static">
          <Toolbar>
            <div
              style={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              { user
                ? (
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={this.handleOpenMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                )
                : <div />}

              <Typography variant="h6" color="inherit" className={classes.flex}>
                {pageTitle}
              </Typography>

              { user
                ? (
                  <Typography variant="subtitle1">
                    {/* { user.username } */}
                    {/* Иванов Иван */}
                    {/* Администратор Системы */}
                    Петров Виктор Сергеевич
                    <AccountCircleIcon />
                    <IconButton
                      onClick={this.handlePopoverOpen}
                      className="user-menu__dropdown-menu"
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Typography>
                )
                : (
                  <Link href="/login" style={{ color: 'white' }}>
                    <Button color="white" variant="outlined">
                      Login
                    </Button>
                  </Link>
                )}
            </div>

          </Toolbar>
        </AppBar>
      </>
    );
  }
}
export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
