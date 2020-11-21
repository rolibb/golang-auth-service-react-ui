import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SessionContext from './shared/contexts/session';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(SessionContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
