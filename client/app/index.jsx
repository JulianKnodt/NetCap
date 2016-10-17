import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
      </Route>
    </Router>
  ), document.getElementById('app'));