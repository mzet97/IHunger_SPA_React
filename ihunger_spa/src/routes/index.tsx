import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Restaurant from '../pages/RestaurantPage';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/restaurant/:id" component={Restaurant} isPrivate />
    <Route path="/cart" component={Cart} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/orders" component={Orders} isPrivate />
  </Switch>
);

export default Routes;
