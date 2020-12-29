import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import './App.scss';
import { AuthContext } from './context/auth';

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import Login from './pages/Login';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  body: {
    textAlign: 'center'
  },
});

export default function App(props) {
  const classes = useStyles(props);
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setAuthToken(token);
  }

  const clearToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  }

  // Login/Logout
  const loginLogout = () => {
    if (authToken) {
      // Logout
      clearToken();
    } else {
      window.location.assign('/login');
    }
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, clearAuthToken: clearToken }}>
      <Router>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={() => {window.location.assign('/')}}>
              Day in Review
            </Typography>
            <Button color="inherit" onClick={ loginLogout }>{ authToken ? "Logout" : "Login" }</Button>
          </Toolbar>
        </AppBar>
        {/* Main Body */}
        <div className={classes.body}>
          {/* Pages */}
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path={["/", "/dashboard"]} component={Dashboard} />
            <PrivateRoute exact path="/todo" component={TodoList} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
