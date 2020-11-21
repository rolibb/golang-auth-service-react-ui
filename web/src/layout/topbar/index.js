import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Avatar,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import SessionContext from '../../shared/contexts/session';
import MenuIcon from '@material-ui/icons/Menu';

import style from './style';

const useStyles = makeStyles(style);

const TopBar = ({ setOpenMenu, openMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.only('xs'));

  const { isAuthenticated } = useContext(SessionContext);

  const handleMenu = ev => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isAuthenticated && matchesXs && (
          <IconButton
            aria-label="open drawer"
            edge="start"
            className={classes.menuIcon}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Link to="/">
          <img className={classes.logo} alt="Skyclick" src="/logo.svg" />
        </Link>
        <Box flexGrow={1} />
        {isAuthenticated && (
          <>
            <Button>
              <Avatar
                alt="Avatar"
                src="./images/avatar/avatar.svg"
                className={classes.avatar}
              />
              <span className={classes.userLabel}>Juan Perez</span>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  setOpenMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
};

export default TopBar;
