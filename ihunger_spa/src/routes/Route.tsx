/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  function isAllowed(): boolean {
    if (!isPrivate) {
      return true;
    }
    if (user) {
      return true;
    }
    return false;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) =>
        isAllowed() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        )
      }
    />
    /*
    <ReactDOMRoute {...rest}>
      <Component />
    </ReactDOMRoute>
    */
  );
};

export default Route;
