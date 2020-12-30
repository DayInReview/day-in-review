import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginAPI from './LoginAPI';
import { useAuth } from '../context/auth';

export default function Login(props) {
  const { authToken, setAuthToken } = useAuth();
  const [email, setEmail] = useState(props.location.state ? props.location.state.email : "");
  const [password, setPassword] = useState(props.location.state ? props.location.state.password : "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);
  const [redirectRegister, setRedirectRegister] = useState(false);
  
  let referer;
  try {
    referer = props.location.state.referer;
  } catch (err) {
    referer = '/';
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const token = await LoginAPI.login(email, password);
    if (token) {
      console.log(`token: ${token}`);
      setAuthToken(token);
      setIsLoggedIn(true);
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setRedirectRegister(true);
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '50ch',
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  
  if (isLoggedIn) {
    console.log(referer);
    return <Redirect to={referer} />
  }

  if (redirectRegister) {
    return <Redirect to={{
        pathname: "/register",
        state: { email, password }
      }}
    />
  }

  return (
    <form className={classes.root} onSubmit={(e) => loginUser(e)}>
      <Typography variant='h4'>
        Login
      </Typography>
      <div>
        <TextField id="standard-basic" label="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
      </div>
      <div>
        <TextField id="standard-basic" label="Password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <span>
        <Button variant="contained" onClick={(e) => registerUser(e)}>Register</Button>
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </span>
    </form>
  );
}