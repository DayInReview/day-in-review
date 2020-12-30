import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterAPI from './RegisterAPI';

export default function Register(props) {
  const [email, setEmail] = useState(props.location.state.email || "");
  const [password, setpassword] = useState(props.location.state.password || "");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const user = await RegisterAPI.register(name, email, password, password2);
    if (user) {
      setIsRegistered(true);
    }
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

  if (isRegistered) {
    return <Redirect to={{
      pathname: "/login",
      state: { email, password }
    }}
  />
  }

  return (
    <form className={classes.root} onSubmit={(e) => registerUser(e)}>
      <Typography variant='h4'>
        Register
      </Typography>
      <div>
        <TextField id="standard-basic" label="Name" onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        <TextField id="standard-basic" label="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
      </div>
      <div>
        <TextField id="standard-basic" label="Password" type="password" value={password} onChange={({ target }) => setpassword(target.value)} />
      </div>
      <div>
        <TextField id="standard-basic" label="Confirm Password" type="password" onChange={({ target }) => setPassword2(target.value)} />
      </div>
      <span>
        <Button variant="contained" color="primary" type="submit">Register</Button>
      </span>
    </form>
  );
}