import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerActions, routerMiddleware, push } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app/App.jsx';
import Home from './components/home/Home.jsx';
import VerifyView from './components/verified/VerifyView.jsx';
import About from './components/about/About.jsx';
import { dataReducer, verifyReducer } from './reducers/dataReducer';

const middleware = routerMiddleware(browserHistory);

const rootReducer = combineReducers({
  data: dataReducer,
  verified: verifyReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, middleware));

render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/verified" component={ VerifyView }/>
        <Route path="/about" component={ About } />
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('app'));