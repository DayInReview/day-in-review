import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  body: {
    textAlign: 'center'
  }
});
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={() => {window.location.assign('/')}}>
              Day in Review
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {/* Main Body */}
        <div className={classes.body}>
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
      </Router>
    );
  }
}

export default withStyles(styles)(App);
