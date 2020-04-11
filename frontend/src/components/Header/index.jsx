import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { openLeftMenu } from '../../store/actions/flags.actions';


const mapStateToProps = (state) => ({
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
  };

  static defaultProps = {
    pageTitle: '',
  };

  handleOpenMenu = () => {
    const { openMenu } = this.props;
    openMenu();
  };

  render() {
    const { pageTitle } = this.props;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleOpenMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {pageTitle}
            </Typography>
            <Link href="/login" style={{ color: 'white' }}>
              <Button color="white">
                Login
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
