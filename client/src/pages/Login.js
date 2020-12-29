import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import LoginAPI from './LoginAPI';
import { useAuth } from '../context/auth';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);
  
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

  if (isLoggedIn) {
    return <Redirect to={referer} />
  }

  return (
    <form onSubmit={e => loginUser(e)}>
      <TextField
        id="standard-basic"
        label="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <TextField
        id="standard-basic"
        label="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type="submit" variant="contained">
          Login
      </Button>
    </form>
  );
}