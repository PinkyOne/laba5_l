import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'views/Dashboard';
import Login from 'views/Login';
import About from 'views/About';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  LOGIN: `${ publicPath }login`,
  DASHBOARD: publicPath,
  ABOUT: `${ publicPath }about`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Dashboard } />
    <Route path={ routeCodes.LOGIN } component={ Login } />
    <Route path={ routeCodes.ABOUT } component={ About } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
