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
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from './context/auth';
import MenuDrawer from './components/MenuDrawer'

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import Login from './pages/Login';
import Register from './pages/Register';
import Grades from './pages/Grades';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
}));

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
      <Router className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <MenuDrawer />
            <Typography variant="h6" className={classes.title} onClick={() => {window.location.assign('/')}}>
              Day in Review
            </Typography>
            <Button color="inherit" onClick={ loginLogout }>{ authToken ? "Logout" : "Login" }</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {/* Main Body */}
        <div className={classes.body}>
          {/* Pages */}
          <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route exact path="/register" render={(props) => <Register {...props} />} />
            <PrivateRoute exact path={["/", "/dashboard"]} component={Dashboard} />
            <PrivateRoute exact path="/todo" component={TodoList} />
            <PrivateRoute exact path="/grades" component={Grades} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
