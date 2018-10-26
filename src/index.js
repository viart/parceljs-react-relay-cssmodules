import React from 'react';
import ReactDOM from 'react-dom';
import { createEnvironment, EnvironmentContext as RelayEnvironmentContext } from './utils/Relay';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { AppContainer } from './App';
import './styles.css';

import config from './config';

import { combineReducers } from 'redux';

import { reducer as repos } from '~/src/Repos';
const store = createStore(combineReducers({
  repos
}));

if (!config.token) {
  alert('Token is missing. Check readme.md');
}

const relayEnvironment = createEnvironment(config);

ReactDOM.render(
  <RelayEnvironmentContext.Provider value={relayEnvironment}>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
  </RelayEnvironmentContext.Provider>
  , document.getElementById('root'));
