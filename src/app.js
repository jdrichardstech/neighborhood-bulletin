import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { UpdateProfile, UpdateZone, Account } from './components/containers';
import { Home, ProfileInfo } from './components/layout/';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from './stores/store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const initialState = window.__PRELOADED_STATE__;

const app = (
  <Provider store={store.configureStore(initialState)}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Account} />
        <Route path="/profile/:username" component={ProfileInfo} />
        <Route path="/updateprofile/:username" component={UpdateProfile} />
        <Route path="/updatezone/:zoneid" component={UpdateZone} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
