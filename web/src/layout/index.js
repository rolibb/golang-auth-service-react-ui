import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Toolbar, Drawer, useMediaQuery } from '@material-ui/core';
import SessionContext from '../shared/contexts/session';
import Menu from './menu';
import TopBar from './topbar';
import PrivateRoute from '../PrivateRoute';
import Home from '../pages/home';
import Login from '../pages/login';
import style from './style';

const useStyles = makeStyles(style);

const Layout = () => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const { isAuthenticated } = useContext(SessionContext);

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Router>
      <CssBaseline />
      <TopBar setOpenMenu={setOpenMenu} openMenu={openMenu} />

      {isAuthenticated && (matchesSmUp || openMenu) && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar className={classes.toolbar} />
          <div className={classes.drawerContainer}>
            <Menu setOpenMenu={setOpenMenu} />
          </div>
        </Drawer>
      )}

      <main className={classes.content}>
        <Toolbar className={classes.toolbar} />
        <Switch>
          <PrivateRoute exact path="/members">
            <Home />
          </PrivateRoute>

          {!isAuthenticated ? (
            <Route exact path="/">
              <Login />
            </Route>
          ) : (
            <Redirect
              to={{
                pathname: '/members',
              }}
            />
          )}
        </Switch>
      </main>
    </Router>
  );
};

export default Layout;
