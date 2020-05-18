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
import { openLeftMenu } from '../../store/actions/flags.actions';
import { userShape } from '../Auth/auth.schema';
import Link from "@material-ui/core/Link";


const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openLeftMenu()),
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
  };

  static defaultProps = {
    pageTitle: '',
    user: null,
  };

  handleOpenMenu = () => {
    const { openMenu } = this.props;
    openMenu();
  };

  render() {
    const { pageTitle, user } = this.props;
    return (
      <>

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
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleOpenMenu}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {pageTitle}
              </Typography>

              { user
                ? (
                  <Typography variant="subtitle1">
                    {/*{ user.username }*/}
                    Иванов Иван
                    {/*Администратор Системы (Администратор)*/}
                    {/*Кузнецов Сергей (Преподаватель)*/}
                    {/*Кузнецов Сеƒргей*/}
                    <AccountCircleIcon />
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
