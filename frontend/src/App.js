import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Day In Review</h2>
          </div>
          {/* Main Body */}
          <div className="container-fluid App-body">
            {/* Pages */}
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/todo">
                <TodoList />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
