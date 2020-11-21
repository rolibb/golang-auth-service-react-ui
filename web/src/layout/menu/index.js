import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  useMediaQuery,
} from '@material-ui/core';

import style from './style';

const useStyles = makeStyles(style);

const Menu = ({ setOpenMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.only('sm'));

  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const handleClick = ev => {
    setOpenMenu(false);
  };

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location.pathname]);

  return (
    <List>
      <Link className={classes.link} to="/members">
        <ListItem
          className={currentUrl === '/members' ? classes.currentUrl : ''}
          button
          key="home"
          onClick={handleClick}
        >
          <ListItemIcon>
            <img alt="Home" src="./images/home.svg" />
          </ListItemIcon>
          {!matchesSm && <ListItemText primary="Members" />}
        </ListItem>
      </Link>
    </List>
  );
};

Menu.propTypes = {
  setOpenMenu: PropTypes.func.isRequired,
};

export default Menu;
