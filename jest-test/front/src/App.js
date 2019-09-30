import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './modules/Top/Home';
import NotFound from './modules/Top/NotFound';
import { ROUTE_HOME } from './utils/constants';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute path={ROUTE_HOME} component={Home} />
          <PublicRoute path="*" exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
